"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jsonEscapeUTF = void 0;
function jsonEscapeUTF(str) {
    let result = "";
    for (let i = 0; i < str.length; i++) {
        let ch = str.charCodeAt(i);
        if (ch < 128) {
            // i.e.: escape any char which isn't ascii.
            result += str.charAt(i);
        }
        else {
            result += "\\u" + ("000" + ch.toString(16)).slice(-4);
        }
    }
    return result;
}
exports.jsonEscapeUTF = jsonEscapeUTF;
//# sourceMappingURL=escape.js.map