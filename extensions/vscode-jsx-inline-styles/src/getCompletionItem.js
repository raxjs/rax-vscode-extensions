const vscode = require('vscode');

module.exports = function getCompletionItem(
  text,
  detail,
  documentation = '',
  insertedText = false,
  itemKind = 'Property'
) {
  const completionItem = new vscode.CompletionItem(text, vscode.CompletionItemKind[itemKind]);
  completionItem.detail = detail;
  completionItem.documentation = documentation;
  completionItem.insertText = insertedText;
  return completionItem;
};
