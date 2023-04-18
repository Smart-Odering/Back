const { createLogger, transports, format} = require("winston");
const { combine, timestamp, label, simple, colorize, printf } = format;
const util = require("util");

const printFormat = printf(({ timestamp, level, message }) => {
    return `${timestamp} [${level}] : ${util.format('%o',message)}`
});

const printLogFormat = {
    file: combine(
        // colorize(),
        timestamp({
            format: "YYYY-MM-DD HH:mm:dd"
        }),
        printFormat
    ),
    console: combine(
        colorize(),
        simple()
    )
};

const opts = {
    file: new transports.File({
        filename: "access.log",
        dirname: "./logs",
        level : "info",
        format: printLogFormat.file,
    }),
    console: new transports.Console({
        level : "info",
        format: printLogFormat.console,
    })
}

const logger = createLogger({
    transports : [opts.file],
});

if (process.env.NODE_ENV !== "production") {
    logger.add(opts.console);
}

module.exports = logger;