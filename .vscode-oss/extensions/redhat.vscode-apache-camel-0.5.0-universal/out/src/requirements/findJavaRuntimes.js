"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
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
exports.parseMajorVersion = exports.getJavaVersion = exports.verifyJavaHome = exports.findJavaHomes = void 0;
/* Mostly duplicated from VS Code Java, main difference is that it is checking for JRE, not JDK*/
const cp = require("child_process");
const fse = require("fs-extra");
const _ = require("lodash");
const os = require("os");
const path = require("path");
const expandHomeDir = require('expand-home-dir');
const WinReg = require('winreg-utf8');
const isWindows = process.platform.indexOf('win') === 0;
const isMac = process.platform.indexOf('darwin') === 0;
const isLinux = process.platform.indexOf('linux') === 0;
const JAVA_FILENAME = 'java' + (isWindows ? '.exe' : '');
/**
 * return metadata for all installed JREs.
 */
function findJavaHomes() {
    return __awaiter(this, void 0, void 0, function* () {
        const ret = [];
        const jreMap = new Map();
        updateJREs(jreMap, yield fromEnv('JDK_HOME'), 'env.JDK_HOME');
        updateJREs(jreMap, yield fromEnv('JAVA_HOME'), 'env.JAVA_HOME');
        updateJREs(jreMap, yield fromPath(), 'env.PATH');
        updateJREs(jreMap, yield fromWindowsRegistry(), 'WindowsRegistry');
        updateJREs(jreMap, yield fromCommonPlaces(), 'DefaultLocation');
        for (const elem of jreMap) {
            const home = elem[0];
            const sources = elem[1];
            const version = yield getJavaVersion(home);
            if (version) {
                ret.push({
                    home,
                    sources,
                    version
                });
            }
            else {
                console.warn(`Unknown version of JRE ${home}`);
            }
        }
        return ret;
    });
}
exports.findJavaHomes = findJavaHomes;
function updateJREs(map, newJres, source) {
    for (const newJre of newJres) {
        const sources = map.get(newJre);
        if (sources !== undefined) {
            map.set(newJre, [...sources, source]);
        }
        else {
            map.set(newJre, [source]);
        }
    }
}
function fromEnv(name) {
    return __awaiter(this, void 0, void 0, function* () {
        const ret = [];
        if (process.env[name]) {
            const javaHome = yield verifyJavaHome(process.env[name], JAVA_FILENAME);
            if (javaHome) {
                ret.push(javaHome);
            }
        }
        return ret;
    });
}
function fromPath() {
    return __awaiter(this, void 0, void 0, function* () {
        const ret = [];
        const paths = process.env.PATH ? process.env.PATH.split(path.delimiter).filter(Boolean) : [];
        for (const p of paths) {
            const proposed = path.dirname(p); // remove 'bin'
            const javaHome = yield verifyJavaHome(proposed, JAVA_FILENAME);
            if (javaHome) {
                ret.push(javaHome);
            }
            if (isMac) {
                let dir = expandHomeDir(p);
                dir = yield findLinkedFile(dir);
                // on mac, java install has a utility script called java_home
                const macUtility = path.join(dir, 'java_home');
                if (yield fse.pathExists(macUtility)) {
                    let buffer;
                    try {
                        buffer = cp.execSync(macUtility, { cwd: dir });
                        const absoluteJavaHome = '' + buffer.toString().replace(/\n$/, '');
                        const verified = yield verifyJavaHome(absoluteJavaHome, JAVA_FILENAME);
                        if (verified) {
                            ret.push(absoluteJavaHome);
                        }
                    }
                    catch (error) {
                        // do nothing
                    }
                }
            }
        }
        if (isMac) {
            // Exclude /usr, because in macOS Big Sur /usr/bin/javac is no longer symlink.
            // See https://github.com/redhat-developer/vscode-java/issues/1700#issuecomment-729478810
            return ret.filter(item => item !== '/usr');
        }
        else {
            return ret;
        }
    });
}
function fromWindowsRegistry() {
    return __awaiter(this, void 0, void 0, function* () {
        if (!isWindows) {
            return [];
        }
        const keyPaths = [
            '\\SOFTWARE\\JavaSoft\\JDK',
            '\\SOFTWARE\\JavaSoft\\Java Development Kit'
        ];
        const promisifyFindPossibleRegKey = (keyPath, regArch) => {
            return new Promise((resolve) => {
                const winreg = new WinReg({
                    hive: WinReg.HKLM,
                    key: keyPath,
                    arch: regArch
                });
                winreg.keys((err, result) => {
                    if (err) {
                        return resolve([]);
                    }
                    resolve(result);
                });
            });
        };
        const promisifyFindJavaHomeInRegKey = (reg) => {
            return new Promise((resolve) => {
                reg.get('JavaHome', (err, home) => {
                    if (err || !home) {
                        return resolve(null);
                    }
                    resolve(home.value);
                });
            });
        };
        const promises = [];
        for (const arch of ['x64', 'x86']) {
            for (const keyPath of keyPaths) {
                promises.push(promisifyFindPossibleRegKey(keyPath, arch));
            }
        }
        const keysFoundSegments = yield Promise.all(promises);
        const keysFound = Array.prototype.concat.apply([], keysFoundSegments);
        if (!keysFound.length) {
            return [];
        }
        const sortedKeysFound = keysFound.sort((a, b) => {
            const aVer = parseFloat(a.key);
            const bVer = parseFloat(b.key);
            return bVer - aVer;
        });
        const javaHomes = [];
        for (const key of sortedKeysFound) {
            const candidate = yield promisifyFindJavaHomeInRegKey(key);
            if (candidate) {
                javaHomes.push(candidate);
            }
        }
        const ret = [];
        for (const proposed of javaHomes) {
            const javaHome = yield verifyJavaHome(proposed, JAVA_FILENAME);
            if (javaHome) {
                ret.push(javaHome);
            }
        }
        return ret;
    });
}
function fromCommonPlaces() {
    return __awaiter(this, void 0, void 0, function* () {
        const ret = [];
        // common place for mac
        if (isMac) {
            const jvmStore = '/Library/Java/JavaVirtualMachines';
            const subfolder = 'Contents/Home';
            let jvms = [];
            try {
                jvms = yield fse.readdir(jvmStore);
            }
            catch (error) {
                // ignore
            }
            for (const jvm of jvms) {
                const proposed = path.join(jvmStore, jvm, subfolder);
                const javaHome = yield verifyJavaHome(proposed, JAVA_FILENAME);
                if (javaHome) {
                    ret.push(javaHome);
                }
            }
        }
        // common place for Windows
        if (isWindows) {
            const localAppDataFolder = process.env.LOCALAPPDATA ? process.env.LOCALAPPDATA : path.join(os.homedir(), 'AppData', 'Local');
            const possibleLocations = [
                process.env.ProgramFiles && path.join(process.env.ProgramFiles, 'Java'),
                process.env.ProgramW6432 && path.join(process.env.ProgramW6432, 'Java'),
                process.env.ProgramFiles && path.join(process.env.ProgramFiles, 'AdoptOpenJDK'),
                process.env.ProgramW6432 && path.join(process.env.ProgramW6432, 'AdoptOpenJDK'),
                path.join(localAppDataFolder, 'Programs', 'AdoptOpenJDK'), // AdoptOpenJDK per user
            ].filter(Boolean);
            const jvmStores = _.uniq(possibleLocations);
            for (const jvmStore of jvmStores) {
                let jvms = [];
                try {
                    jvms = yield fse.readdir(jvmStore);
                }
                catch (error) {
                    // ignore
                }
                for (const jvm of jvms) {
                    const proposed = path.join(jvmStore, jvm);
                    const javaHome = yield verifyJavaHome(proposed, JAVA_FILENAME);
                    if (javaHome) {
                        ret.push(javaHome);
                    }
                }
            }
        }
        // common place for Linux
        if (isLinux) {
            const jvmStore = '/usr/lib/jvm';
            let jvms = [];
            try {
                jvms = yield fse.readdir(jvmStore);
            }
            catch (error) {
                // ignore
            }
            for (const jvm of jvms) {
                const proposed = path.join(jvmStore, jvm);
                const javaHome = yield verifyJavaHome(proposed, JAVA_FILENAME);
                if (javaHome) {
                    ret.push(javaHome);
                }
            }
        }
        return ret;
    });
}
function verifyJavaHome(raw, javaFilename) {
    return __awaiter(this, void 0, void 0, function* () {
        const dir = expandHomeDir(raw);
        const targetJavaFile = yield findLinkedFile(path.resolve(dir, 'bin', javaFilename));
        const proposed = path.dirname(path.dirname(targetJavaFile));
        if ((yield fse.pathExists(proposed))
            && (yield fse.pathExists(path.resolve(proposed, 'bin', javaFilename)))) {
            return proposed;
        }
        return undefined;
    });
}
exports.verifyJavaHome = verifyJavaHome;
// iterate through symbolic links until file is found
function findLinkedFile(file) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!(yield fse.pathExists(file)) || !(yield fse.lstat(file)).isSymbolicLink()) {
            return file;
        }
        return findLinkedFile(yield fse.readlink(file));
    });
}
function getJavaVersion(javaHome) {
    return __awaiter(this, void 0, void 0, function* () {
        let javaVersion = yield checkVersionInReleaseFile(javaHome);
        if (!javaVersion) {
            javaVersion = yield checkVersionByCLI(javaHome);
        }
        return javaVersion;
    });
}
exports.getJavaVersion = getJavaVersion;
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
/**
 * Get version by checking file JAVA_HOME/release
 */
function checkVersionInReleaseFile(javaHome) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!javaHome) {
            return 0;
        }
        const releaseFile = path.join(javaHome, 'release');
        if (!(yield fse.pathExists(releaseFile))) {
            return 0;
        }
        try {
            const content = yield fse.readFile(releaseFile);
            const regexp = /^JAVA_VERSION="(.*)"/gm;
            const match = regexp.exec(content.toString());
            if (!match) {
                return 0;
            }
            const majorVersion = parseMajorVersion(match[1]);
            return majorVersion;
        }
        catch (error) {
            // ignore
        }
        return 0;
    });
}
/**
 * Get version by parsing `JAVA_HOME/bin/java -version`
 */
function checkVersionByCLI(javaHome) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!javaHome) {
            return 0;
        }
        return new Promise((resolve) => {
            const javaBin = path.join(javaHome, 'bin', JAVA_FILENAME);
            cp.execFile(javaBin, ['-version'], {}, (error, stdout, stderr) => {
                const regexp = /version "(.*)"/g;
                const match = regexp.exec(stderr);
                if (!match) {
                    return resolve(0);
                }
                const javaVersion = parseMajorVersion(match[1]);
                resolve(javaVersion);
            });
        });
    });
}
