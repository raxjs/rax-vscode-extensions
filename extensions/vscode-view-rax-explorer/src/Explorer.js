const path = require('path');
const vscode = require('vscode');
const isRaxProject = require('./isRaxProject');

module.exports = class Explorer {
  constructor(context) {
    this.context = context;

    // Updating Tree View content
    // https://code.visualstudio.com/api/extension-guides/tree-view#updating-tree-view-content
    this._onDidChangeTreeData = new vscode.EventEmitter();
    this.onDidChangeTreeData = this._onDidChangeTreeData.event;

    // Listeners
    vscode.window.onDidChangeActiveTextEditor(() => {
      this.refresh();
    });
    vscode.workspace.onDidChangeTextDocument(() => {
      // TODO config
      // this.refresh();
    });
    vscode.workspace.onDidSaveTextDocument(() => {
      this.refresh();
    });

    this.refresh();
  }

  refresh() {
    this.parseTree();
    // this._onDidChangeTreeData.fire();
  }

  parseTree() {

  }

  // https://code.visualstudio.com/api/extension-guides/tree-view#tree-data-provider
  getChildren() {
    if (!isRaxProject()) {
      return [];
    }
    return [
      { script: 'start', command: 'rax.start', title: 'Start a development server' },
      { script: 'debug', command: 'rax.debug', title: 'Run and debug' },
      { script: 'build', command: 'rax.build', title: 'Build your project' }
    ];
  }

  getTreeItem(element) {
    const treeItem = new vscode.TreeItem(element.script, vscode.TreeItemCollapsibleState.None);
    treeItem.command = {
      command: element.command,
      title: element.title
    };
    treeItem.iconPath = {
      light: this.context.asAbsolutePath(path.join('assets', 'light', 'wrench.svg')),
      dark: this.context.asAbsolutePath(path.join('assets', 'dark', 'wrench.svg'))
    };
    return treeItem;
  }
};

