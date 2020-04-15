const vscode = require('vscode');
const fs = require('fs-extra');
const path = require('path');

module.exports = function() {
  let isRaxProject = false;
  const rootPath = vscode.workspace.rootPath;
  try {
    const packageJson = JSON.parse(fs.readFileSync(path.join(rootPath, 'package.json'), 'utf-8'));
    if (packageJson.dependencies.rax) {
      isRaxProject = true;
    }
  } catch (e) {
    // ignore
  }

  return isRaxProject;
};

