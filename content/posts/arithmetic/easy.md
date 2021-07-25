---
title: 算法题（简单系列）
date: 2021-07-25T10:53:32.169Z
description: 
---

## 1. 两数之和

### 题目描述

给定一个整数数组 **nums** 和一个目标值 **target**，请你在该数组中找出和为目标值的那 **两个** 整数，并返回他们的数组下标。
你可以假设每种输入只会对应一个答案。但是，你不能重复利用这个数组中同样的元素。

### 示例

``` javascript
给定 nums = [2, 7, 11, 15], target = 9

因为 nums[0] + nums[1] = 2 + 7 = 9
所以返回 [0, 1]
````

### 代码实现

``` javascript
const findTotal = (nums, target) => {
  for(let i = 0; i < nums.length; i++) {
    if (nums.includes(target-nums[i])) {
      return [i, nums.indexOf(target-nums[i])];
    }
  }
}
```

``` javascript
const twoSum = (nums, target) => {
  let preNums = {};
  for (let i = 0; i < nums.length; i++) {
    const targetNum = target - nums[i];
    if (preNums[targetNum]) {
      return [preNums[targetNum], i];
    }
    preNums[nums[i]] = i;
  }
}
```


## 2. 整数反转

### 题目描述

![reverse-integer](reverse-integer.jpeg)


### 代码实现

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

## 3. 合并两个有序链表

### 题目描述

将两个升序链表合并为一个新的 **升序** 链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。 

### 示例1

![merge-two-sorted-lists](merge-two-sorted-lists.jpeg)

``` javascript
输入：l1 = [1,2,4], l2 = [1,3,4]
输出：[1,1,2,3,4,4]
```

### 示例2

``` javascript
输入：l1 = [], l2 = []
输出：[]
```

### 示例3

``` javascript
输入：l1 = [], l2 = [0]
输出：[0]
```

### 提示

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

### 实现

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

## 4. 最大子序和

### 题目描述

给定一个整数数组 **nums** ，找到一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。

### 示例1

``` javascript
输入：nums = [-2,1,-3,4,-1,2,1,-5,4]
输出：6
解释：连续子数组 [4,-1,2,1] 的和最大，为 6 。
```

### 示例2

``` javascript
输入：nums = [1]
输出：1
```

### 示例3

``` javascript
输入：nums = [0]
输出：0
```

### 示例4

``` javascript
输入：nums = [-1]
输出：-1
```

### 示例5

``` javascript
输入：nums = [-100000]
输出：-100000
```

### 提示
- 1 <= nums.length <= 3 * 104
- -105 <= nums[i] <= 105

``` javascript
const maxSubArray = (nums) => {
  let pre = 0;
  let max = nums[0];
  nums.forEach(x => {
    pre = Math.max(pre + x, x);
    max = Math.max(max, pre);
  });
  return max;
};
```

## 5. 反转链表

### 题目描述

定义一个函数，输入一个链表的头节点，反转该链表并输出反转后链表的头节点。

### 示例:

``` javascript
const ListNode = {
  value: 1,
  next: {
    value: 2,
    next: {
      value: 3,
      next: {
        value: 4,
        next: {
          value: 5,
          next: null
        }
      }
    }
  }
}

