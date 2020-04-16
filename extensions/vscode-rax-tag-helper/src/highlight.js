const vscode = require('vscode');

// JSX_TAG begin with capital letters, like View.
const JSX_TAG_COLOR = '#FFCB6B';
// HTML_TAG begin with lower-case letters, like div.
const HTML_TAG_COLOR = '#89DDFF';
// {/* xx */} , <!-- xx --> , <xx>, <xx, </xx>, </xx
const TAG_REG = /{\/\*|\*\/}|<!--|-->|<(\/|)(\w+)\s?/g;

const decorationCache = {
  JSX: null,
  HTML: null
};

function getDecoration(key) {
  // Reset color
  if (decorationCache[key]) {
    decorationCache[key].decorator.dispose();
  }

  const decoration = {
    chars: [],
    decorator: vscode.window.createTextEditorDecorationType(
      { color: key === 'JSX' ? JSX_TAG_COLOR : HTML_TAG_COLOR }
    )
  };

  decorationCache[key] = decoration;
  return decoration;
}

function decorate() {
  const editor = vscode.window.activeTextEditor;
  const text = editor.document.getText();

  const JSXTagDecoration = getDecoration('JSX');
  const HTMLTagDecoration = getDecoration('HTML');

  let matched;
  let isInComment = false;

  while (matched = TAG_REG.exec(text)) {
    // Not highlight in comment
    if (matched[0] === '<!--' || matched[0] === '{/*') {
      isInComment = true;
      continue;
    }
    if (matched[0] === '-->' || matched[0] === '*/}') {
      isInComment = false;
      continue;
    }
    if (isInComment === true) {
      continue;
    }

    // <|Text  </|Text>
    const offset = matched[1] ? 2 : 1;
    const tagName = matched[2] || '';

    // For fragment <> xxx </>
    if (!tagName) continue;

    const start = editor.document.positionAt(matched.index + offset);
    const end = editor.document.positionAt(matched.index + tagName.length + offset);

    const range = new vscode.Range(start, end);

    if (tagName[0] === tagName[0].toUpperCase()) {
      JSXTagDecoration.chars.push(range);
    } else {
      HTMLTagDecoration.chars.push(range);
    }
  }

  editor.setDecorations(JSXTagDecoration.decorator, JSXTagDecoration.chars);
  editor.setDecorations(HTMLTagDecoration.decorator, HTMLTagDecoration.chars);
}

module.exports = function highlight(context) {
  // listeners
  vscode.window.onDidChangeActiveTextEditor(() => {
    decorate();
  }, null, context.subscriptions);
  vscode.workspace.onDidChangeTextDocument(() => {
    decorate();
  }, null, context.subscriptions);

  decorate();
};
