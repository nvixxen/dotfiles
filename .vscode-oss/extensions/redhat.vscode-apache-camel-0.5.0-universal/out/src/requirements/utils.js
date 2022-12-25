'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.getJavaConfiguration = void 0;
/* Mostly duplicated from VS Code Java */
const vscode_1 = require("vscode");
function getJavaConfiguration() {
    return vscode_1.workspace.getConfiguration('java');
}
exports.getJavaConfiguration = getJavaConfiguration;
