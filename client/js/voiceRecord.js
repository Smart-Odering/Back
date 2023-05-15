
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

$(document).ready(function(){
    let recognition = new SpeechRecognition();
    recognition.interimResults = true;
    recognition.lang = 'ko-KR';

    // let makeNewTextContent = function() {
    //     p = document.createElement('p');
    //     document.querySelector('.words').appendChild(p);
    // };

    const store = {
        texts : ''
    };

    $(".record").mousedown(function(){
        recognition.start(); //음성인식 시작
    });

    // recognition.onstart = function() {
    //     makeNewTextContent(); // 음성 인식 시작시마다 새로운 문단을 추가한다.
    // };

    $(".record").mouseup(function(){
        recognition.stop(); // 녹음 정지
    });

    // recognition.onend = function() {
    //     recognition.start();
    // };

    recognition.onresult = function(e) {
        store.texts = Array.from(e.results)
            .map(results => results[0].transcript).join("");

        console.log(store.texts)
    };
});

