const vscode = require('vscode');
const Scripts = require('./Scripts');

function activate(context) {
  vscode.window.registerTreeDataProvider('raxViewScripts', new Scripts(context));
}

exports.activate = activate;

