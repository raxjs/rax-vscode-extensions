const vscode = require('vscode');
const path = require('path');
// const fs = require('fs');

function provideDefinition(document, position) {
  const fileName = document.fileName;
  const workDir = path.dirname(fileName);
  const word = document.getText(document.getWordRangeAtPosition(position));
  const line = document.lineAt(position);

  console.log('fileName: ' + fileName);
  console.log('workDir: ' + workDir);
  console.log('word: ' + word);
  console.log('line: ' + line.text);

  // if (/\/package\.json$/.test(fileName)) {
  //   const json = document.getText();
  //   if (new RegExp(`"(dependencies|devDependencies)":\\s*?\\{[\\s\\S]*?${word.replace(/\//g, '\\/')}[\\s\\S]*?\\}`, 'gm').test(json)) {
  //     let destPath = `${workDir}/node_modules/${word.replace(/"/g, '')}/package.json`;
  //     if (fs.existsSync(destPath)) {
  //       return new vscode.Location(vscode.Uri.file(destPath), new vscode.Position(0, 0));
  //     }
  //   }
  // }
}

function activate(context) {
  context.subscriptions.push(vscode.languages.registerDefinitionProvider(['json'], {
    provideDefinition
  }));
}

exports.activate = activate;
