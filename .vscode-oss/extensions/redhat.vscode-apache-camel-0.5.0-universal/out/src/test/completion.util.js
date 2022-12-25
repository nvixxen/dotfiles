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
exports.checkExpectedCompletion = exports.checkNotExpectedCompletion = void 0;
const vscode = require("vscode");
const async_wait_until_1 = require("async-wait-until");
function checkNotExpectedCompletion(docUri, position, expectedCompletion) {
    return __awaiter(this, void 0, void 0, function* () {
        let hasUnExpectedCompletion = true;
        yield (0, async_wait_until_1.waitUntil)(() => {
            // Executing the command `vscode.executeCompletionItemProvider` to simulate triggering completion
            (vscode.commands.executeCommand('vscode.executeCompletionItemProvider', docUri, position)).then(value => {
                const actualCompletionList = value;
                const completionItemFound = actualCompletionList.items.find(completion => {
                    return completion.label === expectedCompletion.label;
                });
                hasUnExpectedCompletion = completionItemFound !== undefined;
            });
            return !hasUnExpectedCompletion;
        }, 30000, 500);
    });
}
exports.checkNotExpectedCompletion = checkNotExpectedCompletion;
function checkExpectedCompletion(docUri, position, expectedCompletion) {
    return __awaiter(this, void 0, void 0, function* () {
        let hasExpectedCompletion = false;
        yield (0, async_wait_until_1.waitUntil)(() => {
            // Executing the command `vscode.executeCompletionItemProvider` to simulate triggering completion
            (vscode.commands.executeCommand('vscode.executeCompletionItemProvider', docUri, position)).then(value => {
                const actualCompletionList = value;
                const completionItemFound = actualCompletionList.items.find(completion => {
                    return completion.label === expectedCompletion.label;
                });
                hasExpectedCompletion = completionItemFound !== undefined;
            });
            return hasExpectedCompletion;
        }, 10000, 500);
    });
}
exports.checkExpectedCompletion = checkExpectedCompletion;
