"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execSync = exports.execAsync = exports.hammerspoonConfig = exports.outputWindow = exports.languagePath = void 0;
const vscode = require("vscode");
const path = require("path");
const cp = require("child_process");
exports.languagePath = path.resolve(__dirname, "../resources");
exports.outputWindow = vscode.window.createOutputChannel("Hammerspoon");
/**
 * Get configuration property value.
 *
 * If property name is not found, throws an error.
 *
 * @param property - name of the configuration property to get.
 * @returns - the value of the property.
 */
function hammerspoonConfig(property) {
    const config = vscode.workspace.getConfiguration("hammerspoon");
    const subConfig = config.get(property);
    if (typeof subConfig === "undefined") {
        throw new Error(`Configuration: ${property} doesn't exist`);
    }
    return subConfig;
}
exports.hammerspoonConfig = hammerspoonConfig;
/**
 * Append text to vscode console
 *
 * @param text text to append in console
 */
function writeToConsole(text) {
    exports.outputWindow.clear();
    exports.outputWindow.show();
    exports.outputWindow.appendLine(text);
}
/**
 * Execute async shell command.
 *
 * @param cmd the command the execute.
 * @param timeout optional timeout in ms for the promise to resolve: defaults to 200ms.
 * @returns A promise<boolean> after 200ms of timeout if resolves.
 */
async function execAsync(cmd, timeout = 200) {
    let result = "";
    cp.exec(cmd, (err, stdout, stderr) => {
        if (stdout) {
            result = stdout;
            writeToConsole(stdout);
        }
        if (stderr) {
            vscode.window.showErrorMessage(stderr);
            return null;
        }
        if (err) {
            vscode.window.showErrorMessage(err.message);
            return null;
        }
    });
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(result);
        }, timeout);
    });
}
exports.execAsync = execAsync;
/**
 * Execute sync shell command.
 *
 * If command fails, will show a popup error message.
 *
 * @param cmd the command the execute.
 * @returns A string with stdout if any, or null if error.
 */
function execSync(cmd) {
    let result = "";
    try {
        result = cp.execSync(cmd, { encoding: "utf-8" });
    }
    catch (error) {
        let msg = "";
        if (error instanceof Error) {
            msg = error.message;
        }
        else {
            msg = `Some unknown error has occurred when running: ${cmd}`;
        }
        vscode.window.showErrorMessage(msg);
        return null;
    }
    return result;
}
exports.execSync = execSync;
//# sourceMappingURL=utils.js.map