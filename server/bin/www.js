"use strict";

const https = require("https");
const fs = require("fs");

const options = {
    key: fs.readFileSync("./config/cert.key"),
    cert: fs.readFileSync("./config/cert.crt"),
};

const app = require("../app");
const logger = require("../src/config/logger");

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    logger.info(`${PORT} 포트에서 서버가 가동되었습니다.`);
});

https.createServer(options, app).listen(8080, () => {
    console.log(`HTTPS server started on port 8080`);
});