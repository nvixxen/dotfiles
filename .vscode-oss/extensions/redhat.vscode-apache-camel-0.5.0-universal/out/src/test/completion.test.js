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
describe('Should do completion in Camel URi after "ti"', () => {
    const docUriXml = (0, helper_1.getDocUri)('apacheCamel.xml');
    const docUriJava = (0, helper_1.getDocUri)('apacheCamel.java');
    const docUriGroovy = (0, helper_1.getDocUri)('helloworld.camelk.groovy');
    const docUriCamelKafkaConnectProperties = (0, helper_1.getDocUri)('camelKafkaConnect.properties');
    const docUriKotlin = (0, helper_1.getDocUri)('helloworld.camelk.kts');
    const docUriJS = (0, helper_1.getDocUri)('helloworld.js');
    const docUriYaml = (0, helper_1.getDocUri)('helloworld.camelk.yaml');
    const expectedCompletion = [
        { label: 'tika:operation' },
        { label: 'timer:timerName' }
    ];
    it('Completes components for XML', () => __awaiter(void 0, void 0, void 0, function* () {
        yield testCompletion(docUriXml, new vscode.Position(0, 13), {
            items: expectedCompletion
        });
    }));
    it('Completes components for Java', () => __awaiter(void 0, void 0, void 0, function* () {
        yield testCompletion(docUriJava, new vscode.Position(6, 16), {
            items: expectedCompletion
        });
    }));
    it('Completes components for Groovy', () => __awaiter(void 0, void 0, void 0, function* () {
        yield testCompletion(docUriGroovy, new vscode.Position(0, 8), {
            items: expectedCompletion
        });
    }));
    it('Completes components for Camel Kafka Connect properties', () => __awaiter(void 0, void 0, void 0, function* () {
        yield testCompletion(docUriCamelKafkaConnectProperties, new vscode.Position(7, 19), {
            items: expectedCompletion
        });
    }));
    it('Completes components for Kotlin', () => __awaiter(void 0, void 0, void 0, function* () {
        yield testCompletion(docUriKotlin, new vscode.Position(0, 8), {
            items: expectedCompletion
        });
    }));
    it('Completes components for JS', () => __awaiter(void 0, void 0, void 0, function* () {
        yield testCompletion(docUriJS, new vscode.Position(2, 8), {
            items: expectedCompletion
        });
    }));
    it('Completes components for Yaml', () => __awaiter(void 0, void 0, void 0, function* () {
        yield testCompletion(docUriYaml, new vscode.Position(4, 16), {
            items: expectedCompletion
        });
    }));
    it('Completes components for Yaml using shortcut', () => __awaiter(void 0, void 0, void 0, function* () {
        yield testCompletion(docUriYaml, new vscode.Position(12, 21), {
            items: expectedCompletion
        });
    }));
});
function testCompletion(docUri, position, expectedCompletionList) {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, helper_1.activate)(docUri);
        // Executing the command `vscode.executeCompletionItemProvider` to simulate triggering completion
        const actualCompletionList = (yield vscode.commands.executeCommand('vscode.executeCompletionItemProvider', docUri, position));
        const expectedCompletionLabelList = expectedCompletionList.items.map(c => { return c.label; });
        const actualCompletionLabelList = actualCompletionList.items.map(c => { return c.label; });
        expect(actualCompletionLabelList).to.include.members(expectedCompletionLabelList);
        expect(actualCompletionLabelList).to.not.include('test:name');
    });
}
