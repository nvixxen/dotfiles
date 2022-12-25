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
exports.getJavaagentFlag = exports.getKey = exports.checkJavaPreferences = exports.IS_WORKSPACE_VMARGS_ALLOWED = exports.IS_WORKSPACE_JDK_ALLOWED = void 0;
/* Mostly duplicated from VS Code Java */
const path = require("path");
const vscode_1 = require("vscode");
const utils_1 = require("./utils");
exports.IS_WORKSPACE_JDK_ALLOWED = 'java.ls.isJdkAllowed';
exports.IS_WORKSPACE_VMARGS_ALLOWED = 'java.ls.isVmargsAllowed';
function checkJavaPreferences(context) {
    return __awaiter(this, void 0, void 0, function* () {
        const allow = 'Allow';
        const disallow = 'Disallow';
        let javaHome = vscode_1.workspace.getConfiguration().inspect('java.home').workspaceValue;
        let isVerified = javaHome === undefined || javaHome === null;
        if (isVerified) {
            javaHome = (0, utils_1.getJavaConfiguration)().get('home');
        }
        const key = getKey(exports.IS_WORKSPACE_JDK_ALLOWED, context.storagePath, javaHome);
        const globalState = context.globalState;
        if (!isVerified) {
            isVerified = globalState.get(key);
            if (isVerified === undefined) {
                yield vscode_1.window.showErrorMessage(`Security Warning! Do you allow this workspace to set the java.home variable? \n java.home: ${javaHome}`, disallow, allow).then((selection) => __awaiter(this, void 0, void 0, function* () {
                    if (selection === allow) {
                        globalState.update(key, true);
                    }
                    else if (selection === disallow) {
                        globalState.update(key, false);
                        yield vscode_1.workspace.getConfiguration().update('java.home', undefined, vscode_1.ConfigurationTarget.Workspace);
                    }
                }));
                isVerified = globalState.get(key);
            }
        }
        const vmargs = vscode_1.workspace.getConfiguration().inspect('java.jdt.ls.vmargs').workspaceValue;
        if (vmargs !== undefined) {
            const agentFlag = getJavaagentFlag(vmargs);
            if (agentFlag !== null) {
                const keyVmargs = getKey(exports.IS_WORKSPACE_VMARGS_ALLOWED, context.storagePath, vmargs);
                const vmargsVerified = globalState.get(keyVmargs);
                if (vmargsVerified === undefined || vmargsVerified === null) {
                    yield vscode_1.window.showErrorMessage(`Security Warning! The java.jdt.ls.vmargs variable defined in ${vscode_1.env.appName} settings includes the (${agentFlag}) javagent preference. Do you allow it to be used?`, disallow, allow).then((selection) => __awaiter(this, void 0, void 0, function* () {
                        if (selection === allow) {
                            globalState.update(keyVmargs, true);
                        }
                        else if (selection === disallow) {
                            globalState.update(keyVmargs, false);
                            yield vscode_1.workspace.getConfiguration().update('java.jdt.ls.vmargs', undefined, vscode_1.ConfigurationTarget.Workspace);
                        }
                    }));
                }
            }
        }
        if (isVerified) {
            return javaHome;
        }
        else {
            return vscode_1.workspace.getConfiguration().inspect('java.home').globalValue;
        }
    });
}
exports.checkJavaPreferences = checkJavaPreferences;
function getKey(prefix, storagePath, value) {
    const workspacePath = path.resolve(storagePath + '/jdt_ws');
    if (vscode_1.workspace.name !== undefined) {
        return `${prefix}::${workspacePath}::${value}`;
    }
    else {
        return `${prefix}::${value}`;
    }
}
exports.getKey = getKey;
function getJavaagentFlag(vmargs) {
    const javaagent = '-javaagent:';
    const args = vmargs.split(' ');
    let agentFlag = null;
    for (const arg of args) {
        if (arg.startsWith(javaagent)) {
            agentFlag = arg.substring(javaagent.length);
            break;
        }
    }
    return agentFlag;
}
exports.getJavaagentFlag = getJavaagentFlag;
