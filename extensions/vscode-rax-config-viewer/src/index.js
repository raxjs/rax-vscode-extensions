const vscode = require('vscode');
const fs = require('fs');
const ejs = require('ejs');
const path = require('path');

function activate(context) {
  const { extensionPath } = context;
  const { env, commands, window, ViewColumn } = vscode;

  let webviewPanel = null;
  const webviewTemplate = fs.readFileSync(path.join(extensionPath, 'src/create.html.ejs'), 'utf-8');

  function disposeWebview() {
    if (webviewPanel) {
      webviewPanel.dispose();
      webviewPanel = null;
    }
  }

  context.subscriptions.push(commands.registerCommand('extension.helloWorld', async function(info) {
    const { fsPath } = info;
    console.log(fsPath);
    console.log(1111);
    console.log(window.menuBarVisibility);
    disposeWebview();

    webviewPanel = window.createWebviewPanel(
      'createRax',
      'Create Rax',
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
    window.test = 11;
    console.log(window.test);

    webviewPanel.webview.onDidReceiveMessage(message => {
      console.log(message);
    }, undefined, context.subscriptions);
  }));
}

exports.activate = activate;
