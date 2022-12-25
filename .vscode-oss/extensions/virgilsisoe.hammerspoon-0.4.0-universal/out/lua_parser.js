"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findDeclaration = exports.updateAst = exports.createAst = exports.luaKeywords = void 0;
const path = require("path");
const fs_1 = require("fs");
const vscode = require("vscode");
const lua = require("luaparse");
const hs = require("./hammerspoon");
const logger_1 = require("./logger");
const logger = new logger_1.Logger("lua_parser", "lua_parser");
/**
 * main code chunk to served as a static variable.
 */
let astChunk;
exports.luaKeywords = JSON.parse((0, fs_1.readFileSync)(path.join(path.resolve(__dirname, ".."), "resources", "lua_keywords.json"), "utf-8"));
// TODO: this function should be expanded to a setting based user items to exclude
function replaceLua54Keywords(code) {
    return code.replace(/<(const|close)>/, "");
}
/**
 * Create the main AST chunk from lua code.
 *
 * At each event, the global variable `astChunk` will be updated. In case of syntax
 * errors in the code, `astChunk` will not be updated.
 *
 * @param code string with lua code to be parsed
 */
function createAst(code, writeToFile = false) {
    try {
        astChunk = lua.parse(code, {
            luaVersion: "5.3",
            locations: true,
            comments: false,
        });
    }
    catch (error) {
        logger.error(" └── Could not write AST");
    }
    if (writeToFile) {
        const demo = path.resolve(__dirname, "../demo");
        (0, fs_1.writeFileSync)(path.join(demo, "astChunk.json"), JSON.stringify(astChunk), "utf8");
    }
}
exports.createAst = createAst;
/**
 * Update lua file ASTree.
 *
 * The function will also clean any unfinished member expression by removing
 * the . or :
 */
function updateAst(writeToFile = false) {
    const editor = vscode.window.activeTextEditor;
    if (editor) {
        const document = editor.document;
        if (document.fileName.endsWith("lua")) {
            logger.debug("Updating AST");
            const code = document.getText().replace(/(\.|:)(?!\w)/gm, "");
            createAst(replaceLua54Keywords(code), writeToFile);
        }
    }
}
exports.updateAst = updateAst;
/**
 * Lua code parser in search for an hammerspoon statement.
 */
