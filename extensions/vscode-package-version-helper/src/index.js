const vscode = require('vscode');
const path = require('path');
const Checker = require('./Checker');

function activate(context) {
  const { commands, window, workspace, Uri, ViewColumn } = vscode;
  const checker = new Checker(context);
  // Listen active file change
  window.onDidChangeActiveTextEditor(() => {
    checker.check();
  }, null, context.subscriptions);
  // Add command
  context.subscriptions.push(commands.registerCommand('package.version.check', function() {
    checker.check();
  }));
  // Open file package.json
  context.subscriptions.push(commands.registerCommand('package.open', function() {
    commands.executeCommand('vscode.open', Uri.file(path.join(workspace.rootPath, 'package.json')), {
      viewColumn: ViewColumn.One
    });
  }));
  checker.check();
};

exports.activate = activate;


