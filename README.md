# Smart Ordering

Package Name : smart-ordering

# How to start a server
Source 다운
  1. Frontend Source 코드 받아서 폴더명을 client로 변경
  2. Backend Source 코드 받아서 폴더명을 server로 변경
  - ※ client와 server가 같은 폴더에 위치
  - ![](res/README/스크린샷%202023-04-15%20오후%207.44.18.png)

서버 실행 방법
- 터미널 창에서 아래 명령어 실행
  ```shell
  npm install
  npm start
  ```
- `npm start` = `nodemon ./bin/www.js`

[접속주소](http://localhost:3000)


# Packages
- express
- dotenv
- winston
- ejs

# Folder Tree
- `bin/`
  - `www.js` : 앱 서버 가동
- `logs/` : 로그 파일 관리 디렉토리
- `src/` : source파일 디렉토리
  - `config/` : 환경 설정하는 구성파일 디렉토리
  - `models/` : 모델 디렉토리 (데이터베이스, 데이터)
  - `routes/` : 라우팅 디렉토리 → URI 정의 및 응답
- `.env` : 환경 변수 설정 파일
- `app.js` : 서버 세팅 및 미들웨어 등록