const vscode = require('vscode');
const Scripts = require('./Scripts');

function activate(context) {
  vscode.window.registerTreeDataProvider('raxScripts', new Scripts(context));
}

exports.activate = activate;

