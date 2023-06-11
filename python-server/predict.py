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
from konlpy.tag import Okt


device = torch.device("cpu")
bertmodel = BertModel.from_pretrained('skt/kobert-base-v1', return_dict=False)
okt = Okt()
class BERTClassifier(nn.Module):
    def __init__(self,
                bert,
                hidden_size = 768,
                num_classes=16,
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

        item['labels'] = int(self.dataset[idx][1])

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
# model1 = BERTClassifier(bertmodel,  dr_rate=0.5).to(device)
# model1.load_state_dict(torch.load(PATH + 'model_state_dict1.pt',map_location=device))
# model2 = BERTClassifier(bertmodel,  dr_rate=0.5).to(device)
# model2.load_state_dict(torch.load(PATH + 'model_state_dict2.pt',map_location=device))
model3 = BERTClassifier(bertmodel,  dr_rate=0.5).to(device)
model3.load_state_dict(torch.load(PATH + 'model_state_dict3.pt',map_location=device))

tokenizer = KoBERTTokenizer.from_pretrained('skt/kobert-base-v1')
vocab = nlp.vocab.BERTVocab.from_sentencepiece(tokenizer.vocab_file, padding_token='[PAD]')

max_len = 64

def predict1(predict_sentence):
    predict_sentence = ' '.join(okt.morphs(predict_sentence))
    print(predict_sentence)
    data = [predict_sentence, '0']
    dataset_another = [data]

    another_test = BERTDataset(dataset_another, tokenizer, max_len, True, False)
    test_dataloader = torch.utils.data.DataLoader(another_test, batch_size=32)

    model1.eval()

    for batch_id, (token_ids, valid_length, segment_ids, label) in enumerate(test_dataloader):
        token_ids = token_ids.long()
        segment_ids = segment_ids.long()

        valid_length= valid_length
        label = label.long()

        out1 = model1(token_ids, valid_length, segment_ids)

        print("***************result***************")
        result = analyze(out1)
        print(result)
        return result

def predict2(predict_sentence):
    predict_sentence = ' '.join(okt.morphs(predict_sentence))
    print(predict_sentence)
    data = [predict_sentence, '0']
    dataset_another = [data]

    another_test = BERTDataset(dataset_another, tokenizer, max_len, True, False)
    test_dataloader = torch.utils.data.DataLoader(another_test, batch_size=64)

    model2.eval()

    for batch_id, (token_ids, valid_length, segment_ids, label) in enumerate(test_dataloader):
        token_ids = token_ids.long()
        segment_ids = segment_ids.long()

        valid_length= valid_length
        label = label.long()

        out2 = model2(token_ids, valid_length, segment_ids)

        print("***************result***************")
        result = analyze(out2)
        print(result)
        return result

def predict3(predict_sentence):
    print(predict_sentence)
    data = [predict_sentence, '0']
    dataset_another = [data]

    another_test = BERTDataset(dataset_another, tokenizer, max_len, True, False)
    test_dataloader = torch.utils.data.DataLoader(another_test, batch_size=64)

    model3.eval()

    for batch_id, (token_ids, valid_length, segment_ids, label) in enumerate(test_dataloader):
        token_ids = token_ids.long()
        segment_ids = segment_ids.long()

        valid_length= valid_length
        label = label.long()

        out3 = model3(token_ids, valid_length, segment_ids)

        print("***************result***************")
        result = analyze(out3)
        print(result)
        return result

def analyze(out):
        test_eval=[]
        sorted_index = []
        for i in out:
            logits=i
            probs = F.softmax(logits, dim=0)
            probs = probs.detach().cpu().numpy()
            print("**********확률*************")
            print(probs)
            reverse_probs = [1 - x for x in probs]
            ranks = rankdata(reverse_probs, method='ordinal')
            print("**********랭크*************")
            print(ranks)

            print("**********Top*************")
            for j,rank in enumerate(ranks):
                if rank < 4 :
                    print(j,":",probs[j])
                    if probs[j] > 0.2:
                        sorted_index.append(probs[j])
                        test_eval.append(j)
        sorted_index = np.argsort(sorted_index)
        print(sorted_index)
        test_eval = [test_eval[i] for i in sorted_index]
        print(test_eval)
        return test_eval

if __name__ =='__main__' :
    # command = sys.argv[1]
    # print(command)
    # predict1("시원한 음료를 원해")
    # predict2("시원한 음료를 원해")
    predict_sentence = "달달한 음료 추천해줘"
    result = []
    result.extend(predict3(' '.join(okt.morphs(predict_sentence, stem=True))))
    result.extend(predict3(' '.join(okt.morphs(predict_sentence))))
    # result.extend(predict3(' '.join(okt.nouns(predict_sentence))))
    # result.extend(predict3(' '.join(okt.normalize(predict_sentence))))
    result.extend(predict3(' '.join(okt.phrases(predict_sentence))))
    print("************************최종 결과*********************************")
    print(list(set(result)))