---
title: 柯里化-Currying
date: 2021-06-23T20:00:32.169Z
description: 
---

之前看 **Redux compose** 部分源代码的时候，就感觉和 **柯里化（Currying）** 很像，所以这篇把它安排上了，同属于函数式编程范畴。

## What

什么是柯里化（Currying）

**柯里化** 大家应该听说过，或许还有些了解，但是到底什么样的范式才是柯里化呢？

>在维基百科上的定义是这样：***currying is the technique of converting a function that takes multiple arguments into a sequence of functions that each takes a single argument***.

首先是一个技术，作用是将一个拥有多个参数的函数转化成一系列只能传入一个参数的函数。

还是比较抽象，通过代码

``` js
const add = (x) => (y) => x + y;
```

这种多 **=>** 的代码经常见，其实就是 **ES6** 版的柯里化，我们可以转化下

觉得理解困难的可以借用 **[Babel](https://www.babeljs.cn/repl)** 来转化

``` js
var add = function add(x) {
  return function (y) {
    return x + y;
  };
};
```

不用 **柯里化（Currying）**:

``` js
const add = (a, b, c) => {
  return a + b + c;
}
```

在数学和计算机科学中的柯里化函数，一次只能传递一个参数；

而我们 **Javascript** 实际应用中的柯里化函数，可以传递一个或多个参数。

``` js
//普通函数
function fn(a, b, c, d, e) {
  return a + b + c + d + e;
}
//生成的柯里化函数
const curryFn = curry(fn);

curryFn(1,2,3,4,5);     // 15
curryFn(1)(2)(3,4,5);   // 15
curryFn(1,2)(3,4)(5);   // 15
curryFn(1)(2)(3)(4)(5); // 15

```

那么什么时候应该用 **柯里化（Currying）** 呢，总不至于我们就是用来为了给三个数字求和。

## When

举个例子🌰

科颜氏有一款爆火的爽肤水，经常会有活动促销打折，打折力度往往不一样

所以他们会这样计算折后价格

``` js
const discountPrice = (price, dicount) => {
  return price * dicount;
}

discountPrice(300, 0.9);
discountPrice(300, 0.95);
discountPrice(300, 0.85);
discountPrice(300, 0.88);
```

其实我们会发现，虽然折扣经常变，但是它本身的价格基本不变

所以我们可以用 **柯里化（Currying）** 优化下代码结构

``` js
const defaultPrice = 300; // 爽肤水默认价格

const discountPrice = (price) => {
  return (dicount) => {
    return price * dicount;
  }
}

// const discountPrice = price => dicount => price * dicount

const tonerdDscountPrice = discountPrice(defaultPrice);

tonerdDscountPrice(0.9);
tonerdDscountPrice(0.95);
tonerdDscountPrice(0.85);
tonerdDscountPrice(0.88);
```

下面的代码是不是调用的时候更加舒爽一点

## Why

那么 **柯里化（Currying）** 有啥好处呢

柯里化本质上是 ***降低通用性，提高适用性***。

怎么理解...

结合打折的例子看，

降低通用性是指 **Currying** 之前，我们可以灵活的传入默认价格，我可以算出爽肤水折扣价格，也可以算出面膜折扣价格，很通用

但是 **Currying** 之后更加适用于算出爽肤水折扣价格了，都不用传入默认价格了，提取了一个通用的方法对默认价格进行处理，只要传入折扣价格

所以，关于使用其实是个取舍问题，需结合具体场景







## 参考
- [currying-javascript](https://www.dottedsquirrel.com/currying-javascript/)
- [wiki-Currying](https://en.wikipedia.org/wiki/Currying)
- [javascript-currying-what-is-the-point-of-currying-javascript-functions](https://www.jondjones.com/frontend/javascript/functional-programming/javascript-currying-what-is-the-point-of-currying-javascript-functions/)
- [「前端进阶」彻底弄懂函数柯里化](https://juejin.cn/post/6844903882208837645)