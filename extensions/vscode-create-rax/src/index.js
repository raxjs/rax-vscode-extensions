const vscode = require('vscode');
const fs = require('fs-extra');
const path = require('path');
const generator = require('rax-generator');

function activate(context) {
	console.log('"vscode-rax-new-project" is now active!');

	const { commands, window, ProgressLocation, Uri, ViewColumn } = vscode;

	let webviewPanel = null;
	const webviewHTML = fs.readFileSync(path.join(context.extensionPath, 'src/create.html'), 'utf-8');

	function disposeWebview() {
		if (webviewPanel) {
			webviewPanel.dispose();
			webviewPanel = null;
		}
	}

	// command rax.create
	context.subscriptions.push(commands.registerCommand('rax.create', async function () {
		disposeWebview();

		const options = {
			root: '',
			projectName: '',
			projectAuthor: 'Rax',
			projectType: 'scaffold',
			scaffoldType: 'spa-standard',
			projectTargets: ['web'],
			projectFeatures: [],
			projectAliyunId: '',
			projectServerlessRegion: '',
			autoInstallModules: false,
			template: ''
		};

		options.projectName = await window.showInputBox(
			{
				prompt: "Enter a project name for your new project",
				placeHolder: "Project name",
				validateInput: function (input) {
					if (input.trim() === '') {
						return "Please input your project name!"
					}
				}
			}
		);

		// When user cancel input, return undefined
		if (options.projectName !== undefined) {

			// Chose folder to create
			const folders = await window.showOpenDialog({
				canSelectFolders: true,
				openLabel: "Select a folder to create project"
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
							return generator.init(options).then(function (directory) {
								disposeWebview();
								commands.executeCommand("vscode.openFolder", Uri.file(directory), true);
							}).catch(function (e) {
								window.showErrorMessage(`Create project error: ${e.toString()}`);
							});
						}
					);
				}
			}, undefined, context.subscriptions);
		}
	}));
}

exports.activate = activate;
