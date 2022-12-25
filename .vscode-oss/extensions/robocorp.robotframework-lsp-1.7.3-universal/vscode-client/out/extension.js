/*
Original work Copyright (c) Microsoft Corporation (MIT)
See ThirdPartyNotices.txt in the project root for license information.
All modifications Copyright (c) Robocorp Technologies Inc.
All rights reserved.

Licensed under the Apache License, Version 2.0 (the "License")
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http: // www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = exports.lastLanguageServerExecutable = exports.languageServerClient = void 0;
const net = require("net");
const path = require("path");
const fs = require("fs");
const vscode = require("vscode");
const cp = require("child_process");
const vscode_1 = require("vscode");
const vscode_languageclient_1 = require("vscode-languageclient");
const node_1 = require("vscode-languageclient/node");
const progress_1 = require("./progress");
const time_1 = require("./time");
const run_1 = require("./run");
const linkProvider_1 = require("./linkProvider");
const expandVars_1 = require("./expandVars");
const rfInteractive_1 = require("./interactive/rfInteractive");
const channel_1 = require("./channel");
const mutex_1 = require("./mutex");
const files_1 = require("./files");
const testview_1 = require("./testview");
const pythonExtIntegration_1 = require("./pythonExtIntegration");
const debugger_1 = require("./debugger");
const common_1 = require("./common");
const docs_1 = require("./docs");
const outView_1 = require("./output/outView");
const outViewRunIntegration_1 = require("./output/outViewRunIntegration");
function createClientOptions(initializationOptions) {
    const clientOptions = {
        documentSelector: ["robotframework"],
        synchronize: {
            configurationSection: ["robot", "robocorp.home"],
        },
        outputChannel: channel_1.OUTPUT_CHANNEL,
        initializationOptions: initializationOptions,
        markdown: {
            supportHtml: true,
        },
    };
    return clientOptions;
}
function findExecutableInPath(executable) {
    const IS_WINDOWS = process.platform == "win32";
    const sep = IS_WINDOWS ? ";" : ":";
    const PATH = process.env["PATH"];
    const split = PATH.split(sep);
    for (let i = 0; i < split.length; i++) {
        const s = path.join(split[i], executable);
        if (fs.existsSync(s)) {
            return s;
        }
    }
    return undefined;
}
async function getDefaultLanguageServerPythonExecutable() {
    channel_1.OUTPUT_CHANNEL.appendLine("Getting language server Python executable.");
    const languageServerPython = (0, expandVars_1.getStrFromConfigExpandingVars)(vscode_1.workspace.getConfiguration("robot"), "language-server.python");
    if (languageServerPython) {
        if (languageServerPython.indexOf("/") !== -1 || languageServerPython.indexOf("\\") !== -1) {
            // This means it was specified as a full path and it's not just a basename.
            if (!fs.existsSync(languageServerPython)) {
                return {
                    executable: undefined,
                    "message": "Unable to start robotframework-lsp because: " +
                        languageServerPython +
                        " (specified as robot.language-server.python) does not exist. Do you want to select a new python executable to start robotframework-lsp?",
                };
            }
            return {
                executable: [languageServerPython],
                "message": undefined,
            };
        }
        else {
            // Just basename was specified: we need to find it in the PATH
            channel_1.OUTPUT_CHANNEL.appendLine("Language server Python executable: searching " + languageServerPython + " in the PATH.");
            const found = findExecutableInPath(languageServerPython);
            if (!found) {
                channel_1.OUTPUT_CHANNEL.appendLine("Language server Python executable: could not find: " + languageServerPython + " in the PATH.");
                return {
                    executable: undefined,
                    "message": "Unable to start robotframework-lsp because: " +
                        languageServerPython +
                        " could not be found in the PATH. Do you want to select a python executable to start robotframework-lsp?",
                };
            }
            channel_1.OUTPUT_CHANNEL.appendLine("Language server Python executable: found: " + found);
            return {
                executable: [found],
                "message": undefined,
            };
        }
    }
    // If we got here, it means that the language server python executable wasn't specified,
    // so, we'll use some additional heuristics...
    // Try to use the Robocorp Code extension to provide one for us (if it's installed and
    // available).
    try {
        const languageServerPython = await vscode_1.commands.executeCommand("robocorp.getLanguageServerPython");
        if (languageServerPython) {
            channel_1.OUTPUT_CHANNEL.appendLine("Language server Python executable gotten from robocorp.getLanguageServerPython.");
            return {
                executable: [languageServerPython],
                "message": undefined,
            };
        }
    }
    catch (error) {
        // The command may not be available (in this case, go forward and try to find it in the filesystem).
    }
    // If the user hasn't defined an executable, try to see if we can get it
    // from the python installation.
    let executableAsArray = await (0, pythonExtIntegration_1.getPythonExtensionExecutable)();
    if (executableAsArray && executableAsArray.length > 0) {
        channel_1.OUTPUT_CHANNEL.appendLine("Using ms-python.python returned python executable: " + executableAsArray);
        return {
            executable: executableAsArray,
            "message": undefined,
        };
    }
    // Search python from the path.
    channel_1.OUTPUT_CHANNEL.appendLine("Language server Python executable: searching in PATH.");
    if (process.platform == "win32") {
        const executable = findExecutableInPath("python.exe");
        if (!executable) {
            return {
                executable: undefined,
                "message": "Unable to start robotframework-lsp because: python.exe could not be found in the PATH. Do you want to select a python executable to start robotframework-lsp?",
            };
        }
        channel_1.OUTPUT_CHANNEL.appendLine("Language server Python executable: found in PATH: " + executable);
        return {
            executable: [executable],
            "message": undefined,
        };
    }
    else {
        // Not Windows
        let executable = findExecutableInPath("python3");
        if (!executable) {
            executable = findExecutableInPath("python");
        }
        if (!executable) {
            return {
                executable: undefined,
                "message": "Unable to start robotframework-lsp because: neither python3 nor python could be found in the PATH. Do you want to select a python executable to start robotframework-lsp?",
            };
        }
        channel_1.OUTPUT_CHANNEL.appendLine("Language server Python executable: found in PATH: " + executable);
        return {
            executable: [executable],
            "message": undefined,
        };
    }
}
/**
 * This function is responsible for collecting the needed settings and then
 * starting the language server process (or connecting to the specified
 * tcp port).
 */
