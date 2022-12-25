module.exports=(()=>{"use strict";var t={112:function(t,e,n){var o=this&&this.__createBinding||(Object.create?function(t,e,n,o){void 0===o&&(o=n),Object.defineProperty(t,o,{enumerable:!0,get:function(){return e[n]}})}:function(t,e,n,o){void 0===o&&(o=n),t[o]=e[n]}),i=this&&this.__setModuleDefault||(Object.create?function(t,e){Object.defineProperty(t,"default",{enumerable:!0,value:e})}:function(t,e){t.default=e}),r=this&&this.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var n in t)"default"!==n&&Object.prototype.hasOwnProperty.call(t,n)&&o(e,t,n);return i(e,t),e};Object.defineProperty(e,"__esModule",{value:!0}),e.deactivate=e.saveWebviewState=e.activate=e.Global=e.WEBVIEW_STATE_STORAGE_KEY=e.TOKEN_CUSTOMIZATIONS_SETTING_ID=e.COLOR_CUSTOMIZATIONS_SETTING_ID=e.COLOR_THEME_SETTING_ID=void 0;const a=r(n(549)),d=n(481);e.COLOR_THEME_SETTING_ID="workbench.colorTheme",e.COLOR_CUSTOMIZATIONS_SETTING_ID="workbench.colorCustomizations",e.TOKEN_CUSTOMIZATIONS_SETTING_ID="editor.tokenColorCustomizations",e.WEBVIEW_STATE_STORAGE_KEY="WEBVIEW_STATE_KEY",e.Global={context:{}},e.activate=function(t){e.Global.context=t,t.subscriptions.push(a.default.commands.registerCommand("generateTheme",(()=>{a.workspace.getConfiguration().update(e.COLOR_THEME_SETTING_ID,"generated-dark",a.ConfigurationTarget.Global),d.GenerateThemePanel.createOrShow(t.extensionUri)}))),t.extensionMode===a.default.ExtensionMode.Development&&a.default.commands.executeCommand("generateTheme")},e.saveWebviewState=function(t){e.Global.context.globalState.update(e.WEBVIEW_STATE_STORAGE_KEY,t)},e.deactivate=function(){}},839:function(t,e,n){var o=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0}),e.exportAsJson=void 0;const i=o(n(622)),r=o(n(549));e.exportAsJson=function(t){const e={name:"",type:"dark",colors:t.workbenchColors,tokenColors:t.tokenColors},n=r.default.Uri.parse(`untitled:${i.default.join(r.default.workspace.workspaceFolders[0].uri.fsPath||"","theme.color-theme.json")}`);r.default.workspace.openTextDocument(n).then((t=>{const o=new r.default.WorkspaceEdit;return o.insert(n,new r.default.Position(0,0),JSON.stringify(e,null,"    ")),r.default.workspace.applyEdit(o).then((e=>{e?r.default.window.showTextDocument(t):r.default.window.showInformationMessage("Error!")}))}))}},187:(t,e,n)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.updateGlobalCustomizationSettings=void 0;const o=n(549),i=n(112);e.updateGlobalCustomizationSettings=function(t,e,n="generated-dark"){var r,a;const d=o.workspace.getConfiguration(),s={...null===(r=d.inspect(i.COLOR_CUSTOMIZATIONS_SETTING_ID))||void 0===r?void 0:r.globalValue,[`[${n}]`]:t},l={...null===(a=d.inspect(i.TOKEN_CUSTOMIZATIONS_SETTING_ID))||void 0===a?void 0:a.globalValue,[`[${n}]`]:{textMateRules:e}};d.update(i.COLOR_CUSTOMIZATIONS_SETTING_ID,s,o.ConfigurationTarget.Global),d.update(i.TOKEN_CUSTOMIZATIONS_SETTING_ID,l,o.ConfigurationTarget.Global)}},481:function(t,e,n){var o=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0}),e.GenerateThemePanel=void 0;const i=o(n(549)),r=n(112),a=n(839),d=n(187);class s{constructor(t,e){this._disposables=[],this._panel=t,this._extensionUri=e,this._panel.onDidDispose((()=>{this.dispose()}),null,this._disposables),this._panel.webview.html=this._getHtmlForWebview(this._panel.webview),this._panel.onDidChangeViewState((t=>{this._panel.visible&&s._restoreState(this._panel)}),null,this._disposables),s._restoreState(this._panel),this._panel.webview.onDidReceiveMessage((t=>{switch(t.type){case"saveState":r.saveWebviewState(t.value);break;case"showNotification":i.default.window.showInformationMessage(t.value);break;case"generateTheme":d.updateGlobalCustomizationSettings(t.value.workbenchColors,t.value.tokenColors);break;case"resetCustomizations":d.updateGlobalCustomizationSettings({},[]);break;case"exportAsJson":a.exportAsJson(t.value)}}),null,this._disposables)}static createOrShow(t){const e=i.default.ViewColumn.Two;if(s.currentPanel)return void s.currentPanel._panel.reveal(e);const n=i.default.window.createWebviewPanel(s.viewType,"Theme Generator",e,{enableScripts:!0,localResourceRoots:[i.default.Uri.joinPath(t,"media")]});s.currentPanel=new s(n,t)}static _restoreState(t){t.webview.postMessage({type:"restoreState",value:r.Global.context.globalState.get(r.WEBVIEW_STATE_STORAGE_KEY)})}dispose(){for(s.currentPanel=void 0,this._panel.dispose();this._disposables.length;){const t=this._disposables.pop();t&&t.dispose()}}_getHtmlForWebview(t){const e=i.default.Uri.joinPath(this._extensionUri,"media","main.js"),n=t.asWebviewUri(e),o=i.default.Uri.joinPath(this._extensionUri,"media","main.css"),r=t.asWebviewUri(o),a=function(){let t="";const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";for(let n=0;n<32;n++)t+=e.charAt(Math.floor(Math.random()*e.length));return t}();return`\n<!DOCTYPE html>\n<html lang="en">\n<head>\n\t<meta charset="UTF-8">\n\t<meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src ${t.cspSource}; img-src ${t.cspSource} https:; script-src 'nonce-${a}';">\n\t<meta name="viewport" content="width=device-width, initial-scale=1.0">\n\t<link href="${r}" rel="stylesheet">\n\t<title>Generate</title>\n</head>\n<body>\n\t<div class="generate-container">\n\t\t<label><input type="checkbox" id="shuffleColors">Shuffle</label>\n\t\t<button id="generate">▶ Generate</button>\n\t</div>\n\n\t<label><input type="color" id="backgroundInit"> Background</label>\n\t<label><input type="color" id="foregroundInit"> Foreground</label>\n\n\t<div class="row">\n\t\t<table>\n\t\t\t<tr>\n\t\t\t\t<td>1</td>\n\t\t\t\t<td><input type="color" id="color1Init"> <input type="text" id="color1InitText"></td>\n\t\t\t\t<td>string <code>"text"</code></td>\n\t\t\t</tr>\n\t\t\t<tr>\n\t\t\t\t<td>2</td>\n\t\t\t\t<td><input type="color" id="color2Init"> <input type="text" id="color2InitText"></td>\n\t\t\t\t<td>keyword <code>=</code></td>\n\t\t\t</tr>\n\t\t\t<tr>\n\t\t\t\t<td>3</td>\n\t\t\t\t<td><input type="color" id="color3Init"> <input type="text" id="color3InitText"></td>\n\t\t\t\t<td>keyword.control <code>import</code></td>\n\t\t\t</tr>\n\t\t\t<tr>\n\t\t\t\t<td>4</td>\n\t\t\t\t<td><input type="color" id="color4Init"> <input type="text" id="color4InitText"></td>\n\t\t\t\t<td>function name</td>\n\t\t\t</tr>\n\t\t\t<tr>\n\t\t\t\t<td>5</td>\n\t\t\t\t<td><input type="color" id="color5Init"> <input type="text" id="color5InitText"></td>\n\t\t\t\t<td>function parameter</td>\n\t\t\t</tr>\n\t\t\t<tr>\n\t\t\t\t<td>6</td>\n\t\t\t\t<td><input type="color" id="color6Init"> <input type="text" id="color6InitText"></td>\n\t\t\t\t<td>-</td>\n\t\t\t</tr>\n\t\t\t<tr>\n\t\t\t\t<td>7</td>\n\t\t\t\t<td><input type="color" id="color7Init"> <input type="text" id="color7InitText"></td>\n\t\t\t\t<td>types</td>\n\t\t\t</tr>\n\t\t</table>\n\n\t\t<table>\n\t\t\t<tr>\n\t\t\t\t<td><input type="color" id="inserted"> <input type="text" id="insertedText"></td>\n\t\t\t\t<td title="Diff inserted">Inserted</td>\n\t\t\t</tr>\n\t\t\t<tr>\n\t\t\t\t<td><input type="color" id="modified"> <input type="text" id="modifiedText"></td>\n\t\t\t\t<td title="Diff modified">Modified</td>\n\t\t\t</tr>\n\t\t\t<tr>\n\t\t\t\t<td><input type="color" id="deleted"> <input type="text" id="deletedText"></td>\n\t\t\t\t<td title="Diff deleted">Deleted</td>\n\t\t\t</tr>\n\n\t\t\t<tr>\n\t\t\t\t<td><input type="color" id="error"> <input type="text" id="errorText"></td>\n\t\t\t\t<td>Error</td>\n\t\t\t</tr>\n\t\t\t<tr>\n\t\t\t\t<td><input type="color" id="warning"> <input type="text" id="warningText"></td>\n\t\t\t\t<td>Warning</td>\n\t\t\t</tr>\n\t\t\t<tr>\n\t\t\t\t<td><input type="color" id="info"> <input type="text" id="infoText"></td>\n\t\t\t\t<td>Info</td>\n\t\t\t</tr>\n\t\t</table>\n\t</div>\n\t<p>\n\t\t<button id="reset" title="Reset main color items to default values">Reset Color Inputs</button>\n\t\t<button id="resetCustomizations" title="Reset items in User Global Settings (settings.json)">Reset Customizations</button>\n\t\t<button id="export">Export as json</button>\n\t</p>\n\n\t<table>\n\t\t<tr>\n\t\t\t<td><input type="color" id="focus"> <input type="text" id="focusText"></td>\n\t\t\t<td>Focus</td>\n\t\t</tr>\n\t</table>\n\n\n\t<script defer nonce="${a}" src="${n}"><\/script>\n</body>\n</html>`}}e.GenerateThemePanel=s,s.viewType="themeGenerator"},622:t=>{t.exports=require("path")},549:t=>{t.exports=require("vscode")}},e={};return function n(o){if(e[o])return e[o].exports;var i=e[o]={exports:{}};return t[o].call(i.exports,i,i.exports,n),i.exports}(112)})();
//# sourceMappingURL=extension.js.map