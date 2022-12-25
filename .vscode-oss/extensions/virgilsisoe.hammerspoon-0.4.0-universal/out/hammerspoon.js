"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.outputConsole = exports.filterOutput = exports.getHsConsoleOutput = exports.getHelperData = exports.getDocumentation = exports.getConstructor = exports.getMethodCompletion = exports.getModuleCompletion = exports.hsModules = exports.getSpoonsDirectory = void 0;
const fs = require("fs");
const os = require("os");
const path = require("path");
const vscode = require("vscode");
const utils = require("./utils");
const spoons_1 = require("./spoons");
const hsDocsPath = path.join(path.resolve(__dirname, ".."), "resources", "hs_docs");
const dataTypes = {
    variable: vscode.CompletionItemKind.Variable,
    function: vscode.CompletionItemKind.Function,
    method: vscode.CompletionItemKind.Method,
    module: vscode.CompletionItemKind.Module,
    field: vscode.CompletionItemKind.Field,
    constant: vscode.CompletionItemKind.Constant,
    constructor: vscode.CompletionItemKind.Constructor,
};
/**
 * Show the Spoons directories suggestion.
 *
 * @returns a list of completion suggestions
 */
function getSpoonsDirectory() {
    const items = [];
    // getSpoonRootDir might be the same as the default, so use a Set to avoid duplicate
    const spoonsDir = new Set([(0, spoons_1.getSpoonRootDir)(), `${os.homedir()}/.hammerspoon/Spoons`]);
    for (const dir of spoonsDir) {
        const spoonDir = fs.readdirSync(dir);
        spoonDir.forEach((spoon) => {
            if (spoon.endsWith(".spoon")) {
                const file = fs.readFileSync(`${dir}/${spoon}/init.lua`, "utf-8");
                spoon = spoon.replace(".spoon", "");
                const spoonItem = new vscode.CompletionItem(spoon, vscode.CompletionItemKind.Value);
                spoonItem.detail = dir;
                const matchDoc = /^---.+?(?=local)/s.exec(file);
                if (matchDoc) {
                    spoonItem.documentation = matchDoc[0];
                }
                items.push(spoonItem);
            }
        });
    }
    return items;
}
exports.getSpoonsDirectory = getSpoonsDirectory;
/**
 * Get the list of all hs modules.
 *
 * @returns list of all hs modules
 */
function hsModules() {
    const modules = [];
    fs.readdirSync(hsDocsPath, { withFileTypes: true })
        .filter((dirent) => dirent.isFile())
        .map((dirent) => dirent.name)
        .forEach((file) => {
        if (file.endsWith("json")) {
            modules.push(file.replace("json", ""));
        }
    });
    return modules;
}
exports.hsModules = hsModules;
/**
 * Get the hs module and return the corresponding data.
 *
 * @param name name of the module to parse
 * @returns object data for the hs module
 */
function parseModule(name) {
    name = name.endsWith(".") ? name : name + ".";
    const file = path.join(hsDocsPath, name + "json");
    if (!fs.existsSync(file)) {
        return null;
    }
    return JSON.parse(fs.readFileSync(file, "utf-8"));
}
/**
 * Get all of item of a module to suggest as autocompletion.
 *
 * @param name name of the hs module to parse
 * @param isMethod true if completion should return only methods, false if completion
 * should return every but methods.
 * @returns a list of completion suggestions or null
 */
function getCompletion(name, isMethod) {
    const moduleData = parseModule(name);
    if (!moduleData) {
        return null;
    }
    const items = [];
    for (const [module, data] of Object.entries(moduleData)) {
        if (!isMethod && data.type === "Method") {
            continue;
        }
        if (isMethod && data.type !== "Method") {
            continue;
        }
        const submodule = new vscode.CompletionItem(module, dataTypes[data.type.toLowerCase()]);
        submodule.documentation = data.doc;
        items.push(submodule);
    }
    return items;
}
/**
 * Get completion suggestions for a module
 *
 * @param name name of the module
 * @returns a list of completion suggestions or null
 */
function getModuleCompletion(name) {
    return getCompletion(name, false);
}
exports.getModuleCompletion = getModuleCompletion;
/**
 * Get completion suggestions for a module
 *
 * @param name name of the module
 * @returns a list of completion suggestions or null
 */
function getMethodCompletion(name) {
    return getCompletion(name, true);
}
exports.getMethodCompletion = getMethodCompletion;
/**
 * Parse the return to extract its value.
 *
 * If text contains an hs.declaration will return that, otherwise the entire match.
 *
 * @param text the text to parse for the return
 * @returns the parsed return string.
 */
