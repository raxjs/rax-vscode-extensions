const vscode = require('vscode');
const Checker = require('./Checker');

function activate(context) {
  const checker = new Checker(context);
  // Listen active file change
  vscode.window.onDidChangeActiveTextEditor(() => {
    checker.check();
  }, null, context.subscriptions);
  // Add command
  context.subscriptions.push(vscode.commands.registerCommand('package.version.check', function() {
    checker.check();
  }));
  checker.check();
};

exports.activate = activate;


