const path = require('path');
const vscode = require('vscode');
const isRaxProject = require('./isRaxProject');

const defaultTreeData = [
  { name: 'Document', icon: 'document' },
  { name: 'Components', icon: 'components' },
  { name: 'Pages', icon: 'pages' },
  { name: 'Configs', icon: 'config' }
];

module.exports = class Explorer {
  constructor(context) {
    this.context = context;
    this.rootPath = vscode.workspace.rootPath;

    // Listeners
    vscode.window.onDidChangeActiveTextEditor(() => {
      this.refresh();
    });
    vscode.workspace.onDidSaveTextDocument(() => {
      this.refresh();
    });

    // Updating Tree View content
    // https://code.visualstudio.com/api/extension-guides/tree-view#updating-tree-view-content
    this._onDidChangeTreeData = new vscode.EventEmitter();
    this.onDidChangeTreeData = this._onDidChangeTreeData.event;
  }

  refresh() {
    this._onDidChangeTreeData.fire();
  }

  getDocumentChildren() {
    return [
      { name: 'document.jsx' }
    ];
  }

  // https://code.visualstudio.com/api/extension-guides/tree-view#tree-data-provider
  getChildren(element) {
    if (!isRaxProject()) {
      return [];
    }
    // Process tree data
    if (!element) {
      return defaultTreeData;
    } else {
      return [];
    }
  }

  getTreeItem(element) {
    const treeItem = new vscode.TreeItem(element.name, vscode.TreeItemCollapsibleState.Expanded);
    if (element.command) {
      treeItem.command = {
        command: element.command,
        title: element.title
      };
    }
    treeItem.iconPath = {
      light: this.context.asAbsolutePath(path.join('assets', 'light', `${element.icon}.svg`)),
      dark: this.context.asAbsolutePath(path.join('assets', 'dark', `${element.icon}.svg`))
    };
    return treeItem;
  }
};

