const vscode = require('vscode');
const css = require('css');
const path = require('path');
const fs = require('fs-extra');
const babel = require('@babel/core');
const babelParser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const { getBabelConfig } = require('rax-compile-config');


function provideDefinition(document, position) {

  // Code info
  const line = document.lineAt(position);
  const word = document.getText(document.getWordRangeAtPosition(position));

  if (!/style|className/g.test(line.text)) return;

  // File info
  const fileName = document.fileName;
  const workDir = path.dirname(fileName);


  try {
    const styleFiles = [];

    // Find style dependencies.
    const code = babel.transformFileSync(fileName, getBabelConfig()).code;
    const ast = babelParser.parse(code, { sourceType: 'module' });

    traverse(ast, {
      CallExpression(path) {
        const { node } = path;
        if (node.callee.name === 'require' && /\.css$/i.test(node.arguments[0].value)) {
          styleFiles.push(node.arguments[0].value);
        }
      }
    });

    // Find style code
    for (let i = 0, l = styleFiles.length; i < l; i++) {
      const stylePath = path.join(workDir, styleFiles[i]);
      const styleCode = fs.readFileSync(stylePath, 'utf-8');

      const stylesheet = css.parse(styleCode).stylesheet;
      const matched = stylesheet.rules.find(rule => rule.selectors.includes(`.${word}`));
      if (matched) {
        const position = matched.position.start;
        return new vscode.Location(vscode.Uri.file(stylePath), new vscode.Position(position.line, position.column));
      }
    }
  } catch (e) {
    // ignore 
  }
}

function activate(context) {
  context.subscriptions.push(vscode.languages.registerDefinitionProvider([
    'javascript',
    'javascriptreact',
    'typescript',
    'typescriptreact'
  ], {
    provideDefinition
  }));
}

exports.activate = activate;
