"use strict";
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
exports.closeEditor = exports.openView = exports.getTextExt = exports.openFile = void 0;
const vscode_extension_tester_1 = require("vscode-extension-tester");
function openFile(fileToOpenAbsolutePath) {
    return __awaiter(this, void 0, void 0, function* () {
        const workbench = new vscode_extension_tester_1.Workbench();
        yield workbench.executeCommand('File: Open...');
        yield workbench.openCommandPrompt();
        const input = yield vscode_extension_tester_1.InputBox.create();
        yield input.setText(fileToOpenAbsolutePath);
        yield input.confirm();
    });
}
exports.openFile = openFile;
/**
 * Workaround for issue with ContentAssistItem getText() method
 * For more details please see https://github.com/djelinek/vscode-uitests-tooling/issues/17
 *
 * @param item ContenAssistItem
 */
function getTextExt(item) {
    return __awaiter(this, void 0, void 0, function* () {
        const name = yield item.getText();
        return name.split('\n')[0];
    });
}
exports.getTextExt = getTextExt;
/**
 * Workaround the issue of BottomBarPanel().openProblemsView() method
 * For more details see https://github.com/redhat-developer/vscode-extension-tester/issues/505
 *
 * @param view Label of BottomBar View
 */
function openView(view) {
    return __awaiter(this, void 0, void 0, function* () {
        const workbench = new vscode_extension_tester_1.Workbench();
        yield workbench.executeCommand('View: Open View');
        yield workbench.openCommandPrompt();
        const input = yield vscode_extension_tester_1.InputBox.create();
        yield input.setText('view ' + view);
        yield input.confirm();
        return new vscode_extension_tester_1.ProblemsView();
    });
}
exports.openView = openView;
/**
 * Close editor with handling of Save/Don't Save Modal dialog
 *
 * @param title Title of opened active editor
 * @param save true/false
 */
function closeEditor(title, save) {
    return __awaiter(this, void 0, void 0, function* () {
        const dirty = yield new vscode_extension_tester_1.TextEditor().isDirty();
        yield new vscode_extension_tester_1.EditorView().closeEditor(title);
        if (dirty) {
            const dialog = new vscode_extension_tester_1.ModalDialog();
            if (save) {
                yield dialog.pushButton('Save');
            }
            else {
                yield dialog.pushButton('Don\'t Save');
            }
        }
    });
}
exports.closeEditor = closeEditor;
