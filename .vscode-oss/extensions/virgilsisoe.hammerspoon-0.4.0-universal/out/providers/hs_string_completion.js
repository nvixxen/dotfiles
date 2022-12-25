"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HSStringCompletionProvider = void 0;
const vscode = require("vscode");
const hs = require("../hammerspoon");
const logger_1 = require("../logger");
const logger = new logger_1.Logger("hsStringCompletion", "hsStringCompletion");
/**
 * Hammerspoon string completion provider class.
 */
class HSStringCompletionProvider {
    constructor() {
        this.position = new vscode.Position(0, 0);
    }
    /**
     * Initialize the provider.
     *
     * @param document vscode TextDocument
     * @param position cursor position
     * @returns the provider result or null
     */
    provideCompletionItems(document, position) {
        logger.cleanFile();
        logger.debug(" -*- Init HSStringCompletionProvider -*-");
        const linePrefix = document.lineAt(position).text.substring(0, position.character);
        /**
         * Suggest string completion if line is `hs.loadSpoon(`
         */
        const loadSpoon = /(?<=hs\.loadSpoon\()/.exec(linePrefix);
        if (loadSpoon) {
            return hs.getSpoonsDirectory();
        }
        return null;
    }
}
exports.HSStringCompletionProvider = HSStringCompletionProvider;
//# sourceMappingURL=hs_string_completion.js.map