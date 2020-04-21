const vscode = require('vscode');
const path = require('path');

module.exports = function setWarningDecorations(context, infos) {
  const editor = vscode.window.activeTextEditor;
  const decorationOptions = {
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
  editor.setDecorations(
    vscode.window.createTextEditorDecorationType(decorationOptions),
    infos.map(info => ({ range: info.range, renderOptions: { after: { ...decorationOptions.after, contentText: info.contentText } } }))
  );
};