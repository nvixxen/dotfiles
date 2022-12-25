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
const completion_util_1 = require("./completion.util");
const expect = chai.expect;
const RUNTIME_PROVIDER_SETTINGS_KEY = 'camel.Camel catalog runtime provider';
describe('Should do completion in Camel URI using the Camel Catalog version specified in preference', () => {
    const docUriXml = (0, helper_1.getDocUri)('test-catalog-version.xml');
    const expectedCompletion = { label: 'jgroups-raft:clusterName' };
    afterEach(() => {
        const config = vscode.workspace.getConfiguration();
        config.update(RUNTIME_PROVIDER_SETTINGS_KEY, undefined);
    });
    it('Updated Catalog runtime provider is reflected in completion', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, helper_1.activate)(docUriXml);
        const config = vscode.workspace.getConfiguration();
        expect(config.get(RUNTIME_PROVIDER_SETTINGS_KEY)).to.not.be.equal('KARAF');
        yield (0, completion_util_1.checkExpectedCompletion)(docUriXml, new vscode.Position(0, 21), expectedCompletion);
        yield config.update(RUNTIME_PROVIDER_SETTINGS_KEY, 'KARAF');
        yield (0, completion_util_1.checkNotExpectedCompletion)(docUriXml, new vscode.Position(0, 21), expectedCompletion);
        yield config.update(RUNTIME_PROVIDER_SETTINGS_KEY, undefined);
        yield (0, completion_util_1.checkExpectedCompletion)(docUriXml, new vscode.Position(0, 21), expectedCompletion);
    }));
});
