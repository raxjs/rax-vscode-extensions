const vscode = require('vscode');
const fs = require('fs-extra');
const path = require('path');
const lineColumn = require('line-column');

module.exports = function(args) {
  const { commands, workspace, Position, Range, Uri, ViewColumn } = vscode;
  const rootPath = workspace.rootPath;
  const appConfigFilePath = path.join(rootPath, 'src', 'app.json');

  try {
    const appConfigJSON = fs.readFileSync(appConfigFilePath, 'utf-8');
    const currentRoutePath = args.name.slice(7, -1); // 'path: "/detail"' -> '/detail'
    const matched = appConfigJSON.match(`"${currentRoutePath}"`);

    if (matched && matched.index) {
      const positionInfo = lineColumn(appConfigJSON).fromIndex(matched.index);
      const position = new Position(
        // Example: "path": "|/detail",
        positionInfo.line - 1,
        positionInfo.col
      );

      commands.executeCommand(
        'vscode.open',
        Uri.file(appConfigFilePath),
        {
          viewColumn: ViewColumn.One,
          selection: new Range(position, position)
        }
      );
    }
  } catch (e) {
    // ignore
  }
};

