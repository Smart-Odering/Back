"use strict";

const { cli } = require("winston/lib/winston/config");
const logger = require("../config/logger");
const Menu = require("../models/Menu");

const output = {
    main : (req, res) => {
        logger.info(`"홈 화면으로 이동"`);
        res.render("main");
    },
    home : async (req, res) => {
        const client = req.body;
        try{
            const categoryId = await Menu.getCategoryId(client.category);
            logger.info(`categoryId = ${categoryId}`);
            const response = await Menu.getMenuByCategory(categoryId);
            logger.info(`GET /home Success!`);
            return res.send(response);
        } catch(err) {
            logger.error(`GET /home Response: ${err}`);
        }
        
    }
};

const process = {
}

module.exports = {
    output,
    process,
};