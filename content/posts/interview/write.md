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