const vscode = require('vscode');
const create = require('./create/index');
const start = require('./start/index');
const setTerminal = require('./setTerminal');

function activate(context) {
	console.log('"vscode-rax-scripts" is now active!');
	// command rax.create
	context.subscriptions.push(vscode.commands.registerCommand('rax.create', function () {
		create(context);
	}));
	// command rax.start
	context.subscriptions.push(vscode.commands.registerCommand('rax.start', function () {
		start(context);
	}));
	// command rax.build
	context.subscriptions.push(vscode.commands.registerCommand('rax.build', function () {
		setTerminal('npm run build');
	}));
}

exports.activate = activate;
