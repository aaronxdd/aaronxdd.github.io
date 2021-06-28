---
title: redux源码系列之createStore
date: 2021-06-23T11:44:32.169Z
description: 深入源码解析createStore内部代码
---

``` javascript
const store = createStore(reducer, [initState, enhancer])
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

## 返回值
[**store**](https://redux.js.org/api/store): 是一个对象，包含了一些方法（[**dispatch**](https://redux.js.org/api/store#dispatchaction)，[**getState**](https://redux.js.org/api/store#getstate)等)，保存了应用所有 **state** 的对象。改变 **state** 的惟一方法是 **dispatch action**。

``` typescript
const store = {
  dispatch: dispatch as Dispatch<A>,
  subscribe,
  getState,
  replaceReducer,
  [$$observable]: observable
} as unknown as Store<ExtendState<S, StateExt>, A, StateExt, Ext> & Ext
return store
```

## 代码结构
便于理解，我们忽略函数中 **TS** 的一些类型定义，大致结构如下：

``` javascript
function createStore(reducer, preloadedState, enhancer) {
  // 传入参数的判断
  // ...

  // 参数中enhancer function存在，一般是指applyMiddleware()
  if (typeof enhancer !== "undefined" && typeof enhancer === "function") {
    return enhancer(createStore)(reducer, preloadedState);
  }

  let currentReducer = reducer; // 当前store中的reducer
  let currentState = preloadedState; // 当前store中存储的状态
  let currentListeners = []; // 当前store中放置的监听函数
  let nextListeners = currentListeners; // 下一次dispatch时的监听函数
  let isDispatching = false; // 用于判断是否正在dispatch

  // 获取state
  function getState() {
    //...
  }

  // 添加一个监听函数，每当dispatch被调用的时候都会执行这个监听函数
  function subscribe() {
    //...
  }

  // 触发了一个action，因此我们调用reducer，得到的新的state，并且执行所有添加到store中的监听函数。
  function dispatch() {
    //...
  }

  // 忽略两个不常用的方法replaceReducer，observable...

  // createStore的时候会执行一次INIT action的dispatch
  // 便于其他reducer获取初始值
  dispatch({ type: ActionTypes.INIT } as A);

  return {
    dispatch,
    subscribe,
    getState,
    //下面两个是主要面向库开发者的方法，暂时先忽略
    //replaceReducer,
    //observable
  };
}
```

可以看出，**createStore** 方法创建了一个 **store**，但是并没有直接将这个 **store** 的状态 **state** 返回，而是返回了一系列方法，外部可以通过这些方法（**getState**）获取 **state**，或者间接地（通过调用 **dispatch** ）改变 **state**。

下面我们来看下各个方法的具体实现

### getState

``` typescript
function getState(): S {
  // 如果正在dispath会抛出异常
  if (isDispatching) {
    throw new Error(
      'You may not call store.getState() while the reducer is executing. ' +
        'The reducer has already received the state as an argument. ' +
        'Pass it down from the top reducer instead of reading it from the store.'
    )
  }

  return currentState as S
}
```

很简单，就是获取当前 **state**，我们可以通过 ``` store.getState() = ... ``` 来修改 **state**，但是一般来说，redux不建议这样做，只能通过 **dispatch action** 来修改 **state**。

### subscribe

``` typescript
  // 若相等，做一下currentListeners浅拷贝
  function ensureCanMutateNextListeners() {
    if (nextListeners === currentListeners) {
      nextListeners = currentListeners.slice()
    }
  }

  function subscribe(listener: () => void) {
    if (typeof listener !== 'function') {
      // throw Error
    }
    if (isDispatching) {
      // throw Error
    }
    //设置一个标志，标志该监听器已经订阅了
    let isSubscribed = true

    ensureCanMutateNextListeners()
    // push到nextListeners数组中，下次dispatch会调用
    nextListeners.push(listener)

    // 返回了一个取消订阅的函数，即从数组中删除该监听函数
    return function unsubscribe() {
      // 如果已经取消订阅过了，直接返回
      if (!isSubscribed) {
        return
      }
      if (isDispatching) {
        // throw Error
      }

      isSubscribed = false

      ensureCanMutateNextListeners()
      // 从下一轮的监听函数数组（用于下一次dispatch）中删除这个监听器。
      const index = nextListeners.indexOf(listener)
      nextListeners.splice(index, 1)
      // 清空当前currentListeners
      currentListeners = null
    }
  }
```

### dispatch

``` typescript
function dispatch(action: A) {
  if (!isPlainObject(action)) {
    // throw Error
  }

  if (typeof action.type === 'undefined') {
    // throw Error
  }

  if (isDispatching) {
    // throw Error
  }

  try {
    // 标记正在dispatch
    isDispatching = true
    // 调用reducer，得到新state
    currentState = currentReducer(currentState, action)
  } finally {
    isDispatching = false
  }

  const listeners = (currentListeners = nextListeners)
  // 遍历执行监听数组中的所有监听函数
  for (let i = 0; i < listeners.length; i++) {
    const listener = listeners[i]
    listener()
  }

  // 返回传入的action
  return action
}
```

**dispatch** 是修改 **state** 的唯一途径（**redux** 规定）。

## 总结
整个 **createStore** function 还是比较容易理解的，记住应用中应有且仅有一个 store。

## 参考
- [Redux createStore API](https://redux.js.org/api/createstore)
- [Redux createStore API（中文版）](https://www.redux.org.cn/docs/api/createStore.html)
