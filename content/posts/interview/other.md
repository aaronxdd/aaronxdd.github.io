---
title: 面试题集合（其他）
date: 2021-07-11T21:53:32.169Z
description: 
---

## 1. 前端之SSO（单点登录）

### 知识点
- session存储用户信息于服务器
- 通过session ID（cookie）来实现认证
- 由于cookie不支持跨域，跨域时的解决方案不同于同域

### 链接
- [单点登录（SSO）看这一篇就够了](https://www.jianshu.com/p/75edcc05acfd)
- [前端需要了解的 SSO 与 CAS 知识](https://juejin.cn/post/6844903509272297480)
  
## 2. git revert和reset

- git reset操作会将版本回退至指定的commit，指定commit后的操作都将被撤销
- git revert则撤销指定commit的修改，同时生成一个新的commit

## 3. git merge和rebase

![git merge](git-merge.jpeg)
![git rebase](git-rebase.jpeg)

- 都是合并操作
- 当需要保留详细的合并信息的时候建议使用git merge，特别是需要将分支合并进入master分支时；
- 当发现自己修改某个功能时，频繁进行了git commit提交时，发现其实过多的提交信息没有必要时，可以尝试git rebase
- rebase操作会去除之前的commit记录，而merge不会

### cherrypick的了解

## 4. git 如何取消add操作

可以reset，reset后面可以跟commit ID，也可以跟Head指针回退add内容

## 5. git的工作流

dev、release、master分支

## 6. keepAlive组件的原理


