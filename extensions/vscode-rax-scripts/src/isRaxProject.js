const fs = require('fs');
const path = require('path');
const vscode = require('vscode');

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

