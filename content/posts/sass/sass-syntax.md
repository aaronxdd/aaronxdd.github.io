---
title: Sass语法篇
date: 2021-05-28T16:34:32.169Z
description: Sass的基本语法，以及语法声明和表达式介绍
---

## Sass支持两种语法，你可以根据喜好随意选择其中一种。

### SCSS

SCSS语法应用于后缀为 **.scss** 的文件，它是CSS的超集，那就意味着大多数情况下 ***合法的CSS写法也适用于SCSS***。


``` css
@mixin button-base() {
  @include typography(button);
  @include ripple-surface;
  @include ripple-radius-bounded;

  display: inline-flex;
  position: relative;
  height: $button-height;
  border: none;
  vertical-align: middle;

  &:hover { cursor: pointer; }

  &:disabled {
    color: $mdc-button-disabled-ink-color;
    cursor: default;
    pointer-events: none;
  }
}
```


### 缩进式语法（SASS）

这是Sass最原先的语法，应用于后缀为 **.sass** 的文件，缩进语法支持SCSS语法的一眼的功能，只是在写法上会用缩进的形式代替花括号和分号。

通常来讲，你如果想用花括号来表示结构的时候，你可以使用代码缩进来表示，每行结束的时候，即视为分号，这里只包括了基本的写法区别，其余的区别在后续的文档中会提到


```css
@mixin button-base()
  @include typography(button)
  @include ripple-surface
  @include ripple-radius-bounded

  display: inline-flex
  position: relative
  height: $button-height
  border: none
  vertical-align: middle

  &:hover
    cursor: pointer

  &:disabled
    color: $mdc-button-disabled-ink-color
    cursor: default
    pointer-events: none
```

## 和CSS一样，大部分Sass样式表是由包含属性声明的样式规则组成。但是Sass样式表还包含其他的一些功能

### 声明

Sass样式表由一系列声明组成，一些声明会包含语法块，通常由 `{}` 表示，语法块中还会包含其他声明，例如属性声明。

在Scss中，声明由分号分隔开，在缩进语法（.sass）中，只需换行即可。

#### 通用声明

这些声明可以在Sass样式表中任何地方使用：

- [变量声明](https://sass-lang.com/documentation/variables)，比如：`$var: value`
- [流程控制规则](https://sass-lang.com/documentation/at-rules/control)，比如：`@if` and `@each`
- [@error](https://sass-lang.com/documentation/at-rules/error)，[@warn](https://sass-lang.com/documentation/at-rules/warn) 和 [@debug](https://sass-lang.com/documentation/at-rules/debug)规则

#### CSS声明

这些声明生成CSS，它们可以在除`@function`的任何地方使用：
- [Style规则](https://sass-lang.com/documentation/style-rules)，比如`h1 { /* ... */ }`
- [CSS规则](https://sass-lang.com/documentation/at-rules/css)，比如`@media` 和 `@font-face`
- [Mixin](https://sass-lang.com/documentation/at-rules/mixin)使用`@include`
- [@at-root规则](https://sass-lang.com/documentation/at-rules/at-root)

#### 顶级声明

这些声明只能在样式表最上面或者CSS语法块最外层使用：
- [模块加载](https://sass-lang.com/documentation/at-rules/use)，使用`@use`
- [引入](https://sass-lang.com/documentation/at-rules/import)，使用`@import`
- [Mixin定义](https://sass-lang.com/documentation/at-rules/mixin)，使用`@mixin`
- [Function定义](https://sass-lang.com/documentation/at-rules/function)，使用`@function`

#### 其余声明
- [属性声明](https://sass-lang.com/documentation/style-rules/declarations)，比如`width: 100px` 只能在 `Style规则` 和 `CSS规则` 中使用
- [@extend规则](https://sass-lang.com/documentation/at-rules/extend)只能在`Style规则` 中使用

### 表达式

表达式通常指属性右侧部分或者是变量声明，所有表达式最后都会生成一个值。任何有效的CSS属性值都可以是Sass表达式，但是Sass表达式包含更丰富强大的功能。它们可以将参数传递给`mixins` 和 `functions`，用`@if rule` 控制流程，并用算法进行操作。我们把Sass表达式称为`SassScript`语法。

#### 文值

最简单的表达式就是静态的值：
- [Numbers](https://sass-lang.com/documentation/values/numbers)，可以有单位，比如 `12` 或 `100px`
- [Strings](https://sass-lang.com/documentation/values/strings)，可以有引号，比如 `"Helvetica Neue"` 或 `blod`
- [Colors](https://sass-lang.com/documentation/values/colors)，可以用颜色代码或者颜色名表示，比如 `#c6538c` 或 `blue`
- [boolean](https://sass-lang.com/documentation/values/booleans)，`true` 或者 `false`
- [null](https://sass-lang.com/documentation/values/null)
- [值列表](https://sass-lang.com/documentation/values/lists)，由空格，逗号或者`[]`来隔开，比如：`1.5em 1em 0 2em, Helvetica, Arial, sans-serif` 或者` [col1-start]`
- [Maps](https://sass-lang.com/documentation/values/maps)会把`key`和`value`联系起来，比如：`("background": red, "foreground": pink)`

#### 运算

Sass为数字运算定义了语法：
- [== 和 !=](https://sass-lang.com/documentation/operators/equality)用来检查两个值是否相等
- [+, -, *, /, 和 %](https://sass-lang.com/documentation/operators/numeric)用来对数字进行常用的算数计算，加上单位会有特殊的意义
- [<, <=, >, 和 >=](https://sass-lang.com/documentation/operators/relational)用来检查两个值哪个大，哪个小
- [and, or 和 not](https://sass-lang.com/documentation/operators/boolean)用来表示布尔行为，Sass认为除了`false`和`null`其余的都为`true`
- [+, - 和 /](https://sass-lang.com/documentation/operators/string)可用于连接字符串
- [( and )](https://sass-lang.com/documentation/operators#parentheses)可用于显式控制操作的优先顺序


#### 其余表达式
- [变量](https://sass-lang.com/documentation/variables)，比如`$var`
- [函数调用](https://sass-lang.com/documentation/at-rules/function)，比如`nth($list, 1)`或者`var(--main-bg-color)`，可以调用Sass核心库函数或用户定义的函数，也可以直接编译为CSS
- [特定函数](https://sass-lang.com/documentation/syntax/special-functions)，比如`calc(1px + 100%)`，`url(http://myapp.com/assets/logo.png)`具有自己独特的解析规则
- [父级选择器](https://sass-lang.com/documentation/style-rules/parent-selector)，`&`
- `!important`，被解析为无引号的字符串


### 参考
- [sass-syntax](https://www.freecodecamp.org/news/npm-vs-npx-whats-the-difference/)