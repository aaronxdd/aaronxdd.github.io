---
title: 面试题集合（框架篇）
date: 2021-07-01T21:53:32.169Z
description: 
---

## 1. 什么时候使用状态管理器（React）

   - state并不总是以单向的方式线性流动
   - 存在组件需要更新全局状态
   - 存在组件需要更新另一个组件的状态
   - 某个状态需要在全局使用或共享（例如角色权限等信息）

## 2. redux-saga和redux-thunk有什么本质的区别

**redux-thunk** 中 **dispatch** 可以接受一个函数作为参数，而 **redux-saga** 其实和原始的 **redux** 保持一致，**dispatch** 的只是一个对象(plain object),异步是通过saga文件中的 **generator** 函数来处理的

## 3. React 项目中有哪些细节可以优化？实际开发中都做过哪些性能优化
   
  - 优化资源加载（减少http请求，采用CDN静态资源，小图片base64）
  - 首屏考虑SSR
  - 图片使用懒加载
  - 相关资源的预加载
  - 关于可视化的显示可以加入骨架
  - 分chunk实现动态加载组件
  - Service worker做缓存
  - 开发中遍历要给组件加key
  - css勿嵌套多层
  - 不必要的dom标签用Fragments
  - 考虑redux的必要性
  
## 4. react 最新版本解决了什么问题 加了哪些东西
## 5. React 事件绑定原理
   
React并不是将click事件绑在该div的真实DOM上，而是在document处监听所有支持的事件，当事件发生并冒泡至document处时，React将事件内容封装并交由真正的处理函数运行。这样的方式不仅减少了内存消耗，还能在组件挂载销毁时统一订阅和移除事件。

另外冒泡到 document 上的事件也不是原生浏览器事件，而是 React 自己实现的合成事件（SyntheticEvent）。因此我们如果不想要事件冒泡的话，调用 event.stopPropagation 是无效的，而应该调用 event.preventDefault。

## 6. webpack 做过哪些优化，开发效率方面、打包策略方面等等
   
   [查看答案](https://github.com/lgwebdream/FE-Interview/issues/25)

## 7. 说一下 react-fiber
   [查看答案](https://github.com/lgwebdream/FE-Interview/issues/33)

## 8. React 18的新特性

  - 新的 **ReactDOM.createRoot()** API（替换 **ReactDOM.render()**）
  - 新的 **startTransition** API（用于非紧急状态更新）
  - 渲染的自动批处理优化（主要解决异步回调中无法批处理的问题）
  - 支持 **React.lazy** 的 全新 SSR 架构（支持 **<Suspense>** 组件）

## 9. React 开发Tips

官方文档即是最佳实践

1. 尽量使用 react 高版本进行开发
     - fiber 组件更新的优势
     - 各种官方 hook 的使用（useMemo，useCallback）
     - 等等

2. 数组遍历渲染时，key的正确使用
3. Fragment 的使用
4. Suspense 和 lazy 的搭配使用（懒加载）
5. 代码的提取（HOC，手写hook）
6. 合理使用状态管理（Redux，Context）

## 10. React的合成事件

由于fiber机制的特点，生成一个fiber节点时，它对应的dom节点有可能还未挂载，onClick这样的事件处理函数作为fiber节点的prop，也就不能直接被绑定到真实的DOM节点上。
为此，React提供了一种“顶层注册，事件收集，统一触发”的事件机制。

委托到顶层root根节点上

## 11. setState 是异步还是同步

- setState 只在合成事件和钩子函数中是“异步”的，在原生事件和 setTimeout 中都是同步的。
- setState的“异步”并不是说内部由异步代码实现，其实本身执行的过程和代码都是同步的，只是合成事件和钩子函数的调用顺序在更新之前，导致在合成事件和钩子函数中没法立马拿到更新后的值，形式了所谓的“异步”，当然可以通过第二个参数 setState(partialState, callback) 中的callback拿到更新后的结果。
- setState 的批量更新优化也是建立在“异步”（合成事件、钩子函数）之上的，在原生事件和setTimeout 中不会批量更新，在“异步”中如果对同一个值进行多次 setState ， setState 的批量更新策略会对其进行覆盖，取最后一次的执行，如果是同时 setState 多个不同的值，在更新时会对其进行合并批量更新。

## 12. react hooks产生的背景？hooks的优点？

- 组件之间复用状态逻辑很难，在hooks之前，实现组件复用，一般采用高阶组件和 Render Props，它们本质是将复用逻辑提升到父组件中，很容易产生很多包装组件，带来嵌套地域。
- 组件逻辑变得越来越复杂，尤其是生命周期函数中常常包含一些不相关的逻辑，完全不相关的代码却在同一个方法中组合在一起。如此很容易产生 bug，并且导致逻辑不一致。
- 复杂的class组件，使用class组件，需要理解 JavaScript 中 this 的工作方式，不能忘记绑定事件处理器等操作，代码复杂且冗余。除此之外，class组件也会让一些react优化措施失效。

## 13. React 架构变化（15 - 16）

新增了 **Scheduler（调度器）** 

- Scheduler（调度器）：调度任务的优先级，高优先级任务先进入 协调器
- Reconciler（协调器）：负责找出变化的组件
- Renderer（渲染器）：负责将变化的组件渲染到页面上

**React Fiber** 可以理解为：

**React** 内部实现的一套状态更新机制。支持任务不同 **优先级**，可中断与恢复，并且恢复后可以复用之前的 **中间状态**。

其中每个任务更新单元为 **React Element** 对应的 **Fiber** 节点

