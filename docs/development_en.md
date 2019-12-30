# VS Code extension development

## 1. Initialization

Install [Yeoman](http://yeoman.io/) and [VS Code Extension Generator](https://www.npmjs.com/package/generator-code)：

```shell
npm install -g yo generator-code
```

In the `extensions/` Directory, execute `yo code` to initialize the extension

```shell
yo code
```

## 2. Development and Debugging

Document：[https://code.visualstudio.com/api](https://code.visualstudio.com/api)

Use the VS Code to develop the extension project, and enable extension debugging through `F5`.

## 3. Publish

The VS Code extension is mainly released in the following two ways:

1. Package it into **.vsix** and send it to others for installation;

	![img01](https://img.alicdn.com/tfs/TB1ZtcQsX67gK0jSZPfXXahhFXa-506-342.png)

2. Register a developer account and publish it to the VS Code Extensions Marketplace.

### Packaging and Publish

Whether it is locally packaged or published to the application market, you need to use [`vsce`](https://www.npmjs.com/package/vsce).

```shell
npm i vsce -g
```

You must log in to the publisher account for packaging and publishing.

```shell
vsce login Rax
```

#### View and add publisher tokens

Visit [https://aka.ms/SignupAzureDevOps](https://aka.ms/SignupAzureDevOps)。

Click access tokens in the personal center to create and view personal tokens.

![img02](https://img.alicdn.com/tfs/TB12K4osuT2gK0jSZFvXXXnFXXa-1500-862.png)

#### Packaging

Run `vsce package` ;

#### Publish

Run `vsce publish` ;