const serverOptions = async function () {
    let executableAndMessage = await getDefaultLanguageServerPythonExecutable();
    if (executableAndMessage.message) {
        channel_1.OUTPUT_CHANNEL.appendLine(executableAndMessage.message);
        let saveInUser = "Yes (save in user settings)";
        let saveInWorkspace = "Yes (save in workspace settings)";
        let selection = await vscode_1.window.showWarningMessage(executableAndMessage.message, ...[saveInUser, saveInWorkspace, "No"]);
        // robot.language-server.python
        if (selection == saveInUser || selection == saveInWorkspace) {
            let onfulfilled = await vscode_1.window.showOpenDialog({
                "canSelectMany": false,
                "openLabel": "Select python exe",
            });
            if (!onfulfilled || onfulfilled.length == 0) {
                // There's not much we can do (besides start listening to changes to the related variables
                // on the finally block so that we start listening and ask for a reload if a related configuration changes).
                let msg = "Unable to start (python selection cancelled).";
                channel_1.OUTPUT_CHANNEL.appendLine(msg);
                throw new Error(msg);
            }
            globalIgnoreConfigurationChangesToRestart = true;
            try {
                let configurationTarget;
                if (selection == saveInUser) {
                    configurationTarget = vscode_1.ConfigurationTarget.Global;
                }
                else {
                    configurationTarget = vscode_1.ConfigurationTarget.Workspace;
                }
                let config = vscode_1.workspace.getConfiguration("robot");
                try {
                    await config.update("language-server.python", onfulfilled[0].fsPath, configurationTarget);
                }
                catch (err) {
                    let errorMessage = "Error persisting python to start the language server.\nError: " + err.message;
                    (0, channel_1.logError)("Error persisting python to start the language server.", err, "EXT_SAVE_LS_PYTHON");
                    if (configurationTarget == vscode_1.ConfigurationTarget.Workspace) {
                        try {
                            await config.update("language-server.python", onfulfilled[0].fsPath, vscode_1.ConfigurationTarget.Global);
                            await vscode_1.window.showInformationMessage("It was not possible to save the configuration in the workspace. It was saved in the user settings instead.");
                            err = undefined;
                        }
                        catch (err2) {
                            // ignore this one (show original error).
                        }
                    }
                    if (err !== undefined) {
                        await vscode_1.window.showErrorMessage(errorMessage);
                    }
                }
                executableAndMessage = { "executable": [onfulfilled[0].fsPath], message: undefined };
            }
            finally {
                globalIgnoreConfigurationChangesToRestart = false;
            }
        }
        else {
            // There's not much we can do (besides start listening to changes to the related variables
            // on the finally block so that we start listening and ask for a reload if a related configuration changes).
            // At this point, already start listening for changes to reload.
            let msg = "Unable to start (no python executable specified).";
            channel_1.OUTPUT_CHANNEL.appendLine(msg);
            (0, channel_1.errorFeedback)("EXT_NO_PYEXE");
            throw new Error(msg);
        }
    }
    // Note: we need it even in the case we're connecting to a socket (to make launches with the DAP).
    exports.lastLanguageServerExecutable = executableAndMessage.executable;
    let port = vscode_1.workspace.getConfiguration("robot").get("language-server.tcp-port");
    if (port) {
        channel_1.OUTPUT_CHANNEL.appendLine("Connecting to port: " + port);
        var client = new net.Socket();
        return await new Promise((resolve, reject) => {
            client.connect(port, "127.0.0.1", function () {
                resolve({
                    reader: client,
                    writer: client,
                });
            });
        });
    }
    else {
        let targetMain = path.resolve(__dirname, "../../src/robotframework_ls/__main__.py");
        if (!fs.existsSync(targetMain)) {
            let msg = `Error. Expected: ${targetMain} to exist.`;
            vscode_1.window.showWarningMessage(msg);
            (0, channel_1.errorFeedback)("EXT_NO_MAIN");
            throw new Error(msg);
        }
        let args = [];
        for (let index = 1; index < executableAndMessage.executable.length; index++) {
            args.push(executableAndMessage.executable[index]);
        }
        args.push("-u");
        args.push(targetMain);
        let lsArgs = vscode_1.workspace.getConfiguration("robot").get("language-server.args");
        if (lsArgs && !(lsArgs instanceof Array)) {
            channel_1.OUTPUT_CHANNEL.appendLine("Ignoring robot.language-server.args because it's not an array. Found: " + lsArgs);
            lsArgs = undefined;
        }
        if (lsArgs && lsArgs.length >= 1) {
            args = args.concat(lsArgs);
        }
        else {
            // Default is using simple verbose mode (shows critical/info but not debug).
            args.push("-v");
        }
        channel_1.OUTPUT_CHANNEL.appendLine("Starting RobotFramework Language Server with args: " + executableAndMessage.executable[0] + "," + args);
        let src = path.resolve(__dirname, "../../src");
        const serverProcess = cp.spawn(executableAndMessage.executable[0], args, {
            env: { ...process.env, PYTHONPATH: src },
        });
        if (!serverProcess || !serverProcess.pid) {
            throw new Error(`Launching server using command ${executableAndMessage.executable[0]} with args: ${args} failed.`);
        }
        return serverProcess;
    }
};
/**
 * Registers listeners which should act on $/customProgress and $/executeWorkspaceCommand.
 */