输入: 1->2->3->4->5->NULL
输出: 5->4->3->2->1->NULL
```

### 限制：

``` javascript
0 <= 节点个数 <= 5000
```

``` javascript
const reverseList = (head) => {
  let pre = null;
  let cur = head;
  while(cur) {
    const next = cur.next;
    cur.next = pre;
    pre = cur;
    cur = next;
  }
  return pre;
}
```

## 6. 二叉树的最大深度

### 题目描述

给定一个二叉树，找出其最大深度。

二叉树的深度为根节点到最远叶子节点的最长路径上的节点数。

**说明： 叶子节点是指没有子节点的节点。**

### 示例

给定二叉树 **[3,9,20,null,null,15,7]**

![maximum-depth-of-binary-tree](maximum-depth-of-binary-tree.jpeg)

返回它的最大深度 3 。

``` javascript
const maxDepth = tree => {
  if (!tree) {
    return 0;
  }
  const maxLeft = maxDepth(tree.left);
  const maxRight = maxDepth(tree.right);
  return Math.max(maxLeft, maxRight) + 1;
}
```

## 7. 环形链表

### 题目描述

给定一个链表，判断链表中是否有环。

如果链表中有某个节点，可以通过连续跟踪 next 指针再次到达，则链表中存在环。 为了表示给定链表中的环，我们使用整数 pos 来表示链表尾连接到链表中的位置（索引从 0 开始）。 如果 pos 是 -1，则在该链表中没有环。注意：pos 不作为参数进行传递，仅仅是为了标识链表的实际情况。

如果链表中存在环，则返回 true 。 否则，返回 false 。

### 思路

给遍历过的节点打记号，如果遍历过程中遇到有记号的说明已环🤓

``` javascript
const hasCycle = head => {
  while(head) {
    if (head.tag) {
      return true;
    }
    head.tag = true;
    head = head.next;
  }
  return false;
}
```


## 8. 合并二叉树

### 题目描述

给定两个二叉树，想象当你将它们中的一个覆盖到另一个上时，两个二叉树的一些节点便会重叠。

你需要将他们合并为一个新的二叉树。合并的规则是如果两个节点重叠，那么将他们的值相加作为节点合并后的新值，否则不为 NULL 的节点将直接作为新二叉树的节点。

### 示例

![merge-two-binary-trees](merge-two-binary-trees.jpeg)

**注意：合并必须从两个树的根节点开始。**

``` javascript
const mergeTrees = (t1, t2) => {
  if (!t1 || !t2) {
    return t1 || t2;
  }
  t1.value = t1.value + t2.value;
  t1.left = mergeTrees(t1.left, t2.left);
  t1.right = mergeTrees(t1.right, t2.right);
  return t1;
}
```

## 9. 有效的括号

### 题目描述
给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串 s ，判断字符串是否有效。

有效字符串需满足：

1. 左括号必须用相同类型的右括号闭合。
2. 左括号必须以正确的顺序闭合。

### 示例 1：
``` javascript
输入：s = "()"
输出：true
```

### 示例 2：
``` javascript
输入：s = "()[]{}"
输出：true
```

### 示例 3：
``` javascript
输入：s = "(]"
输出：false
```

### 示例 4：
``` javascript
输入：s = "([)]"
输出：false
```

### 示例 5：
``` javascript
输入：s = "{[]}"
输出：true
```

### 提示：

![valid-parentheses-alert](valid-parentheses-alert.jpeg)

``` javascript
const isValid = (str) => {
  const { length } = str;
  if (length % 2 !== 0) return false;
  let arr = [];
  for (let item of str) {
    switch (item) {
      case "(":
      case "{":
      case "[":
        arr.push(item);
        break;
      case ")":
        if (arr.pop() !== "(") return false;
        break;
      case "}":
        if (arr.pop() !== "{") return false;
        break;
      case "]":
        if (arr.pop() !== "[") return false;
        break;
    }
  }

  return arr.length === 0
};
```

## 10. 爬楼梯

### 题目描述

假设你正在爬楼梯。需要 n 阶你才能到达楼顶。

每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？

注意：给定 n 是一个正整数。

### 示例 1：

``` javascript
输入： 2
输出： 2
解释： 有两种方法可以爬到楼顶。
1.  1 阶 + 1 阶
2.  2 阶
```

### 示例 2：

``` javascript
输入： 3
输出： 3
解释： 有三种方法可以爬到楼顶。
1.  1 阶 + 1 阶 + 1 阶
2.  1 阶 + 2 阶
3.  2 阶 + 1 阶
```

``` javascript
const climbStairs = (n) => {
  if (n < 1) return 0;
  const dp = [];
  dp[1] = 1;
  dp[2] = 2;
  for (let i = 0; i < n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }
  return dp[n];
};
```

## 11. 二叉树的中序遍历

### 题目描述

给定一个二叉树的根节点 root ，返回它的 中序 遍历。

### 示例 1：

![binary-tree-inorder-traversal1](binary-tree-inorder-traversal1.jpeg)

``` javascript
输入：root = [1,null,2,3]
输出：[1,3,2]
```

### 示例 2：

``` javascript
输入：root = []
输出：[]
```

### 示例 3：

``` javascript
输入：root = [1]
输出：[1]
```

### 示例 4：

![binary-tree-inorder-traversal2](binary-tree-inorder-traversal2.jpeg)

``` javascript
输入：root = [1,null,2]
输出：[1,2]
```

### 示例 5：

![binary-tree-inorder-traversal3](binary-tree-inorder-traversal3.jpeg)

``` javascript
输入：root = [1,null,2]
输出：[1,2]
```

### 提示：

![binary-tree-inorder-traversal-alert](binary-tree-inorder-traversal-alert.jpeg)

``` javascript
const inorderTraversal = (root) => {
  const res = [];
  const inorder = (root) => {
    if (!root) return;
    inorder(root.left);
    res.push(root.val);
    inorder(root.right);
  }
  inorder(root)
  return res;
};
```

## 12. 对称二叉树

### 题目描述

给定一个二叉树，检查它是否是镜像对称的。

![symmetric-tree](symmetric-tree.jpeg)

<!-- ``` javascript

``` -->

## 13. 买卖股票的最佳时机

### 题目描述

给定一个数组 prices ，它的第 i 个元素 prices[i] 表示一支给定股票第 i 天的价格。

你只能选择 某一天 买入这只股票，并选择在 未来的某一个不同的日子 卖出该股票。设计一个算法来计算你所能获取的最大利润。

返回你可以从这笔交易中获取的最大利润。如果你不能获取任何利润，返回 0 。

### 示例 1：

``` javascript
输入：[7,1,5,3,6,4]
输出：5
解释：在第 2 天（股票价格 = 1）的时候买入，在第 5 天（股票价格 = 6）的时候卖出，最大利润 = 6-1 = 5 。
     注意利润不能是 7-1 = 6, 因为卖出价格需要大于买入价格；同时，你不能在买入前卖出股票。
