const vscode = require('vscode');
const getCurrentJsxElement = require('./getCurrentJsxElement');
const getDefinitions = require('./getDefinitions');


module.exports = async function provideCompletionItems(document, position) {
  const items = [];

  const { Position } = vscode;
  const documentText = document.getText();
  const cursorPosition = document.offsetAt(position);
  const currentJsxElement = getCurrentJsxElement(documentText, cursorPosition);

  if (currentJsxElement) {
    const definitions = await getDefinitions(
      document.uri,
      new Position(
        currentJsxElement.loc.start.line - 1,
        currentJsxElement.loc.start.column + 2
      )
    );

    console.log(currentJsxElement);
    console.log(definitions);
  }

  return items;
};
