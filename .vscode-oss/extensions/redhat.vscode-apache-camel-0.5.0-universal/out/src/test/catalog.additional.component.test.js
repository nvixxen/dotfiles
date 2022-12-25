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
const completion_util_1 = require("./completion.util");
const helper_1 = require("./helper");
describe('Should do completion in Camel URI using the additional component specified in preference', () => {
    const docUriXml = (0, helper_1.getDocUri)('test-additional-component.xml');
    afterEach(() => {
        const config = vscode.workspace.getConfiguration();
        config.update('camel.extra-components', undefined);
    });
    it('Updated additional component is reflected in completion', () => __awaiter(void 0, void 0, void 0, function* () {
        const positionToCallCompletion = new vscode.Position(0, 11);
        const completionItemLabel = { label: 'acomponent:withsyntax' };
        yield (0, completion_util_1.checkNotExpectedCompletion)(docUriXml, positionToCallCompletion, completionItemLabel);
        const config = vscode.workspace.getConfiguration();
        yield config.update('camel.extra-components', [{
                'component': {
                    'kind': 'component',
                    'scheme': 'acomponent',
                    'syntax': 'acomponent:withsyntax'
                }
            }]);
        yield (0, completion_util_1.checkExpectedCompletion)(docUriXml, positionToCallCompletion, completionItemLabel);
        yield config.update('camel.extra-components', undefined);
        yield (0, completion_util_1.checkNotExpectedCompletion)(docUriXml, positionToCallCompletion, completionItemLabel);
    }));
});