```

### 示例 2：

``` javascript
输入：prices = [7,6,4,3,1]
输出：0
解释：在这种情况下, 没有交易完成, 所以最大利润为 0。
```

### 提示：

![best-time-to-buy-and-sell-stock-alert](best-time-to-buy-and-sell-stock-alert.jpeg)


## 14. 只出现一次的数字

### 题目描述

给定一个非空整数数组，除了某个元素只出现一次以外，其余每个元素均出现两次。找出那个只出现了一次的元素。

### 说明：

你的算法应该具有线性时间复杂度。 你可以不使用额外空间来实现吗？

### 示例 1:

``` javascript
输入: [2,2,1]
输出: 1
```

### 示例 2:

``` javascript
输入: [4,1,2,1,2]
输出: 4
```

``` javascript
const singleNumber = (nums) => {
  let obj = {};
  for(const num of nums) {
    if (!obj[num]) {
      obj[num] = true;
    } else {
      delete obj[num]
    }
  }
  return Number(Object.keys(obj)?.[0])
};
```

## 15. 最小栈

### 题目描述

设计一个支持 push ，pop ，top 操作，并能在常数时间内检索到最小元素的栈。

  - push(x) —— 将元素 x 推入栈中。
  - pop() —— 删除栈顶的元素。
  - top() —— 获取栈顶元素。
  - getMin() —— 检索栈中的最小元素。

### 示例:

``` javascript
  输入：
  ["MinStack","push","push","push","getMin","pop","top","getMin"]
  [[],[-2],[0],[-3],[],[],[],[]]

  输出：
  [null,null,null,null,-3,null,0,-2]

  解释：
  MinStack minStack = new MinStack();
  minStack.push(-2);
  minStack.push(0);
  minStack.push(-3);
  minStack.getMin();   --> 返回 -3.
  minStack.pop();
  minStack.top();      --> 返回 0.
  minStack.getMin();   --> 返回 -2.
```

### 提示：

- pop、top 和 getMin 操作总是在 非空栈 上调用。

``` javascript
var MinStack = function() {
    this.x_stack = [];
    this.min_stack = [Infinity];
};

MinStack.prototype.push = function(x) {
    this.x_stack.push(x);
    this.min_stack.push(Math.min(this.min_stack[this.min_stack.length - 1], x));
};

MinStack.prototype.pop = function() {
    this.x_stack.pop();
    this.min_stack.pop();
};

MinStack.prototype.top = function() {
    return this.x_stack[this.x_stack.length - 1];
};

MinStack.prototype.getMin = function() {
    return this.min_stack[this.min_stack.length - 1];
};
```

## 16. 相交链表

### 题目描述

给你两个单链表的头节点 headA 和 headB ，请你找出并返回两个单链表相交的起始节点。如果两个链表没有交点，返回 null 。

图示两个链表在节点 c1 开始相交：

![intersection-of-two-linked-lists1](intersection-of-two-linked-lists1.jpeg)

题目数据 保证 整个链式结构中不存在环。

注意，函数返回结果后，链表必须 保持其原始结构 。

### 示例 1：

![intersection-of-two-linked-lists2](intersection-of-two-linked-lists2.jpeg)

``` javascript
输入：intersectVal = 8, listA = [4,1,8,4,5], listB = [5,0,1,8,4,5], skipA = 2, skipB = 3
输出：Intersected at '8'
解释：相交节点的值为 8 （注意，如果两个链表相交则不能为 0）。
从各自的表头开始算起，链表 A 为 [4,1,8,4,5]，链表 B 为 [5,0,1,8,4,5]。
在 A 中，相交节点前有 2 个节点；在 B 中，相交节点前有 3 个节点。
```

### 示例 2：

![intersection-of-two-linked-lists3](intersection-of-two-linked-lists3.jpeg)

``` javascript
输入：intersectVal = 2, listA = [0,9,1,2,4], listB = [3,2,4], skipA = 3, skipB = 1
输出：Intersected at '2'
解释：相交节点的值为 2 （注意，如果两个链表相交则不能为 0）。
从各自的表头开始算起，链表 A 为 [0,9,1,2,4]，链表 B 为 [3,2,4]。
在 A 中，相交节点前有 3 个节点；在 B 中，相交节点前有 1 个节点。
```

### 示例 3：

![intersection-of-two-linked-lists4](intersection-of-two-linked-lists4.jpeg)

``` javascript
输入：intersectVal = 0, listA = [2,6,4], listB = [1,5], skipA = 3, skipB = 2
输出：null
解释：从各自的表头开始算起，链表 A 为 [2,6,4]，链表 B 为 [1,5]。
由于这两个链表不相交，所以 intersectVal 必须为 0，而 skipA 和 skipB 可以是任意值。
这两个链表不相交，因此返回 null 。
```

### 提示：

![intersection-of-two-linked-lists-alert](intersection-of-two-linked-lists-alert.jpeg)



