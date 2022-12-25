"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tableDepthLevel = void 0;
/**
 * Get the depth level of a table by parsing the reference text.
 *
 * Example:
 * For `foo.bar.foo` method will return: `3`
 * @param tableExpr a string containing the full table expression: `foo.bar.foo`
 * @returns
 */
function tableDepthLevel(tableExpr) {
    return tableExpr ? tableExpr.replace(/\.$/, "").split(".").length + 1 : 0;
}
exports.tableDepthLevel = tableDepthLevel;
//# sourceMappingURL=utils.js.map