---
title: redux源码系列之compose
date: 2021-06-23T20:00:32.169Z
description: 
---

本来想写 **applyMiddleware** 方法代码解析的，然后一看，里面有个 **compose** 方法，好像内部代码也调用的比较多，想了想就决定先看下 **compose** 相关代码。

``` javascript
import { compose } from 'redux'

const composeFn = compose(fn1, fn2, fn3, fn4)
const b = composeFn(x)
// 等价于
const b = fn1(fn2(fn3(fn4(x))))
```
从使用上大概可以看出它的作用，从右往左的组合执行多个函数，将多个函数组合成一个函数，右边函数的执行结果是左边函数的参数值，
除了最右边的函数可以传入多个参数，其余函数只能传入一个参数。

## 参数
1. **(arguments)**: 需要组合的函数。

## 返回值
**(Function)**: 从右到左把接收到的函数合成后的最终函数。

## 代码结构
代码算是很简单了，我们分两部分去理解

### 上半部分

``` typescript
export default function compose(): <R>(a: R) => R

export default function compose<F extends Function>(f: F): F

/* two functions */
export default function compose<A, T extends any[], R>(
  f1: (a: A) => R,
  f2: Func<T, A>
): Func<T, R>

/* three functions */
export default function compose<A, B, T extends any[], R>(
  f1: (b: B) => R,
  f2: (a: A) => B,
  f3: Func<T, A>
): Func<T, R>

/* four functions */
export default function compose<A, B, C, T extends any[], R>(
  f1: (c: C) => R,
  f2: (b: B) => C,
  f3: (a: A) => B,
  f4: Func<T, A>
): Func<T, R>

/* rest */
export default function compose<R>(
  f1: (a: any) => R,
  ...funcs: Function[]
): (...args: any[]) => R

export default function compose<R>(...funcs: Function[]): (...args: any[]) => R

export default function compose(...funcs: Function[]) {
  
}
```

声明各种不同参数的 **compose**，其实是重载，为了写代码时有更好的代码提示。

### 核心部分
``` typescript
return funcs.reduce(
  (a, b) =>
    (...args: any) =>
      a(b(...args))
)
```
最后 **compose return** 的是函数数组（即传入的参数）的 **reduce** 方法，显而易见的能组合成高阶函数的形式。

## 总结

``` javascript
compose(fn1, fn2, fn3, fn4)(...args) === fn1(fn2(fn3(fn4(...args))))
```

**compose** 函数在函数式编程里很常见。这里 **redux** 的对 **compose** 实现很简单，主要还是要对 **Array.prototype.reduce** 函数要熟练。

