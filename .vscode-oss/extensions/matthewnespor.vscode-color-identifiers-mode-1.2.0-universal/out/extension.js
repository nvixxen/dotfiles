"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = __importStar(require("vscode"));
const just_debounce_1 = __importDefault(require("just-debounce"));
const colorize_1 = require("./colorize");
const configuration_1 = require("./configuration");
const configuration_2 = require("./configuration");
const colorizeIfNeeded = just_debounce_1.default(colorize_1.colorize, 200);
function handleActiveEditorChange(editor) {
    if (editor == null) {
        return;
    }
    colorizeIfNeeded(editor);
}
function handleColorThemeChange() {
    configuration_2.generatePalette();
    const editor = vscode.window.activeTextEditor;
    if (editor != null) {
        colorizeIfNeeded(editor);
    }
}
function handleTextDocumentChange(event) {
    const editor = vscode.window.activeTextEditor;
    if (editor != null && editor.document === event.document) {
        colorizeIfNeeded(editor);
    }
}
function activate(context) {
    configuration_1.updateConfiguration();
    context.subscriptions.push(vscode.workspace.onDidChangeConfiguration(configuration_1.updateConfiguration));
    context.subscriptions.push(vscode.window.onDidChangeActiveTextEditor(handleActiveEditorChange));
    context.subscriptions.push(vscode.workspace.onDidChangeTextDocument(handleTextDocumentChange));
    context.subscriptions.push(vscode.window.onDidChangeActiveColorTheme(handleColorThemeChange));
    const editor = vscode.window.activeTextEditor;
    if (editor != null) {
        colorizeIfNeeded(editor);
    }
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map