async function registerLanguageServerListeners(langServer) {
    let stopListeningOnDidChangeState = langServer.onDidChangeState((event) => {
        if (event.newState == vscode_languageclient_1.State.Running) {
            // i.e.: We need to register the customProgress as soon as it's running (we can't wait for onReady)
            // because at that point if there are open documents, lots of things may've happened already, in
            // which case the progress won't be shown on some cases where it should be shown.
            extensionContext.subscriptions.push(langServer.onNotification("$/customProgress", (args) => {
                // OUTPUT_CHANNEL.appendLine(args.id + " - " + args.kind + " - " + args.title + " - " + args.message + " - " + args.increment);
                let progressReporter = (0, progress_1.handleProgressMessage)(args);
                if (progressReporter) {
                    if (args.kind == "begin") {
                        const progressId = args.id;
                        progressReporter.token.onCancellationRequested(() => {
                            langServer.sendNotification("cancelProgress", { progressId: progressId });
                        });
                    }
                }
            }));
            extensionContext.subscriptions.push(langServer.onNotification("$/testsCollected", (args) => {
                (0, testview_1.handleTestsCollected)(args);
            }));
            extensionContext.subscriptions.push(langServer.onRequest("$/executeWorkspaceCommand", async (args) => {
                // OUTPUT_CHANNEL.appendLine(args.command + " - " + args.arguments);
                let ret;
                try {
                    ret = await vscode_1.commands.executeCommand(args.command, args.arguments);
                }
                catch (err) {
                    if (!(err.message && err.message.endsWith("not found"))) {
                        // Log if the error wasn't that the command wasn't found
                        (0, channel_1.logError)("Error executing workspace command.", err, "EXT_EXECUTE_WS_COMMAND");
                    }
                }
                return ret;
            }));
            // Note: don't dispose (we need to re-register on a restart).
            // stopListeningOnDidChangeState.dispose();
        }
    });
}
async function startLanguageServer() {
    let timing = new time_1.Timing();
    let langServer;
    let initializationOptions = {};
    try {
        let pluginsDir = await vscode_1.commands.executeCommand("robocorp.getPluginsDir");
        try {
            if (pluginsDir && pluginsDir.length > 0) {
                channel_1.OUTPUT_CHANNEL.appendLine("Plugins dir: " + pluginsDir + ".");
                initializationOptions["pluginsDir"] = pluginsDir;
            }
        }
        catch (error) {
            (0, channel_1.logError)("Error setting pluginsDir.", error, "EXT_PLUGINS_DIR");
        }
    }
    catch (error) {
        // The command may not be available.
    }
    langServer = new node_1.LanguageClient("Robot Framework Language Server", serverOptions, createClientOptions(initializationOptions));
    await (0, testview_1.setupTestExplorerSupport)();
    await (0, outViewRunIntegration_1.setupDebugSessionOutViewIntegration)(extensionContext);
    // Important: register listeners before starting (otherwise startup progress is not shown).
    await registerLanguageServerListeners(langServer);
    const startPromise = langServer.start();
    extensionContext.subscriptions.push({
        "dispose": async () => {
            await langServer.stop();
        },
    });
    // i.e.: if we return before it's ready, the language server commands
    // may not be available.
    channel_1.OUTPUT_CHANNEL.appendLine("Waiting for RobotFramework (python) Language Server to finish activating...");
    await startPromise;
    // ask it to start indexing only after ready.
    vscode_1.commands.executeCommand("robot.startIndexing.internal");
    let version = vscode_1.extensions.getExtension("robocorp.robotframework-lsp").packageJSON.version;
    try {
        let lsVersion = await vscode_1.commands.executeCommand("robot.getLanguageServerVersion");
        if (lsVersion != version) {
            vscode_1.window.showErrorMessage("Error: expected robotframework-lsp version: " +
                version +
                ". Found: " +
                lsVersion +
                "." +
                " Please uninstall the older version from the python environment.");
        }
    }
    catch (err) {
        let msg = "Error: robotframework-lsp version mismatch. Please uninstall the older version from the python environment.";
        (0, channel_1.logError)(msg, err, "EXT_VERSION_MISMATCH");
        vscode_1.window.showErrorMessage(msg);
    }
    channel_1.OUTPUT_CHANNEL.appendLine("RobotFramework Language Server ready. Took: " + timing.getTotalElapsedAsStr());
    return langServer;
}
exports.languageServerClient = undefined;
let languageServerClientMutex = new mutex_1.Mutex();
let extensionContext = undefined;
exports.lastLanguageServerExecutable = undefined;
async function restartLanguageServer() {
    await languageServerClientMutex.dispatch(async () => {
        let title = "Robot Framework Language Server loading ...";
        if (exports.languageServerClient !== undefined) {
            title = "Robot Framework Language Server reloading ...";
        }
        await vscode_1.window.withProgress({
            location: vscode.ProgressLocation.Window,
            title: title,
            cancellable: false,
        }, async () => {
            if (exports.languageServerClient !== undefined) {
                try {
                    // In this case, just restart (it should get the new settings automatically).
                    let timing = new time_1.Timing();
                    channel_1.OUTPUT_CHANNEL.appendLine("Restarting Robot Framework Language Server.");
                    try {
                        await exports.languageServerClient.stop();
                    }
                    catch (err) {
                        (0, channel_1.logError)("Error stopping language server.", err, "EXT_STOP_ROBOT_LS");
                    }
                    await exports.languageServerClient.start();
                    // ask it to start indexing only after ready.
                    vscode_1.commands.executeCommand("robot.startIndexing.internal");
                    channel_1.OUTPUT_CHANNEL.appendLine("RobotFramework Language Server restarted. Took: " + timing.getTotalElapsedAsStr());
                }
                catch (err) {
                    (0, channel_1.logError)("Error restarting language server.", err, "EXT_RESTART_ROBOT_LS");
                    // If it fails once it'll never work again -- it seems it caches our failure :(
                    // See: https://github.com/microsoft/vscode-languageserver-node/issues/872
                    vscode_1.window
                        .showWarningMessage('There was an error reloading the Robot Framework Language Server. Please use the "Reload Window" action to apply the new settings.', ...["Reload Window"])
                        .then((selection) => {
                        if (selection === "Reload Window") {
                            vscode_1.commands.executeCommand("workbench.action.reloadWindow");
                        }
                    });
                    return;
                }
                vscode_1.window.showInformationMessage("Robot Framework Language Server reloaded with new settings.");
                return;
            }
            // If we get here, this means it never really did start correctly (hopefully it'll work now with the new settings)...
            try {
                // Note: assign to module variable.
                exports.languageServerClient = await startLanguageServer();
                vscode_1.window.showInformationMessage("Robot Framework Language Server started with the new settings.");
            }
            catch (err) {
                const msg = "It was not possible to start the Robot Framework Language Server. Please update the related `robot.language-server` configurations.";
                (0, channel_1.logError)(msg, err, "EXT_UNABLE_TO_START_2");
                vscode_1.window.showErrorMessage(msg);
            }
        });
    });
}
async function removeCaches(dirPath, level, removeDirsArray) {
    let dirContents = await fs.promises.readdir(dirPath, { withFileTypes: true });
    for await (const dirEnt of dirContents) {
        var entryPath = path.join(dirPath, dirEnt.name);
        if (dirEnt.isDirectory()) {
            await removeCaches(entryPath, level + 1, removeDirsArray);
            removeDirsArray.push(entryPath);
        }
        else {
            try {
                await fs.promises.unlink(entryPath);
                channel_1.OUTPUT_CHANNEL.appendLine(`Removed: ${entryPath}.`);
            }
            catch (err) {
                channel_1.OUTPUT_CHANNEL.appendLine(`Unable to remove: ${entryPath}. ${err}`);
            }
        }
    }
    if (level === 0) {
        // Remove the (empty) directories only after all iterations finished.
        for (const entryPath of removeDirsArray) {
            try {
                await fs.promises.rmdir(entryPath);
                channel_1.OUTPUT_CHANNEL.appendLine(`Removed dir: ${entryPath}.`);
            }
            catch (err) {
                channel_1.OUTPUT_CHANNEL.appendLine(`Unable to remove dir: ${entryPath}. ${err}`);
            }
        }
    }
}
async function clearCachesAndRestartProcessesStart() {
    return await languageServerClientMutex.dispatch(async () => {
        if (exports.languageServerClient === undefined) {
            vscode_1.window.showErrorMessage("Unable to clear caches and restart because the language server still hasn't been successfully started.");
            return false;
        }
        let homeDir;
        try {
            homeDir = await vscode_1.commands.executeCommand("robot.getRFLSHomeDir");
        }
        catch (err) {
            let msg = "Unable to clear caches and restart because calling robot.getRFLSHomeDir threw an exception.";
            vscode_1.window.showErrorMessage(msg);
            (0, channel_1.logError)(msg, err, "EXT_GET_HOMEDIR");
            return false;
        }
        try {
            await exports.languageServerClient.stop();
        }
        catch (err) {
            (0, channel_1.logError)("Error stopping language server.", err, "EXT_STOP_LS_ON_CLEAR_RESTART");
        }
        await (0, testview_1.clearTestItems)();
        if (await (0, files_1.fileExists)(homeDir)) {
            await removeCaches(homeDir, 0, []);
        }
        return true;
    });
}
async function clearCachesAndRestartProcessesFinish() {
    try {
        await exports.languageServerClient.start();
        // ask it to start indexing only after ready.
        await vscode_1.commands.executeCommand("robot.startIndexing.internal");
    }
    catch (err) {
        (0, channel_1.logError)("Error starting language server.", err, "EXT_START_LS_ON_CLEAR_RESTART");
        vscode_1.window
            .showWarningMessage('There was an error reloading the Robot Framework Language Server. Please use the "Reload Window" action to finish restarting the language server.', ...["Reload Window"])
            .then((selection) => {
            if (selection === "Reload Window") {
                vscode_1.commands.executeCommand("workbench.action.reloadWindow");
            }
        });
        return;
    }
}
async function clearCachesAndRestartProcesses() {
    await vscode_1.window.withProgress({
        location: vscode.ProgressLocation.Window,
        title: "Clearing caches and restarting Robot Framework Language Server.",
        cancellable: false,
    }, async () => {
        let okToRestart = await clearCachesAndRestartProcessesStart();
        if (!okToRestart) {
            return;
        }
        await clearCachesAndRestartProcessesFinish();
        vscode_1.window.showInformationMessage("Caches cleared and Robot Framework Language Server restarted.");
    });
}
let globalIgnoreConfigurationChangesToRestart = false;
function registerOnDidChangeConfiguration(context) {
    context.subscriptions.push(vscode_1.workspace.onDidChangeConfiguration((event) => {
        for (let s of [
            "robot.language-server.python",
            "robot.language-server.tcp-port",
            "robot.language-server.args",
        ]) {
            if (globalIgnoreConfigurationChangesToRestart) {
                return;
            }
            if (event.affectsConfiguration(s)) {
                restartLanguageServer();
                break;
            }
        }
    }));
}
let RF_STATUS_BAR_ITEM = undefined;
let onChangedEditorUpdateRFStatusBarItem = (0, common_1.debounce)(() => {
    if (!RF_STATUS_BAR_ITEM) {
        return;
    }
    const activeTextEditor = vscode_1.window.activeTextEditor;
    if (!activeTextEditor) {
        RF_STATUS_BAR_ITEM.hide();
        return;
    }
    if (activeTextEditor.document.languageId !== "robotframework") {
        RF_STATUS_BAR_ITEM.hide();
        return;
    }
    if (!exports.languageServerClient) {
        RF_STATUS_BAR_ITEM.hide();
        return;
    }
    const uri = activeTextEditor.document.uri;
    vscode_1.commands.executeCommand("robot.rfInfo.internal", { "uri": uri.toString() }).then((rfInfo) => {
        if (!rfInfo) {
            RF_STATUS_BAR_ITEM.hide();
            return;
        }
        RF_STATUS_BAR_ITEM.text = "RF: v" + rfInfo["version"];
        let tooltip = "Robot Framework version: " + rfInfo["version"] + "\nPython: " + rfInfo["python"];
        const interpreterId = rfInfo["interpreter_id"];
        if (interpreterId) {
            tooltip += "\nTarget: " + interpreterId;
        }
        tooltip += "\n(source: Robot Framework Language Server)";
        RF_STATUS_BAR_ITEM.tooltip = tooltip;
        RF_STATUS_BAR_ITEM.show();
    });
}, 100);
async function openFlowExplorer(flowBundleHTMLFolderPath, uri) {
    const DEFAULT_ERROR_MSG = `
            Could not open Robot Flow Explorer.
            Please check the output logs for more details.
            `;
    const DEFAULT_UNABLE_TO_OPEN_MSG = `
            Unable to open the Robot Flow Explorer.
            Please open robot file and try again.
            `;
    try {
        (0, channel_1.feedback)("vscode.flowExplorer.used", "+1");
        if (!uri) {
            const activeTextEditor = vscode_1.window.activeTextEditor;
            if (!activeTextEditor ||
                !exports.languageServerClient ||
                activeTextEditor.document.languageId !== "robotframework") {
                vscode_1.window.showErrorMessage(DEFAULT_UNABLE_TO_OPEN_MSG);
                return;
            }
            uri = activeTextEditor.document.uri.toString();
        }
        const openResult = await vscode_1.commands.executeCommand("robot.openFlowExplorer.internal", {
            "currentFileUri": uri,
            "htmlBundleFolderPath": flowBundleHTMLFolderPath,
        });
        if (!openResult || !openResult.success) {
            if (!openResult.message) {
                openResult.message = "<unspecified>";
            }
            (0, channel_1.logError)("Error while opening the Robot Flow Explorer", Error(openResult.message), "EXT_OPEN_FLOW_EXPLORER");
            vscode_1.window.showErrorMessage(DEFAULT_ERROR_MSG);
            channel_1.OUTPUT_CHANNEL.show();
            return;
        }
        vscode_1.window.showInformationMessage("Opening Robot Flow Explorer in browser...");
        vscode.env.openExternal(vscode.Uri.parse(openResult.result));
    }
    catch (err) {
        (0, channel_1.logError)("Error while opening the Robot Flow Explorer", err, "EXT_OPEN_FLOW_EXPLORER");
        vscode_1.window.showErrorMessage(DEFAULT_ERROR_MSG);
        channel_1.OUTPUT_CHANNEL.show();
        return;
    }
}
async function activate(context) {
    // These extensions do the same things that the RFLS does and end up conflicting
    // (so, sometimes there are reports saying that the language server
    // isn't working when the issue is that a conflicting extension is
    // installed -- notify users about that).
    const conflictingExtensions = {
        "TomiTurtiainen.rf-intellisense": "Robot Framework Intellisense",
        "keith.robotframework": "robot framework language",
        "Snooz82.rf-intellisense": "Robot Framework Intellisense FORK",
        "d-biehl.robotcode": "Robot Code",
        "vivainio.robotframework": "robotframework",
    };
    let conflicting = "";
    for (const [key, value] of Object.entries(conflictingExtensions)) {
        if (vscode_1.extensions.getExtension(key) !== undefined) {
            if (conflicting.length > 0) {
                conflicting += ", ";
            }
            conflicting += `"${value}"`;
        }
    }
    if (conflicting !== "") {
        const errorMsg = '"Robot Framework Language Server" conflicts with the following extension(s): ' +
            conflicting +
            " - please uninstall the conflicting extension(s).";
        channel_1.OUTPUT_CHANNEL.append(errorMsg);
        vscode_1.window.showErrorMessage(errorMsg);
    }
    RF_STATUS_BAR_ITEM = vscode_1.window.createStatusBarItem(vscode.StatusBarAlignment.Right);
    vscode_1.window.onDidChangeActiveTextEditor((editor) => {
        onChangedEditorUpdateRFStatusBarItem();
    });
    await languageServerClientMutex.dispatch(async () => {
        extensionContext = context;
        context.subscriptions.push(vscode_1.commands.registerCommand("robot.clearCachesAndRestartProcesses", clearCachesAndRestartProcesses));
        context.subscriptions.push(vscode_1.commands.registerCommand("robot.clearCachesAndRestartProcesses.start.internal", clearCachesAndRestartProcessesStart));
        context.subscriptions.push(vscode_1.commands.registerCommand("robot.clearCachesAndRestartProcesses.finish.internal", clearCachesAndRestartProcessesFinish));
        context.subscriptions.push(vscode_1.commands.registerCommand("robot.openFlowExplorer", async (uri) => {
            const flowBundleHTMLFolderPath = context.asAbsolutePath("assets");
            return openFlowExplorer(flowBundleHTMLFolderPath, uri);
        }));
        const provider = new docs_1.RobotDocumentationViewProvider(context);
        context.subscriptions.push(vscode.window.registerWebviewViewProvider(docs_1.RobotDocumentationViewProvider.viewType, provider));
        context.subscriptions.push(vscode_1.commands.registerCommand("robot.view.documentation.pin", () => {
            provider.pin();
        }));
        context.subscriptions.push(vscode_1.commands.registerCommand("robot.view.documentation.unpin", () => {
            provider.unpin();
        }));
        const outputProvider = new outView_1.RobotOutputViewProvider(context);
        const options = { webviewOptions: { retainContextWhenHidden: true } };
        context.subscriptions.push(vscode.window.registerWebviewViewProvider(outView_1.RobotOutputViewProvider.viewType, outputProvider, options));
        (0, debugger_1.registerDebugger)();
        await (0, run_1.registerRunCommands)(context);
        await (0, linkProvider_1.registerLinkProviders)(context);
        await (0, rfInteractive_1.registerInteractiveCommands)(context);
        try {
            // Note: assign to module variable.
            exports.languageServerClient = await startLanguageServer();
        }
        catch (err) {
            const msg = "It was not possible to start the Robot Framework Language Server. Please update the related `robot.language-server` configurations.";
            (0, channel_1.logError)(msg, err, "EXT_UNABLE_TO_START");
            vscode_1.window.showErrorMessage(msg);
        }
        finally {
            // Note: only register to listen for changes at the end.
            // If we do it before, we conflict with the case where we
            // ask for the executable in a dialog (and then we'd go
            // through the usual start and a restart at the same time).
            registerOnDidChangeConfiguration(context);
            onChangedEditorUpdateRFStatusBarItem();
        }
    });
}
exports.activate = activate;
//# sourceMappingURL=extension.js.map