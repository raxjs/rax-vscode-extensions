const vscode = require('vscode');

module.exports = function getCompletionItem(itemText) {
  const completionItem = new vscode.CompletionItem(itemText, vscode.CompletionItemKind.Variable);
  completionItem.insertText = `${itemText}={}`;
  return completionItem;
};