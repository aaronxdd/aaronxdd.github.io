---
title: 算法题（中等系列）
date: 2021-07-14T21:28:32.169Z
description: 
---

### 1. 打乱数组

#### 题目描述

给你一个整数数组 nums ，设计算法来打乱一个没有重复元素的数组。

实现 **Solution** class:
- **Solution(int[] nums)** 使用整数数组 **nums** 初始化对象
- **int[] reset()** 重设数组到它的初始状态并返回
- **int[] shuffle()** 返回数组随机打乱后的结果

#### 示例

``` javascript
  输入
  ["Solution", "shuffle", "reset", "shuffle"]
  [[[1, 2, 3]], [], [], []]
  输出
  [null, [3, 1, 2], [1, 2, 3], [1, 3, 2]]

  解释
  Solution solution = new Solution([1, 2, 3]);
  solution.shuffle();    // 打乱数组 [1,2,3] 并返回结果。任何 [1,2,3]的排列返回的概率应该相同。例如，返回 [3, 1, 2]
  solution.reset();      // 重设数组到它的初始状态 [1, 2, 3] 。返回 [1, 2, 3]
  solution.shuffle();    // 随机返回数组 [1, 2, 3] 打乱后的结果。例如，返回 [1, 3, 2]
```

#### 提示：

![shuffle-an-array](shuffle-an-array.jpeg)

#### todo

### 2. 无重复字符的最长子串

#### 题目描述

给定一个字符串 **s** ，请你找出其中不含有重复字符的 最长子串 的长度。

#### 示例 1:

``` javascript
  输入: s = "abcabcbb"
  输出: 3 
  解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。
```

#### 示例 2:

``` javascript
  输入: s = "bbbbb"
  输出: 1
  解释: 因为无重复字符的最长子串是 "b"，所以其长度为 1。
```


#### 示例 3:

``` javascript
  输入: s = "pwwkew"
  输出: 3
  解释: 因为无重复字符的最长子串是 "wke"，所以其长度为 3。
       请注意，你的答案必须是 子串 的长度，"pwke" 是一个子序列，不是子串。
```


#### 示例 4:

``` javascript
  输入: s = ""
  输出: 0
```

#### 提示：

![longest-substring-without-repeating-characters](longest-substring-without-repeating-characters.jpeg)



