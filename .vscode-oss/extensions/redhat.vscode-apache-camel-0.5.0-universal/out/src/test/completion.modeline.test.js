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
const vscode = require("vscode");
const chai = require("chai");
const helper_1 = require("./helper");
const expect = chai.expect;
describe('Should do completion in modeline', () => {
    const docUriXml = (0, helper_1.getDocUri)('ModelineCompletion.java');
    const expectedCompletion = [
        { label: 'trait' },
        { label: 'dependency' }
    ];
    it('Completes modeline options', () => __awaiter(void 0, void 0, void 0, function* () {
        yield testCompletion(docUriXml, new vscode.Position(0, 13), {
            items: expectedCompletion
        });
    }));
});
function testCompletion(docUri, position, expectedCompletionList) {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, helper_1.activate)(docUri);
        // Executing the command `vscode.executeCompletionItemProvider` to simulate triggering completion
        const actualCompletionList = yield vscode.commands.executeCommand('vscode.executeCompletionItemProvider', docUri, position);
        const expectedCompletionLabelList = expectedCompletionList.items.map(c => { return c.label; });
        const actualCompletionLabelList = actualCompletionList.items.map(c => { return c.label; });
        expect(actualCompletionLabelList).to.include.members(expectedCompletionLabelList);
    });
}
