const fs = require('fs');
const path = require('path');

function padZero(number, length) {
    let str = number.toString();
    while (str.length < length) {
        str = '0' + str;
    }
    return str;
}

class Logger {
    constructor() {
        const date = new Date();
        const logFolder = path.resolve('./logs');
        fs.mkdirSync(logFolder, { recursive: true });
        this.logFileName = path.join(logFolder, `log-${date.getFullYear()}-${padZero(date.getMonth() + 1)}-${padZero(date.getDate())}_${padZero(date.getHours())}-${padZero(date.getMinutes())}-${padZero(date.getSeconds())}.log`);
        this.errorFileName = path.join(logFolder, `error-${date.getFullYear()}-${padZero(date.getMonth() + 1)}-${padZero(date.getDate())}_${padZero(date.getHours())}-${padZero(date.getMinutes())}-${padZero(date.getSeconds())}.log`);
    }

    log(...args) {
        const timestamp = new Date().toISOString();
        const logMessage = args.map(arg => String(arg)).join(' ');
        fs.appendFileSync(this.logFileName, `${timestamp} - ${logMessage}\r\n`);
        console.log(logMessage);
    }

    error(...args) {
        const timestamp = new Date().toISOString();
        const logMessage = args.map(arg => String(arg)).join(' ');
        fs.appendFileSync(this.errorFileName, `${timestamp} - ${logMessage}\r\n`);
        console.error(logMessage);
    }
}

module.exports = Logger;