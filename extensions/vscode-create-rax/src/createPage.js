const vscode = require('vscode');
const fs = require('fs-extra');
const path = require('path');
const createComponent = require('./createComponent');

module.exports = async function createPage(context) {
  // Update app.json add page info
  const afterCreate = (componentName) => {
    const rootPath = vscode.workspace.rootPath;
    const appConfigPath = path.join(rootPath, 'src/app.json');
    const appConfig = fs.readJsonSync(appConfigPath, 'utf-8');

    // https://rax.js.org/docs/en-guide/app-config
    if (!appConfig.routes) {
      appConfig.routes = [];
    }

    // Add new page to routes
    appConfig.routes.push({
      path: `/${componentName.replace(/^([A-Z])/, $ => $.toLowerCase())}`,
      source: `pages/${componentName}/index`
    });

    // Rewrite
    fs.writeJsonSync(appConfigPath, appConfig, { spaces: '\t' });
  };

  // Same as component
  createComponent(context, 'page', 'src/pages', afterCreate);
};