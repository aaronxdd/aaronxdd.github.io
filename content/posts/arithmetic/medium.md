---
title: 算法题（中等系列）
date: 2021-07-14T21:28:32.169Z
description: 
---

## 1. 打乱数组

### 题目描述

给你一个整数数组 nums ，设计算法来打乱一个没有重复元素的数组。

实现 **Solution** class:
- **Solution(int[] nums)** 使用整数数组 **nums** 初始化对象
- **int[] reset()** 重设数组到它的初始状态并返回
- **int[] shuffle()** 返回数组随机打乱后的结果

### 示例

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

### 提示：

![shuffle-an-array](shuffle-an-array.jpeg)

### todo

## 2. 无重复字符的最长子串

### 题目描述

给定一个字符串 **s** ，请你找出其中不含有重复字符的 最长子串 的长度。

### 示例 1:

``` javascript
  输入: s = "abcabcbb"
  输出: 3 
  解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。
```

### 示例 2:

``` javascript
  输入: s = "bbbbb"
  输出: 1
  解释: 因为无重复字符的最长子串是 "b"，所以其长度为 1。
```


### 示例 3:

``` javascript
  输入: s = "pwwkew"
  输出: 3
  解释: 因为无重复字符的最长子串是 "wke"，所以其长度为 3。
       请注意，你的答案必须是 子串 的长度，"pwke" 是一个子序列，不是子串。
```


### 示例 4:

``` javascript
  输入: s = ""
  输出: 0
```

### 提示：

![longest-substring-without-repeating-characters](longest-substring-without-repeating-characters.jpeg)

### 暴力算法
``` javascript
const lengthOfLongestSubstring = (str) => {
  const arr = [];
  for (let i = 0; i < str.length; i++) {
    let item = str[i];
    for (let j = i + 1; j < str.length; j++) {
      if (item.includes(str[j])) {
        break;
      }
      item += str[j];
    }
    arr.push(item.length);
  }
  return Math.max(...arr);
};
```


## 3. 两数相加

### 题目描述

给你两个 非空 的链表，表示两个非负的整数。它们每位数字都是按照 逆序 的方式存储的，并且每个节点只能存储 一位 数字。

请你将两个数相加，并以相同形式返回一个表示和的链表。

你可以假设除了数字 0 之外，这两个数都不会以 0 开头。

### 示例 1：

![add-two-numbers](add-two-numbers.jpeg)

``` javascript
输入：l1 = [2,4,3], l2 = [5,6,4]
输出：[7,0,8]
解释：342 + 465 = 807.
```

### 示例 2：

``` javascript
输入：l1 = [0], l2 = [0]
输出：[0]
```

### 示例 3：

``` javascript
输入：l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]
输出：[8,9,9,9,0,0,0,1]
```

``` javascript
const addTwoNumbers = (l1, l2) => {
  let addOne = 0;
  let sum = new ListNode("0");
  let head = sum;
  while (addOne || l1 || l2) {
    let val1 = l1 ? l1.val : 0;
    let val2 = l2 ? l2.val : 0;
    let r1 = val1 + val2 + addOne;
    addOne = r1 >= 10 ? 1 : 0;
    sum.next = new ListNode(r1 % 10);
    sum = sum.next;
    if (l1) l1 = l1.next;
    if (l2) l2 = l2.next;
  }
  return head.next;
};
```

## 4. 最长回文子串

### 题目描述

给你一个字符串 s，找到 s 中最长的回文子串。

![longest-palindromic-substring](longest-palindromic-substring.jpeg)

``` javascript
const longestPalindrome = function(s) {
  let n = s.length;
  let res = '';
  let dp = Array.from(new Array(n),() => new Array(n).fill(0));
  for(let i = n-1;i >= 0;i--){
      for(let j = i;j < n;j++){
          dp[i][j] = s[i] == s[j] && (j - i < 2 || dp[i+1][j-1]);
          if(dp[i][j] && j - i +1 > res.length){
              res = s.substring(i,j+1);
          }
      }
  }
  return res;
};
```

## 5. 盛最多水的容器

### 题目描述

给你 n 个非负整数 a1，a2，...，an，每个数代表坐标中的一个点 (i, ai) 。在坐标内画 n 条垂直线，垂直线 i 的两个端点分别为 (i, ai) 和 (i, 0) 。找出其中的两条线，使得它们与 x 轴共同构成的容器可以容纳最多的水。

**说明：你不能倾斜容器。**

### 示例 1:

![container-with-most-water](container-with-most-water.jpeg)

``` javascript
输入：[1,8,6,2,5,4,8,3,7]
输出：49 
解释：图中垂直线代表输入数组 [1,8,6,2,5,4,8,3,7]。在此情况下，容器能够容纳水（表示为蓝色部分）的最大值为 49。
```

### 示例 2:

``` javascript
输入：height = [1,1]
输出：1
```

### 示例 3:

``` javascript
输入：height = [4,3,2,1,4]
输出：16
```

### 示例 4:

``` javascript
输入：height = [1,2,1]
输出：2
```

### 提示：
![container-with-most-water](container-with-most-water-alert.jpeg)

``` javascript
const maxArea = (arr) => {
  let max = 0;
  let i = 0;
  let j = arr.length - 1;
  while (j > i) {
    const area = Math.min(arr[i], arr[j]) * (j - i);
    if (area > max) max = area;
    if (arr[i] < arr[j]) {
      i ++;
    } else {
      j --;
    }
  }
  return max;
}
```

## 6. 三数之和

### 题目描述

给你一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？请你找出所有和为 0 且不重复的三元组。

注意：答案中不可以包含重复的三元组。

### 示例 1:

``` javascript
输入：nums = [-1,0,1,2,-1,-4]
输出：[[-1,-1,2],[-1,0,1]]
```

### 示例 2:

``` javascript
输入：nums = []
输出：[]
```

### 示例 3:

``` javascript
输入：nums = [0]
输出：[]
```

### 提示：

![3sum-alert](3sum-alert.jpeg)







