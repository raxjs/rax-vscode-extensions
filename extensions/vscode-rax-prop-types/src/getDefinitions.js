const vscode = require('vscode');

module.exports = async function getDefinitions(documentUri, position) {
  const { commands } = vscode;
  // https://code.visualstudio.com/api/references/commands
  const definitions = await commands.executeCommand(
    'vscode.executeDefinitionProvider',
    documentUri,
    position
  );

  console.log(definitions);

  return definitions || [];
};