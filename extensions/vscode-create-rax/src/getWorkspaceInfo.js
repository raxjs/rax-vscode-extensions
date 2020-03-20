const fs = require('fs');
const path = require('path');
const vscode = require('vscode');


module.exports = function getWorkspaceInfo() {
  const rootPath = vscode.workspace.rootPath;

  let isRaxProject = false;
  let isUseTypeScript = false;

  try {
    const packageJson = JSON.parse(fs.readFileSync(path.join(rootPath, 'package.json'), 'utf-8'));
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
    isRaxProject,
    isUseTypeScript
  };
};