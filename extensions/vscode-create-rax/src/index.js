const vscode = require('vscode');
const createComponent = require('./createComponent');
const createPage = require('./createPage');
const createProject = require('./createProject');


function activate(context) {
  const { commands } = vscode;

  // command rax.create.project
  context.subscriptions.push(commands.registerCommand('rax.create.project', function() {
    createProject(context);
  }));

  // command rax.create.page
  context.subscriptions.push(commands.registerCommand('rax.create.page', function() {
    createPage(context);
  }));

  // command rax.create.component
  context.subscriptions.push(commands.registerCommand('rax.create.component', function() {
    createComponent(context);
  }));
}

exports.activate = activate;
