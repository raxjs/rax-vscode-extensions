const vscode = require('vscode');
const path = require('path');
const getPackageInfos = require('./getPackageInfos');
const setWarningDecorations = require('./setWarningDecorations');

const setDecorations = (context) => {
  const { workspace } = vscode;
  const editor = vscode.window.activeTextEditor;
  const fileName = editor.document.fileName;
  if (fileName === path.join(workspace.rootPath, 'package.json')) {
    const documentText = editor.document.getText();
    const packageInfos = getPackageInfos();

    const infos = [];
    console.log(packageInfos);
    for (let packageName in packageInfos) {
      const packageInfo = packageInfos[packageName];
      if (packageInfo.local !== packageInfo.satisfying && packageInfo.satisfying) {
        const matched = documentText.match(`"${packageName}"`);

        if (matched && matched.index) {
          const start = editor.document.positionAt(matched.index);
          const end = editor.document.positionAt(matched.index + packageName.length);

          const range = new vscode.Range(start, end);
          infos.push({ range, contentText: `@${packageInfo.satisfying} will be installed. (local@${packageInfo.local}, latest@${packageInfo.latest})` });
        }
      }
    }
    setWarningDecorations(context, infos);
  }
};

function activate(context) {
  vscode.window.onDidChangeActiveTextEditor(() => {
    setDecorations(context);
  }, null, context.subscriptions);
  setDecorations(context);
};

exports.activate = activate;


