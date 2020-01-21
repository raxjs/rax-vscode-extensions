// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const fs = require('fs');
const FLEX_PROPERTY_REG =  /(flex-direction|flex-wrap|justify-content|align-items|align-content|flex|flex-basis|flex-grow|flex-shrink|align-self)(\s+)?:(\s+)?([.\w-\s]*);/gi;
const SUPPORTS_FILE_TYPES = ['css', 'less', 'sass', 'scss', 'rml', 'vue', 'html'];

function decorateIcon(editor, iconDecorationType) {
  const sourceCode = editor.document.getText();
  
  let decorationsArray = [];

  const sourceCodeArr = sourceCode.split('\n');

  for (let line = 0; line < sourceCodeArr.length; line++) {
    const sourceCode = sourceCodeArr[line];

    let matches = [];
    
    while (match = FLEX_PROPERTY_REG.exec(sourceCode)) {
      matches.push(match);
    }

    if (matches.length > 0) {
      matches.forEach(match => {
        if (match.index !== undefined) {
          // Exampel: align-items : center;
          const offsetIndex = match[1].length + (match[2] ? match[2].length : 0) + 1 + (match[3] ? match[3].length : 0);
          let range = new vscode.Range(
            new vscode.Position(line, match.index),
            new vscode.Position(line, match.index + offsetIndex)
          );

          let decoration = { range };

          decorationsArray.push(decoration);
        }
      });
    }
  }

  editor.setDecorations(iconDecorationType, decorationsArray);
}

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

  let currentFlexPropertyNameAndValueRange;
  let currentFlexProperty;
  let currentDocument;
  let pickerPanel;

  const iconDecorationType = vscode.window.createTextEditorDecorationType({
    after: {
      contentText: ' ',
      margin: '0.1em 0.2em 0 0.2em',
      width: '.8rem',
      height: '0.8em'
    },
    dark: {
      after: {
        contentIconPath: context.asAbsolutePath('/assets/flexbox-icon-light.svg')
      }
    },
    light: {
      after: {
        contentIconPath: context.asAbsolutePath('/assets/flexbox-icon-dark.svg')
      }
    }
  });

  const activeEditor = vscode.window.activeTextEditor;
  
  if (activeEditor) {
    decorateIcon(activeEditor, iconDecorationType);
  }

  const disposableVisibleTextEditors = vscode.window.onDidChangeVisibleTextEditors(event => {
    let editor = vscode.window.activeTextEditor;
    decorateIcon(editor, iconDecorationType);
  });
  
  const disposableChangeDocument = vscode.workspace.onDidChangeTextDocument(event => {
    const openEditor = vscode.window.visibleTextEditors.filter(
      editor => editor.document.uri === event.document.uri
    )[0];
    decorateIcon(openEditor, iconDecorationType);
  });

  const disposableCommand = vscode.commands.registerCommand('flexbox.picker', () => {
    // Create and show a new webview
    if (pickerPanel == null) {
      pickerPanel = vscode.window.createWebviewPanel(
        'flexboxPicker',
        'Flexbox Picker',
        vscode.ViewColumn.Beside,
        {
          enableScripts: true,
          enableCommandUris: true
        }
      );
      pickerPanel.onDidDispose(
        () => {
          // When the panel is closed, cancel any future updates to the webview content
          pickerPanel = null;
        },
        null,
        context.subscriptions
      );

      // Handle messages from the webview
      pickerPanel.webview.onDidReceiveMessage(async message => {
        const targetFsPath = message.fsPath;
        let targetTextEditor;
        vscode.window.visibleTextEditors.forEach((textEditor) =>{
          if (textEditor.document.uri.fsPath === targetFsPath) {
            targetTextEditor = textEditor;
          }
        });

        if (!targetTextEditor) {
          const uri = vscode.Uri.file(targetFsPath);
          targetTextEditor = await vscode.window.showTextDocument(uri, {
            viewColumn: vscode.ViewColumn.Beside
          });
        }

        if (targetTextEditor) {
          targetTextEditor.edit(builder => {
            // currentTextEditor.show();
            // currentTextEditor.revealRange(currentFlexPropertyNameAndValueRange);
            const newText = `${message.propertyName}: ${message.propertyValue};`;
            builder.replace(currentFlexPropertyNameAndValueRange, newText);
            // Update range for picker udpate at some position 
            currentFlexPropertyNameAndValueRange = currentFlexPropertyNameAndValueRange.with(
              currentFlexPropertyNameAndValueRange.start,
              new vscode.Position(currentFlexPropertyNameAndValueRange.start.line, currentFlexPropertyNameAndValueRange.start.character + newText.length),
            );
          });
        }
      });
    } else {
      pickerPanel.reveal();
    }

    const webviewPath = context.asAbsolutePath('/src/flexbox-picker.html');
    let html = fs.readFileSync(webviewPath, 'utf-8');
    html = html.replace('$FS_PATH', currentDocument.uri.fsPath)
      .replace('$PROPERTY_NAME', currentFlexProperty.name)
      .replace('$PROPERTY_VALUE', currentFlexProperty.value);
    pickerPanel.webview.html = html;
  });

  const hoverProvider = {
    provideHover(doc, pos, token) {
      const range = doc.getWordRangeAtPosition(pos, FLEX_PROPERTY_REG);
      const fileName = doc.fileName;

      if (range === undefined) {
        return;
      }

      const hoverText = doc.getText(range);
      const match = FLEX_PROPERTY_REG.exec(hoverText);
      if (match) {
        currentDocument = doc;
        currentFlexProperty = {
          name: match[1],
          value: match[4]
        };
        currentFlexPropertyNameAndValueRange = range;
      }
 
      const commandUri = vscode.Uri.parse('command:flexbox.picker');
      const markedString = new vscode.MarkdownString(`[Open Flexbox Picker 💬](${commandUri} "Open Flexbox Picker")`);

      // To enable command URIs in Markdown content, you must set the `isTrusted` flag.
      // When creating trusted Markdown string, make sure to properly sanitize all the
      // input content so that only expected command URIs can be executed
      markedString.isTrusted = true;

      return new vscode.Hover(markedString);
    }
  };

  const disposableHoverProvider = vscode.languages.registerHoverProvider(
    SUPPORTS_FILE_TYPES,
    hoverProvider
  );

  context.subscriptions.push(
    disposableCommand,
    disposableHoverProvider,
    disposableChangeDocument,
    disposableVisibleTextEditors
  );
}

// this method is called when your extension is deactivated
function deactivate() { }

module.exports = {
  activate,
  deactivate
};
