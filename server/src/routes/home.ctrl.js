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
            const options = {
                uri: 'http://127.0.0.1:3002/predict_menu',
                method: 'POST',
                body: { 'order': client.order },
                json: true
            };
            request(options)
            .then( async result => {
                const summary = result.result;
                let response = [];
                for (const menuID of summary){
                    const menuInfo = await Menu.getMenu(menuID);
                    response.push(menuInfo[0])
                }
                res.send(response);
            })
            .catch(error => {
                logger.error('Error:', error);
            });
        } catch(err){
            logger.error(`POST /recommend Response: ${err}`);
        }
    },
}

module.exports = {
    output,
    process,
};