const vscode = require('vscode');
const Explorer = require('./Explorer');

function activate(context) {
  const explorer = new Explorer(context);
  vscode.window.registerTreeDataProvider('raxExplorer', explorer);
  vscode.commands.registerCommand('rax.refreshExplorer', () =>
    explorer.refresh()
  );
}

exports.activate = activate;

