const fs = require('fs');
const babelParser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const getBabelParserPlugins = require('./getBabelParserPlugins');
const getCompletionItem = require('./getCompletionItem');

// Get props keys from component code,
// * propTypes
// * assignment: const { xxx } = props
// * expression: props.xxx
module.exports = function getPropKeysFromCode(componentPath, componentName) {
  const propKeys = [];
  try {
    const ast = babelParser.parse(fs.readFileSync(componentPath, 'utf-8'), {
      sourceType: 'module',
      plugins: getBabelParserPlugins('jsx')
    });

    if (ast) {
      // https://babeljs.io/docs/en/babel-traverse
      traverse(
        ast,
        {
          // Get propTypes
          ExpressionStatement(path) {
            const { expression } = path.node;
            const { left, right } = expression;

            if (left && right) {
              const leftObject = left.object;
              const leftProperty = left.property;

              if (leftObject.name === componentName && leftProperty.name === 'propTypes') {
                (right.properties || []).forEach((property) => {
                  propKeys.push(getCompletionItem(property.key.name));
                });
              }
            }
          },

          // Get props destructuring assignment.
          // Example: const { xxx } = props;
          VariableDeclarator(path) {
            const { id, init } = path.node;
            if (init.name === 'props') {
              (id.properties || []).forEach((property) => {
                propKeys.push(getCompletionItem(property.key.name));
              });
            }
          },

          // Get props member expression.
          // Example: props.xxx
          MemberExpression(path) {
            const { object, property } = path.node;
            if (object.name === 'props') {
              propKeys.push(getCompletionItem(property.name));
            }
          }
        }
      );
    }
  } catch (error) {
    // ignore
  }

  return propKeys;
};