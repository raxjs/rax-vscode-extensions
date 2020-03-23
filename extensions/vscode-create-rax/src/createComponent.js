const vscode = require('vscode');
const fs = require('fs-extra');
const path = require('path');
const ejs = require('ejs');
const getWorkspaceInfo = require('./getWorkspaceInfo');

module.exports = async function createComponent(context) {
  const { env, commands, window, ProgressLocation, Uri, ViewColumn } = vscode;
  const { isRaxProject, isUseTypeScript } = getWorkspaceInfo();

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
          return 'Please input your Component name!';
        }
        if (!/^[a-zA-Z](.+)$/.test(input)) {
          return 'Always start component names with a capital letter!';
        }
      }
    }
  );

  console.log(componentName);
};