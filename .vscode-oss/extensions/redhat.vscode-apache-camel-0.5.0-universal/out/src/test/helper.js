'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setTestContent = exports.getDocUri = exports.getDocPath = exports.activate = exports.platformEol = exports.documentEol = exports.editor = exports.doc = void 0;
const vscode = require("vscode");
const path = require("path");
/**
 * Activates the vscode-apache-camel extension
 */
function activate(docUri) {
    return __awaiter(this, void 0, void 0, function* () {
        // The extensionId is `publisher.name` from package.json
        const ext = vscode.extensions.getExtension('redhat.vscode-apache-camel');
        yield ext.activate();
        try {
            exports.doc = yield vscode.workspace.openTextDocument(docUri);
            exports.editor = yield vscode.window.showTextDocument(exports.doc);
            yield sleep(2000); // Wait for server activation
        }
        catch (e) {
            console.error(e);
        }
    });
}
exports.activate = activate;
function sleep(ms) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise(resolve => setTimeout(resolve, ms));
    });
}
const getDocPath = (p) => {
    return path.resolve(__dirname, '../../../test Fixture with speci@l chars', p);
};
exports.getDocPath = getDocPath;
const getDocUri = (p) => {
    return vscode.Uri.file((0, exports.getDocPath)(p));
};
exports.getDocUri = getDocUri;
function setTestContent(content) {
    return __awaiter(this, void 0, void 0, function* () {
        const all = new vscode.Range(exports.doc.positionAt(0), exports.doc.positionAt(exports.doc.getText().length));
        return exports.editor.edit(eb => eb.replace(all, content));
    });
}
exports.setTestContent = setTestContent;
