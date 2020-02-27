const vscode = require('vscode');

module.exports = function(text) {
  let NEXT_TERM_ID = 1;
  let terminal = null;
  if (vscode.window.terminals.length) {
    terminal = vscode.window.terminals[0];
  } else {
    terminal = vscode.window.createTerminal({
      name: `Rax Terminal #${NEXT_TERM_ID++}`
    });
  }
  // terminal focus
  terminal.show();
  // exit last program
  terminal.sendText('\u0003');
  // run text
  terminal.sendText(text);
};