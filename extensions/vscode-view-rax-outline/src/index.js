const vscode = require('vscode');
const Scripts = require('./Scripts');

function activate(context) {
  vscode.window.registerTreeDataProvider('raxOutline', new Scripts(context));
}

exports.activate = activate;

