const vscode = require('vscode');
const provideCompletionItems = require('./provideCompletionItems');

function activate() {
  vscode.languages.registerCompletionItemProvider(
    ['javascript', 'javascriptreact'],
    { provideCompletionItems }
  );
};

exports.activate = activate;
