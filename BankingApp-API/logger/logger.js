class Logger {
    constructor(loggerName) {
        this.loggerName = loggerName;
    }

    info(message){
        console.log(`\x1b[32m[Logger: ${this.loggerName}: ${new Date()}] \nINFO: ${message}\x1b[0m`);
    }

    warn(message){
        console.log(`\x1b[36m[Logger: ${this.loggerName}: ${new Date()}] \nWARN: ${message}\x1b[0m`);
    }

    error(message){
        console.log(`\x1b[31m[Logger: ${this.loggerName}: ${new Date()}] \nERROR: ${message}\x1b[0m`);
    }
}


/*
console.log('\x1b[36m%s\x1b[0m', 'I am cyan');  //cyan
console.log('\x1b[33m%s\x1b[0m', stringToMakeYellow);  //yellow

Reset = "\x1b[0m"
Bright = "\x1b[1m"
Dim = "\x1b[2m"
Underscore = "\x1b[4m"
Blink = "\x1b[5m"
Reverse = "\x1b[7m"
Hidden = "\x1b[8m"

FgBlack = "\x1b[30m"
FgRed = "\x1b[31m"
FgGreen = "\x1b[32m"
FgYellow = "\x1b[33m"
FgBlue = "\x1b[34m"
FgMagenta = "\x1b[35m"
FgCyan = "\x1b[36m"
FgWhite = "\x1b[37m"

BgBlack = "\x1b[40m"
BgRed = "\x1b[41m"
BgGreen = "\x1b[42m"
BgYellow = "\x1b[43m"
BgBlue = "\x1b[44m"
BgMagenta = "\x1b[45m"
BgCyan = "\x1b[46m"
BgWhite = "\x1b[47m"
*/

module.exports = Logger;