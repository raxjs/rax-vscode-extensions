const vscode = require('vscode');

const findStyle = require('./findStyle');
const findStyleDependencies = require('./findStyleDependencies');
const findStyleSelectors = require('./findStyleSelectors');
const getFocusCodeInfo = require('./getFocusCodeInfo');

const SUPPORT_LANGUAGES = [
  'javascript',
  'javascriptreact',
  'typescript',
  'typescriptreact'
];

// Cmd+Click jump to style definition
function provideDefinition(document, position) {
  const { line, word, fileName, directory } = getFocusCodeInfo(document, position);

  if (!/style|className/g.test(line.text)) return;

  const matched = findStyle(directory, word, findStyleDependencies(fileName));
  if (matched) {
    const position = matched.position.start;
    return new vscode.Location(vscode.Uri.file(matched.file), new vscode.Position(position.line, position.column));
  }
}

// Show current style on hover over
function provideHover(document, position) {
  const { line, word, fileName, directory } = getFocusCodeInfo(document, position);

  if (!/style|className/g.test(line.text)) return;

  const matched = findStyle(directory, word, findStyleDependencies(fileName));
  if (matched) {
    const styles = matched.declarations.map((declaration) => {
      // * width: 100px;
      return `* ${declaration.property}: ${declaration.value};`
    });
    return new vscode.Hover(`**styles:**  \n ${styles.join('  \n ')} `);
  }
}

// Styles auto Complete
function provideCompletionItems(document, position) {
  const { line, fileName, directory } = getFocusCodeInfo(document, position);
  if (!/style|className/g.test(line.text)) return;

  // In case of cursor shaking
  const word = line.text.substring(0, position.character);

  // match styles.xxx
  if (/styles\.$/g.test(word)) {
    return findStyleSelectors(directory, word, findStyleDependencies(fileName)).map((selector) => {
      // Remove class selector `.`, When use styles.xxx.
      return new vscode.CompletionItem(selector.replace('.', ''), vscode.CompletionItemKind.Variable)
    });
  }
}

function activate(context) {
  // Cmd+Click jump to style definition
  context.subscriptions.push(
    vscode.languages.registerDefinitionProvider(
      SUPPORT_LANGUAGES,
      { provideDefinition }
    )
  );

  SUPPORT_LANGUAGES.forEach((language) => {
    // Show current style on hover over
    context.subscriptions.push(
      vscode.languages.registerHoverProvider(
        language,
        { provideHover }
      )
    );

    // Styles auto Complete (styles.xxx)
    context.subscriptions.push(
      vscode.languages.registerCompletionItemProvider(
        language,
        { provideCompletionItems },
        // match styles.xxx
        '.'
      )
    );
  })
}

exports.activate = activate;
