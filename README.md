# Smart Ordering

Package Name : smart-ordering

# How to start a server
서버 실행 방법
```shell
npm install
npm start
```
- `npm start` = `nodemon ./bin/www.js`

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