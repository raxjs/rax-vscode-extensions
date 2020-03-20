const vscode = require('vscode');
const { initWebviewTemplate, createProject } = require('./createProject');

function activate(context) {
  const { extensionPath } = context;
  const { commands } = vscode;

  initWebviewTemplate(extensionPath);

  // command rax.create.project
  context.subscriptions.push(commands.registerCommand('rax.create.project', function() {
    createProject(context);
  }));
}

exports.activate = activate;
