const vscode = require('vscode');
const start = require('./start');
const debug = require('./debug');
const build = require('./build');

function activate(context) {
  context.subscriptions.push(vscode.commands.registerCommand('rax.start', function() {
    start(context);
  }));
  context.subscriptions.push(vscode.commands.registerCommand('rax.debug', function() {
    debug(context);
  }));
  context.subscriptions.push(vscode.commands.registerCommand('rax.build', function() {
    build(context);
  }));
}

exports.activate = activate;
