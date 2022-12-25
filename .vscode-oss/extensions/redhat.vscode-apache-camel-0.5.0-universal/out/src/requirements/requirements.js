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
exports.parseMajorVersion = exports.resolveRequirements = void 0;
/* Mostly duplicated from VS Code Java */
const vscode_1 = require("vscode");
const path = require("path");
const fse = require("fs-extra");
const expandHomeDir = require("expand-home-dir");
const commands_1 = require("./commands");
const settings_1 = require("./settings");
const findJavaRuntimes_1 = require("./findJavaRuntimes");
const isWindows = process.platform.indexOf('win') === 0;
const JAVA_FILENAME = 'java' + (isWindows ? '.exe' : '');
const REQUIRED_JRE_VERSION = 11;
/**
 * Resolves the requirements needed to run the extension.
 * Returns a promise that will resolve to a RequirementsData if
 * all requirements are resolved, it will reject with ErrorData if
 * if any of the requirements fails to resolve.
 *
 */
function resolveRequirements(context) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            let source;
            let javaVersion = 0;
            let javaHome = yield (0, settings_1.checkJavaPreferences)(context);
            if (javaHome) {
                // java.home explictly specified
                source = `java.home variable defined in ${vscode_1.env.appName} settings`;
                javaHome = expandHomeDir(javaHome);
                if (!(yield fse.pathExists(javaHome))) {
                    invalidJavaHome(reject, `The ${source} points to a missing or inaccessible folder (${javaHome})`);
                }
                else if (!(yield fse.pathExists(path.resolve(javaHome, 'bin', JAVA_FILENAME)))) {
                    let msg;
                    if (yield fse.pathExists(path.resolve(javaHome, JAVA_FILENAME))) {
                        msg = `'bin' should be removed from the ${source} (${javaHome})`;
                    }
                    else {
                        msg = `The ${source} (${javaHome}) does not point to a JRE.`;
                    }
                    invalidJavaHome(reject, msg);
                }
                javaVersion = yield (0, findJavaRuntimes_1.getJavaVersion)(javaHome);
            }
            else {
                // java.home not specified, search valid REs from env.JAVA_HOME, env.PATH, Registry(Window), Common directories
                const javaRuntimes = yield (0, findJavaRuntimes_1.findJavaHomes)();
                const validJres = javaRuntimes.filter(r => r.version >= REQUIRED_JRE_VERSION);
                if (validJres.length > 0) {
                    sortJdksBySource(validJres);
                    javaHome = validJres[0].home;
                    javaVersion = validJres[0].version;
                }
            }
            if (javaVersion < REQUIRED_JRE_VERSION) {
                openJDKDownload(reject, `Java ${REQUIRED_JRE_VERSION} or more recent is required to run the Java extension. Please download and install a recent JDK. You can still compile your projects with older JDKs by configuring ['java.configuration.runtimes'](https://github.com/redhat-developer/vscode-java/wiki/JDK-Requirements#java.configuration.runtimes)`);
            }
            resolve({ java_home: javaHome, java_version: javaVersion });
        }));
    });
}
exports.resolveRequirements = resolveRequirements;
function sortJdksBySource(jdks) {
    const rankedJres = jdks;
    const sources = ['env.JDK_HOME', 'env.JAVA_HOME', 'env.PATH'];
    for (const [index, source] of sources.entries()) {
        for (const jre of rankedJres) {
            if (jre.rank === undefined && jre.sources.includes(source)) {
                jre.rank = index;
            }
        }
    }
    rankedJres.filter(jre => jre.rank === undefined).forEach(jre => jre.rank = sources.length);
    rankedJres.sort((a, b) => a.rank - b.rank);
}
function parseMajorVersion(version) {
    if (!version) {
        return 0;
    }
    // Ignore '1.' prefix for legacy Java versions
    if (version.startsWith('1.')) {
        version = version.substring(2);
    }
    // look into the interesting bits now
    const regexp = /\d+/g;
    const match = regexp.exec(version);
    let javaVersion = 0;
    if (match) {
        javaVersion = parseInt(match[0]);
    }
    return javaVersion;
}
exports.parseMajorVersion = parseMajorVersion;
function openJDKDownload(reject, cause) {
    const jdkUrl = getJdkUrl();
    reject({
        message: cause,
        label: 'Get the Java Development Kit',
        command: commands_1.Commands.OPEN_BROWSER,
        commandParam: vscode_1.Uri.parse(jdkUrl),
    });
}
function getJdkUrl() {
    let jdkUrl = 'https://developers.redhat.com/products/openjdk/download/?sc_cid=701f2000000RWTnAAO';
    if (process.platform === 'darwin') {
        jdkUrl = 'https://adoptopenjdk.net/';
    }
    return jdkUrl;
}
function invalidJavaHome(reject, cause) {
    if (cause.indexOf('java.home') > -1) {
        reject({
            message: cause,
            label: 'Open settings',
            command: commands_1.Commands.OPEN_JSON_SETTINGS
        });
    }
    else {
        reject({
            message: cause,
        });
    }
}
