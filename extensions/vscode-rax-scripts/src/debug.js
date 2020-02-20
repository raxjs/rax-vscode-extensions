const fs = require('fs');
const ejs = require('ejs');
const path = require('path');
const vscode = require('vscode');
const setTerminal = require('./setTerminal');
const isRaxProject = require('./isRaxProject');

module.exports = function(context) {
  const { extensionPath } = context;
  const { env, window, ViewColumn } = vscode;

  if (!isRaxProject()) {
    window.showErrorMessage('Please open Rax project!');
    return false;
  }

  setTerminal('npm run start');

  let webviewPanel = null;
  const webviewTemplate = fs.readFileSync(path.join(extensionPath, 'src/debug.html.ejs'), 'utf-8');

  function disposeWebview() {
    if (webviewPanel) {
      webviewPanel.dispose();
      webviewPanel = null;
    }
  }

  disposeWebview();

  webviewPanel = window.createWebviewPanel(
    'raxScriptsDebug',
    'Rax Debug',
    ViewColumn.One,
    { enableScripts: true }
  );

  const webviewHTML = ejs.render(webviewTemplate,
    {
      language: env.language,
      styles: [
        `vscode-resource:${path.join(extensionPath, 'assets/client/build/web/', 'pages_debug_index.css')}`
      ],
      scripts: [
        `vscode-resource:${path.join(extensionPath, 'assets/client/build/web/', 'pages_debug_index.js')}`
      ]
    }
  );
  webviewPanel.webview.html = webviewHTML;

  webviewPanel.webview.onDidReceiveMessage(message => {
    if (message.key === 'weex-debugger') {
      vscode.commands
        .executeCommand(message.run ? 'weex.debug' : 'weex.debug.stop')
        .then(() => {
          console.log('run "weex.debug" success');
        }, (e) => {
          console.error(e);
        });
    }
  }, undefined, context.subscriptions);
};