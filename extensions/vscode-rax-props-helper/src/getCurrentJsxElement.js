const babelParser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const getBabelParserPlugins = require('./getBabelParserPlugins');

// <Text | >...</Text>
const isCursorInJsxOpeningElement = (cursorPosition, jsxOpeningElement) => {
  return cursorPosition > jsxOpeningElement.start && cursorPosition < jsxOpeningElement.end;
};

// <Text xxx={ | } >...</Text>
const isCursorInJsxAttribute = (cursorPosition, node, scope) => {
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

module.exports = function getCurrentJsxElement(documentText, cursorPosition) {
  let currentJsxElement = null;

  try {
    // https://babeljs.io/docs/en/babel-parser
    const ast = babelParser.parse(documentText, {
      sourceType: 'module',
      plugins: getBabelParserPlugins('jsx')
    });

    if (ast) {
      // https://babeljs.io/docs/en/babel-traverse
      traverse(
        ast,
        {
          JSXOpeningElement(path) {
            const jsxOpeningElement = path.node;

            if (
              isCursorInJsxOpeningElement(cursorPosition, jsxOpeningElement) &&
              !isCursorInJsxAttribute(cursorPosition, jsxOpeningElement, path.scope)
            ) {
              currentJsxElement = jsxOpeningElement;
            }
          }
        }
      );
    }
  } catch (error) {
    // ignore
  }

  return currentJsxElement;
};