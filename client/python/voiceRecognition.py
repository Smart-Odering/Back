import speech_recognition as sr

def Recognition():
    try:
        r = sr.Recognizer()
        
        with sr.Microphone() as source:
            print('음성을 입력하세요.')
            audio = r.listen(source)
            try:
                recogResult = r.recognize_google(audio, language='ko-KR')
                print('음성변환 : ' + recogResult)
            except sr.UnknownValueError:
                print('오디오를 이해할 수 없습니다.')
            except sr.RequestError as e:
                print(f'에러가 발생하였습니다. 에러원인 : {e}')
            
            return recogResult
                
    except KeyboardInterrupt:
        pass

Recognition()