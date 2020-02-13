const vscode = require('vscode');
const fs = require('fs');
const ejs = require('ejs');
const path = require('path');

function activate(context) {
  const { extensionPath } = context;
  const { env, commands, window, ViewColumn } = vscode;

  let webviewPanel = null;
  const webviewTemplate = fs.readFileSync(path.join(extensionPath, 'src/buildJson.html.ejs'), 'utf-8');

  function disposeWebview() {
    if (webviewPanel) {
      webviewPanel.dispose();
      webviewPanel = null;
    }
  }

  context.subscriptions.push(commands.registerCommand('rax.showProjectConfig', async function() {
    if (!fs.existsSync(path.join(vscode.workspace.rootPath, 'build.json'))) {
      window.showErrorMessage("The workspace folder doesn't has `build.json` file.");
      return false;
    }

    disposeWebview();

    webviewPanel = window.createWebviewPanel(
      'raxProjectConfig',
      'Rax project config',
      ViewColumn.One,
      { enableScripts: true }
    );

    const webviewHTML = ejs.render(webviewTemplate,
      {
        language: env.language,
        styles: [
          `vscode-resource:${path.join(extensionPath, 'assets/client/build/web/', 'pages_Home_index.css')}`
        ],
        scripts: [
          `vscode-resource:${path.join(extensionPath, 'assets/client/build/web/', 'pages_Home_index.js')}`
        ]
      }
    );
    webviewPanel.webview.html = webviewHTML;

    webviewPanel.webview.onDidReceiveMessage(message => {
      console.log(message);
    }, undefined, context.subscriptions);
  }));
}

exports.activate = activate;
