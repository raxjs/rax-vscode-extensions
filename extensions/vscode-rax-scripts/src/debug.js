const vscode = require('vscode');
const fs = require('fs');
const ejs = require('ejs');
const path = require('path');

module.exports = function(context) {
  const { extensionPath } = context;
  const { env, window, ViewColumn } = vscode;

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
    console.log(message);
  }, undefined, context.subscriptions);
};