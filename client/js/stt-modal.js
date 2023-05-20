const $recordBtn = document.querySelector('.record');
const $sttRecog = document.querySelector('.stt-recog');
const $loading = document.querySelector('.loading');
const $sttModalDisplay = document.querySelector('.stt-modal-container');
const $sttCancelBtn = document.querySelector('.stt-cancel-button');

var recogText = null;
var gif = null;

//음성인식 텍스트 렌더링
const sttRender = (recogText) => {
    let recogHtml = '';
  
    if (recogText != null) {
        recogHtml = `<p class="stt-recog-text"><span>
        ${recogText}</span>
        </p>`;

        $sttRecog.innerHTML += recogHtml;
    } else {
        $sttRecog.innerHTML = recogHtml;
    }
};

const LoadingImage = (gif) => {
    var loadingImgHtml = '';

    if(gif != null){
        loadingImgHtml += `<img src=${gif} width="80" height="80">`;

        $loading.innerHTML += loadingImgHtml;
    } else {
        $loading.innerHTML = loadingImgHtml;
    }
};

// 음성인식 모달 띄우기 관련 이벤트
$recordBtn.onclick = () => {
    $recordBtn.classList.replace('record', 'record-active');
    $sttModalDisplay.classList.replace('modal-invisible', 'modal-visible');
    // STT
    fetch("http://localhost:3001/stt")
    .then(response => response.json())
    .then(data => {
        // 데이터 처리 로직
        console.log(data);
        sttRender(data);
        setTimeout(LoadingImage, 1000, "./res/Spinner.gif");
    })
    .catch(error => {
        console.error('Error:', error);
    });
};

// 결제 모달에서 취소 시 모달창 close
$sttCancelBtn.onclick = () => {
    $recordBtn.classList.replace('record-active', 'record');
    $sttModalDisplay.classList.replace('modal-visible', 'modal-invisible');
    sttRender();
    LoadingImage();
};
