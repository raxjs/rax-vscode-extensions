const vscode = require('vscode');
const fs = require('fs-extra');
const path = require('path');
const getWorkspaceInfo = require('./getWorkspaceInfo');
const getTemplateCode = require('./getTemplateCode.js');

module.exports = async function createComponent(context, targetName = 'component', targetDirectory = 'src/components', callback) {
  const { extensionPath } = context;
  const { commands, window, ProgressLocation, Uri, ViewColumn } = vscode;
  const { isRaxProject, isUseTypeScript, rootPath } = getWorkspaceInfo();

  if (!isRaxProject) {
    window.showErrorMessage('Please open Rax project!');
    return false;
  }

  const componentName = await window.showInputBox(
    {
      prompt: `Enter a ${targetName} name`,
      placeHolder: `The ${targetName} name`,
      validateInput: function(input) {
        if (input.trim() === '') {
          return `Please input your ${targetName} name!`;
        }
        if (!/^[A-Z]/.test(input)) {
          return 'Always start component names with a capital letter!';
        }
      }
    }
  );

  if (componentName) {
    const componentPath = path.join(rootPath, targetDirectory, componentName);
    // Logo => logo
    const componentClassName = componentName.replace(/^([A-Z])/, $ => $.toLowerCase());

    if (fs.existsSync(componentPath)) {
      window.showErrorMessage(`There already has ${targetName} ${componentName}!`);
      return false;
    }

    // Create component
    window.withProgress(
      {
        location: ProgressLocation.Notification,
        title: `Creating rax ${targetName}`
      }, async() => {
        fs.mkdirpSync(componentPath);

        // jsx or tsx
        const componentFilePath = path.join(componentPath, `index.${isUseTypeScript ? 't' : 'j'}sx`);
        fs.writeFileSync(
          componentFilePath,
          getTemplateCode(extensionPath, `component.${isUseTypeScript ? 't' : 'j'}sx.ejs`, {
            componentName,
            componentClassName,
            targetName
          }),
          'utf8'
        );

        // css
        fs.writeFileSync(
          path.join(componentPath, 'index.css'),
          getTemplateCode(extensionPath, 'component.css.ejs', {
            componentClassName,
            targetName
          }),
          'utf8'
        );

        // Open jsx or tsx file to preview
        commands.executeCommand('vscode.open', Uri.file(componentFilePath), {
          viewColumn: ViewColumn.One
        });

        // Update Explorer
        commands.executeCommand('rax.view.explorer.refresh');

        callback && callback(componentName);
      }
    );
  }
};