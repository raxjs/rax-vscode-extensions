# Contributing Guide

Want to contribute to Rax VS Code Extensions? There are a few things you need to know.

## Development Workflow

After cloning project, run `npm install` to fetch its dependencies.  
Run `npm run setup` link and bootstrap project before development.

Then, you can run several commands:

* `npm run lint` checks the code style.
* `npm test` runs the complete test suite.

## VS Code extension development

You can add the VS Code Extension of Rax to the directory `extension`.

### 1. Initialization

Install [Yeoman](http://yeoman.io/) and [VS Code Extension Generator](https://www.npmjs.com/package/generator-code)：

```shell
npm install -g yo generator-code
```

In the `extensions/` Directory, execute `yo code` to initialize the extension

```shell
yo code
```

### 2. Development and Debugging

Document：[https://code.visualstudio.com/api](https://code.visualstudio.com/api)

Use the VS Code to develop the extension project, and enable extension debugging through `F5`.

### 3. Packaging Extension

First you need to use [`vsce`](https://www.npmjs.com/package/vsce).

```shell
npm i vsce -g
```

Run `vsce package`, package it into **vsix** and send it to others for installation;

### 4. Publish Extension

Add `"publisher": "Rax"` into your extension package.json

```json
{
	"publisher": "Rax"
}
```

When your   **PR** has been **merged**, It will auto publish to VS Code Extension [Marketplace](https://marketplace.visualstudio.com/).



