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