class LuaParser {
    constructor(declaration) {
        this.declaration = { name: "", line: 0 };
        this.declarationTree = [];
        this.expressionMembers = [];
        this.tableDepth = 1;
        this.declarationTree = [];
        this.declaration = declaration;
        logger.debug("Initializing LuaParser", declaration);
    }
    /**
     * Parse a lua code chunk to extract every AssignmentStatement and LocalStatement
     * and append them to the `this.declarationTree`.
     * Some items will have nested body, so function will iterate recursively.
     *
     * @param chunk lua code chunk to parse
     */
    extractStatements(chunk) {
        // HACK: need to increment line number because the line match will be excluded
        this.declaration.line++;
        for (const item of chunk) {
            const itemRangeStart = item.loc.start.line;
            const itemRangeEnd = item.loc.end.line;
            if (itemRangeStart <= this.declaration.line &&
                (item.type === "AssignmentStatement" || item.type === "LocalStatement")) {
                this.declarationTree.push(item);
            }
            /**
             * Check if line number is in range with current item location range.
             *
             * @param n line number
             * @returns true if it is, false otherwise
             */
            const inRange = (n) => {
                return n >= itemRangeStart && n <= itemRangeEnd;
            };
            if (item.type === "IfStatement" && inRange(this.declaration.line)) {
                this.extractStatements(item.clauses[0].body);
            }
            if ("body" in item && inRange(this.declaration.line)) {
                this.extractStatements(item.body);
            }
        }
    }
    /**
     * Recursively search for a new declaration.
     *
     * @param declaration lua declaration object
     * @returns
     */
    recursiveSearch(declaration) {
        const parser = new LuaParser(declaration);
        const statement = parser.findStatement();
        if (statement) {
            return statement;
        }
        return null;
    }
    /**
     * Extract expression from lua chunk item.
     *
     * // TODO: documentation
     *
     * @param item
     * @returns
     */
    extractExpression(item) {
        if (item.type === "MemberExpression") {
            this.expressionMembers.push(item.identifier.name);
            const base = item.base;
            if (base.type === "Identifier") {
                if (base.name === "hs") {
                    this.expressionMembers.push(base.name);
                }
                else {
                    const statement = this.recursiveSearch({
                        name: base.name,
                        tableKey: this.declaration.tableKey,
                        line: base.loc.start.line,
                    });
                    if (statement) {
                        this.expressionMembers.push(`${statement.base}.${statement.identifier}`);
                    }
                }
                return true;
            }
            if (base.type === "MemberExpression") {
                this.extractExpression(base);
            }
            if (base.type === "CallExpression") {
                this.extractExpression(base.base);
            }
        }
        return null;
    }
    /**
     * Extract call expression
     *
     * // TODO: documentation
     *
     * @param item
     * @returns
     */
    callExpression(item) {
        this.extractExpression(item);
        if (this.expressionMembers) {
            const last = this.expressionMembers.reverse().pop();
            if (last) {
                const joinExpression = this.expressionMembers.join(".");
                // when expression calls expression, clean the last expression caller
                const cleanMultipleCalls = joinExpression.replace(`.${last}`, "");
                return { base: cleanMultipleCalls, identifier: last };
            }
        }
        return null;
    }
    /**
     * Parse table expression.
     *
     * // TODO: documentation
     *
     * @param fields
     * @returns
     */
    tableExpression(fields) {
        for (let index = 0; index < fields.length; index++) {
            const field = fields[index];
            // clean expression members each time
            this.expressionMembers = [];
            // if item is a table and is more than one depth level then recursively search in it
            if ((field.type === "TableKeyString" || field.type === "TableValue") &&
                field.value.type === "TableConstructorExpression" &&
                this.tableDepth + 1 <= this.declaration.tableDepthLevel) {
                logger.debug("Recursive table search");
                this.tableDepth++;
                return this.tableExpression(field.value.fields);
            }
            if (field.type === "TableKeyString" && field.key.name === this.declaration.tableKey) {
                if (field.value.type === "CallExpression") {
                    return this.callExpression(field.value.base);
                }
                else if (field.value.type === "Identifier") {
                    return this.recursiveSearch({
                        name: field.value.name,
                        tableKey: this.declaration.tableKey,
                        line: field.loc.start.line,
                    });
                }
            }
            else if (field.type === "TableValue") {
                const indexMatch = index + 1 === this.declaration.tableIndex;
                const depthLevel = this.tableDepth === this.declaration.tableDepthLevel;
                if (depthLevel && indexMatch && field.value.type === "CallExpression") {
                    return this.callExpression(field.value.base);
                }
                else if (depthLevel && indexMatch && field.value.type === "Identifier") {
                    return this.recursiveSearch({
                        name: field.value.name,
                        tableKey: this.declaration.tableKey,
                        line: field.loc.start.line,
                    });
                }
            }
        }
        return null;
    }
    /**
     * Parse the variable for each statement to search the matching declaration.
     *
     * @param items Lua chunk statements objects.
     * @returns the lua declaration object or null.
     */
    parseVariables(items) {
        const variables = items.variables;
        for (let index = 0; index < variables.length; index++) {
            const item = variables[index];
            if (item.name === this.declaration.name) {
                let initItem;
                // if declaration is `b` of `local a, b = 1` should stop
                try {
                    initItem = items.init[index];
                }
                catch (error) {
                    logger.warning(error);
                    return null;
                }
                if (initItem["type"] === "CallExpression" &&
                    initItem.base.type === "MemberExpression") {
                    logger.debug("Item is CallExpression && MemberExpression");
                    return this.callExpression(initItem.base);
                }
                else if (initItem["type"] === "TableConstructorExpression") {
                    logger.debug("Item is table");
                    return this.tableExpression(initItem.fields);
                }
                else if (initItem["type"] === "Identifier") {
                    logger.debug("Item is Identifier");
                    // when item is an identifier, then update the search word wth
                    // the current variable name;
                    this.declaration.name = initItem.name;
                }
            }
        }
        return null;
    }
    /**
     * Find the statement inside the code chunk.
     *
     * @returns the statement object or null
     */
    findStatement() {
        this.extractStatements(astChunk.body);
        for (const item of this.declarationTree.reverse()) {
            const result = this.parseVariables(item);
            if (result) {
                logger.info("FindStatement result:", result, { console: false });
                return result;
            }
        }
        return null;
    }
}
/**
 * Main function for the module.
 *
 * Method will initialize a new LuaParser class and try to find the declaration
 * inside the generated AST chunk lua code and returns its constructor if found.
 *
 * @param declaration lua declaration object
 * @returns the declaration constructor or null if not found.
 */
function findDeclaration(declaration) {
    logger.debug(" -*- Find LuaDeclaration -*-");
    // TODO: stop if builtin
    if (exports.luaKeywords["keywords"].includes(declaration.name)) {
        return null;
    }
    try {
        const parser = new LuaParser(declaration);
        const statement = parser.findStatement();
        if (statement) {
            const constructor = hs.getConstructor(statement.base, statement.identifier);
            if (constructor) {
                return constructor;
            }
        }
    }
    catch (error) {
        logger.error(error, { console: true });
    }
    return null;
}
exports.findDeclaration = findDeclaration;
//# sourceMappingURL=lua_parser.js.map