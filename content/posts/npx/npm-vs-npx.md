---
title: npx是什么
date: 2021-05-26T17:55:32.169Z
description: npx和npm的区别是啥，npx能解决npm的哪些痛点
---


如果你曾经用过Node.js，那你一定用过npm。

**npm**(node package manager)是你安装Node.js之后开箱即用的包依赖管理工具。开发者可以通过它本地或全局安装依赖库。

有时候你可能只是想了解下某些库，然后试一试它的一些命令，但是你不在本地  **node_modules**  文件夹安装相关的库你是无法尝试它的指令的。

这就是 **npx** 出现的原因。

本文我们讲着重看一看两者的区别，学会在合适的场景使用它们。

首先，让我们先来了解下 **npm** 到底是什么，我们可以通过它来干些啥。

### npm the package manager

它是一个在线资源库，用于发布开源的Node.js项目

它是一个CLI（命令行）工具，可以帮助你安装库并管理其版本和依赖（npm上又成千上万的Node.js库和应用，而且每天都在增加）

npm本身不会运行任何库，如果你想使用npm来运行某些库，你必须要在你的 **package.json** 文件中声明

当npm执行安装库的指令时（npm install xxx)，npm会创建指向它们的链接
1. 本地安装会在 **./node_modules/.bin/** 文件夹中创建链接
2. 全局安装会在全局的 **bin/** 文件夹下创建链接（例如：Linux系统是 **/usr/local/bin** ，Windows系统是 **%AppData%/npm** ）

你可以这样执行库

``` bash
$ ./node_modules/.bin/your-package
```
或者可以通过在package.json里添加脚本来执行

``` json
{
  "name": "your-application",
  "version": "1.0.0",
  "scripts": {
    "your-package": "your-package"
  }
}
```
然后你可以运行指令：

``` node
npm run your-package
```

你可以看到通过 **npm** 运行库还是要花不少时间的。

庆幸的是，**npx** 可以派上用场了。

### npm the package runner

从 **npm**5.2.0版本开始，安装 **npm** 会预安装上 **npx**。

**npx** 也是CLI（命令行）工具，其目的是使得安装和管理 **npm** 依赖库更加容易。

现在可以很简单的运行通过 **npm** 安装的任何基于Node.js的可执行文件。

你可以通过以下指令查看你当前 **npm** 版本是否已经安装了 **npx** ：

``` dash
$ which npx
```
如果没有，可以通过以下指令安装：
``` dash
$ npm install -g npx
```

确定安装好之后，我们通过一些用例来看看 **npx** 是多么的方便有用。

### Run a locally installed package easily

如果要执行本地安装的库，只需输入：
``` dash
$ npx your-package
```
**npx** 将检查 **$ PATH** 或本地项目二进制文件中是否存在 `<command>` 或 `<package>` ，如果存在，它将执行该命令。

### Execute packages that are not previously installed

另一个主要优点是能够执行未安装的库。

有时，您只是想使用某些库的命令行指令，但不想安装它们。 这意味着你可以节省一些磁盘空间，仅在需要它们时才安装它们。

### Run code directly from GitHub

![execute-gist-scripts-with-npx](execute-gist-scripts-with-npx.jpeg)

这很酷！

你可以使用 **npx** 运行任何 `GitHub gists` 和仓库。 让我们集中精力执行 `GitHub gists` ，因为它更容易创建。

在[这里](https://gist.github.com/Tynael/0861d31ea17796c9a5b4a0162eb3c1e8)，你可以找到此示例代码。

在执行之前，请确保仔细阅读所有 script，以避免由于恶意代码而导致的严重问题。

### 总结

**npx** 帮助我们避免安装仅仅想尝试的不必要的库

它还提供了一种通过直连 `GitHub gists` 或 `仓库` 来执行包命令的更简单快捷的方式

如果您以前从未使用过 **npx**，那么现在是开始的好时机！

### 参考
- [npm-vs-npx-whats-the-difference](https://www.freecodecamp.org/news/npm-vs-npx-whats-the-difference/)