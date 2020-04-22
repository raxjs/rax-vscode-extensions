const vscode = require('vscode');
const Checker = require('./Checker');

function activate(context) {
  const checker = new Checker(context);
  vscode.window.onDidChangeActiveTextEditor(() => {
    checker.check();
  }, null, context.subscriptions);
  checker.check();
};

exports.activate = activate;


