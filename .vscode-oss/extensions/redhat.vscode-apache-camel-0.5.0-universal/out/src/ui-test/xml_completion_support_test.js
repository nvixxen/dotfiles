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
const vscode_extension_tester_1 = require("vscode-extension-tester");
const vscode_uitests_tooling_1 = require("vscode-uitests-tooling");
const chai_1 = require("chai");
const path = require("path");
const utils = require("./utils/testUtils");
describe('XML DSL support', function () {
    this.timeout(60000);
    const RESOURCES = path.resolve('src', 'ui-test', 'resources');
    const CAMEL_CONTEXT_XML = 'camel-context.xml';
    const CAMEL_ROUTE_XML = 'camel-route.xml';
    const URI_POSITION = 33;
    let contentAssist;
    let driver;
    before(function () {
        return __awaiter(this, void 0, void 0, function* () {
            this.timeout(20000);
            driver = vscode_extension_tester_1.VSBrowser.instance.driver;
            vscode_extension_tester_1.VSBrowser.instance.waitForWorkbench();
        });
    });
    const _setup = function (camel_xml) {
        return function () {
            return __awaiter(this, void 0, void 0, function* () {
                this.timeout(20000);
                yield new vscode_extension_tester_1.EditorView().closeAllEditors();
                const absoluteCamelXmlPath = path.join(RESOURCES, camel_xml);
                yield vscode_extension_tester_1.VSBrowser.instance.openResources(absoluteCamelXmlPath);
            });
        };
    };
    const _clean = function (camel_xml) {
        return function () {
            return __awaiter(this, void 0, void 0, function* () {
                this.timeout(15000);
                yield utils.closeEditor(camel_xml, false);
            });
        };
    };
    describe('Camel URI code completion', function () {
        before(_setup(CAMEL_CONTEXT_XML));
        after(_clean(CAMEL_CONTEXT_XML));
        it('Open "camel-context.xml" file inside Editor View', function () {
            return __awaiter(this, void 0, void 0, function* () {
                const editor = yield new vscode_extension_tester_1.EditorView().openEditor(CAMEL_CONTEXT_XML);
                const editorName = yield editor.getTitle();
                chai_1.assert.equal(editorName, CAMEL_CONTEXT_XML);
            });
        });
        it('Code completion is working for component schemes (the part before the ":")', function () {
            return __awaiter(this, void 0, void 0, function* () {
                const editor = new vscode_extension_tester_1.TextEditor();
                yield editor.typeTextAt(3, URI_POSITION, 'timer');
                const expectedContentAssist = 'timer:timerName';
                contentAssist = yield waitUntilContentAssistContains(contentAssist, editor, expectedContentAssist);
                const timer = yield contentAssist.getItem(expectedContentAssist);
                chai_1.assert.equal(yield utils.getTextExt(timer), expectedContentAssist);
                yield timer.click();
                chai_1.assert.equal((yield editor.getTextAtLine(3)).trim(), '<from id="_fromID" uri="timer:timerName"/>');
            });
        });
        it('Code completion is working for endpoint options (the part after the "?")', function () {
            return __awaiter(this, void 0, void 0, function* () {
                const editor = new vscode_extension_tester_1.TextEditor();
                yield editor.typeTextAt(3, URI_POSITION + 15, '?');
                contentAssist = yield waitUntilContentAssistContains(contentAssist, editor, 'delay');
                const delay = yield contentAssist.getItem('delay');
                chai_1.assert.equal(yield utils.getTextExt(delay), 'delay');
                yield delay.click();
                chai_1.assert.equal((yield editor.getTextAtLine(3)).trim(), '<from id="_fromID" uri="timer:timerName?delay=1000"/>');
            });
        });
        it('Code completion is working for additional endpoint options (the part after "&")', function () {
            return __awaiter(this, void 0, void 0, function* () {
                const editor = new vscode_extension_tester_1.TextEditor();
                yield editor.typeTextAt(3, URI_POSITION + 26, '&amp;exchange');
                contentAssist = yield waitUntilContentAssistContains(contentAssist, editor, 'exchangePattern');
                const exchange = yield contentAssist.getItem('exchangePattern');
                chai_1.assert.equal(yield utils.getTextExt(exchange), 'exchangePattern');
                yield exchange.click();
                chai_1.assert.equal((yield editor.getTextAtLine(3)).trim(), '<from id="_fromID" uri="timer:timerName?delay=1000&amp;exchangePattern="/>');
                yield editor.typeTextAt(3, URI_POSITION + 47, 'In');
                contentAssist = yield waitUntilContentAssistContains(contentAssist, editor, 'InOnly');
                const inOnly = yield contentAssist.getItem('InOnly');
                chai_1.assert.equal(yield utils.getTextExt(inOnly), 'InOnly');
                yield inOnly.click();
                chai_1.assert.equal((yield editor.getTextAtLine(3)).trim(), '<from id="_fromID" uri="timer:timerName?delay=1000&amp;exchangePattern=InOnly"/>');
            });
        });
    });
    describe('Endpoint options filtering', function () {
        before(_setup(CAMEL_CONTEXT_XML));
        after(_clean(CAMEL_CONTEXT_XML));
        it('Duplicate endpoint options are filtered out', function () {
            return __awaiter(this, void 0, void 0, function* () {
                const editor = new vscode_extension_tester_1.TextEditor();
                yield editor.typeTextAt(3, URI_POSITION, 'timer');
                contentAssist = yield waitUntilContentAssistContains(contentAssist, editor, 'timer:timerName');
                const timer = yield contentAssist.getItem('timer:timerName');
                yield timer.click();
                yield editor.typeTextAt(3, URI_POSITION + 15, '?');
                contentAssist = yield waitUntilContentAssistContains(contentAssist, editor, 'delay');
                const delay = yield contentAssist.getItem('delay');
                yield delay.click();
                yield editor.typeTextAt(3, URI_POSITION + 26, '&amp;de');
                contentAssist = (yield editor.toggleContentAssist(true));
                yield new vscode_uitests_tooling_1.WaitUntil().assistHasItems(contentAssist, vscode_uitests_tooling_1.DefaultWait.TimePeriod.DEFAULT);
                const filtered = yield contentAssist.hasItem('delay');
                chai_1.assert.isFalse(filtered);
                yield editor.toggleContentAssist(false);
            });
        });
    });
    describe('Diagnostics for Camel URIs', function () {
        const EXPECTED_ERROR_MESSAGE = 'Invalid duration value: 1000r';
        beforeEach(_setup(CAMEL_CONTEXT_XML));
        afterEach(_clean(CAMEL_CONTEXT_XML));
        it('LSP diagnostics support for XML DSL', function () {
            return __awaiter(this, void 0, void 0, function* () {
                this.retries(3);
                const editor = new vscode_extension_tester_1.TextEditor();
                yield editor.typeTextAt(3, URI_POSITION, 'timer');
                contentAssist = yield waitUntilContentAssistContains(contentAssist, editor, 'timer:timerName');
                const timer = yield contentAssist.getItem('timer:timerName');
                yield timer.click();
                yield editor.typeTextAt(3, URI_POSITION + 15, '?');
                contentAssist = yield waitUntilContentAssistContains(contentAssist, editor, 'delay');
                const delay = yield contentAssist.getItem('delay');
                yield delay.click();
                yield editor.typeTextAt(3, URI_POSITION + 26, 'r');
                const problemsView = yield utils.openView('Problems');
                yield driver.wait(function () {
                    return __awaiter(this, void 0, void 0, function* () {
                        const innerMarkers = yield problemsView.getAllMarkers(vscode_extension_tester_1.MarkerType.Error);
                        return innerMarkers.length > 0;
                    });
                }, vscode_uitests_tooling_1.DefaultWait.TimePeriod.MEDIUM);
                const markers = yield problemsView.getAllMarkers(vscode_extension_tester_1.MarkerType.Error);
                chai_1.assert.isNotEmpty(markers, 'Problems view does not contains expected error');
                const errorMessage = yield markers[0].getText();
                chai_1.assert.include(errorMessage, EXPECTED_ERROR_MESSAGE);
                yield new vscode_extension_tester_1.BottomBarPanel().toggle(false); // close Problems View
            });
        });
    });
    describe('Auto-completion for referenced components IDs', function () {
        const DIRECT_COMPONENT_NAME = 'direct:testName';
        const DIRECT_VM_COMPONENT_NAME = 'direct-vm:testName2';
        before(_setup(CAMEL_ROUTE_XML));
        after(_clean(CAMEL_ROUTE_XML));
        it('Auto-completion for referenced ID of "direct" component', function () {
            return __awaiter(this, void 0, void 0, function* () {
                const editor = new vscode_extension_tester_1.TextEditor();
                yield editor.typeTextAt(6, 29, DIRECT_COMPONENT_NAME);
                contentAssist = yield waitUntilContentAssistContains(contentAssist, editor, DIRECT_COMPONENT_NAME);
                const direct = yield contentAssist.getItem(DIRECT_COMPONENT_NAME);
                yield direct.click();
                chai_1.assert.equal((yield editor.getTextAtLine(6)).trim(), '<to id="_toID" uri="direct:testName"/>');
            });
        });
        it('Auto-completion for referenced ID of "direct-vm" component', function () {
            return __awaiter(this, void 0, void 0, function* () {
                const editor = new vscode_extension_tester_1.TextEditor();
                yield editor.typeTextAt(13, 30, DIRECT_VM_COMPONENT_NAME);
                contentAssist = yield waitUntilContentAssistContains(contentAssist, editor, DIRECT_VM_COMPONENT_NAME);
                const directVM = yield contentAssist.getItem(DIRECT_VM_COMPONENT_NAME);
                yield directVM.click();
                chai_1.assert.equal((yield editor.getTextAtLine(13)).trim(), '<to id="_toID2" uri="direct-vm:testName2"/>');
            });
        });
    });
    function waitUntilContentAssistContains(contentAssist, editor, expectedContentAssist) {
        return __awaiter(this, void 0, void 0, function* () {
            yield driver.wait(function () {
                return __awaiter(this, void 0, void 0, function* () {
                    contentAssist = (yield editor.toggleContentAssist(true));
                    const hasItem = yield contentAssist.hasItem(expectedContentAssist);
                    if (!hasItem) {
                        yield editor.toggleContentAssist(false);
                    }
                    return hasItem;
                });
            }, vscode_uitests_tooling_1.DefaultWait.TimePeriod.DEFAULT);
            return contentAssist;
        });
    }
});
