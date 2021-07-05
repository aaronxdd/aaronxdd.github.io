---
title: 面试题集合（手撕代码篇）
date: 2021-07-02T21:53:32.169Z
description: 
---

  
1. 手写 bind、call、apply

``` javascript
// call
Function.prototype.myCall = (content) => {
  content = content || window;
  content.fn = this;
  const args = [...arguments].slice(1);
  const result = content.fn(args);
  delete content.fn;
  return result;
}

// apply
Function.prototype.myApply = (content) => {
  content = content || window;
  content.fn = this;
  let result
  if (arguments[1] && Array.isArray(arguments[1])) {
    if (arguments[1].length === 1) {
      result = content.fn(...arguments[1])
    } else {
      result = content.fn()
    }
  }
  delete content.fn
  return result
}

// bind
Function.prototype.myBind = (content) => {
  content = content || window;
  content.fn = this;
  const args = [...arguments].slice(1);
  return () => {
    content.fn(args)
  }
}
```

2. 手写防抖节流
   
   防抖
   ``` javascript
    const debounce = (fn, delay) => {
      let timeout = null;
      return () => {
        if (timeout) {
          clearTimeout(timeout);
        }
        timeout = setTimeout(() => {
          fn.call(this, arguments)
        }, delay)
      }
    }
   ```
   节流
   ``` javascript
    const throttle = (fn, delay) => {
      let canRun = true;
      if (!canRun) {
        return
      }
      canRun = false;
      setTimeout(() => {
        fn.call(this. arguments);
        canRun = true;
      }, delay);
    }
   ```

3. 手写数组flat

4. 写一个 mySetInterVal(fn, a, b),每次间隔 a,a+b,a+2b 的时间，然后写一个 myClear，停止上面的 mySetInterVal

``` javascript
function mySetInterVal(fn, a, b) {
  this.a = a;
  this.b = b;
  this.time = 0;
  this.handle = -1;
  this.start = () => {
    this.handle = setTimeout(() => {
      fn();
      this.time++;
      this.start();
    }, this.a + this.time * this.b);
  }

  this.stop = () => {
    clearTimeout(this.handle);
    this.time = 0;
  }
}

var a = new mySetInterVal(() => {console.log('123')},1000, 2000 );
a.start();
a.stop();
```

5. 斐波那契数列
   
``` javascript
const Fibonacci = (n) => {
  if (n < 0) throw new Error('输入的数字不能小于0');
  if (n < 2) return n;
  return Fibonacci(n - 1) + Fibonacci(n - 2)
}
```

6. 字符串出现的不重复最长长度
   
7. 实现 add(1)(2)(3)
   
``` javascript
const add = (a) => (b) => (c) => a + b + c;
```