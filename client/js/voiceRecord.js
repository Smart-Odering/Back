var fileAbsPath = "C:/Users/KMD/Downloads/voiceRecord.mp3";

$(document).ready(function(){

    if(navigator.mediaDevices){
        var constraints = {
                audio:true
        }

        let chunks = []; // 녹음 데이터 저장하기 위한 변수

        navigator.mediaDevices.getUserMedia(constraints)
        .then(stream => {
            const mediaRecorder = new MediaRecorder(stream);

            // 마이크 버튼 클릭 시
            $(".record").mousedown(function(){
                mediaRecorder.start(); //녹음 시작
            });


            // 마이크 버튼 클릭 해제 시
            $(".record").mouseup(function(){
                mediaRecorder.stop(); // 녹음 정지
            });

            mediaRecorder.onstop = e => {
                const clipcontainer = document.createElement('article');                    

                const audio = document.createElement('audio');    
                audio.setAttribute('controls', '');

                clipcontainer.appendChild(audio);

                const blob = new Blob(chunks, {
                    'type': 'audio/wav codecs=opus'
                });

                // chunks 초기화 (초기화 하지 않으면 녹음 내용이 누적 저장됨)
                chunks = [];

                // audio 소스 지정
                const audioURL = URL.createObjectURL(blob);
                audio.src = audioURL;


                // 녹음 내용을 파일로 저장
                // 파일명
                const clipName = "voiceRecord"
                const a = document.createElement('a');
                clipcontainer.appendChild(a);
                a.href = audio.src;

                a.download = clipName;
                a.click();
                };


                // 녹음 시작 상태가 되면 chunks에 녹음 데이터 저장
                mediaRecorder.ondataavailable = e => {
                    chunks.push(e.data);
                };

        })
        .catch(err => {
            console.log("오류 발생 : " + err)
        })
    }
});