const vscode = require('vscode');
const fs = require('fs-extra');
const path = require('path');
const isRaxProject = require('./isRaxProject');
const getIndexFilePath = require('./getIndexFilePath');

const defaultTreeData = [
  { name: 'Document', hasChildren: true },
  { name: 'Components', hasChildren: true },
  { name: 'Pages', hasChildren: true }
];

const getOpenCommandChild = (child, filePath) => {
  if (filePath) {
    child.command = 'vscode.open';
    child.arguments = [
      vscode.Uri.file(filePath),
      {
        viewColumn: vscode.ViewColumn.One
      }
    ];
  }
  return child;
};

module.exports = class Explorer {
  constructor(context) {
    this.context = context;
    this.rootPath = vscode.workspace.rootPath;

    // Listeners
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

  // src/document/index.jsx
  getDocumentChildren() {
    const children = [];
    const basePath = path.join('src', 'document', 'index.jsx');
    const documentFilePath = path.join(this.rootPath, basePath);
    if (fs.existsSync(documentFilePath)) {
      children.push(getOpenCommandChild({
        name: 'index.jsx',
        icon: 'document',
        tooltip: `Path: ${basePath}`
      },
      documentFilePath));
    }
    return children;
  }

  // src/components/xxx
  getComponentsChildren() {
    let children = [];
    const baseDirPath = path.join('src', 'components');
    const componentsDirPath = path.join(this.rootPath, baseDirPath);
    try {
      children =
        fs.readdirSync(componentsDirPath)
          .filter(component => fs.statSync(path.join(componentsDirPath, component)).isDirectory())
          .map(component => getOpenCommandChild(
            {
              name: component,
              icon: 'component',
              contextValue: 'component',
              tooltip: `Path: ${path.join(baseDirPath, component)}`
            },
            getIndexFilePath(path.join(componentsDirPath, component))
          ));
    } catch (e) {
      children = [];
    }
    return children;
  }

  // Routes in app.json
  getPagesChildren() {
    const children = [];
    const appConfigFilePath = path.join(this.rootPath, 'src', 'app.json');
    const appConfig = fs.readJsonSync(appConfigFilePath, 'utf-8');
    (appConfig.routes || []).forEach((route) => {
      const basePath = path.join('src', route.source);
      children.push(getOpenCommandChild(
        {
          name: `path: "${route.path}"`,
          icon: 'page',
          contextValue: 'page',
          tooltip: `Path: ${basePath}`
        },
        getIndexFilePath(path.join(this.rootPath, basePath))
      ));
    });
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
    treeItem.tooltip = element.tooltip;
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

