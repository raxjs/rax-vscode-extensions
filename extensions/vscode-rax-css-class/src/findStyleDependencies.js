const fs = require('fs');
const babelParser = require('@babel/parser');
const traverse = require('@babel/traverse').default;

// Find style dependencies, like import style form './index.css';
module.exports = function findStyleDependencies(file) {
  const StyleDependencies = [];

  try {
    const ast = babelParser.parse(fs.readFileSync(file, 'utf-8'), {
      // Support JSX and TS
      plugins: ['typescript', 'jsx'],
      sourceType: 'module',
    });

    traverse(ast, {
      ImportDeclaration(path) {
        const { node } = path;
        if (/\.css$/i.test(node.source.value)) {
          // import styles from './xxx.css';
          // return [{ source: './xxx.css', identifier: 'styles' }]
          // import './xxx.css';
          // return [{ source: './xxx.css', identifier: null }]
          StyleDependencies.push({
            source: node.source.value,
            // Just return first identifier.
            identifier:
              node.specifiers[0] ?
                node.specifiers[0].local.name :
                null
          });
        }
      }
    });
  } catch (e) {
    // ignore
  }

  return StyleDependencies;
};
