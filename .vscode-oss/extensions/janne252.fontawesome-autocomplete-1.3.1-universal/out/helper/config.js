"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrDefault = void 0;
/**
 *
 * @param obj The object to get the property from. Can be an object or an array.
 * @param key The key of the property.
 * @param defaultValue Default value used if the obj is null or if the key doesn't exist in the object.
 */
function getOrDefault(obj, key, defaultValue) {
    if (obj == null || key in obj === false) {
        return defaultValue;
    }
    return obj[key];
}
exports.getOrDefault = getOrDefault;
//# sourceMappingURL=config.js.map