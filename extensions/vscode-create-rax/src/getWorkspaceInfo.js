const vscode = require('vscode');
const fs = require('fs-extra');
const path = require('path');

module.exports = function getWorkspaceInfo() {
  const rootPath = vscode.workspace.rootPath;

  let isRaxProject = false;
  let isUseTypeScript = false;

  try {
    const packageJson = fs.readJsonSync(path.join(rootPath, 'package.json'), 'utf-8');
    if (packageJson.dependencies.rax) {
      isRaxProject = true;
    }
  } catch (e) {
    // ignore
  }

  if (fs.existsSync(path.join(rootPath, 'tsconfig.json'))) {
    isUseTypeScript = true;
  }

  return {
    rootPath,
    isRaxProject,
    isUseTypeScript
  };
};