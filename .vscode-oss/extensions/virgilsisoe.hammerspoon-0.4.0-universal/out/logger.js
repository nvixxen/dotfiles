"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = exports.logPath = void 0;
const fs_1 = require("fs");
const path = require("path");
exports.logPath = path.join(path.resolve(__dirname, ".."), "log");
/**
 * Base Logger class for writing message to file or console.
 */
class Logger {
    constructor(logName, logFile) {
        this.printToConsole = false;
        this.logName = logName;
        logFile = logFile ? logFile : "log";
        this.logFile = path.join(exports.logPath, `${logFile}.log`);
    }
    /**
     * Justify text to the left.
     *
     * @param text text from where to start the justification
     * @param length optional length count. default is 10
     * @returns
     */
    ljust(text, length = 10) {
        const diff = length - text.length;
        return text + " ".repeat(diff >= 0 ? diff : 0);
    }
    /**
     * Check if log should print to `stdout`.
     *
     * @param items optional items to log
     * @returns
     */
    toConsole(items) {
        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            if (typeof item === "object" && Object.prototype.hasOwnProperty.call(item, "console")) {
                this.printToConsole = item.console;
                items.splice(i, 1);
            }
        }
        return items;
    }
    /**
     * Log to file
     *
     * @param level level of the logger: debug, info warning, error, critical
     * @param message message to write
     * @param items optional items to write
     */
    log(level, message, items) {
        this.printToConsole = false;
        items = this.toConsole(items);
        if (items.length > 0) {
            const optionalItems = JSON.stringify(items, undefined);
            message = this.ljust(level) + this.ljust(`${message} ${optionalItems}`);
        }
        else {
            message = this.ljust(level) + this.ljust(message);
        }
        (0, fs_1.appendFileSync)(this.logFile, message.trim() + "\n");
        if (this.printToConsole) {
            console.log(message);
        }
    }
    /**
     * Clean log file.
     */
    cleanFile() {
        (0, fs_1.writeFileSync)(this.logFile, "");
    }
    /**
     * Write to log debug level
     *
     * @param message message to write
     * @param items optional items to write. if `{console: true}` is passed, then
     * will write to `stdout`.
     */
    debug(message, ...items) {
        this.log("[DEBUG]", message, items);
    }
    /**
     * Write to log info level
     *
     * @param message message to write
     * @param items optional items to write. if `{console: true}` is passed, then
     * will write to `stdout`.
     */
    info(message, ...items) {
        this.log("[INFO]", message, items);
    }
    /**
     * Write to log warning level
     *
     * @param message message to write
     * @param items optional items to write. if `{console: true}` is passed, then
     * will write to `stdout`.
     */
    warning(message, ...items) {
        this.log("[WARNING]", message, items);
    }
    /**
     * Write to log error level
     *
     * @param message message to write
     * @param items optional items to write. if `{console: true}` is passed, then
     * will write to `stdout`.
     */
    error(message, ...items) {
        this.log("[ERROR]", message, items);
    }
    /**
     * Write to log critical level
     *
     * @param message message to write
     * @param items optional items to write. if `{console: true}` is passed, then
     * will write to `stdout`.
     */
    critical(message, ...items) {
        this.log("[CRITICAL]", message, items);
    }
}
exports.Logger = Logger;
//# sourceMappingURL=logger.js.map