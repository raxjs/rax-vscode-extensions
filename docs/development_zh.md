# VS Code 扩展开发

## 1. 初始化

安装 [Yeoman](http://yeoman.io/) 和 [VS Code Extension Generator](https://www.npmjs.com/package/generator-code)：

```shell
npm install -g yo generator-code
```

在 `extensions/` 目录下，执行 `yo code` 初始化扩展：

```shell
yo code
```

## 2. 开发调试

开发文档：[https://code.visualstudio.com/api](https://code.visualstudio.com/api)

使用 VS Code 开发扩展工程，通过`F5`开启扩展调试（可直接在 VS Code 中断点）。

## 3. 发布

VS Code 扩展主要有以下 2 种发布方式：

1. 打包成 **vsix** 插件，然后发送给别人安装；

	![img01](https://img.alicdn.com/tfs/TB1ZtcQsX67gK0jSZPfXXahhFXa-506-342.png)

2. 注册开发者账号，发布到官网应用市场，这个发布和 npm 一样是不需要审核的。

### 打包和发布

无论是本地打包还是发布到应用市场都需要借助 [`vsce`](https://www.npmjs.com/package/vsce) 这个工具。

```shell
npm i vsce -g
```

打包和发布都需要登录 publisher 账号。

```shell
vsce login Rax
```

#### 查看或添加 publisher 令牌

访问 [https://aka.ms/SignupAzureDevOps](https://aka.ms/SignupAzureDevOps)。

点击个人中心的 access tokens 创建或查看个人令牌。（可创建多个，也可复用。打包和发布时需要用到）

![img02](https://img.alicdn.com/tfs/TB12K4osuT2gK0jSZFvXXXnFXXa-1500-862.png)

#### 打包

登录完成后，在扩展的目录下运行 `vsce package` ;

#### 发布

同样在扩展目录下运行 `vsce publish` ;

