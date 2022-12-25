"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RobotOutputViewProvider = void 0;
const util_1 = require("util");
const vscode = require("vscode");
const common_1 = require("../common");
const files_1 = require("../files");
const outViewRunIntegration_1 = require("./outViewRunIntegration");
class RobotOutputViewProvider {
    constructor(context) {
        this.localResourceRoot = undefined;
        // We can use this as a place to store the run results we've seen.
        this.storageUri = undefined;
        this.updateDebounced = (0, common_1.debounce)(() => {
            this._doUpdate();
        }, 500);
        this.extensionUri = context.extensionUri;
        this.storageUri = context.storageUri;
        // Constructor is called only once, afterwards it just resolves...
        context.subscriptions.push(vscode.window.onDidChangeActiveTextEditor(() => {
            this.update();
        }));
    }
    resolveWebviewView(webviewView, context, token) {
        async function showSourceAtLineno(source, lineno) {
            lineno -= 1;
            const start = new vscode.Position(lineno, 0);
            const options = { selection: new vscode.Selection(start, start) };
            const editor = await vscode.window.showTextDocument(vscode.Uri.file(source), options);
        }
        this.view = webviewView;
        webviewView.webview.onDidReceiveMessage(async (message) => {
            if (message.type == "event") {
                if (message.event == "onClickReference") {
                    const data = message.data;
                    if (data) {
                        let source = data["source"];
                        let lineno = data["lineno"];
                        if (source && lineno && lineno > 0) {
                            showSourceAtLineno(source, lineno);
                        }
                        else if (data["messageType"] === "ST") {
                            // Tests have a line but the source comes from the suite.
                            if (lineno && lineno > 0) {
                                const scope = data["scope"];
                                if (scope !== undefined && scope.length > 0) {
                                    const parentMsg = scope[0];
                                    source = parentMsg["decoded"].suite_source;
                                    if (source && (0, files_1.isFile)(source)) {
                                        showSourceAtLineno(source, lineno);
                                    }
                                }
                            }
                        }
                    }
                }
                else if (message.event === "onSetCurrentRunId") {
                    const data = message.data;
                    if (data) {
                        outViewRunIntegration_1.globalOutputViewState.setCurrentRunId(data["runId"]);
                    }
                }
            }
        });
        webviewView.onDidChangeVisibility(() => {
            if (!this.view || !this.view.visible) {
                outViewRunIntegration_1.globalOutputViewState.setWebview(undefined);
            }
            else {
                outViewRunIntegration_1.globalOutputViewState.setWebview(this.view.webview);
                outViewRunIntegration_1.globalOutputViewState.updateAfterVisible();
            }
            // Can be used in dev to update the whole HTML instead of just the contents.
            // this.updateHTML(undefined);
            this.update();
        });
        webviewView.onDidDispose(() => {
            outViewRunIntegration_1.globalOutputViewState.setWebview(undefined);
            this.view = undefined;
        });
        outViewRunIntegration_1.globalOutputViewState.setWebview(this.view.webview);
        this.updateHTML(token);
    }
    async updateHTML(token) {
        if (!this.localResourceRoot) {
            this.localResourceRoot = await getLocalResourceRoot(this.extensionUri);
        }
        const localResourceRoots = [];
        if (this.localResourceRoot) {
            localResourceRoots.push(this.localResourceRoot);
        }
        if (token?.isCancellationRequested) {
            return;
        }
        const webviewView = this.view;
        webviewView.webview.options = {
            enableScripts: true,
            localResourceRoots: localResourceRoots,
        };
        let html;
        try {
            const indexHTML = vscode.Uri.joinPath(this.localResourceRoot, "index.html");
            const indexContents = await vscode.workspace.fs.readFile(indexHTML);
            if (token?.isCancellationRequested) {
                return;
            }
            const decoded = new util_1.TextDecoder("utf-8").decode(indexContents);
            const scriptUri = this.view.webview.asWebviewUri(vscode.Uri.joinPath(this.localResourceRoot, "bundle.js"));
            html = decoded.replaceAll("bundle.js", scriptUri.toString());
        }
        catch (error) {
            html = "Error loading HTML: " + error;
        }
        webviewView.webview.html = html;
        outViewRunIntegration_1.globalOutputViewState.updateAfterVisible();
        this.update();
    }
    async update() {
        this.updateDebounced();
    }
    async _doUpdate() {
        if (!this.view || !this.view.visible) {
            return;
        }
        if (this.loading) {
            this.loading.cts.cancel();
            this.loading = undefined;
        }
        const loadingEntry = { cts: new vscode.CancellationTokenSource() };
        this.loading = loadingEntry;
        const updatePromise = (async () => {
            if (this.loading !== loadingEntry) {
                return;
            }
            this.loading = undefined;
            if (this.view && this.view.visible) {
                this.onUpdatedEditorSelection(loadingEntry.cts.token);
            }
        })();
        await Promise.race([
            updatePromise,
            new Promise((resolve) => setTimeout(resolve, 250)).then(() => {
                if (loadingEntry.cts.token.isCancellationRequested) {
                    return;
                }
                return vscode.window.withProgress({ location: { viewId: RobotOutputViewProvider.viewType } }, () => updatePromise);
            }),
        ]);
    }
    async onUpdatedEditorSelection(token) {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            return;
        }
        if (token.isCancellationRequested) {
            return;
        }
        const filePath = editor.document.uri.fsPath;
        if (!filePath.endsWith(".xml") && !filePath.endsWith(".rfstream")) {
            return;
        }
        const currDoc = editor.document;
        let text = currDoc.getText();
        if (filePath.endsWith(".xml")) {
            // We need to convert it to the rfstream format first.
            const converted = await vscode.commands.executeCommand("robot.convertOutputXMLToRobostream", {
                "xml_contents": text,
            });
            if (token.isCancellationRequested) {
                return;
            }
            if (!converted) {
                return;
            }
            text = converted;
        }
        await outViewRunIntegration_1.globalOutputViewState.addRun(filePath, filePath, text);
    }
}
exports.RobotOutputViewProvider = RobotOutputViewProvider;
RobotOutputViewProvider.viewType = "robot.view.output";
async function getLocalResourceRoot(extensionUri) {
    let localResourceRoot = vscode.Uri.joinPath(extensionUri, "src", "robotframework_ls", "vendored", "output-webview");
    if (!(await (0, files_1.uriExists)(localResourceRoot))) {
        // In dev mode we expect the:
        // "robotframework-output-stream"
        // project to be checked out right next to the
        // "robotframework-lsp"
        // project.
        const checkUri = vscode.Uri.joinPath(extensionUri, "..", "..", "robotframework-output-stream", "output-webview", "dist");
        if (!(await (0, files_1.uriExists)(checkUri))) {
            vscode.window.showErrorMessage("Unable to find robot output webview in:\n[" +
                localResourceRoot.fsPath +
                "],\n[" +
                checkUri.fsPath +
                "]");
            return;
        }
        localResourceRoot = checkUri;
    }
    return localResourceRoot;
}
//# sourceMappingURL=outView.js.map