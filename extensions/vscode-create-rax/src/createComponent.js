const vscode = require('vscode');
const fs = require('fs-extra');
const path = require('path');
const ejs = require('ejs');
const getWorkspaceInfo = require('./getWorkspaceInfo');

module.exports = function createComponent(context) {
  // todo
  console.log(getWorkspaceInfo());
};