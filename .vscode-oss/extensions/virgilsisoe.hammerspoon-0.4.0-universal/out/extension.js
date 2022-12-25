"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
const lua = require("./lua_parser");
const fs = require("fs");
const hs_module_completion_1 = require("./providers/hs_module_completion");
const hs_string_completion_1 = require("./providers/hs_string_completion");
const hs_hover_1 = require("./providers/hs_hover");
const hs_helper_1 = require("./providers/hs_helper");
const utils = require("./utils");
const logger_1 = require("./logger");
const generate_hs_docs_1 = require("./generate_hs_docs");
const spoons_1 = require("./spoons");
const hammerspoon_1 = require("./hammerspoon");
const socket_1 = require("./socket");
function activate(context) {
    !fs.existsSync(logger_1.logPath) && fs.mkdirSync(logger_1.logPath);
    (0, socket_1.createStatusBar)();
    context.subscriptions.push(vscode.languages.registerCompletionItemProvider("lua", new hs_module_completion_1.HSModulesCompletionProvider(), ".", ":"));
    context.subscriptions.push(vscode.languages.registerCompletionItemProvider("lua", new hs_module_completion_1.HSModulesCompletionProvider(), ".", ":"));
    context.subscriptions.push(vscode.languages.registerCompletionItemProvider("lua", new hs_string_completion_1.HSStringCompletionProvider(), '"', "'"));
    context.subscriptions.push(vscode.languages.registerHoverProvider("lua", new hs_hover_1.HsHoverProvider()));
    context.subscriptions.push(vscode.languages.registerSignatureHelpProvider("lua", new hs_helper_1.HsSignatureHelpProvider(), "(", ","));
    context.subscriptions.push(vscode.workspace.onDidChangeTextDocument(() => {
        lua.updateAst();
    }));
    context.subscriptions.push(vscode.workspace.onDidOpenTextDocument(() => {
        lua.updateAst();
    }));
    context.subscriptions.push(vscode.commands.registerCommand("hammerspoon.connect", () => {
        (0, socket_1.connectHammerspoon)();
    }));
    context.subscriptions.push(vscode.commands.registerCommand("hammerspoon.createSpoon", () => {
        void (0, spoons_1.createSpoon)();
    }));
    context.subscriptions.push(vscode.commands.registerCommand("hammerspoon.generateSpoonDoc", () => {
        (0, spoons_1.generateSpoonDoc)();
    }));
    context.subscriptions.push(vscode.commands.registerCommand("hammerspoon.updateDatabase", () => {
        (0, generate_hs_docs_1.createNewDocs)();
    }));
    context.subscriptions.push(vscode.commands.registerCommand("hammerspoon.reloadConfiguration", () => {
        (0, hammerspoon_1.outputConsole)();
    }));
    context.subscriptions.push(vscode.commands.registerCommand("hammerspoon.showConsole", () => {
        utils.execSync("hs -c 'hs.openConsole()'");
    }));
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map