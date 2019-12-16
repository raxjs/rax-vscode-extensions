const vscode = require('vscode');
const fs = require('fs-extra');
const path = require('path');

function activate(context) {
	console.log('"vscode-rax-new-project" is now active!');
	// command rax.create
	context.subscriptions.push(vscode.commands.registerCommand('rax.create', function () {
		const panel = vscode.window.createWebviewPanel(
			'raxCreate', // mark webview
			'Rax New Project', // page title
			vscode.ViewColumn.One,
			{ enableScripts: true }
		);

		const html = fs.readFileSync(path.join(context.extensionPath, 'src/create.html'), 'utf-8');
		panel.webview.html = html;
	}));
}

exports.activate = activate;
