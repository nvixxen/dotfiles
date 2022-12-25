"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDoc = exports.openModule = exports.formatContent = exports.cleanSettings = exports.createDemoContent = exports.focusDemoFile = exports.updateConfig = exports.sleep = exports.hsDocsPath = exports.demoPath = exports.packageFile = exports.root = void 0;
const vscode = require("vscode");
const path = require("path");
const fs_1 = require("fs");
exports.root = path.resolve(__dirname, "../../../");
exports.packageFile = (0, fs_1.readFileSync)(path.join(exports.root, "package.json"), "utf-8");
exports.demoPath = path.join(exports.root, "demo");
exports.hsDocsPath = path.join(path.resolve(__dirname, "../../.."), "resources", "hs_docs");
/**
 * Some tests will need to wait for vscode to register the actions. An example will
 * be creating/killing terminals and configuration update.
 *
 * @param milliseconds - time to sleep
 * @returns
 */
const sleep = (milliseconds) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
};
exports.sleep = sleep;
/**
 * Configuration changes require async/await operation to let vscode register
 * the action.
 *
 * @param name - name of the configuration property to update.
 * @param value - the new value for the property.
 */
async function updateConfig(name, value) {
    const config = vscode.workspace.getConfiguration("hammerspoon");
    await config.update(name, value, vscode.ConfigurationTarget.Workspace);
}
exports.updateConfig = updateConfig;
/**
 * Open and focus a demo file.
 *
 * @param filename the name of a file to open.
 * @param line optional line number for the cursor to start at. Defaults to `0` which would be line `1`.
 * @param startChar optional position for the cursor to start at. Defaults to `0`
 * @param endChar optional position for the cursor to end at. If bigger than startChar,
 * will create a selection. Defaults to `0`
 */
async function focusDemoFile(filename, line = 0, startChar = 0, endChar = 0) {
    const filepath = path.join(exports.demoPath, filename);
    const document = await vscode.workspace.openTextDocument(filepath);
    const startSelection = new vscode.Position(line, startChar);
    let endSelection = null;
    if (endChar) {
        endSelection = new vscode.Position(line, endChar);
    }
    const editor = await vscode.window.showTextDocument(document, {
        selection: new vscode.Selection(startSelection, endSelection || startSelection),
    });
    return editor;
}
exports.focusDemoFile = focusDemoFile;
/**
 * Create a demo file and write the content to it.
 *
 * If file doesn't exist, will get created, otherwise just updated with the new content.
 * Function will sleep 100ms before returning.
 *
 * @param filename name of the file demo to write the content to.
 * @param content  the content to write.
 */
async function createDemoContent(filename, content) {
    const filepath = path.join(exports.demoPath, filename);
    const file = (0, fs_1.createWriteStream)(filepath);
    file.write(content);
    file.close();
    await (0, exports.sleep)(200);
}
exports.createDemoContent = createDemoContent;
/**
 * Clean the settings.json file inside the demo folder.
 */
function cleanSettings() {
    const file = path.join(".vscode", "settings.json");
    void createDemoContent(file, "{}");
}
exports.cleanSettings = cleanSettings;
/**
 * Format file content.
 *
 * This is a utility function that allows to write multi line string with indentation.
 *
 * @param content file content to format
 * @returns un indented file content
 */
function formatContent(content) {
    return content.trim().replace(/ {2,}/gm, "");
}
exports.formatContent = formatContent;
/**
 * Open a hammerspoon module file.
 *
 * @param module name of the hammerspoon module to open
 * @returns the JSON representation of the hammerspoon module
 */
function openModule(module) {
    const file = path.join(exports.hsDocsPath, module + ".json");
    return JSON.parse((0, fs_1.readFileSync)(file, "utf-8"));
}
exports.openModule = openModule;
/**
 * Get the documentation for a hammerspoon module.
 *
 * @param module name of the hammerspoon module to open
 * @param identifier name of the method to search in the module.
 * @returns
 */
function getDoc(module, identifier) {
    return openModule(module)[identifier]["doc"];
}
exports.getDoc = getDoc;
//# sourceMappingURL=test_utils.js.map