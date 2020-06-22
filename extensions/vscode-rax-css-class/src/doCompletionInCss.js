const fs = require('fs');
const path = require('path');
const vscode = require('vscode');
const getFocusCodeInfo = require('./getFocusCodeInfo');

function unique(arr) {
  return Array.from(new Set(arr));
}

function provideCompletionItems(document, position, _token, _context) {
  const { word, directory } = getFocusCodeInfo(document, position);

  if (word !== '.') {
    return;
  }

  let classNames = [];

  // Read classNames from the file which is in the same directory.
  fs.readdirSync(directory).forEach((file) => {
    if (path.extname(file) === '.jsx' || path.extname(file) === '.tsx') {
      const filePath = `${directory}/${file}`;
      // Add className="xxx" and  style={styles.xxx}
      classNames = classNames.concat(getClassNames(filePath), getCSSModuleKeys(filePath));
    }
  });

  return unique(classNames).map(
    className =>
      new vscode.CompletionItem(
        `.${className}`,
        vscode.CompletionItemKind.Text
      )
  );
}

// Process className="xxx"
function getClassNames(filePath) {
  const code = fs.readFileSync(filePath, 'utf8');
  const reg = new RegExp('className="([\\w- ]+)"', 'g');

  let classNames = [];
  let matched;
  while (matched = reg.exec(code)) {
    const className = matched[1];
    // Process className="test1 test2"
    if (className.includes(' ')) {
      classNames = classNames.concat(className.split(' '));
    } else {
      classNames.push(className);
    }
  }
  return classNames;
}

// Process style={styles.xxx}
function getCSSModuleKeys(filePath) {
  const code = fs.readFileSync(filePath, 'utf8');
  const reg = new RegExp('style=\\{styles\\.([\\w\\.]+)\\}', 'g');

  let CSSModuleKeys = [];
  let matched;
  while (matched = reg.exec(code)) {
    CSSModuleKeys.push(matched[1]);
  }
  return CSSModuleKeys;
}

module.exports = function(context) {
  // Register completionItem provider
  context.subscriptions.push(
    vscode.languages.registerCompletionItemProvider(
      [
        { scheme: 'file', language: 'css' },
        { scheme: 'file', language: 'less' },
        { scheme: 'file', language: 'sass' }
      ],
      { provideCompletionItems },
      '.'
    )
  );
};