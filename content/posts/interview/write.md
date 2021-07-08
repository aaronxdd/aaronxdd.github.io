---
title: 面试题集合（手撕代码篇）
date: 2021-07-05T21:53:32.169Z
description: 
---

  
## 1. 手写 bind、call、apply

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

## 2. 手写防抖节流
   
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

## 3. 手写数组flat

## 4. 写一个 mySetInterVal(fn, a, b),每次间隔 a,a+b,a+2b 的时间，然后写一个 myClear，停止上面的 mySetInterVal

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

## 5. 斐波那契数列
   
``` javascript
const Fibonacci = (n) => {
  if (n < 0) throw new Error('输入的数字不能小于0');
  if (n < 2) return n;
  return Fibonacci(n - 1) + Fibonacci(n - 2)
}
```
   
## 7. 实现 add(1)(2)(3)
   
``` javascript
const add = (a) => (b) => (c) => a + b + c;
```

## 8. 数据类型判断

typeof 可以正确识别：Undefined、Boolean、Number、String、Symbol、Function 等类型的数据，但是对于其他的都会认为是 object，比如 Null、Date 等，所以通过 typeof 来判断数据类型会不准确。但是可以使用 Object.prototype.toString 实现。

``` javascript
const getType = (obj) => {
  return Object.prototype.toString.call(obj).slice(8, -1);
}
```

## 9. 数组扁平化
    
数组扁平化就是将 [1, [2, [3]]] 这种多层的数组拍平成一层 [1, 2, 3]。使用 Array.prototype.flat 可以直接将多层数组拍平成一层：

``` javascript
[1, [2, [3]]].flat(2)  // [1, 2, 3]
```

关键：递归

``` javascript
const flatten = arr => {
  let newArr = [];
  for(let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      newArr.concat(flatten(arr[i]))
      return
    }
    newArr.push(arr[i])
  }
  return neaArr;
}
```

## 10. 深浅拷贝

浅拷贝：只考虑对象类型

ES5版
``` javascript
function shallowCopy(obj) {
  if (typeof obj !== 'object') return

  let newObj = obj instanceof Array ? [] : {};

  for (let i in obj) {
    if (obj.hasOwnProperty(i)) {
      newObj[i] = obj[i];
    }
  }

  return newObj;
}
```

ES6版
``` javascript
const shallowCopy = obj => Array.isArray(obj) ? [...obj] : {...obj}
```

深拷贝

``` javascript
const deepClone = obj => {
  if (typeof obj !== 'object') return;
  let newObj = obj instanceof Array ? [] : {};
  
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (typeof obj[key] === 'object') {
        newObj[key] = deepClone(obj[key]);
      } else {
        newObj[key] = obj[key];
      }
    }
  }

  return newObj;
}
```

## 11. 解析 URL 参数为对象
  
``` javascript
const urlSearch = href => {
  let obj = {};
  const queryIndex = href.indexOf('?');
  const urlOptions = href.slice(queryIndex + 1, href.length);
  const options = urlOptions.split('&');
  options.map(option => {
    const equalIndex = option.indexOf('=');
    obj[option.slice(0, equalIndex)] = option.slice(equalIndex + 1, option.length);
  });
  return obj;
}
```

## 12. 字符串模板
## 13. 实现柯里化（Currying）

``` javascript
function curry(fn) {
    let judge = (...args) => {
        if (args.length == fn.length) return fn(...args)
        return (...arg) => judge(...args, ...arg)
    }
    return judge
}
```

## 14. 手写AJAX

``` js
const myAjax = (url) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.onreadystatechange = () => {
      if (xhr.readyState !== 4) return
      if (xhr.status === 200) {
        resolve(xhr.responseText)
      } else {
        reject(xhr.responseText)
      }
    }
    xhr.send();
  })
}
```

## 15. 手写Promise

``` javascript
const PADDING = "PADDING";
const FULFILLED = "FULFILLED";
const REJECTED = "REJECTED";

class MyPromise {
  constructor(executor) {
    this.status = PADDING;
    this.value = undefined;
    this.error = undefined;

    let resolve = (value) => {
      if (this.status === PADDING) {
        this.value = value;
        this.status = FULFILLED;
      }
    }

    let reject = (error) => {
      if (this.status === PADDING) {
        this.error = error;
        this.status = REJECTED;
      }
    }

    try {
      executor(resolve, reject)
    } catch (e) {
      reject(e);
    }
  }

  then(onFulfilled, onRejected) {
    if (this.status === FULFILLED) {
      onFulfilled(this.value)
    }

    if (this.status === REJECTED) {
      onRejected(this.error)
    }
  }
}
```
    
## 16. 实现 Promise.all
  
``` js
const promiseAll = (promises) => {
  if (Array.isArray(promises)) {
    throw new Error('the arguments must be an array !!!')
  }
  const promisesLength = promises.length;
  let current = 0, result = [];
  new Promise((resolve, reject) => {
    promises.forEach((promise, i) => {
      Promise.resolve(promise).then(value => {
        current ++;
        result[i] = value;
        if (current === promisesLength) {
          resolve(result)
        }
      }, error => reject(error))
    })
  })
}
```

## 17. 手写模版字符串

``` javascript
const render = (str, data) => {
  const reg = /\{\{(\w+)\}\}/;
  if (reg.test(str)) {
    const key = reg.exec(str)[1];
    str = str.replace(reg, data[key]);
    return render(str, data);
  }
  return str;
} 
```