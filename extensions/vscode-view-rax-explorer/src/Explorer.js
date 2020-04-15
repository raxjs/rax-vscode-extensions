const vscode = require('vscode');
const fs = require('fs-extra');
const path = require('path');
const isRaxProject = require('./isRaxProject');

const defaultTreeData = [
  { name: 'Document', hasChildren: true },
  { name: 'Components', hasChildren: true },
  { name: 'Pages', hasChildren: true },
  { name: 'Configs', hasChildren: true }
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
    const children = [];
    // src/document/index.jsx
    const documentFilePath = path.join(this.rootPath, 'src', 'document', 'index.jsx');
    if (fs.existsSync(documentFilePath)) {
      children.push({ name: 'index.jsx', icon: 'document' });
    }
    return children;
  }

  getComponentsChildren() {
    let children = [];
    const componentsDirPath = path.join(this.rootPath, 'src', 'components');
    try {
      children =
        fs.readdirSync(componentsDirPath)
          .filter(component => fs.statSync(path.join(componentsDirPath, component)).isDirectory())
          .map(component => {
            return {
              name: component,
              icon: 'component',
              contextValue: 'component'
            };
          });
    } catch (e) {
      children = [];
    }
    return children;
  }

  getPagesChildren() {
    const children = [];
    const appConfigFilePath = path.join(this.rootPath, 'src', 'app.json');
    const appConfig = fs.readJsonSync(appConfigFilePath, 'utf-8');
    (appConfig.routes || []).forEach((route) => {
      children.push({
        name: `path: "${route.path}"`,
        icon: 'page',
        contextValue: 'page'
      });
    });

    return children;
  }

  getConfigsChildren() {
    const children = [];
    const appConfigFilePath = path.join(this.rootPath, 'src', 'app.json');
    const buildConfigFilePath = path.join(this.rootPath, 'build.json');
    if (fs.existsSync(appConfigFilePath)) {
      children.push({ name: 'app', icon: 'config' });
    }
    if (fs.existsSync(buildConfigFilePath)) {
      children.push({ name: 'build', icon: 'config' });
    }
    return children;
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
      switch (element.name) {
        case 'Document':
          return this.getDocumentChildren();
        case 'Components':
          return this.getComponentsChildren();
        case 'Pages':
          return this.getPagesChildren();
        case 'Configs':
          return this.getConfigsChildren();
        default:
          return [];
      }
    }
  }

  getTreeItem(element) {
    if (!element) return null;
    const treeItem = new vscode.TreeItem(
      element.name,
      element.hasChildren ?
        vscode.TreeItemCollapsibleState.Expanded :
        vscode.TreeItemCollapsibleState.None
    );
    treeItem.contextValue = element.contextValue || element.name;
    if (element.command) {
      treeItem.command = {
        command: element.command,
        title: element.title || '',
        arguments: element.arguments || null
      };
    }
    if (element.icon) {
      treeItem.iconPath = {
        light: this.context.asAbsolutePath(path.join('assets', 'light', `${element.icon}.svg`)),
        dark: this.context.asAbsolutePath(path.join('assets', 'dark', `${element.icon}.svg`))
      };
    }
    return treeItem;
  }
};

