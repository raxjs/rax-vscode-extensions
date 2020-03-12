const vscode = require('vscode');
const getCurrentJsxElement = require('./getCurrentJsxElement');
const getDefinitions = require('./getDefinitions');
const getPropKeys = require('./getPropKeys');

module.exports = async function provideCompletionItems(document, position) {
  let items = [];

  const { Position } = vscode;
  const documentText = document.getText();
  const cursorPosition = document.offsetAt(position);
  const currentJsxElement = getCurrentJsxElement(documentText, cursorPosition);
  const currentJsxElementTagName = currentJsxElement ? currentJsxElement.name.name : '';

  if (
    currentJsxElement &&
    // Only works in Rax Component (begin with capital letters).
    currentJsxElementTagName[0] === currentJsxElementTagName[0].toUpperCase()
  ) {
    const definitions = await getDefinitions(
      document.uri,
      new Position(
        // Example: <|Text
        currentJsxElement.loc.start.line - 1,
        currentJsxElement.loc.start.column + 2
      )
    );

    definitions.forEach(definition => {
      const componentPath = definition.uri.path;
      items = items.concat(getPropKeys(componentPath, currentJsxElementTagName));
    });


    console.log(currentJsxElement);
    console.log(definitions);
  }

  return items;
};
