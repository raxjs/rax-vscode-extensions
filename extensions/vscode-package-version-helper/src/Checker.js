const vscode = require('vscode');
const fs = require('fs-extra');
const path = require('path');
const lineColumn = require('line-column');
const getPackageInfos = require('./getPackageInfos');
const WarningDecorations = require('./WarningDecorations');

module.exports = class Explorer {
  constructor(context) {
    this.context = context;
    this.rootPath = vscode.workspace.rootPath;
    this.packageFilePath = path.join(this.rootPath, 'package.json');

    this.packageSourceCache = '';

    this.warningList = [];
    this.warningDecorations = new WarningDecorations(context);
  }

  check() {
    const packageSource = fs.readFileSync(this.packageFilePath, 'utf-8');
    if (packageSource !== this.packageSourceCache) {
      // Reset
      this.warningList = [];
      this.packageSourceCache = packageSource;

      vscode.window.withProgress(
        {
          location: vscode.ProgressLocation.Notification,
          title: 'Checking npm package versions'
        }, () => {
          // Create project
          return getPackageInfos(packageSource).then((packageInfos) => {
            // Package file doesn't change
            if (packageInfos.__SOURCE__ === this.packageSourceCache) {
              for (let packageName in packageInfos) {
                this.checkMaxSatisfying(packageInfos[packageName]);
              }
              if (this.warningList.length) {
                vscode.window.showWarningMessage('Some versions of package will be installed. See: [package.json](command:package.open)');
              }
              this.setDecorations();
            }
          });
        }
      );
    }
    this.setDecorations();
  }

  // If the highest satisfies version is not equal to local installed version, show warning.
  checkMaxSatisfying(packageInfo) {
    if (
      packageInfo.local && packageInfo.satisfying &&
      packageInfo.local !== packageInfo.satisfying
    ) {
      const matched = this.packageSourceCache.match(`"${packageInfo.name}"`);

      if (matched && matched.index) {
        const { Position, Range } = vscode;

        const start = lineColumn(this.packageSourceCache).fromIndex(matched.index);
        const end = lineColumn(this.packageSourceCache).fromIndex(matched.index + packageInfo.name.length);

        this.warningList.push({
          range: new Range(
            new Position(start.line - 1, start.col - 1),
            new Position(end.line - 1, end.col - 1)
          ),
          contentText: `@${packageInfo.satisfying} will be installed. (local@${packageInfo.local}, latest@${packageInfo.latest})`
        });
      }
    }
  }

  setDecorations() {
    const editor = vscode.window.activeTextEditor;
    this.warningDecorations.dispose();
    if (this.warningList.length && editor.document.fileName === this.packageFilePath) {
      this.warningDecorations.setDecorations(this.warningList);
    }
  }
};