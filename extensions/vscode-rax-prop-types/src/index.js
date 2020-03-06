const vscode = require('vscode');
const provideCompletionItems = require('./provideCompletionItems');

function activate() {
  console.log(111);
  vscode.languages.registerCompletionItemProvider(
    ['javascript', 'javascriptreact'],
    { provideCompletionItems }
  );
};

exports.activate = activate;
