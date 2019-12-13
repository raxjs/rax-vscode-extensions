const fs = require('fs-extra');
const path = require('path');
const vscode = require('vscode');

module.exports = function (context) {
  const panel = vscode.window.createWebviewPanel(
    'raxStart',
    'Rax Debugger',
    vscode.ViewColumn.One,
    { enableScripts: true }
  );

  const html = fs.readFileSync(path.join(context.extensionPath, 'src/create/index.html'), 'utf-8');
  panel.webview.html = html;
}