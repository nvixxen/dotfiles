"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectHammerspoon = exports.createStatusBar = exports.debugNetwork = void 0;
const net = require("net");
const vscode = require("vscode");
const utils_1 = require("./utils");
// TODO: Test module
const server = new net.Server();
const statusBarItem = vscode.window.createStatusBarItem();
const hsDisconnect = "$(debug-disconnect) Hammerspoon: Disconnected";
const hsConnect = "$(vm-connect) Hammerspoon: Listening...";
const outputWindowNetwork = vscode.window.createOutputChannel("Hammerspoon Network");
/**
 * Append text to vscode console
 *
 * @param text text to append in console
 */
function debugNetwork(text) {
    const date = new Date().toISOString();
    outputWindowNetwork.appendLine(`[${date}] ${text}`);
}
exports.debugNetwork = debugNetwork;
/**
 * Create the status bar action.
 */
function createStatusBar() {
    // statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 1);
    statusBarItem.text = hsDisconnect;
    statusBarItem.command = "hammerspoon.connect";
    statusBarItem.show();
}
exports.createStatusBar = createStatusBar;
function executeVscodeCommand(command) {
    let args = command.match(/(?:{)(.+)(?:})/) || [];
    if (args.length !== 0) {
        // clean command from args
        command = command.replace(args[0], "");
        // extract the args and clean them from spaces
        args = args[1].split(",").map((arg) => arg.trim());
        debugNetwork(`Command args: [${args}]`);
    }
    vscode.commands.executeCommand(command.trim(), ...args).then((resolve) => {
        debugNetwork("Command executed successfully");
    }, (reject) => {
        debugNetwork(`[ERROR] Command rejected: ${reject.message}`);
        vscode.window.showWarningMessage(reject.message);
    });
}
function startServer() {
    // TODO: save port value in settings
    const port = (0, utils_1.hammerspoonConfig)("network.port");
    statusBarItem.tooltip = `Toggle connection for Hammerspoon on localhost:${port}`;
    // TODO: add custom host
    server.listen(port);
    debugNetwork(`Connecting to 'localhost:${port}'`);
    server.on("connection", function (socket) {
        socket.on("data", function (chunk) {
            const data = chunk.toString();
            debugNetwork(`Data received: '${data}'`);
            executeVscodeCommand(data);
        });
        socket.on("end", async function () {
            debugNetwork("Closing client connection.");
        });
        socket.on("error", function (err) {
            debugNetwork(`[ERROR] Server error: ${err.message}`);
            vscode.window.showWarningMessage(err.message);
        });
    });
}
async function connectHammerspoon() {
    if (server.listening) {
        statusBarItem.tooltip = "";
        statusBarItem.text = hsDisconnect;
        server.close();
        debugNetwork("Closing server.");
    }
    else {
        statusBarItem.text = hsConnect;
        startServer();
    }
}
exports.connectHammerspoon = connectHammerspoon;
//# sourceMappingURL=socket.js.map