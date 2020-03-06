const babelParser = require('@babel/parser');
const traverse = require('@babel/traverse').default;

module.exports = function provideCompletionItems(document, position) {
  const documentText = document.getText();
  const cursorPosition = document.offsetAt(position);

  let ast;

  try {
    ast = babelParser.parse(documentText, {
      sourceType: 'module',
      plugins: [
        'jsx',
        'flow',
        'doExpressions',
        'objectRestSpread',
        'decorators-legacy',
        'classProperties',
        'exportExtensions',
        'asyncGenerators',
        'functionBind',
        'functionSent',
        'dynamicImport'
      ]
    });
  } catch (error) {
    // ignore
  }

  // <Text | >...</Text>
  const isCursorInJsxOpeningElement = (jsxOpeningElement) => {
    return cursorPosition > jsxOpeningElement.start && cursorPosition < jsxOpeningElement.end;
  };

  // <Text xxx={ | } >...</Text>
  const isCursorInJsxAttribute = (node, scope) => {
    let result = false;
    traverse(
      node,
      {
        JSXAttribute(path) {
          const jsxAttribute = path.node;

          if (cursorPosition > jsxAttribute.start && cursorPosition < jsxAttribute.end) {
            result = true;
          }
        }
      },
      scope
    );
    return result;
  };

  if (ast) {
    traverse(
      ast,
      {
        JSXOpeningElement(path) {
          const jsxOpeningElement = path.node;

          if (
            isCursorInJsxOpeningElement(jsxOpeningElement) &&
            !isCursorInJsxAttribute(jsxOpeningElement, path.scope)
          ) {
            console.log(jsxOpeningElement);
          }
        }
      }
    );
  }

  return [];
};
