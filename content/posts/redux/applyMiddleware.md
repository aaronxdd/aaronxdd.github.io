---
title: redux源码系列之applyMiddleware
date: 2021-06-28T16:17:32.169Z
description: 
---

终于来到 **applyMiddleware** 部分，理解了 [**compose**](https://xudongdong.site/post/compose) 和 [**Currying**](https://xudongdong.site/post/currying)，这部分源码也变得很好理解

这个方法是用来应用中间件的，用过 **node** 的同学应该比较了解，中间件我的理解类似于插件，一般为了避免系统框架过于臃肿，我们把常用的功能剥离开来，以中间件的形式插入到框架中来实现复杂的应用处理

我们首先看下 **applyMiddleware** 的用法

``` js
import { applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

const store = createStore(reducer, applyMiddleware(thunk, logger))
```

**createStore** 内部的调用

``` js
function createStore(reducer, preloadedState, enhancer) {
  // 传入参数的判断
  // ...

  // 参数中enhancer function存在，一般是指applyMiddleware()
  if (typeof enhancer !== "undefined" && typeof enhancer === "function") {
    return enhancer(createStore)(reducer, preloadedState);
  }

  // 省略
}
```

由此可以得出 **applyMiddleware** 的 **API** 调用

``` js
applyMiddleware(thunk, logger)(createStore)(reducer, preloadedState);

// applyMiddleware(...middlewares)(createStore)(reducer, preloadedState);
```

结合源码

我们将源码中 **TS** 部分去除，得出函数主体代码

``` javascript
import { compose } from "./compose";

function applyMiddleware(...middlewares) {
  // use Currying function
  return (createStore) => (reducer, preloadedState) => {
    // 获取store
    const store = createStore(reducer, preloadedState);
    // 初始化dispatch
    let dispatch = () => {
      // 在dispatch完成正在赋值之前，调用会报错
      throw new Error("目前还不能使用dispatch")
    }

    // 给每个中间件的默认传参：getState，dispatch
    const middlewareAPI = {
      getState: store.getState,
      dispatch: (action, ...args) => dispatch(action, ...args)
    }
    
    // 加入默认参数后的中间件chain
    const chain = middlewares.map(middleware => middleware(middlewareAPI))
    // 对chain做compose操作，并赋值给dispatch
    dispatch = compose(...chain)(store.dispatch)
  }

  // 返回store的属性和dispatch
  return {
    ...store,
    dispatch
  }
}
```

主要难以理解的部分还是 **compose** 这一块

我们拿两个中间件做解析

``` javascript
import thunk from 'redux-thunk';
import logger from 'redux-logger';

applyMiddleware(thunk, logger)(createStore)(reducer, preloadedState);

// applyMiddleware chain部分
const middlewareAPI = { getState, dispatch }

const chain = [thunk, logger].map(middleware => middleware(middlewareAPI))
// const chain = [thunk(middlewareAPI), logger(middlewareAPI)]
// const chain = [thunk({ getState, dispatch }), logger({ getState, dispatch })]

// applyMiddleware compose dispatch部分
dispatch = compose(...chain)(store.dispatch)
// dispatch = compose(thunk({ getState, dispatch }), logger({ getState, dispatch }))(store.dispatch)

// 根据 compose 代码可转化为
// dispatch = thunk({ getState, dispatch })(logger({ getState, dispatch })(store.dispatch))
```

代码到这边我们需要结合 **redux-thunk** 源码继续解析了

``` js
function createThunkMiddleware(extraArgument) {
  return ({ dispatch, getState }) => (next) => (action) => {
    if (typeof action === 'function') {
      return action(dispatch, getState, extraArgument);
    }

    return next(action);
  };
}

const thunk = createThunkMiddleware();
thunk.withExtraArgument = createThunkMiddleware;

export default thunk;
```

把
``` js
dispatch = thunk({ getState, dispatch })(logger({ getState, dispatch })(store.dispatch))
```

放到 **thunk** 中

``` js
dispatch = ({ getState, dispatch }) => {
  return ({ getState, dispatch }) => (logger({ getState, dispatch })(store.dispatch)) => (action) => {

    // 如果有异步action，会先执行异步action，在执行传进来的logger function
    if (typeof action === 'function') {
      return action(dispatch, getState, extraArgument);
    }

    return logger({ getState, dispatch })(store.dispatch)(action);
  }
}
```

应用了 **thunk** 和 **logger** 的 **redux** 应用，会先执行异步 **action**，在执行 **logger** 中间件。

从代码上看，**applyMiddleware** 最主要的作用就是对原始的 **dispatch** 方法进行了重新赋值，并将它与 **store** 的属性返回。


## 参考
- [redux-thunk](https://github.com/reduxjs/redux-thunk/blob/master/src/index.js)

