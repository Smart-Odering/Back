"use strict";

const { log } = require("winston");
const logger = require("../config/logger");

const output = {
    home : (req, res) => {
        logger.info(`"홈 화면으로 이동"`);
        res.render("main");
    }
};

module.exports = {
    output,
};