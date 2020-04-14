const path = require('path');
const vscode = require('vscode');
const isRaxProject = require('./isRaxProject');

module.exports = class Scripts {
  constructor(context) {
    this.context = context;
  }
  // https://code.visualstudio.com/api/extension-guides/tree-view
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