function parseReturn(text) {
    // TODO: setting that allows to return guessed return
    if (/->/.test(text)) {
        const hsReturn = text.replace(/(.+?)?->/, "");
        const searchHsModule = /(hs(?:\.(?:\w+))+)(?=.+\bobject\b)/.exec(hsReturn);
        if (searchHsModule) {
            return searchHsModule[0];
        }
        return hsReturn.trim();
    }
    return null;
}
/**
 * Get the constructor for a given module.
 *
 * Example: `hs` will be a module and `application` will be the property. This
 * will return the constructor for the `hs.application` object.
 *
 * Example 2: `hs.application` will be a module and `new` will be the property. This
 * will return the return of the method
 *
 * @param base name of the module
 * @param identifier name of the module method/attribute/function/property
 * @returns the hs constructor or null.
 */
function getConstructor(base, identifier) {
    const moduleData = parseModule(base);
    if (!moduleData) {
        return null;
    }
    if (Object.prototype.hasOwnProperty.call(moduleData, identifier)) {
        const key = moduleData[identifier];
        if (key["type"] === "Constructor") {
            return base.replace(/\.$/, "");
        }
        if (Object.prototype.hasOwnProperty.call(key, "def")) {
            return parseReturn(key["def"]);
        }
    }
    return null;
}
exports.getConstructor = getConstructor;
/**
 * Get the documentation for a hs module.
 *
 * @param base base module name to parse for the identifier
 * @param identifier method to search in the base module
 * @returns the documentation or null
 */
function getDocumentation(base, identifier) {
    const moduleData = parseModule(base);
    if (!moduleData) {
        return null;
    }
    if (Object.prototype.hasOwnProperty.call(moduleData, identifier)) {
        const key = moduleData[identifier];
        if (Object.prototype.hasOwnProperty.call(key, "doc")) {
            return key["doc"];
        }
    }
    return null;
}
exports.getDocumentation = getDocumentation;
/**
 * Get the helper data for a hs module.
 *
 * Create an object with data needed for the helper provider like: function documentation,
 * function definition and function parameters.
 *
 * Keys:
 * * `doc`: string;
 * * `def`: string;
 * * `parameters`: string;
 *
 * @param base base module name to parse for the identifier
 * @param identifier method to search in the base module
 * @returns an object with the helper data or null
 */
function getHelperData(base, identifier) {
    const moduleData = parseModule(base);
    if (!moduleData) {
        return null;
    }
    const helper = {
        doc: "",
        def: "",
        parameters: "",
    };
    if (Object.prototype.hasOwnProperty.call(moduleData, identifier)) {
        const key = moduleData[identifier];
        if (Object.prototype.hasOwnProperty.call(key, "doc")) {
            helper["doc"] = key["doc"];
        }
        if (Object.prototype.hasOwnProperty.call(key, "def")) {
            helper["def"] = key["def"];
        }
        if (Object.prototype.hasOwnProperty.call(key, "parameters")) {
            helper["parameters"] = key["parameters"];
        }
    }
    return helper;
}
exports.getHelperData = getHelperData;
/**
 * Get Hammerspoon console output.
 *
 * Before grabbing the output, hammerspoon configuration will be reloaded.
 *
 * @returns Hammerspoon console output text.
 */
async function getHsConsoleOutput() {
    await utils.execAsync("hs -c 'hs.reload()'", 500);
    const output = utils.execSync("hs -c 'hs.console.getConsole()'");
    if (output) {
        return output;
    }
    return null;
}
exports.getHsConsoleOutput = getHsConsoleOutput;
/**
 * Filter output console based on extension setting: `console.filterOutput`.
 *
 * @param consoleOutput hammerspoon console text.
 * @param regexFilters an array of string regex to perform the matches.
 */
function filterOutput(consoleOutput, regexFilters) {
    const lines = consoleOutput.match(/^\d.+?(?=^\d)/gms);
    if (!lines) {
        return null;
    }
    let output = "";
    for (const line of lines) {
        for (const regex of regexFilters) {
            const matches = RegExp(regex, "s").exec(line);
            if (matches) {
                for (const match of matches) {
                    output += match;
                }
            }
        }
    }
    utils.outputWindow.append(output);
    return output;
}
exports.filterOutput = filterOutput;
/**
 * Output Hammerspoon console to vscode output window.
 *
 * The function might attempt to filter the output based on the settings value.
 *
 */
async function outputConsole() {
    utils.outputWindow.clear();
    const consoleOutput = await getHsConsoleOutput();
    if (!consoleOutput) {
        return;
    }
    if (utils.hammerspoonConfig("console.focusOutputWindow")) {
        utils.outputWindow.show();
    }
    const regexFilters = utils.hammerspoonConfig("console.filterOutput");
    if (!regexFilters.length) {
        utils.outputWindow.append(consoleOutput);
        return;
    }
    filterOutput(consoleOutput, regexFilters);
}
exports.outputConsole = outputConsole;
//# sourceMappingURL=hammerspoon.js.map