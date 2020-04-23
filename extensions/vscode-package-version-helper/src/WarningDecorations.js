const vscode = require('vscode');
const path = require('path');

module.exports = class WarningDecorations {
  constructor(context) {
    this.context = context;
    this.decorationOptions = {
      gutterIconSize: '100%',
      after: {
        backgroundColor: 'fff0',
        margin: '0 0 0 3em',
        textDecoration: 'none',
      },
      dark: {
        backgroundColor: '#ff942f1b',
        gutterIconPath: context.asAbsolutePath(path.join('assets', 'dark', 'warning.svg')),
        after: {
          color: '#fa973a',
        },
      },
      light: {
        backgroundColor: '#ff942f20',
        gutterIconPath: context.asAbsolutePath(path.join('assets', 'light', 'warning.svg')),
        after: {
          color: '#ff942f',
        },
      },
      isWholeLine: true,
    };
    this.decorationType = null;
  }

  dispose() {
    this.decorationType && this.decorationType.dispose();
  }

  setDecorations(infos) {
    const editor = vscode.window.activeTextEditor;
    this.decorationType = vscode.window.createTextEditorDecorationType(this.decorationOptions);
    editor.setDecorations(
      this.decorationType,
      infos.map(info => ({ range: info.range, renderOptions: { after: { ...this.decorationOptions.after, contentText: info.contentText } } }))
    );
  }
};