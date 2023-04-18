"use strict";

//module
const express = require("express");
const dotenv = require("dotenv");

const app = express();
dotenv.config();

// 라우팅
const home = require("./src/routes");

// 앱 세팅
app.set("views", "../client/views"); // 뷰 파일들이 모여 있는 폴더 지정
app.set("view engine", "ejs"); // 뷰 엔진을 ejs로 사용
app.use(express.static(`${__dirname}/../client`));

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use("/", home); // use -> 미들웨어를 등록해주는 메서드.

module.exports = app;