---
title: js常用方法集合（一）
date: 2021-06-30T20:00:32.169Z
description: 
---

## Array

1. 将输入值转化为数组

``` javascript
const castArray = value => Array.isArray(value) ? value : [value];

// Examples
castArray(1);               // [1]
castArray([1, 2, 3]);       // [1, 2, 3]
```

2. 判断数组是否为空

``` javascript
const isEmpty = arr => Array.isArray(arr) && arr.length === 0;

// Examples
isEmpty(1);             // false
isEmpty([]);            // true
isEmpty([1, 2, 3]);     // false
```

3. 拷贝一个数组

``` javascript
// `arr` is an array
const clone = arr => arr.slice(0);

// Or
const clone = arr => arr.concat([]);

// Or
const clone = arr => [...arr];

// Or
const clone = arr => Array.from(arr);

// Or
const clone = arr => arr.map(v => v);
```

4. 对比两个数组是否一样
   
``` javascript
const isEqual = (arr1, arr2) => arr1.length === arr2.length && arr1.every((v, i) => v === arr2[i]);

// Examples
isEqual([1, 2, 3], [1, 2, 3]);      // true
isEqual([1, 2, 3], [1, '2', 3]);    // false
```

5. 根据某个属性将数组转化为对象（属性作为key）

``` javascript
const toObject = (arr, key) => arr.reduce((a, b) => ({...a, [b[key]]: b}), {});

// Example
toObject(
    [
        { id: '1', name: 'Alpha', gender: 'Male' },
        { id: '2', name: 'Bravo', gender: 'Male' },
        { id: '3', name: 'Charlie', gender: 'Female' },
    ],
    'id'
);
/* 
{
    '1': { id: '1', name: 'Alpha', gender: 'Male' },
    '2': { id: '2', name: 'Bravo', gender: 'Male' },
    '3': { id: '3', name: 'Charlie', gender: 'Female' },
}
*/
```

6. 找出数组中最大的值（Number）

``` javascript
const indexOfMax = arr => arr.reduce((prev, v, i, a) => v > a[prev] ? i : prev, 0);

// Examples
indexOfMax([1, 3, 9, 7, 5]);        // 2
indexOfMax([1, 3, 7, 7, 5]);        // 2
```

7. 根据属性找出数组中属性值最大的

``` javascript
const maxBy = (arr, key) => arr.reduce((a, b) => a[key] >= b[key] ? a : b, {});

// Example
const people = [
    { name: 'Bar', age: 24 },
    { name: 'Baz', age: 32 },
    { name: 'Foo', age: 42 },
    { name: 'Fuzz', age: 36 },
];
maxBy(people, 'age');   // { name: 'Foo', age: 42 }
```

8. 数组去重

``` javascript
const unique = arr => Array.from(new Set(arr));

// Or
const unique = arr => arr.filter((el, i, array) => array.indexOf(el) === i);
```

9. 以属性值为key将数组转化成对象

``` javascript
const groupBy = (arr, key) => arr.reduce((acc, item) => ((acc[item[key]] = [...(acc[item[key]] || []), item]), acc), {});

// Example
groupBy([
    { branch: 'audi', model: 'q8', year: '2019' },
    { branch: 'audi', model: 'rs7', year: '2020' },
    { branch: 'ford', model: 'mustang', year: '2019' },
    { branch: 'ford', model: 'explorer', year: '2020' },
    { branch: 'bmw', model: 'x7', year: '2020' },
], 'branch');

/*
{
    audi: [
        { branch: 'audi', model: 'q8', year: '2019' },
        { branch: 'audi', model: 'rs7', year: '2020' }
    ],
    bmw: [
        { branch: 'bmw', model: 'x7', year: '2020' }
    ],
    ford: [
        { branch: 'ford', model: 'mustang', year: '2019' },
        { branch: 'ford', model: 'explorer', year: '2020' }
    ],
}
*/
```

10. 根据属性值给数组排序

``` javascript
const sortBy = (arr, k) => arr.concat().sort((a, b) => (a[k] > b[k]) ? 1 : ((a[k] < b[k]) ? -1 : 0));

// Example
const people = [
    { name: 'Foo', age: 42 },
    { name: 'Bar', age: 24 },
    { name: 'Fuzz', age: 36 },
    { name: 'Baz', age: 32 },
];
sortBy(people, 'age');

// returns
//  [
//      { name: 'Bar', age: 24 },
//      { name: 'Baz', age: 32 },
//      { name: 'Fuzz', age: 36 },
//      { name: 'Foo', age: 42 },
//  ]
```

## DOM

1. 判断是否为某个元素的子节点

``` javascript
const isDescendant = (child, parent) => parent.contains(child);
```

2. 判断当前元素是否是Focus状态

``` javascript
const isFocus = ele => ele === document.activeElement;
```

3. 判断页面是否滑到底部

``` javascript
const isAtBottom = () => document.documentElement.clientHeight + window.scrollY >= document.documentElement.scrollHeight;
```

4. 当前浏览器判断

``` javascript

// IE
const isIE = !!document.documentMode;

// Chrome
const isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);

// macOS browser
const isMacBrowser = /Mac|iPod|iPhone|iPad/.test(navigator.platform);
```

5. 获取用户选中的文本

``` javascript
const getSelectedText = () => window.getSelection().toString();
```

6. 隐藏元素
  
``` javascript
const hide = ele => ele.style.display = 'none';

// Or
const hide = ele => ele.style.visibility = 'hidden';

// Or
const hide = ele => ele.hidden = true;
```

7. 将元素插入某个元素之后

``` javascript
const insertAfter = (ele, anotherEle) => anotherEle.parentNode.insertBefore(ele, anotherEle.nextSibling);

// Or
const insertAfter = (ele, anotherEle) => anotherEle.insertAdjacentElement('afterend', ele);
```

8. 跳转页面

``` javascript
const goTo = url => location.href = url;
```

9. 重新加载当前页

``` javascript
const reload = () => location.reload();

// Or
const reload = () => (location.href = location.href);
```

10. 替换元素

``` javascript
const replace = (ele, newEle) => ele.parentNode.replaceChild(newEle, ele);
```

11. 回到页面顶部

``` javascript
const goToTop = () => window.scrollTo(0, 0);
```

## Date

1. 将时间转化为 YYYY-MM-DD 格式

``` javascript
// `date` is a `Date` object
const formatYmd = date => date.toISOString().slice(0, 10);

// Example
formatYmd(new Date());      // 2020-05-06
```

2. 