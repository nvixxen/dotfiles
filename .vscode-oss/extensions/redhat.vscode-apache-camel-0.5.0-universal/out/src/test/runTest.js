"use strict";
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
const test_electron_1 = require("@vscode/test-electron");
const cp = require("child_process");
const path = require("path");
function runTest() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const extensionDevelopmentPath = path.resolve(__dirname, '../../../');
            const extensionTestsPath = path.resolve(__dirname, './');
            const testWorkspace = path.resolve(__dirname, '../../../test Fixture with speci@l chars');
            const vscodeVersion = computeVSCodeVersionToPlayTestWith();
            const vscodeExecutablePath = yield (0, test_electron_1.downloadAndUnzipVSCode)(vscodeVersion);
            console.log(`vscodeExecutablePath = ${vscodeExecutablePath}`);
            const [cliPath, ...args] = (0, test_electron_1.resolveCliArgsFromVSCodeExecutablePath)(vscodeExecutablePath);
            cp.spawnSync(cliPath, [...args, '--install-extension', 'redhat.vscode-quarkus', '--force'], {
                encoding: 'utf-8',
                stdio: 'inherit'
            });
            yield (0, test_electron_1.runTests)({
                extensionDevelopmentPath,
                extensionTestsPath,
                launchArgs: [testWorkspace, '--disable-workspace-trust']
            });
        }
        catch (err) {
            console.error('Failed to run tests!');
            process.exit(1);
        }
        function computeVSCodeVersionToPlayTestWith() {
            const envVersion = process.env.CODE_VERSION;
            if (envVersion) {
                return envVersion;
            }
            return 'stable';
        }
    });
}
runTest();
