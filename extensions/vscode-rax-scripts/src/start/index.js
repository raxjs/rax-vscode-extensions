const fs = require('fs-extra');
const path = require('path');
const vscode = require('vscode');

const setTerminal = require('../setTerminal');

module.exports = function (context) {

  setTerminal('npm run start');

  const panel = vscode.window.createWebviewPanel(
    'raxStart',
    'Rax Debugger',
    vscode.ViewColumn.One,
    { enableScripts: true }
  );

  const html = fs.readFileSync(path.join(context.extensionPath, 'src/start/index.html'), 'utf-8');
  panel.webview.html = html;

  panel.webview.onDidReceiveMessage(message => {
    if (message.key === 'weex-debugger') {
      vscode.commands
        .executeCommand(message.run ? 'weex.debug' : 'weex.debug.stop')
        .then(() => {
          console.log('run "weex.debug" success');
        }, () => {
          console.log('run "weex.debug" failure');
        });
    }
  }, undefined, context.subscriptions);
}