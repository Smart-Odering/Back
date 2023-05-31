# pip install flask_cors
from flask import Flask, request, json, jsonify
from flask_cors import CORS
import speech_recognition as sr

app = Flask(__name__)
# CORS(app, resources={r'*': {'origins': ['http://localhost:3001']}})
CORS(app)

@app.route("/stt", methods=['GET'])
def stt():
    # params = request.get_json()
    # print("받은 Json 데이터 ", params)
    recogResult = None
    try:
        r = sr.Recognizer()
        
        with sr.Microphone(sample_rate = 48000, device_index = 2, chunk_size = 1024) as source:
            print('음성을 입력하세요.')
            audio = r.listen(source)
        try:
            recogResult = r.recognize_google(audio, language='ko-KR')
            print('음성변환 : ' + recogResult)
        except sr.UnknownValueError:
            recogResult = "죄송하지만 이해하지 못했어요. \n 다시 말씀해주세요."
            print('오디오를 이해할 수 없습니다.')
        except sr.RequestError as e:
            print(f'에러가 발생하였습니다. 에러원인 : {e}')
                
    except KeyboardInterrupt:
        pass

    response = recogResult

    return jsonify(response)


if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=3001)