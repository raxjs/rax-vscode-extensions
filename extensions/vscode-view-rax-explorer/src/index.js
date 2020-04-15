const vscode = require('vscode');
const Explorer = require('./Explorer');

function activate(context) {
  const { window, commands } = vscode;
  const explorer = new Explorer(context);
  window.registerTreeDataProvider('raxExplorer', explorer);
  //  registerCommand
  commands.registerCommand('rax.views.explorer.refresh', function() {
    explorer.refresh();
  });
  commands.registerCommand('rax.views.explorer.addComponent', function() {
    commands.executeCommand('rax.create.component');
  });
  commands.registerCommand('rax.views.explorer.addPage', function() {
    commands.executeCommand('rax.create.page');
  });
  commands.registerCommand('rax.views.explorer.editPageConfig', function(args) {
    // TODO
    console.log(args);
  });
}

exports.activate = activate;

