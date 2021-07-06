---
title: 算法题（简单系列）
date: 2021-07-06T17:28:32.169Z
description: 
---

### 1. 两数之和

#### 题目描述

给定一个整数数组 **nums** 和一个目标值 **target**，请你在该数组中找出和为目标值的那 **两个** 整数，并返回他们的数组下标。
你可以假设每种输入只会对应一个答案。但是，你不能重复利用这个数组中同样的元素。

#### 示例

``` javascript
给定 nums = [2, 7, 11, 15], target = 9

因为 nums[0] + nums[1] = 2 + 7 = 9
所以返回 [0, 1]
````

#### 代码实现

``` javascript
const findTotal = (nums, target) => {
  for(let i = 0; i < nums.length; i++) {
    if (nums.includes(target-nums[i])) {
      return [i, nums.indexOf(target-nums[i])];
    }
  }
}
```


### 2. 整数反转

#### 题目描述

![reverse-integer](reverse-integer.jpeg)


#### 代码实现

``` javascript
const reverse = (x) => {
  let result = 0;
  while (x !== 0) {
    result = result * 10 + (x % 10);
    x = Math.floor(x / 10);
  }

  if (result < -Math.pow(2, 31) || result > Math.pow(2, 31) - 1) {
    return 0;
  }
  return result;
};
```

### 3. 合并两个有序链表

#### 题目描述

将两个升序链表合并为一个新的 **升序** 链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。 

#### 示例1

![merge-two-sorted-lists](merge-two-sorted-lists.jpeg)

``` javascript
输入：l1 = [1,2,4], l2 = [1,3,4]
输出：[1,1,2,3,4,4]
```

#### 示例2

``` javascript
输入：l1 = [], l2 = []
输出：[]
```

#### 示例3

``` javascript
输入：l1 = [], l2 = [0]
输出：[0]
```

#### 提示

- 两个链表的节点数目范围是 [0, 50]
- -100 <= Node.val <= 100
- l1 和 l2 均按 非递减顺序 排列

``` javascript
// 例如 现有两个链表
const ListNode1 = {
  value: 0,
  next: {
    value: 2,
    next: {
      value: 4,
      next: null
    }
  }
}

const ListNode2 = {
  value: 1,
  next: {
    value: 3,
    next: {
      value: 5,
      next: null
    }
  }
}
```

#### 实现

``` javascript
const mergeTwoLists = (l1, l2) => {
  if (l1 === null) {
    return l2
  }
  if (l2 === null) {
    return l1
  }
  if (l1.value < l2.value) {
    l1.next = mergeTwoLists(l1.next, l2)
    return l1
  }
  if (l2.value < l1.value) {
    l2.next = mergeTwoLists(l2.next, l1)
    return l2
  }
}
```

### 最大子序和

#### 题目描述

给定一个整数数组 **nums** ，找到一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。

