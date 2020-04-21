const vscode = require('vscode');
const path = require('path');
const getPackageInfos = require('./getPackageInfos');


const setDecorations = (context) => {
  const { workspace } = vscode;
  const editor = vscode.window.activeTextEditor;
  const fileName = editor.document.fileName;
  if (fileName === path.join(workspace.rootPath, 'package.json')) {
    const documentText = editor.document.getText();
    const packageInfos = getPackageInfos();

    for (let packageName in packageInfos) {
      const packageInfo = packageInfos[packageName];

      if (packageInfo.local !== packageInfo.satisfying) {
        const matched = documentText.match(packageName);
        if (matched && matched.index) {
          const start = editor.document.positionAt(matched.index);
          const end = editor.document.positionAt(matched.index + packageName.length);

          const range = new vscode.Range(start, end);
          editor.setDecorations(
            vscode.window.createTextEditorDecorationType({
              backgroundColor: '#e454541b',
              gutterIconSize: '100%',
              gutterIconPath: context.asAbsolutePath(path.join('assets', 'dark', 'error.svg')),
              after: {
                color: '#ff6464',
                backgroundColor: 'fff0',
              },
              light: {
                backgroundColor: '#e4545420',
                gutterIconSize: '100%',
                gutterIconPath: context.asAbsolutePath(path.join('assets', 'light', 'error.svg')),
                after: {
                  color: '#e45454',
                },
              },
              isWholeLine: true,
            })
            , [{ range, renderOptions: { after: { color: '#ff6464', contentText: 'haha' } } }]
          );
          break;
        }
      }
    }

    // console.log(getPackageInfos());
  }
};

function activate(context) {
  vscode.window.onDidChangeActiveTextEditor(() => {
    setDecorations(context);
  }, null, context.subscriptions);
  setDecorations(context);
};

exports.activate = activate;


