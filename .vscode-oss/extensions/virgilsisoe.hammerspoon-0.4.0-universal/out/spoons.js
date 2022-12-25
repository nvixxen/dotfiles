"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSpoon = exports.writeStatement = exports.askUser = exports.createSpoonTemplate = exports.createSpoonDir = exports.getSpoonRootDir = exports.generateSpoonDoc = exports.generateExtraDocs = exports.generateDocsJson = exports.pathExists = void 0;
const os = require("os");
const fs = require("fs");
const path = require("path");
const vscode = require("vscode");
const utils = require("./utils");
/**
 * Check if path exists.
 *
 * @param path string like file system path.
 * @returns `true` if it does, `false` otherwise. When false will show a user error.
 */
function pathExists(path) {
    if (!fs.existsSync(path)) {
        vscode.window.showErrorMessage(`Path: ${path} appears to be invalid`);
        return false;
    }
    return true;
}
exports.pathExists = pathExists;
/**
 * Generate the base `docs.json` documentation for a Spoon.
 *
 * Method will execute a shell command that invokes the `hs.ipc` module. If this
 * module is not installed, will fail.
 *
 * @param dir Directory of the current active file.
 */
async function generateDocsJson(dir) {
    const result = await utils.execAsync(`cd ${dir} && hs -c "hs.doc.builder.genJSON(\\"$(pwd)\\")" | grep -v "^--" > docs.json`);
    if (result !== null) {
        vscode.window.showInformationMessage("Documentation created!");
    }
}
exports.generateDocsJson = generateDocsJson;
/**
 * Generate the base extra documentation (HTML/Markdown) for a Spoon.
 *
 * Method will execute a shell command that invokes the `hs.ipc` module. If this
 * module is not installed, will fail.
 *
 * @param dir Directory of the current active file.
 */
async function generateExtraDocs(dir) {
    const hsSourceRoot = utils.hammerspoonConfig("spoons.extraDocumentation");
    const hsSourcePath = hsSourceRoot["repository-path"];
    const hsSourcePythonPath = hsSourceRoot["interpreter-path"];
    if (!hsSourcePath || !hsSourcePythonPath) {
        return null;
    }
    if (!pathExists(hsSourcePath) || !pathExists(hsSourcePythonPath)) {
        return null;
    }
    const hsDocScript = `${hsSourcePath}/scripts/docs`;
    const cmd = `${hsSourcePythonPath} ${hsDocScript}/bin/build_docs.py --templates ${hsDocScript}/templates/ --output_dir . --json --html --markdown --standalone .`;
    await utils.execAsync(`cd ${dir} && ${cmd}`);
}
exports.generateExtraDocs = generateExtraDocs;
/**
 * Generate Hammerspoon Spoon documentation from a `spoon/init.lua`.
 */
function generateSpoonDoc() {
    const editor = vscode.window.activeTextEditor;
    if (editor) {
        const fileName = editor.document.fileName;
        if (!fileName.endsWith("init.lua")) {
            vscode.window.showWarningMessage("Active file must be a init.lua");
            return null;
        }
        const filePath = path.dirname(fileName);
        void generateDocsJson(filePath);
        void generateExtraDocs(filePath);
    }
}
exports.generateSpoonDoc = generateSpoonDoc;
/**
 * Get the Spoon directory path from extension settings.
 *
 * @returns the Spoon directory path.
 */
function getSpoonRootDir() {
    const spoonsRootDir = utils.hammerspoonConfig("spoons.path");
    return spoonsRootDir.replace("~", os.homedir());
}
exports.getSpoonRootDir = getSpoonRootDir;
/**
 * Create the new Spoon directory.
 *
 * @param path the path where to create.
 * @returns true if path was created, false otherwise.
 */
function createSpoonDir(path) {
    if (fs.existsSync(path)) {
        vscode.window.showWarningMessage("Spoon directory already exists.");
        return false;
    }
    fs.mkdirSync(path);
    return true;
}
exports.createSpoonDir = createSpoonDir;
/**
 * Create the `init.lua` template file.
 *
 * @param spoonDir path where to create the spoon template.
 * @param placeholders placeholders object to replace inside the `init.lua` template.
 */
function createSpoonTemplate(spoonDir, placeholders) {
    let spoonSample = fs.readFileSync(`${utils.languagePath}/spoon_sample.lua`, "utf-8");
    for (const [key, value] of Object.entries(placeholders)) {
        spoonSample = spoonSample.replace(RegExp(key, "g"), value);
    }
    const spoonInit = `${spoonDir}/init.lua`;
    fs.writeFileSync(spoonInit, spoonSample);
    return spoonInit;
}
exports.createSpoonTemplate = createSpoonTemplate;
/**
 * Ask user to fill some value that are going to be used to replace some
 * placeholders when creating the Spoon template.
 *
 * @returns a placeholders object.
 */
async function askUser() {
    const placeholders = {};
    let spoonName = (await vscode.window.showInputBox({
        title: "Spoon Name",
        placeHolder: "Spoon name without the .spoon extension",
    }));
    spoonName = spoonName.replace(" ", "") ? spoonName : "SpoonTemplate";
    const spoonDescription = (await vscode.window.showInputBox({
        title: "Description",
        placeHolder: "Spoon Description",
    }));
    placeholders._spoonName_ = spoonName;
    placeholders._description_ = spoonDescription;
    placeholders._author_ = os.userInfo().username;
    return placeholders;
}
exports.askUser = askUser;
async function openProjectFolder(destination) {
    const openProjectFolder = (await vscode.window.showQuickPick(["Yes", "No"], {
        title: "Open Project Folder?",
    }));
    if (openProjectFolder === "Yes") {
        vscode.commands.executeCommand("vscode.openFolder", destination);
    }
}
/**
 * Import NukeServerSocket inside the menu.py
 *
 * If file does not exists will create one and write to it, otherwise will append
 * the statement at the end.
 */
function writeStatement(statement) {
    const hsInit = path.join(os.homedir(), ".hammerspoon", "init.lua");
    if (fs.existsSync(hsInit)) {
        if (!fs.readFileSync(hsInit, "utf-8").match(statement)) {
            fs.appendFileSync(hsInit, `\n${statement}\n`);
        }
    }
    else {
        fs.writeFileSync(hsInit, statement);
    }
}
exports.writeStatement = writeStatement;
async function requireSpoon(module) {
    const loadNukeInit = (await vscode.window.showQuickPick(["Yes", "No"], {
        title: "Load Spoon in init.lua?",
    }));
    if (loadNukeInit === "Yes") {
        writeStatement(`hs.loadSpoon('${module}')`);
    }
}
/**
 * Create the spoon directory and file template.
 */
async function createSpoon() {
    const placeholders = await askUser();
    const spoonDir = `${getSpoonRootDir()}/${placeholders._spoonName_}.spoon`;
    if (createSpoonDir(spoonDir)) {
        createSpoonTemplate(spoonDir, placeholders);
        vscode.window.showInformationMessage("Spoon created");
    }
    await requireSpoon(placeholders._spoonName_);
    await openProjectFolder(vscode.Uri.file(spoonDir));
}
exports.createSpoon = createSpoon;
//# sourceMappingURL=spoons.js.map