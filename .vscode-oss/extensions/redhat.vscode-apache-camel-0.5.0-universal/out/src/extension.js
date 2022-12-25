'use strict';
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
exports.parseVMargs = exports.deactivate = exports.activate = void 0;
const path = require("path");
const vscode_1 = require("vscode");
const vscode_languageclient_1 = require("vscode-languageclient");
const node_1 = require("vscode-languageclient/node");
const JavaManager_1 = require("./requirements/JavaManager");
const requirements = require("./requirements/requirements");
const telemetry = require("./Telemetry");
const LANGUAGE_CLIENT_ID = 'LANGUAGE_ID_APACHE_CAMEL';
const SETTINGS_TOP_LEVEL_KEY_CAMEL = 'camel';
let languageClient;
const SUPPORTED_LANGUAGE_IDS = ['xml', 'java', 'groovy', 'kotlin', 'javascript', 'properties', 'quarkus-properties', 'spring-boot-properties', 'yaml'];
function activate(context) {
    return __awaiter(this, void 0, void 0, function* () {
        // Let's enable Javadoc symbols autocompletion, shamelessly copied from MIT licensed code at
        // https://github.com/Microsoft/vscode/blob/9d611d4dfd5a4a101b5201b8c9e21af97f06e7a7/extensions/typescript/src/typescriptMain.ts#L186
        vscode_1.languages.setLanguageConfiguration('xml', {
            // eslint-disable-next-line
            wordPattern: /(-?\d*\.\d\w*)|([^\`\~\!\@\#\%\^\&\*\(\)\-\=\+\[\{\]\}\\\|\;\:\'\"\,\.\<\>\/\?\s]+)/g,
        });
        yield telemetry.initializeTelemetry(context);
        const camelLanguageServerPath = context.asAbsolutePath(path.join('jars', 'language-server.jar'));
        console.log(camelLanguageServerPath);
        const requirementsData = yield computeRequirementsData(context);
        const serverOptions = {
            command: (0, JavaManager_1.retrieveJavaExecutable)(requirementsData),
            args: ['-jar', camelLanguageServerPath]
        };
        // Options to control the language client
        const clientOptions = {
            documentSelector: SUPPORTED_LANGUAGE_IDS,
            synchronize: {
                configurationSection: ['camel', 'xml', 'java', 'groovy', 'kotlin', 'javascript', 'properties', 'quarkus-properties', 'spring-boot-properties', 'yaml'],
                // Notify the server about file changes to .xml files contain in the workspace
                fileEvents: [
                    vscode_1.workspace.createFileSystemWatcher('**/*.xml'),
                    vscode_1.workspace.createFileSystemWatcher('**/*.java'),
                    vscode_1.workspace.createFileSystemWatcher('**/*.groovy'),
                    vscode_1.workspace.createFileSystemWatcher('**/*.kts'),
                    vscode_1.workspace.createFileSystemWatcher('**/*.js'),
                    vscode_1.workspace.createFileSystemWatcher('**/*.properties'),
                    vscode_1.workspace.createFileSystemWatcher('**/*.yaml')
                ],
            },
            initializationOptions: {
                settings: getCamelSettings()
            },
            middleware: {
                workspace: {
                    didChangeConfiguration: () => __awaiter(this, void 0, void 0, function* () {
                        yield languageClient.sendNotification(vscode_languageclient_1.DidChangeConfigurationNotification.type, { settings: getCamelSettings() });
                    })
                }
            }
        };
        const item = vscode_1.window.createStatusBarItem(vscode_1.StatusBarAlignment.Right, Number.MIN_VALUE);
        item.name = 'Camel Language Server';
        item.text = 'Camel LS $(sync~spin)';
        item.tooltip = 'Language Server for Apache Camel is starting...';
        toggleItem(vscode_1.window.activeTextEditor, item);
        // Create the language client and start the client.
        languageClient = new node_1.LanguageClient(LANGUAGE_CLIENT_ID, 'Language Support for Apache Camel', serverOptions, clientOptions);
        try {
            yield languageClient.start();
            item.text = 'Camel LS $(thumbsup)';
            item.tooltip = 'Language Server for Apache Camel started';
            toggleItem(vscode_1.window.activeTextEditor, item);
            vscode_1.commands.registerCommand('apache.camel.open.output', () => {
                languageClient.outputChannel.show();
            });
            languageClient.onTelemetry((e) => __awaiter(this, void 0, void 0, function* () {
                return (yield telemetry.getTelemetryServiceInstance()).send(e);
            }));
        }
        catch (error) {
            item.text = 'Camel LS $(thumbsdown)';
            item.tooltip = 'Language Server for Apache Camel failed to start';
            console.log(error);
        }
        vscode_1.window.onDidChangeActiveTextEditor((editor) => {
            toggleItem(editor, item);
        });
        (yield telemetry.getTelemetryServiceInstance()).sendStartupEvent();
    });
}
exports.activate = activate;
function deactivate() {
    return __awaiter(this, void 0, void 0, function* () {
        if (languageClient) {
            yield languageClient.stop();
        }
    });
}
exports.deactivate = deactivate;
function computeRequirementsData(context) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield requirements.resolveRequirements(context);
        }
        catch (error) {
            // show error
            const selection = yield vscode_1.window.showErrorMessage(error.message, error.label);
            if (error.label && error.label === selection && error.command) {
                vscode_1.commands.executeCommand(error.command, error.commandParam);
            }
            // rethrow to disrupt the chain.
            throw error;
        }
    });
}
function getCamelSettings() {
    const camelXMLConfig = vscode_1.workspace.getConfiguration(SETTINGS_TOP_LEVEL_KEY_CAMEL);
    return { [SETTINGS_TOP_LEVEL_KEY_CAMEL]: JSON.parse(JSON.stringify(camelXMLConfig)) };
}
function toggleItem(editor, item) {
    if (editor && editor.document && SUPPORTED_LANGUAGE_IDS.includes(editor.document.languageId)) {
        item.show();
    }
    else {
        item.hide();
    }
}
function parseVMargs(params, vmargsLine) {
    if (!vmargsLine) {
        return;
    }
    const vmargs = vmargsLine.match(/(?:[^\s"]+|"[^"]*")+/g);
    if (vmargs === null) {
        return;
    }
    vmargs.forEach(arg => {
        //remove all standalone double quotes
        arg = arg.replace(/(\\)?"/g, function ($0, $1) { return ($1 ? $0 : ''); });
        //unescape all escaped double quotes
        arg = arg.replace(/(\\)"/g, '"');
        if (params.indexOf(arg) < 0) {
            params.push(arg);
        }
    });
}
exports.parseVMargs = parseVMargs;
