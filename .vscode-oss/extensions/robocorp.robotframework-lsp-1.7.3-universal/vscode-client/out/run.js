"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerRunCommands = exports.readLaunchTemplate = exports.robotDebugSuite = exports.robotRunSuite = exports.robotDebug = exports.robotRun = void 0;
const vscode_1 = require("vscode");
const channel_1 = require("./channel");
const testview_1 = require("./testview");
const vscode_languageclient_1 = require("vscode-languageclient");
async function robotRun(params) {
    try {
        await _debug(params, true);
    }
    catch (error) {
        (0, channel_1.logError)("Error running robot.", error, "RUN_ROBOT_RUN");
    }
}
exports.robotRun = robotRun;
async function robotDebug(params) {
    try {
        await _debug(params, false);
    }
    catch (error) {
        (0, channel_1.logError)("Error debugging robot.", error, "RUN_ROBOT_DEBUG");
    }
}
exports.robotDebug = robotDebug;
async function robotRunSuite(resource) {
    await _debugSuite(resource, true);
}
exports.robotRunSuite = robotRunSuite;
async function robotDebugSuite(resource) {
    await _debugSuite(resource, false);
}
exports.robotDebugSuite = robotDebugSuite;
async function readLaunchTemplate(workspaceFolder) {
    const launch = vscode_1.workspace.getConfiguration("launch", workspaceFolder);
    const launchConfigurations = launch.inspect("configurations");
    if (launchConfigurations) {
        const entries = [
            ["Workspace Folder Language Value", launchConfigurations.workspaceFolderLanguageValue],
            ["Workspace Folder Value", launchConfigurations.workspaceFolderValue],
            ["Workspace Language Value", launchConfigurations.workspaceLanguageValue],
            ["Workspace Value", launchConfigurations.workspaceValue],
            ["Global Language Value", launchConfigurations.globalLanguageValue],
            ["Global Value", launchConfigurations.globalValue],
        ];
        for (const entry of entries) {
            let configs = entry[1];
            if (configs) {
                for (const cfg of configs) {
                    channel_1.OUTPUT_CHANNEL.appendLine(`Found ${entry[0]} configuration: ${cfg.type} - ${cfg.name}.`);
                    if (cfg.type == "robotframework-lsp" &&
                        cfg.name &&
                        cfg.name.toLowerCase() == "robot framework: launch template") {
                        channel_1.OUTPUT_CHANNEL.appendLine(`-- matched as launch template.`);
                        return cfg;
                    }
                }
            }
        }
    }
    else {
        channel_1.OUTPUT_CHANNEL.appendLine('Did not find any launch configuration when searching for the "Robot Framework: Launch Template".');
    }
    return undefined;
}
exports.readLaunchTemplate = readLaunchTemplate;
async function _debugSuite(resource, noDebug) {
    try {
        if (!resource) {
            // i.e.: collect the tests from the file and ask which one to run.
            let activeTextEditor = vscode_1.window.activeTextEditor;
            if (!activeTextEditor) {
                vscode_1.window.showErrorMessage("Can only run a test/task suite if the related file is currently opened.");
                return;
            }
            resource = activeTextEditor.document.uri;
        }
        await _debug({ "uri": resource.toString(), "path": resource.fsPath, "name": "*", "range": undefined }, noDebug);
    }
    catch (error) {
        (0, channel_1.logError)("Error debugging suite.", error, "RUN_DEBUG_SUITE");
    }
}
async function obtainTestItem(uri, name) {
    // Note: listing and making sure everything is in sync.
    let testId;
    let tests = await vscode_1.commands.executeCommand("robot.listTests", { "uri": uri.toString() });
    const uriToTests = new Map();
    // We need to group (in case it was a directory).
    for (const t of tests) {
        let existing = uriToTests.get(t.uri);
        if (!existing) {
            existing = [];
            uriToTests.set(t.uri.toString(), existing);
        }
        existing.push(t);
    }
    for (const [key, t] of uriToTests.entries()) {
        await (0, testview_1.handleTestsCollected)({ "uri": key, "testInfo": t });
    }
    if (name === "*") {
        testId = (0, testview_1.computeUriTestId)(uri.toString());
    }
    else {
        testId = (0, testview_1.computeTestId)(uri.toString(), name);
    }
    let testItem = (0, testview_1.getTestItem)(testId);
    if (!testItem) {
        const msg = "Unable to obtain test item from: " + uri + " - " + name;
        channel_1.OUTPUT_CHANNEL.appendLine(msg);
        for (const t of tests) {
            channel_1.OUTPUT_CHANNEL.appendLine(`Collected: ${JSON.stringify(t)}`);
        }
        vscode_1.window.showErrorMessage(msg);
    }
    return (0, testview_1.getTestItem)(testId);
}
async function _debug(params, noDebug) {
    let executeUri;
    let executeName;
    if (!params) {
        // i.e.: collect the tests from the file and ask which one to run.
        let activeTextEditor = vscode_1.window.activeTextEditor;
        if (!activeTextEditor) {
            vscode_1.window.showErrorMessage("Can only run a test/task if the related file is currently opened.");
            return;
        }
        let uri = activeTextEditor.document.uri;
        let tests = await vscode_1.commands.executeCommand("robot.listTests", { "uri": uri.toString() });
        if (!tests) {
            vscode_1.window.showErrorMessage("No tests/tasks found in the currently opened editor.");
            return;
        }
        executeUri = uri;
        if (tests.length == 1) {
            executeName = tests[0].name;
        }
        else {
            let items = [];
            for (const el of tests) {
                items.push(el.name);
            }
            let selectedItem = await vscode_1.window.showQuickPick(items, {
                "canPickMany": false,
                "placeHolder": "Please select Test / Task to run.",
                "ignoreFocusOut": true,
            });
            if (!selectedItem) {
                return;
            }
            executeName = selectedItem;
        }
    }
    else {
        executeUri = vscode_1.Uri.file(params.path);
        executeName = params.name;
    }
    let include = [];
    const testItem = await obtainTestItem(executeUri, executeName);
    if (testItem) {
        include.push(testItem);
        const request = new vscode_1.TestRunRequest(include);
        const cancellationTokenSource = new vscode_languageclient_1.CancellationTokenSource();
        if (noDebug) {
            testview_1.RUN_PROFILE.runHandler(request, cancellationTokenSource.token);
        }
        else {
            testview_1.DEBUG_PROFILE.runHandler(request, cancellationTokenSource.token);
        }
    }
    else {
        channel_1.OUTPUT_CHANNEL.appendLine("Could not find test item from: " + executeUri + " - " + executeName);
    }
}
async function registerRunCommands(context) {
    context.subscriptions.push(vscode_1.commands.registerCommand("robot.runTest", robotRun));
    context.subscriptions.push(vscode_1.commands.registerCommand("robot.debugTest", robotDebug));
    context.subscriptions.push(vscode_1.commands.registerCommand("robot.runSuite", robotRunSuite));
    context.subscriptions.push(vscode_1.commands.registerCommand("robot.debugSuite", robotDebugSuite));
}
exports.registerRunCommands = registerRunCommands;
//# sourceMappingURL=run.js.map