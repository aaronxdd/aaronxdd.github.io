---
title: 面试题集合（框架篇）
date: 2021-07-01T21:53:32.169Z
description: 
---

1. 什么时候使用状态管理器（React）

- state并不总是以单向的方式线性流动
- 存在组件需要更新全局状态
- 存在组件需要更新另一个组件的状态
- 某个状态需要在全局使用或共享（例如角色权限等信息）

2. redux-saga和redux-thunk有什么本质的区别

**redux-thunk** 中 **dispatch** 可以接受一个函数作为参数，而 **redux-saga** 其实和原始的 **redux** 保持一致，**dispatch** 的只是一个对象(plain object),异步是通过saga文件中的 **generator** 函数来处理的