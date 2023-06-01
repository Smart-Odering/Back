const $recordBtn = document.querySelector('.record');
const $sttRecog = document.querySelector('.stt-recog');
const $loading = document.querySelector('.loading');
const $sttModalDisplay = document.querySelector('.stt-modal-container');
const $sttCancelBtn = document.querySelector('.stt-cancel-button');
const $sttModalHeading = document.querySelector('.stt-modal-heading');

//음성인식, 메뉴추천 관련 변수
var recommendData = {};
var recogMenuHtml = null;

//추천 메뉴 주문 모달창 관련 변수
export var sttMenuname = null;
export var sttPrice = null;

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

const menuRecommend = (recommendData) => {
    sttRender();
    LoadingImage();
    if (recommendData != null){
        $sttModalHeading.textContent = "아래 메뉴를 추천합니다!";
        recogMenuHtml =
            `<li id="menu_${recommendData.id}" class="menu-item">
                <figure id="menu_${recommendData.id}">
                    <img id="menu_${recommendData.id}" class="menu-img" src="/res/${recommendData.image}">
                    <figcaption id="menu_${recommendData.id}" class="menu-title">${recommendData.name_kor}</figcaption>
                    <span class="menu-price">${recommendData.price}</span>
                </figure>
            </li>
            `
        $sttRecog.innerHTML += recogMenuHtml;
    }
    else{
        $sttModalHeading.textContent = "추천 메뉴가 없습니다.";
    }
};

// 음성인식 모달 띄우기 관련 이벤트
$recordBtn.addEventListener('mousedown', function() {
    $recordBtn.classList.replace('record', 'record-active');
    fetch("http://0.0.0.0:3001/record")
    .then()
    .catch(error => {
        console.error('Error:', error);
    });
});

// $recordBtn.addEventListener('mouseup', function() {
//     fetch("http://0.0.0.0:3001/stt")
//     .then()
//     .catch(error => {
//         console.error('Error:', error);
//     });
// });

$recordBtn.addEventListener('mouseup', function() {
    $recordBtn.classList.replace('record-active', 'record');
    $sttModalDisplay.classList.replace('modal-visible', 'modal-invisible');
    recommendData['id'] = "0";
    recommendData['image'] = "ice_americano.jpg";
    recommendData['name_kor'] = "아이스 아메리카노";
    recommendData['price'] = "4500";
    console.log(recommendData)
    // STT
    fetch("http://0.0.0.0:3001/stt")
    .then(response => response.json())
    .then(data => {
        // 데이터 처리 로직
        sttRender(data);
        setTimeout(LoadingImage, 1000, "./res/Spinner.gif");
        setTimeout(menuRecommend, 3000, recommendData);
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

// 결제 모달에서 취소 시 모달창 close
$sttCancelBtn.onclick = () => {
    $recordBtn.classList.replace('record-active', 'record');
    $sttModalDisplay.classList.replace('modal-visible', 'modal-invisible');
    sttRender();
    LoadingImage();
    $sttModalHeading.textContent = "음성인식 진행 중"
};
