---
title: redux源码解析-createStore
date: 2021-06-22T17:52:32.169Z
description: 深入源码解析createStore内部代码
---

``` javascript
createStore(reducer, [initState, enhancer])
```

## 参数

1. [**reducer**](https://redux.js.org/understanding/thinking-in-redux/glossary#reducer) (*Function*):  接受两个参数，分别是当前的 **state** 和要处理的 [**action**](https://redux.js.org/tutorials/fundamentals/part-2-concepts-data-flow#actions)

2. [**preloadedState**] (*any*):  初始状态的 **state**，其实在实际开发中很少在这边给应用赋上初始 **state**，一般会在各自的 **reducer** 中赋上初始 **state**: 

``` javascript
const initialState = {}

  // reducer
const todoApp = (state = initialState, action) => {
  // 这里暂不处理任何 action，
  // 仅返回传入的 state。
  return state
}
```
值得注意的是: 通常情况下，通过 **preloadedState** 指定的 **state** 要优先于通过 **reducer** 指定 **state** : 

``` javascript
import { createStore } from 'redux';
// reducer
const a = (state = 'lol', action) => {
  return state;
}

const b = (state = 'wat', action) => {
  return state;
}

// const combined = combineReducers({ a, b })
const combined = (state = {}, action) => {
  return {
    a: a(state.a, action),
    b: b(state.b, action)
  };
}

const store = createStore(combined, { a: 'horse' });
console.log(store.getState()); // { a: 'horse', b: 'wat' }
```

3. [**enhancer**] (*Function*):  高阶函数，通常是指中间件，必须用 **applyMiddleware()** 包装下：

``` javascript
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

function logger({ getState }) {
  return next => action => {
    console.log('will dispatch', action)

    // Call the next dispatch method in the middleware chain.
    const returnValue = next(action)

    console.log('state after dispatch', getState())

    // This will likely be the action itself, unless
    // a middleware further in chain changed it.
    return returnValue
  }
}

const store = createStore(todos, applyMiddleware(thunk, logger))
```
