"use strict";

const { cli } = require("winston/lib/winston/config");
const logger = require("../config/logger");
const Menu = require("../models/Menu");
// const sys   = require('sys');

// const path = require('path')
// const pyPath = path.join(__dirname, 'py\\predict.py')
const request = require('request-promise');

const output = {
    main : (req, res) => {
        logger.info(`"홈 화면으로 이동"`);
        res.render("main");
    },
};

const process = {
    home : async (req, res) => {
        const client = req.body;
        try{
            const categoryId = await Menu.getCategoryId(client.category);
            logger.info(`categoryId = ${categoryId}`);
            const response = await Menu.getMenuByCategory(categoryId);
            logger.info(`POST /home Success!`);
            return res.send(response);
        } catch(err) {
            logger.error(`POST /home Response: ${err}`);
        }
    },
    recommend : async (req, res) => {
        const client = req.body;
        try{
            // const spawn = require("child_process").spawn 
            // const process = spawn('python',[pyPath, client.category] )
            // process.stdout.on('data', function(data) { 
            //     const response = data.toString();
            //     console.log(response.split(","));
            //     return res.send(response);
            // }) 
            const userInput = "아이스 음료";
            const options = {
                uri: 'http://127.0.0.1:3001/predict_menu',
                method: 'POST',
                body: { 'user_input': userInput },
                json: true
            };
            request(options)
            .then(result => {
                const summary = result
                res.send(summary);
            })
            // fetch
            // .then(response => response.json())
            // .then(data => {
            //     // 데이터 처리 로직
            //     console.log(data);
            // })
            // .catch(error => {
            //     console.error('Error:', error);
            // });
        } catch(err){
            logger.error(`POST /recommend Response: ${err}`);
        }
    },
}

module.exports = {
    output,
    process,
};