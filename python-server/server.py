# pip install flask_cors
from flask import Flask, request, json, jsonify
from flask_cors import CORS
import speech_recognition as sr
import time
import subprocess

app = Flask(__name__)
# CORS(app, resources={r'*': {'origins': ['http://localhost:3001']}})
CORS(app)

@app.route("/record", methods=['GET'])
def record():
    try:
        subprocess.check_output("arecord --format=S16_LE --duration=5 --rate=16000 --file-type=raw out.wav &", shell=True)

    except Exception as e:
        print(e)

@app.route("/stt", methods=['GET'])
def stt():
    # params = request.get_json()
    # print("받은 Json 데이터 ", params)
    recogResult = None
    try:
        subprocess.check_output("pkill arecord", shell=True)
        #subprocess.check_output("aplay --format=S16_LE --rate=16000 out.wav", shell=True)
        
        r = sr.Recognizer()
        audio_file = sr.AudioFile('./out.wav')
        
        with audio_file as source:
            print('음성을 입력하세요.')
            audio = r.record(source)
        try:
            recogResult = r.recognize_google(audio, language='ko-KR')
            print('음성변환 : ' + recogResult)
        except sr.UnknownValueError:
            recogResult = "죄송하지만 이해하지 못했어요. \n 취소 후 다시 말씀해주세요."
            print('오디오를 이해할 수 없습니다.')
        except sr.RequestError as e:
            print(f'에러가 발생하였습니다. 에러원인 : {e}')
                
    except Exception as e:
        print(e)
    
    response = recogResult

    return jsonify(response)

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=3001)