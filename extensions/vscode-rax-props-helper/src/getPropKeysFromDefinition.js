const fs = require('fs');
const path = require('path');
const babelParser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const getBabelParserPlugins = require('./getBabelParserPlugins');
const getCompletionItem = require('./getCompletionItem');

// Get props keys from .d.ts file,
module.exports = function getPropKeysFromDefinition(componentPath) {
  const propKeys = [];

  try {
    // Rax component project has it's owner /types.d.ts
    const componentTypesPath = path.dirname(componentPath) + '/types.d.ts';
    if (fs.existsSync(componentTypesPath)) {
      const ast = babelParser.parse(fs.readFileSync(componentTypesPath, 'utf-8'), {
        sourceType: 'module',
        plugins: getBabelParserPlugins('ts')
      });
      if (ast) {
        // https://babeljs.io/docs/en/babel-travers
        traverse(
          ast,
          {
            TSPropertySignature(path) {
              propKeys.push(getCompletionItem(path.node.key.name));
            }
          }
        );
      }
    };
  } catch (error) {
    // ignores
    console.log(error);
  }

  return propKeys;
};