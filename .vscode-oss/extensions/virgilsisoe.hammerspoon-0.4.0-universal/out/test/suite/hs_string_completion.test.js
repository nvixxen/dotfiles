"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const assert = require("assert");
const testUtils = require("./test_utils");
const hs_string_completion_1 = require("../../providers/hs_string_completion");
const demoFile = "hs_spoon_demo.lua";
suite("Hs String Completion", () => {
    test("Spoon completions", async () => {
        await testUtils.createDemoContent(demoFile, "hs.loadSpoon('')");
        const editor = await testUtils.focusDemoFile(demoFile);
        const completion = new hs_string_completion_1.HSStringCompletionProvider();
        const provider = await completion.provideCompletionItems(editor.document, new vscode.Position(0, 13));
        assert.ok(provider);
    });
});
//# sourceMappingURL=hs_string_completion.test.js.map