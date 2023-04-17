"use strict";

const logger = require("../config/logger");
const Menu = require("../models/Menu");

const output = {
    home : (req, res) => {
        logger.info(`"홈 화면으로 이동"`);
        res.render("main");
    }
};

const process = {
    home : async (req, res) => {
        console.log(req.body);
        const response = await Menu.getMenuByCategory(req.body);
        console.log(response);
    }
}

module.exports = {
    output,
    process,
};