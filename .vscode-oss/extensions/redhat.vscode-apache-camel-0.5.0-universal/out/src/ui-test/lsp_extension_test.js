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
const path = require("path");
const pjson = require("../../package.json");
const utils = require("./utils/testUtils");
const chai_1 = require("chai");
const vscode_extension_tester_1 = require("vscode-extension-tester");
const vscode_uitests_tooling_1 = require("vscode-uitests-tooling");
describe('Language Support for Apache Camel extension', function () {
    this.timeout(60000);
    const RESOURCES = path.resolve('src', 'ui-test', 'resources');
    const CAMEL_CONTEXT_XML = 'camel-context.xml';
    const LSP_STATUS_BAR_MESSAGE = 'Camel LS';
    describe('Extensions view', function () {
        let marketplace;
        let item;
        before(function () {
            return __awaiter(this, void 0, void 0, function* () {
                this.retries(5);
                marketplace = yield vscode_uitests_tooling_1.Marketplace.open(this.timeout());
            });
        });
        after(function () {
            return __awaiter(this, void 0, void 0, function* () {
                yield marketplace.close();
                yield new vscode_extension_tester_1.EditorView().closeAllEditors();
            });
        });
        it('Find extension', function () {
            return __awaiter(this, void 0, void 0, function* () {
                item = yield marketplace.findExtension(`@installed ${pjson.displayName}`);
            });
        });
        it('Extension is installed', function () {
            return __awaiter(this, void 0, void 0, function* () {
                const installed = yield item.isInstalled();
                chai_1.assert.isTrue(installed);
            });
        });
        it('Verify display name', function () {
            return __awaiter(this, void 0, void 0, function* () {
                const title = yield item.getTitle();
                chai_1.assert.equal(title, `${pjson.displayName}`);
            });
        });
        // skipping because the description picked is the one of the pushed extension on Marketplace and not the one of the installed locally
        it.skip('Verify description', function () {
            return __awaiter(this, void 0, void 0, function* () {
                const desc = yield item.getDescription();
                chai_1.assert.equal(desc, `${pjson.description}`);
            });
        });
        it('Verify version', function () {
            return __awaiter(this, void 0, void 0, function* () {
                const version = yield item.getVersion();
                chai_1.assert.equal(version, `${pjson.version}`);
            });
        });
    });
    describe('Status bar', function () {
        let driver;
        before(function () {
            return __awaiter(this, void 0, void 0, function* () {
                driver = vscode_extension_tester_1.VSBrowser.instance.driver;
                yield utils.openFile(path.join(RESOURCES, CAMEL_CONTEXT_XML));
            });
        });
        after(function () {
            return __awaiter(this, void 0, void 0, function* () {
                driver = vscode_extension_tester_1.VSBrowser.instance.driver;
                yield driver.wait(function () {
                    return __awaiter(this, void 0, void 0, function* () {
                        const editor = new vscode_extension_tester_1.TextEditor();
                        if ((yield editor.isDirty()) === false) {
                            return true;
                        }
                        const workbench = new vscode_extension_tester_1.Workbench();
                        yield workbench.executeCommand('File: Revert File');
                        return false;
                    });
                });
                yield new vscode_extension_tester_1.EditorView().closeAllEditors();
            });
        });
        it('Language Support for Apache Camel started', function () {
            return __awaiter(this, void 0, void 0, function* () {
                const lsp = yield driver.wait(vscode_extension_tester_1.until.elementLocated(vscode_extension_tester_1.By.id('redhat.vscode-apache-camel')), 35000);
                yield driver.wait(() => __awaiter(this, void 0, void 0, function* () {
                    const text = yield lsp.getText().catch(() => '');
                    try {
                        const codicon = yield lsp.findElement(vscode_extension_tester_1.By.className('codicon'));
                        const klass = yield codicon.getAttribute('class');
                        return text.startsWith('Camel LS') && klass.includes('codicon-thumbsup');
                    }
                    catch (_a) {
                        return false;
                    }
                }), this.timeout() - 3000, `Could not find Apache Camel element with label "${LSP_STATUS_BAR_MESSAGE}". Current label: "${yield new vscode_uitests_tooling_1.StatusBarExt().getLSPSupport().catch(() => 'unknown')}"`);
            });
        });
    });
});
