"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupDebugSessionOutViewIntegration = exports.globalOutputViewState = void 0;
/**
 * This module provides the integration for providing contents to the output view.
 *
 * There are 2 sources of information to the output view:
 *
 * 1. Files in the filesystem:
 *      In this case, whenever the user selects a file which can have output
 *      information we should register the file and provide its content.
 *      Note that if the file is changed while tracking it we should notify
 *      the view accordingly.
 *
 * 2. Runs in memory:
 *      In this case, the idea is that when a run is done we can start collecting
 *      its information so that we can show what's happening with it.
 *
 * Also, note that the idea is that the output view acts only on 1 run, so,
 * all the state management related to keeping the state of a run must be
 * done in the extension side.
 */
const vscode = require("vscode");
const channel_1 = require("../channel");
const testview_1 = require("../testview");
class Contents {
    constructor(uniqueRunId, label, contents) {
        this.uniqueRunId = uniqueRunId;
        this.label = label;
        this.contents = [contents];
    }
    getFullContents() {
        return this.contents.join("");
    }
    addContent(line) {
        this.contents.push(line);
    }
}
class OutputViewState {
    constructor(storageUri, workspaceState) {
        this.storageUri = undefined;
        this.workspaceState = undefined;
        // NOTE: uniqueRunIds is a FIFO
        this.uniqueRunIds = [];
        this.runIdToContents = new Map();
        this.storageUri = storageUri;
        this.workspaceState = workspaceState;
    }
    async setWebview(webview) {
        this.webview = webview;
    }
    updateAfterVisible() {
        if (this.currentRunUniqueId !== undefined) {
            this.setCurrentRunId(this.currentRunUniqueId);
        }
    }
    async setCurrentRunId(uniqueRunId) {
        this.currentRunUniqueId = uniqueRunId;
        const webview = this.webview;
        if (webview !== undefined) {
            const contents = this.runIdToContents.get(uniqueRunId);
            if (contents === undefined) {
                channel_1.OUTPUT_CHANNEL.appendLine("No contents registered for runId: " + uniqueRunId);
                return;
            }
            const allRunIdsToLabel = {};
            for (const rId of this.uniqueRunIds) {
                const c = this.runIdToContents.get(rId);
                if (c !== undefined) {
                    allRunIdsToLabel[rId] = c.label;
                }
            }
            const msg = {
                type: "request",
                command: "setContents",
                "initialContents": contents.getFullContents(),
                "runId": uniqueRunId,
                "allRunIdsToLabel": allRunIdsToLabel,
            };
            webview.postMessage(msg);
        }
    }
    /**
     * @param runId the run id which should be tracked.
     */
    async addRun(uniqueRunId, label, contents) {
        this.uniqueRunIds.push(uniqueRunId);
        const MAX_RUNS_SHOWN = 15;
        while (this.uniqueRunIds.length > MAX_RUNS_SHOWN) {
            // NOTE: uniqueRunIds is a FIFO
            let removeI = 0;
            let removeRunId = this.uniqueRunIds[removeI];
            this.runIdToContents.delete(removeRunId);
            this.uniqueRunIds.splice(removeI, 1);
        }
        this.runIdToContents.set(uniqueRunId, new Contents(uniqueRunId, label, contents));
        await this.setCurrentRunId(uniqueRunId);
    }
    async setRunLabel(uniqueRunId, label) {
        const contents = this.runIdToContents.get(uniqueRunId);
        if (contents !== undefined) {
            contents.label = label;
            const webview = this.webview;
            if (webview !== undefined) {
                const msg = {
                    type: "request",
                    command: "updateLabel",
                    "runId": uniqueRunId,
                    "label": label,
                };
                webview.postMessage(msg);
            }
        }
    }
    async appendToRunContents(uniqueRunId, line) {
        const runContents = this.runIdToContents.get(uniqueRunId);
        if (runContents !== undefined) {
            runContents.addContent(line);
        }
        if (uniqueRunId === this.currentRunUniqueId) {
            const webview = this.webview;
            if (webview !== undefined) {
                const msg = {
                    type: "request",
                    command: "appendContents",
                    "appendContents": line,
                    "runId": uniqueRunId,
                };
                webview.postMessage(msg);
            }
        }
    }
}
function isRelatedSession(session) {
    return session.configuration.type === "robotframework-lsp";
}
/**
 * Must provide a unique id that is different even across restarts.
 */
function getUniqueId(session) {
    return session.id;
}
function getLabel(session) {
    let label = session.configuration.runId;
    if (!label) {
        label = session.configuration.label;
        if (!label) {
            label = (0, testview_1.nextRunId)();
            session.configuration.label = label;
        }
    }
    return label;
}
async function setupDebugSessionOutViewIntegration(context) {
    exports.globalOutputViewState = new OutputViewState(context.storageUri, context.workspaceState);
    vscode.debug.onDidStartDebugSession((session) => {
        if (isRelatedSession(session)) {
            const label = getLabel(session);
            exports.globalOutputViewState.addRun(getUniqueId(session), label, "");
        }
    });
    vscode.debug.onDidTerminateDebugSession((session) => {
        if (isRelatedSession(session)) {
            const label = getLabel(session);
            exports.globalOutputViewState.setRunLabel(getUniqueId(session), label + " (finished)");
        }
    });
    vscode.debug.onDidReceiveDebugSessionCustomEvent((event) => {
        if (isRelatedSession(event.session)) {
            if (event.event === "rfStream") {
                // OUTPUT_CHANNEL.appendLine("Received event: " + event.event + " -- " + JSON.stringify(event.body));
                const uniqueRunId = getUniqueId(event.session);
                const msg = event.body["msg"];
                exports.globalOutputViewState.appendToRunContents(uniqueRunId, msg);
            }
        }
    });
}
exports.setupDebugSessionOutViewIntegration = setupDebugSessionOutViewIntegration;
//# sourceMappingURL=outViewRunIntegration.js.map