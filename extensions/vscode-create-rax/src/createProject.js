const vscode = require('vscode');
const fs = require('fs-extra');
const path = require('path');
const ejs = require('ejs');
const generator = require('rax-generator');
const userName = require('git-user-name');

let webviewPanel = null;
let webviewTemplate = '';

function disposeWebview() {
  if (webviewPanel) {
    webviewPanel.dispose();
    webviewPanel = null;
  }
}

// Init WebviewTemplate, from published extension source path.
function initWebviewTemplate(extensionPath) {
  webviewTemplate = fs.readFileSync(path.join(extensionPath, 'src/templates/create.html.ejs'), 'utf-8');
}

async function createProject(context) {
  const { extensionPath } = context;
  const { env, commands, window, ProgressLocation, Uri, ViewColumn } = vscode;
  disposeWebview();

  let projectAuthor;
  try {
    // https://www.npmjs.com/package/git-user-name
    projectAuthor = userName();
  } catch (e) {
    projectAuthor = 'Rax';
  }

  const options = {
    root: '',
    projectName: '',
    projectAuthor,
    projectType: 'app',
    appType: 'spa',
    projectTargets: ['web'],
    projectFeatures: [],
    projectAliyunId: '',
    projectAliyunRegion: '',
    autoInstallModules: true,
    template: ''
  };

  options.projectName = await window.showInputBox(
    {
      prompt: 'Enter a project name for your new project',
      placeHolder: 'Project name',
      validateInput: function(input) {
        if (input.trim() === '') {
          return 'Please input your project name!';
        }
      }
    }
  );

  // When user cancel input, return undefined
  if (options.projectName !== undefined) {
    // Chose folder to create
    const folders = await window.showOpenDialog({
      canSelectFolders: true,
      openLabel: 'Select a folder to create project'
    });

    if (!folders || folders.length !== 1) {
      return;
    }

    options.root = path.join(folders[0].path, options.projectName);

    webviewPanel = window.createWebviewPanel(
      'createRax',
      'Create Rax',
      ViewColumn.One,
      { enableScripts: true }
    );

    const webviewHTML = ejs.render(webviewTemplate,
      {
        language: env.language,
        styles: [
          `vscode-resource:${path.join(extensionPath, 'assets/client/build/web/', 'pages_Create_index.css')}`
        ],
        scripts: [
          `vscode-resource:${path.join(extensionPath, 'assets/client/build/web/', 'pages_Create_index.js')}`
        ]
      }
    );
    webviewPanel.webview.html = webviewHTML;

    webviewPanel.webview.onDidReceiveMessage(message => {
      if (message.key === 'new-project') {
        Object.assign(options, message.data);

        window.withProgress(
          {
            location: ProgressLocation.Notification,
            title: 'Creating rax project'
          }, () => {
            // Create project
            return generator.init(options).then(function(directory) {
              disposeWebview();
              commands.executeCommand('vscode.openFolder', Uri.file(directory), true);
            }).catch(function(e) {
              window.showErrorMessage(`Create project error: ${e.toString()}`);
            });
          }
        );
      }
    }, undefined, context.subscriptions);
  }
}

module.exports = {
  initWebviewTemplate,
  createProject
};