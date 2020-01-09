const babel = require('@babel/core');
const babelParser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const { getBabelConfig } = require('rax-compile-config');

// Find style dependencies, like import style form './index.css';
module.exports = function findStyleDependencies(file) {
  const StyleDependencies = [];

  const code = babel.transformFileSync(file, getBabelConfig()).code;
  const ast = babelParser.parse(code, { sourceType: 'module' });

  traverse(ast, {
    CallExpression(path) {
      const { node } = path;
      // Find parsed code's `require('xxx.css')`;
      if (
        node.callee.name === 'require' &&
        /\.css$/i.test(node.arguments[0].value)
      ) {
        StyleDependencies.push(node.arguments[0].value);
      }
    }
  });

  return StyleDependencies;
}
