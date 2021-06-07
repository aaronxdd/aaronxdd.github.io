---
title: Sass总结篇
date: 2021-06-07T16:34:32.169Z
description: Sass的常用功能总结
---

以前只用过嵌套和变量，所以在脑子里CSS预处理器就这点功能。

最近准备看下Sass文档，学习和总结下，看了中文文档有些翻译确实让人看不太懂，所以决定对着英文文档自己啃。

本准备像上一篇一样，把英文文档逐篇翻译，后来想想算了，所以总结了Sass常用的一些功能点。

## 变量

变量以 **$** 开头，非驼峰写法，以 **-** 做命名切割

![sass-variable](sass-variable.jpeg)

⚠️**注意**：原生CSS也是带有变量功能的，命名以 **--** 开头，点击[这里](https://sass-lang.com/documentation/variables)查看具体的区别


## 嵌套

原生CSS是不支持嵌套写法的，但有个相关的[草案](https://drafts.csswg.org/css-nesting-1)，相信不久的将来也会支持

![sass-css-nesting](sass-css-nesting.jpeg)

用Sass我们可以这样写

![sass-css-nesting](sass-nesting.jpeg)

嵌套写法也是我们大部分人最常用的功能，没有之一。。。

⚠️**注意**：嵌套是很有用，但也是很容易滥用的地方，一般建议嵌套不超过三层，否则会影响性能，在Sass中还提供了一个[@at-root](https://sass-lang.com/documentation/at-rules/at-root) 的功能，可以让你直接跳出去。这样也可以避免嵌套层级过深。


## 父选择器（&）

在嵌套中，我们用 **&** 来表示当前位置的父类节点，通常在写伪类的时候会用到

![sass-&](sass-&.jpeg)

## 占位符选择器（placeholder）

占位符选择器以 **%** 开头，通过 **@extend** 来应用

![sass-placeholder](sass-placeholder.jpeg)

编译出来的CSS代码中并不会包括 **%placeholder** 规则中的样式，除非是通过 **@extend** 对其进行调用

它和 **mixin** 的使用也很像，但是还是有区别

### mixin

![sass-placeholder-mixin](sass-placeholder-mixin.jpeg)

### placeholder

![sass-placeholder1](sass-placeholder1.jpeg)

## 继承（@extend）

所谓 **@extend** 用法就是你为通用样式写一个 **.** 样式类，然后要用到改样式的地方再 **@extend**

![sass-extend](sass-extend.jpeg)

我们可以从上图中很直接的看出它与 **%placeholder** 的区别

还有一个问题，**.icon** 类我们在 **Html** 中不会用到，因为它仅仅是用来被 **@extend** 的，我们可以使用 **%placeholder** 来解决这种现象

## mixin





## 参考
- [掌握sass这些技能，帮助提升开发效率](https://juejin.cn/post/6870009638478151688)
- [sass-variable](https://sass-lang.com/documentation/variables)
- [sass-nesting](https://sass-lang.com/documentation/style-rules#nesting)
- [your-nesting-is-harmful](https://medium.com/@verpixelt/your-nesting-is-harmful-a1ffddaf7e43)
- [your-placeholder-selectors](https://sass-lang.com/documentation/style-rules/placeholder-selectors)
- [sass-parent-selector](https://sass-lang.com/documentation/style-rules/parent-selector)



