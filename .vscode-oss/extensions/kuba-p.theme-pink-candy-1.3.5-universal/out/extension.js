"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const config_1 = require("./config");
const command = require("./command");
const message_1 = require("./message");
const theme_1 = require("./theme");
const path = require("path");
// Location of the `$root/themes` folder.
const themeFolder = path.join(__dirname, "..", "themes");
// This method is called when your extension is activated.
function activate(context) {
    // Register all of the commands.
    context.subscriptions.push(command.resetCmd);
    const config = (0, config_1.getConfig)();
    if (config.isModified()) {
        // The configuration must have been modified whilst vscode was not open.
        //
        // Write the modified configuration options back to the cache and re-create the theme files.
        config.writeToCache();
        (0, theme_1.createThemes)(config, themeFolder);
        // Unlike with icon themes, proper workbench/syntax themes are not reloaded upon modification of the theme
        // files, so we must force vscode to reload to see the changes.
        (0, message_1.showReloadOnLoadConfirmation)();
    }
    vscode.workspace.onDidChangeConfiguration(onConfigChange);
}
exports.activate = activate;
/**
 * Runs whenever the vscode configuration changes.
 */
function onConfigChange(e) {
    // Ignore configuration changes that aren't related to our theme.
    if (!e.affectsConfiguration("theme-pink-candy")) {
        return;
    }
    // Read the up-to-date configuration options, write any modifications to the cache, and re-create the theme
    // files.
    const config = (0, config_1.getConfig)();
    config.writeToCache();
    (0, theme_1.createThemes)(config, themeFolder);
    // Unlike with icon themes, proper workbench/syntax themes are not reloaded upon modification of the theme
    // files, so we must force vscode to reload to see the changes.
    (0, message_1.showReloadConfirmation)();
}
// Output channel used for debugging.
//export let info = vscode.window.createOutputChannel("Pink Candy INFO");
// This method is called when your extension is deactivated.
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map