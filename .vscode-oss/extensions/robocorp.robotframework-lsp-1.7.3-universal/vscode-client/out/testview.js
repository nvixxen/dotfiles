"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupTestExplorerSupport = exports.getTestItem = exports.handleTestsCollected = exports.computeTestId = exports.computeTestIdFromTestInfo = exports.computeUriTestId = exports.nextRunId = exports.clearTestItems = exports.DEBUG_PROFILE = exports.RUN_PROFILE = exports.TEST_CONTROLLER = void 0;
const vscode = require("vscode");
const channel_1 = require("./channel");
const run_1 = require("./run");
const weakValueMap_1 = require("./weakValueMap");
const escape_1 = require("./escape");
const nodePath = require("path");
const time_1 = require("./time");
const posixPath = nodePath.posix || nodePath;
const controller = vscode.tests.createTestController("robotframework-lsp.testController", "Robot Framework");
const runProfile = controller.createRunProfile("Run", vscode.TestRunProfileKind.Run, (request, token) => {
    runHandler(false, request, token);
});
const debugProfile = controller.createRunProfile("Debug", vscode.TestRunProfileKind.Debug, (request, token) => {
    runHandler(true, request, token);
});
exports.TEST_CONTROLLER = controller;
exports.RUN_PROFILE = runProfile;
exports.DEBUG_PROFILE = debugProfile;
// Note: we cannot assign the resolveHandler (if we do that
// VSCode will clear the existing items, which is not what
// we want -- with our current approach we start collecting
// when the extension is started).
// controller.resolveHandler = async (test) => {
//     if (!test) {
//         // Wait for the first full refresh.
//         controller.items.replace([]);
//         testItemIdToTestItem.clear();
//         await vscode.commands.executeCommand("robot.waitFullTestCollection.internal");
//     }
// };
async function clearTestItems() {
    controller.items.replace([]);
    testItemIdToTestItem.clear();
}
exports.clearTestItems = clearTestItems;
var ItemType;
(function (ItemType) {
    ItemType[ItemType["File"] = 0] = "File";
    ItemType[ItemType["TestCase"] = 1] = "TestCase";
})(ItemType || (ItemType = {}));
const testData = new WeakMap(); // Actually weak key map.
let lastRunId = 0;
function nextRunId() {
    lastRunId += 1;
    return `Run: ${lastRunId}`;
}
exports.nextRunId = nextRunId;
const runIdToTestRun = new Map();
const runIdToDebugSession = new Map();
// Note: a test item id is uri a string such as:
// `${uri} [${testName}]`
const testItemIdToTestItem = new weakValueMap_1.WeakValueMap();
function computeUriTestId(uri) {
    if (uri.startsWith("id:")) {
        throw new Error("It seems that this uri is actually a test id already.");
    }
    if (process.platform == "win32") {
        uri = uri.toLowerCase();
    }
    return "id:" + uri;
}
exports.computeUriTestId = computeUriTestId;
function computeTestIdFromTestInfo(uriAsStr, test) {
    uriAsStr = computeUriTestId(uriAsStr);
    return `${uriAsStr} [${test.name}]`;
}
exports.computeTestIdFromTestInfo = computeTestIdFromTestInfo;
function computeTestId(uri, name) {
    uri = computeUriTestId(uri);
    return `${uri} [${name}]`;
}
exports.computeTestId = computeTestId;
function getType(testItem) {
    const data = testData.get(testItem);
    if (!data) {
        return undefined;
    }
    return data.type;
}
function removeTreeStructure(uri) {
    while (true) {
        const uriAsStr = computeUriTestId(uri.toString());
        let testItem = getTestItem(uriAsStr);
        if (!testItem) {
            return;
        }
        testItemIdToTestItem.delete(uriAsStr);
        let parentItem = testItem.parent;
        if (parentItem) {
            if (parentItem.children.get(uriAsStr) !== undefined) {
                parentItem.children.delete(uriAsStr);
                if (parentItem.children.size == 0) {
                    uri = parentItem.uri;
                }
                else {
                    return;
                }
            }
            else {
                return;
            }
        }
        else {
            let file = controller.items.get(uriAsStr);
            if (file !== undefined) {
                controller.items.delete(uriAsStr);
            }
            return;
        }
    }
}
function addTreeStructure(workspaceFolder, uri) {
    let workspaceFolderPath = workspaceFolder.uri.path;
    let uriPath = uri.path;
    if (process.platform == "win32") {
        workspaceFolderPath = workspaceFolderPath.toLowerCase();
        uriPath = uriPath.toLowerCase();
    }
    const path = posixPath.relative(workspaceFolderPath, uriPath);
    const parts = path.split("/");
    let prev = workspaceFolder.uri.path;
    let parentItem = undefined;
    let ret = undefined;
    for (const part of parts) {
        const next = `${prev}/${part}`;
        const nextUri = uri.with({ "path": next });
        const nextUriStr = computeUriTestId(nextUri.toString());
        ret = getTestItem(nextUriStr);
        if (!ret) {
            // Just create if it still wasn't created (otherwise we'd override
            // the previously created item/children structure).
            ret = controller.createTestItem(nextUriStr, part, nextUri);
            testItemIdToTestItem.set(nextUriStr, ret);
            testData.set(ret, { type: ItemType.File, testInfo: undefined });
            if (parentItem === undefined) {
                controller.items.add(ret);
            }
            else {
                parentItem.children.add(ret);
            }
        }
        parentItem = ret;
        prev = next;
    }
    return ret;
}
async function handleTestsCollected(testInfo) {
    const uri = vscode.Uri.parse(testInfo.uri);
    const workspaceFolder = vscode.workspace.getWorkspaceFolder(uri);
    if (workspaceFolder === undefined) {
        return;
    }
    if (testInfo.testInfo.length === 0) {
        removeTreeStructure(uri);
        return;
    }
    const file = addTreeStructure(workspaceFolder, uri);
    const uriAsStr = uri.toString();
    const children = [];
    const found = new Set();
    for (const test of testInfo.testInfo) {
        const testItemId = computeTestIdFromTestInfo(uriAsStr, test);
        if (found.has(testItemId)) {
            continue;
        }
        found.add(testItemId);
        const testItem = controller.createTestItem(testItemId, test.name, uri);
        testItemIdToTestItem.set(testItemId, testItem);
        const start = new vscode.Position(test.range.start.line, test.range.start.character);
        const end = new vscode.Position(test.range.end.line, test.range.end.character);
        testItem.range = new vscode.Range(start, end);
        testData.set(testItem, { type: ItemType.TestCase, testInfo: test });
        children.push(testItem);
    }
    if (vscode.version.startsWith("1.63.")) {
        // Intentionally make a flicker to workaround https://github.com/microsoft/vscode/issues/140166.
        // This is fixed in current insiders (1.64).
        file.children.replace([]);
        await (0, time_1.sleep)(400);
    }
    file.children.replace(children);
}
exports.handleTestsCollected = handleTestsCollected;
function getTestItem(testId) {
    if (!testId.startsWith("id:")) {
        throw new Error("Expected testId to start with 'id:'. Found: " + testId);
    }
    return testItemIdToTestItem.get(testId);
}
exports.getTestItem = getTestItem;
async function runHandler(shouldDebug, request, token) {
    const queue = [];
    if (request.include) {
        request.include.forEach((test) => queue.push(test));
    }
    else {
        controller.items.forEach((test) => queue.push(test));
    }
    let includeTests = [];
    let excludeTests = [];
    let workspaceFolders = new Set();
    while (queue.length > 0 && !token.isCancellationRequested) {
        const test = queue.pop();
        let uri = test.uri;
        let workspaceFolder = vscode.workspace.getWorkspaceFolder(uri);
        if (workspaceFolder) {
            workspaceFolders.add(workspaceFolder);
        }
        else {
            channel_1.OUTPUT_CHANNEL.appendLine("Could not find workspace folder for uri: " + uri);
        }
        includeTests.push(test);
    }
    if (request.exclude) {
        for (const test of request.exclude) {
            excludeTests.push(test);
        }
    }
    if (token.isCancellationRequested) {
        return;
    }
    if (workspaceFolders.size > 1) {
        channel_1.OUTPUT_CHANNEL.appendLine("Note: tests span more than 1 workspace folder. Launch templates will only take the first one into account.");
    }
    else if (workspaceFolders.size == 0) {
        vscode.window.showErrorMessage("Unable to launch because workspace folder is not available.");
        return;
    }
    let wsFoldersAsArray = [];
    for (const ws of workspaceFolders) {
        wsFoldersAsArray.push(ws);
    }
    // Note: make sure to end the run after all tests have been executed.
    const run = controller.createTestRun(request);
    const runId = obtainRunId(run);
    await launch(wsFoldersAsArray, runId, includeTests, excludeTests, shouldDebug);
}
function obtainRunId(run) {
    const runId = nextRunId();
    runIdToTestRun.set(runId, run);
    return runId;
}
function handleTestRunFinished(runId) {
    if (runIdToDebugSession.has(runId)) {
        runIdToDebugSession.delete(runId);
    }
    if (runIdToTestRun.has(runId)) {
        const testRun = runIdToTestRun.get(runId);
        runIdToTestRun.delete(runId);
        testRun.end();
    }
}
async function launch(workspaceFolders, runId, includeTests, // the tests to be included
excludeTests, // the tests to be excluded
shouldDebug) {
    let cwd;
    let launchTemplate = undefined;
    cwd = workspaceFolders[0].uri.fsPath;
    launchTemplate = await (0, run_1.readLaunchTemplate)(workspaceFolders[0]);
    let args = [];
    // We want the events both in run and debug in this case.
    args.push("--listener=robotframework_debug_adapter.events_listener.EventsListenerV2");
    args.push("--listener=robotframework_debug_adapter.events_listener.EventsListenerV3");
    // Include/exclude tests based on RFLS_PRERUN_FILTERING env variable.
    let envFiltering = undefined;
    function convertToFiltering(collection) {
        let ret = [];
        for (const test of collection) {
            if (getType(test) === ItemType.TestCase) {
                let data = testData.get(test);
                if (!data) {
                    channel_1.OUTPUT_CHANNEL.appendLine("Unable to find test data for: " + test.id);
                    continue;
                }
                ret.push([test.uri.fsPath, data.testInfo.name]);
            }
            else {
                ret.push([test.uri.fsPath, "*"]);
            }
        }
        return ret;
    }
    envFiltering = (0, escape_1.jsonEscapeUTF)(JSON.stringify({
        "include": convertToFiltering(includeTests),
        "exclude": convertToFiltering(excludeTests),
    }));
    let debugConfiguration = {
        "type": "robotframework-lsp",
        "runId": runId,
        "name": "Robot Framework: Launch " + runId,
        "request": "launch",
        "cwd": cwd,
        "terminal": "integrated",
        "env": {},
        "args": args,
    };
    if (launchTemplate) {
        for (var key of Object.keys(launchTemplate)) {
            if (key !== "type" && key !== "name" && key !== "request") {
                let value = launchTemplate[key];
                if (value !== undefined) {
                    if (key === "args") {
                        try {
                            debugConfiguration.args = debugConfiguration.args.concat(value);
                        }
                        catch (err) {
                            (0, channel_1.logError)("Unable to concatenate: " + debugConfiguration.args + " to: " + value, err, "RUN_CONCAT_ARGS");
                        }
                    }
                    else {
                        debugConfiguration[key] = value;
                    }
                }
            }
        }
    }
    if (debugConfiguration.makeSuite === undefined) {
        // Not in template (default == true)
        debugConfiguration.makeSuite = true;
    }
    // Note that target is unused if RFLS_PRERUN_FILTER_TESTS is specified and makeSuite == true.
    let targetAsSet = new Set();
    for (const test of includeTests) {
        targetAsSet.add(test.uri.fsPath);
    }
    let target = [];
    for (const s of targetAsSet) {
        target.push(s);
    }
    debugConfiguration.target = target;
    if (debugConfiguration.makeSuite) {
        if (workspaceFolders.length > 1) {
            let suiteTarget = [];
            for (const ws of workspaceFolders) {
                suiteTarget.push(ws.uri.fsPath);
            }
            debugConfiguration["suiteTarget"] = suiteTarget;
        }
    }
    if (!debugConfiguration.env) {
        debugConfiguration.env = { "RFLS_PRERUN_FILTER_TESTS": envFiltering };
    }
    else {
        debugConfiguration.env["RFLS_PRERUN_FILTER_TESTS"] = envFiltering;
    }
    let debugSessionOptions = { "noDebug": !shouldDebug };
    const started = await launchDebugSession(runId, workspaceFolders[0], debugConfiguration, debugSessionOptions);
    return started;
}
async function launchDebugSession(runId, workspaceFolder, debugConfiguration, debugSessionOptions) {
    debugConfiguration.runId = runId;
    let started = await vscode.debug.startDebugging(workspaceFolder, debugConfiguration, debugSessionOptions);
    if (!started) {
        handleTestRunFinished(runId);
    }
    return started;
}
async function setupTestExplorerSupport() {
    function isRelatedSession(session) {
        return session.configuration.type === "robotframework-lsp" && session.configuration.runId !== undefined;
    }
    vscode.debug.onDidStartDebugSession((session) => {
        if (isRelatedSession(session)) {
            channel_1.OUTPUT_CHANNEL.appendLine("Started testview debug session " + session.configuration.runId);
            if (runIdToTestRun.has(session.configuration.runId)) {
                runIdToDebugSession.set(session.configuration.runId, session);
            }
        }
    });
    vscode.debug.onDidTerminateDebugSession((session) => {
        if (isRelatedSession(session)) {
            handleTestRunFinished(session.configuration.runId);
        }
    });
    vscode.debug.onDidReceiveDebugSessionCustomEvent((event) => {
        // OUTPUT_CHANNEL.appendLine("Received event: " + event.event + " -- " + JSON.stringify(event.body));
        try {
            if (isRelatedSession(event.session)) {
                const runId = event.session.configuration.runId;
                const testRun = runIdToTestRun.get(runId);
                if (testRun) {
                    switch (event.event) {
                        case "startSuite":
                            handleSuiteStart(testRun, event);
                            break;
                        case "endSuite":
                            handleSuiteEnd(testRun, event);
                            break;
                        case "startTest":
                            handleTestStart(testRun, event);
                            break;
                        case "endTest":
                            handleTestEnd(testRun, event);
                            break;
                        case "logMessage":
                            handleLogMessage(testRun, event);
                            break;
                    }
                }
            }
        }
        catch (err) {
            (0, channel_1.logError)("Error handling debug session event: " + JSON.stringify(event), err, "HANDLE_DEBUG_SESSION_EVENT");
        }
    });
}
exports.setupTestExplorerSupport = setupTestExplorerSupport;
// Constants to color (we could move this somewhere in the future if
// we need to use it elsewhere).
const red = "\u001b[31m";
const green = "\u001b[32m";
const yellow = "\u001b[33m";
const blue = "\u001b[34m";
const magenta = "\u001b[35m";
const cyan = "\u001b[36m";
const white = "\u001b[37m";
const reset = "\u001b[0m";
function handleLogMessage(testRun, event) {
    let message = event.body.message;
    let level = event.body.level;
    let testItem = undefined;
    let location = undefined;
    // If we report this here, VSCode may not show the error messages properly, so, leave it out for now.
    if (event.body.testOrSuiteSource) {
        let testName = event.body.testName;
        let uri = vscode.Uri.file(event.body.testOrSuiteSource);
        const uriStr = uri.toString();
        let testId;
        if (testName) {
            testId = computeTestId(uriStr, testName);
        }
        else {
            testId = computeUriTestId(uriStr);
        }
        testItem = getTestItem(testId);
    }
    if (testItem && event.body.source && !event.body.source.startsWith("<")) {
        let lineno = event.body.lineno || 0;
        if (lineno) {
            lineno = lineno - 1;
        }
        let uri = vscode.Uri.file(event.body.source);
        const uriStr = uri.toString();
        if (lineno !== undefined && testItem !== undefined) {
            let range = new vscode.Position(lineno, 0);
            location = new vscode.Location(uri, range);
        }
    }
    try {
        message = message.split(/(?:\r\n|\r|\n)/g).join("\r\n");
    }
    catch (err) {
        (0, channel_1.logError)("Error handling log message: " + JSON.stringify(message) + " (" + typeof message + ")", err, "HANDLE_LOG_MESSAGE");
    }
    message = `[LOG ${level}] ${message}`;
    const config = vscode.workspace.getConfiguration("robot.run.peekError");
    let configLevel = config.get("level", "ERROR").toUpperCase().trim();
    if (configLevel != "INFO" && configLevel != "WARN" && configLevel != "ERROR" && configLevel != "NONE") {
        channel_1.OUTPUT_CHANNEL.appendLine("Invalid robot.run.peekError.level: " + configLevel);
        configLevel = "ERROR";
    }
    let addToConsoleWithLocation;
    switch (level) {
        case "INFO":
            addToConsoleWithLocation = configLevel == "INFO";
            break;
        case "WARN":
            message = yellow + message + reset;
            addToConsoleWithLocation = configLevel == "INFO" || configLevel == "WARN";
            break;
        case "FAIL":
        case "ERROR":
            addToConsoleWithLocation = configLevel == "INFO" || configLevel == "WARN" || configLevel == "ERROR";
            message = red + message + reset;
            break;
    }
    if (addToConsoleWithLocation) {
        // When it's added to the console with the location it also appears
        // in the test result.
        testRun.appendOutput(message, location, testItem);
    }
    else {
        testRun.appendOutput(message);
    }
}
function handleSuiteStart(testRun, event) {
    const uriStr = vscode.Uri.file(event.body.source).toString();
    const testNames = event.body.tests;
    for (const testName of testNames) {
        const testId = computeTestId(uriStr, testName);
        const testItem = getTestItem(testId);
        if (!testItem) {
            channel_1.OUTPUT_CHANNEL.appendLine("Did not find test item: " + testId);
            continue;
        }
        else {
            testRun.enqueued(testItem);
        }
    }
}
function handleTestStart(testRun, event) {
    const testUriStr = vscode.Uri.file(event.body.source).toString();
    const testName = event.body.name;
    const testId = computeTestId(testUriStr, testName);
    const testItem = getTestItem(testId);
    if (!testItem) {
        channel_1.OUTPUT_CHANNEL.appendLine("Did not find test item: " + testId);
    }
    else {
        testRun.started(testItem);
    }
}
function buildTestMessages(event) {
    let messages = [];
    let msg = event.body.message;
    let config = vscode.workspace.getConfiguration("robot.run.peekError");
    if (msg) {
        if (config.get("showSummary", false)) {
            messages.push({
                "message": `[TEST] ${msg}`,
            });
        }
    }
    const failedKeywords = event.body.failed_keywords;
    if (failedKeywords) {
        if (config.get("showErrorsInCallers", false)) {
            for (const failed of failedKeywords) {
                messages.push({
                    "message": failed.message,
                    "location": {
                        "uri": vscode.Uri.file(failed.source),
                        "range": new vscode.Range(new vscode.Position(failed.lineno - 1, 0), new vscode.Position(failed.lineno - 1, 0)),
                    },
                });
            }
        }
    }
    return messages;
}
function handleSuiteEnd(testRun, event) {
    const uriStr = computeUriTestId(vscode.Uri.file(event.body.source).toString());
    const testItem = getTestItem(uriStr);
    markTestRun(testItem, uriStr, testRun, event);
}
function handleTestEnd(testRun, event) {
    const testUriStr = vscode.Uri.file(event.body.source).toString();
    const testName = event.body.name;
    const testId = computeTestId(testUriStr, testName);
    const testItem = getTestItem(testId);
    markTestRun(testItem, testId, testRun, event);
}
function markTestRun(testItem, testId, testRun, event) {
    if (!testItem) {
        channel_1.OUTPUT_CHANNEL.appendLine("Did not find test item: " + testId);
    }
    else {
        switch (event.body.status) {
            case "SKIP":
                testRun.skipped(testItem);
                break;
            case "PASS":
                testRun.passed(testItem, event.body.elapsedtime);
                break;
            case "FAIL":
                testRun.failed(testItem, buildTestMessages(event), event.body.elapsedtime);
                break;
            default:
                testRun.errored(testItem, buildTestMessages(event), event.body.elapsedtime);
                break;
        }
    }
}
//# sourceMappingURL=testview.js.map