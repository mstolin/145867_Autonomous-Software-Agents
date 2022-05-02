const Clock = require('./Clock')

class Logger {

    static #prefix = ''

    static prefix(prefix) {
        Logger.#prefix = prefix
        return Logger
    }

    static getFormattedPrefix() {
        return `(${Clock.format()}) [${Logger.#prefix.toUpperCase()}]`
    }

    static log(message) {
        console.log(Logger.getFormattedPrefix(), message)
        return Logger
    }

    static warn(message) {
        console.warn(Logger.getFormattedPrefix(), message)
        return Logger
    }

    static error(message) {
        console.error(Logger.getFormattedPrefix(), message)
        return Logger
    }

}

module.exports = Logger
