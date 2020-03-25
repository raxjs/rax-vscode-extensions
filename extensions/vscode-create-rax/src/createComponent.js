const vscode = require('vscode');
const fs = require('fs-extra');
const path = require('path');
const getWorkspaceInfo = require('./getWorkspaceInfo');
const getTemplateCode = require('./getTemplateCode.js');

module.exports = async function createComponent(context) {
  const { extensionPath } = context;
  const { window, ProgressLocation } = vscode;
  const { isRaxProject, isUseTypeScript, rootPath } = getWorkspaceInfo();

  if (!isRaxProject) {
    window.showErrorMessage('Please open Rax project!');
    return false;
  }

  const componentName = await window.showInputBox(
    {
      prompt: 'Enter a component name for your new project',
      placeHolder: 'Component name',
      validateInput: function(input) {
        if (input.trim() === '') {
          return 'Please input your component name!';
        }
        if (!/^[A-Z]/.test(input)) {
          return 'Always start component names with a capital letter!';
        }
      }
    }
  );

  if (componentName) {
    const componentPath = path.join(rootPath, 'src/components', componentName);
    const componentClassName = componentName.replace(/^([A-Z])/, $ => $.toLowerCase());

    if (fs.existsSync(componentPath)) {
      window.showErrorMessage(`There already has component ${componentName}!`);
      return false;
    }

    // Create component
    window.withProgress(
      {
        location: ProgressLocation.Notification,
        title: 'Creating rax component'
      }, async() => {
        fs.mkdirpSync(componentPath);

        // jsx or tsx
        fs.writeFileSync(
          path.join(componentPath, `index.${isUseTypeScript ? 't' : 'j'}sx`),
          getTemplateCode(extensionPath, `component.${isUseTypeScript ? 't' : 'j'}sx.ejs`, {
            componentName,
            componentClassName
          }),
          'utf8'
        );

        // css
        fs.writeFileSync(
          path.join(componentPath, 'index.css'),
          getTemplateCode(extensionPath, 'component.css.ejs', {
            componentClassName
          }),
          'utf8'
        );
      }
    );
  }
};