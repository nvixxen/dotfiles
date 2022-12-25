"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetConfig = exports.getConfig = exports.Config = void 0;
const vscode = require("vscode");
const path = require("path");
const fs = require("fs");
function isValidStyle(str) {
    return str == "noBackground" || str == "faintBackground" || str == "accent" || str == "accentBackground";
}
function isValidAccent(str) {
    return str == "default" || str == "disabledStatusBar" || str == "minimal";
}
/**
 * The location of the configuration cache file.
 */
const cachePath = path.join(__dirname, "..", "themes", "cached_config.json");
/**
 * The configuration of the theme.
 */
class Config {
    constructor(mutedMd, italicComments, altCurrentLine, monochromeBracketGuides, inlayStyle, globalAccent) {
        this.mutedMd = mutedMd;
        this.italicComments = italicComments;
        this.altCurrentLine = altCurrentLine;
        this.inlayStyle = inlayStyle;
        this.monochromeBracketGuides = monochromeBracketGuides;
        this.globalAccent = globalAccent;
    }
    isModified() {
        // If there is no cache, then we need to assume that the configuration has been modified. We also want to
        // create the cache file for future use.
        if (!fs.existsSync(cachePath)) {
            this.writeToCache();
            return true;
        }
        try {
            const cachedConfig = JSON.parse(fs.readFileSync(cachePath, { encoding: "utf8" }));
            if (this.mutedMd == cachedConfig.mutedMd &&
                this.altCurrentLine == cachedConfig.altCurrentLine &&
                this.italicComments == cachedConfig.italicComments &&
                this.monochromeBracketGuides == cachedConfig.monochromeBracketGuides &&
                this.inlayStyle == cachedConfig.inlayStyle &&
                this.globalAccent == cachedConfig.globalAccent) {
                return false;
            }
            else {
                return true;
            }
        }
        catch {
            return true;
        }
    }
    writeToCache() {
        fs.writeFileSync(cachePath, JSON.stringify(this, undefined, 4), { encoding: "utf8" });
    }
}
exports.Config = Config;
/**
 * Returns the current up-to-date configuration of the theme.
 */
function getConfig() {
    const config = vscode.workspace.getConfiguration("theme-pink-candy");
    let mutedMd = config.get("mutedMarkdownPlaintext");
    if (mutedMd === undefined) {
        mutedMd = false;
    }
    let italicComments = config.get("italicizedComments");
    if (italicComments === undefined) {
        italicComments = false;
    }
    let altCurrentLine = config.get("alternateCurrentLineStyle");
    if (altCurrentLine === undefined) {
        altCurrentLine = false;
    }
    let monochromeBracketGuides = config.get("monochromeBracketPairGuides");
    if (monochromeBracketGuides === undefined) {
        monochromeBracketGuides = false;
    }
    let inlayStyle;
    let inlayStyleRaw = config.get("inlayHintStyle");
    if (inlayStyleRaw === undefined) {
        inlayStyleRaw = "noBackground";
    }
    if (isValidStyle(inlayStyleRaw)) {
        inlayStyle = inlayStyleRaw;
    }
    else {
        inlayStyle = "noBackground";
    }
    let globalAccent;
    let globalAccentRaw = config.get("globalAccent");
    if (globalAccentRaw === undefined) {
        globalAccentRaw = "default";
    }
    if (isValidAccent(globalAccentRaw)) {
        globalAccent = globalAccentRaw;
    }
    else {
        globalAccent = "default";
    }
    return new Config(mutedMd, italicComments, altCurrentLine, monochromeBracketGuides, inlayStyle, globalAccent);
}
exports.getConfig = getConfig;
/**
 * The default configuration of the theme.
 */
const DEFAULT_CONFIG = new Config(false, false, false, false, "noBackground", "default");
/**
 * Resets the configuration of the theme to the default options, and updates the cache as well.
 */
function resetConfig() {
    DEFAULT_CONFIG.writeToCache();
    const config = vscode.workspace.getConfiguration("theme-pink-candy");
    config.update("mutedMarkdownPlaintext", undefined, true);
    config.update("italicizedComments", undefined, true);
    config.update("alternateCurrentLineStyle", undefined, true);
    config.update("monochromeBracketPairGuides", undefined, true);
    config.update("inlayHintStyle", undefined, true);
    config.update("globalAccent", undefined, true);
}
exports.resetConfig = resetConfig;
//# sourceMappingURL=config.js.map