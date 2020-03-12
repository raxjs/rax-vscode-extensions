const fs = require('fs');
const babelParser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const getCompletionItem = require('./getCompletionItem');

module.exports = function getPropKeys(componentPath, componentName) {
  const getPropKeys = [getCompletionItem('aaa')];
  console.log(componentPath);

  try {
    // Use Identifier
    if (/\.(js|jsx)$/.test(componentPath)) {
      const ast = babelParser.parse(fs.readFileSync(componentPath, 'utf-8'), {
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
                    getPropKeys.push(getCompletionItem(property.key.name));
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
                  getPropKeys.push(getCompletionItem(property.key.name));
                });
              }
            },

            // Get props member expression.
            // Example: props.xxx
            MemberExpression(path) {
              const { object, property } = path.node;
              if (object.name === 'props') {
                getPropKeys.push(getCompletionItem(property.name));
              }
            }
          }
        );
      }
    }

    // Use .d.ts
    if (componentPath.endsWith('.d.ts')) {
      // TODO
      console.log(2);
    }
  } catch (error) {
    // ignore
  }


  return getPropKeys;
};