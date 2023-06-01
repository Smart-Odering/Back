import torch
import sys
from torch import nn
import numpy as np
from torch.utils.data import Dataset, DataLoader
from kobert_tokenizer import KoBERTTokenizer
from transformers import BertModel
import torch.nn.functional as F
import gluonnlp as nlp

from transformers import AdamW
from transformers.optimization import get_cosine_schedule_with_warmup

from scipy.stats import rankdata

device = torch.device("cpu")
bertmodel = BertModel.from_pretrained('skt/kobert-base-v1', return_dict=False)
class BERTClassifier(nn.Module):
    def __init__(self,
                bert,
                hidden_size = 768,
                num_classes=13,
                dr_rate=None,
                params=None):
        super(BERTClassifier, self).__init__()
        self.bert = bert
        self.dr_rate = dr_rate

        self.classifier = nn.Linear(hidden_size , num_classes)
        if dr_rate:
            self.dropout = nn.Dropout(p=dr_rate)

    def gen_attention_mask(self, token_ids, valid_length):
        attention_mask = torch.zeros_like(token_ids)
        for i, v in enumerate(valid_length):
            attention_mask[i][:v] = 1
        return attention_mask.float()

    def forward(self, token_ids, valid_length, segment_ids):
        attention_mask = self.gen_attention_mask(token_ids, valid_length)

        _, pooler = self.bert(input_ids = token_ids, token_type_ids = segment_ids.long(), attention_mask = attention_mask.float().to(token_ids.device))
        if self.dr_rate:
            out = self.dropout(pooler)
        return self.classifier(out)

class BERTDataset(Dataset):
    def __init__(self, dataset, tokenizer, max_len, pad=True, pair=False):
        self.tokenizer = tokenizer
        self.max_len = max_len
        self.pad = pad
        self.pair = pair
        self.dataset = dataset

    def __getitem__(self, idx):
        if self.pair:
            text = self.dataset[idx][0]
            text_pair = self.dataset[idx][1]
        else:
            text = self.dataset[idx][0]

        inputs = self.tokenizer.encode_plus(
            text,
            text_pair if self.pair else None,
            add_special_tokens=True,
            max_length=self.max_len,
            pad_to_max_length=self.pad,
            truncation=True
        )

        item = {
            'input_ids': torch.tensor(inputs['input_ids']),
            'attention_mask': torch.tensor(inputs['attention_mask']),
            'token_type_ids': torch.tensor(inputs['token_type_ids'])
        }
        # print(torch.tensor(inputs['input_ids']).shape)
        # print(torch.tensor(inputs['attention_mask']).shape)
        # print(torch.tensor(inputs['token_type_ids']).shape)

        item['labels'] = int(self.dataset[idx][1])
        # item['labels'] = self.dataset[idx][1]

        # 패딩된 시퀀스/길이와 타입에 대한 내용/어텐션 마스크 시퀀스 세 가지 배열을 얻을 수 있도록 함
        padded_seq = torch.tensor(inputs['input_ids']).numpy()
        len_and_type = list(torch.tensor(inputs['token_type_ids']).shape) #dtype은 출력 안됨
        attention_mask_seq = torch.tensor(inputs['attention_mask']).numpy()

        return np.array(padded_seq), np.array(len_and_type), np.array(attention_mask_seq), item['labels']


    def __len__(self):
        return len(self.dataset)

## 학습 모델 로드
# PATH = '/home/ubuntu/smart-ordering/python-server/data/'
PATH = './python-server/'
model = BERTClassifier(bertmodel,  dr_rate=0.5).to(device)
# model = torch.load(PATH + 'KoBERT_smart_odering.pt',map_location=device)  # 전체 모델을 통째로 불러옴, 클래스 선언 필수
model.load_state_dict(torch.load(PATH + 'model_state_dict.pt',map_location=device))  # state_dict를 불러 온 후, 모델에 저장
tokenizer = KoBERTTokenizer.from_pretrained('skt/kobert-base-v1')
vocab = nlp.vocab.BERTVocab.from_sentencepiece(tokenizer.vocab_file, padding_token='[PAD]')

max_len = 64
batch_size = 64

def predict(predict_sentence):

    data = [predict_sentence, '0']
    dataset_another = [data]

    another_test = BERTDataset(dataset_another, tokenizer, max_len, True, False)
    test_dataloader = torch.utils.data.DataLoader(another_test, batch_size=batch_size)

    model.eval()

    for batch_id, (token_ids, valid_length, segment_ids, label) in enumerate(test_dataloader):
        token_ids = token_ids.long()
        segment_ids = segment_ids.long()

        valid_length= valid_length
        label = label.long()

        out = model(token_ids, valid_length, segment_ids)

        test_eval=[]
        for i in out:
            logits=i
            probs = F.softmax(logits, dim=0)
            probs = probs.detach().cpu().numpy()
            print(probs)
            # temp = probs.argsort()
            # ranks = np.arange(len(probs))[temp.argsort()]
            reverse_probs = [1 - x for x in probs]
            ranks = rankdata(reverse_probs, method='ordinal')
            print(ranks)
            print(np.argmax(probs))
            for j,rank in enumerate(ranks):
                if rank < 4 :
                    # test_eval.append(MenuLists[j])
                    test_eval.append(j)
        print(test_eval)
        return test_eval

if __name__ =='__main__' :
    # command = sys.argv[1]
    # print(command)
    predict("아이스")