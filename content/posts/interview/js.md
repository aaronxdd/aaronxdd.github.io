---
title: 面试题集合（JS篇）
date: 2021-07-05T21:53:32.169Z
description: 
---

1. infinity代表什么数据

  在JS中Infinity用于表示无穷大的数值，且不是常量，即无法明确表示它到底有多大。可以通过isFinite(val)判断当前数字是否是无穷大，函数返回true表示不是无穷大，返回false表示是无穷大。


2. 如何计算动画的帧率（FPS）

- 可以借助requestAnimationFrame API，requestAnimationFrame 使用一个回调函数作为参数。这个回调函数会在浏览器重绘之前调用。

- requestAnimationFrame的回调函数执行次数通常与浏览器屏幕刷新次数相匹配，而利用这个API实现动画的原理就是回调函数内再次调用requestAnimationFrame，所以页面不断重绘时，然后检测1秒内requestAnimationFrame调用的次数，就是当前的FPS


3. 请说说new String("A")和String("A")分别返回的结果，请解释为什么

  new String("A") :
  返回类型：引用类型，堆内存存储
  返回值：字符串对象

  String("A”) ：
  返回类型：基本类型，栈内存存储
  返回值：字符串值

4. 请通过reduce函数实现一维数组的求和

``` javascript
const sum = arr => arr.reduce((a, b) => a + b)
```

5. 请说说严格模式下的this指向

- 在严格模式下，在全局作用域中，this指向window对象
- 在严格模式下，函数中的this等于undefined
- 在严格模式下，对象的函数中的this指向调用函数的对象实例
- 在严格模式下，构造函数中的this指向构造函数创建的对象实例。
- 在严格模式下，在事件处理函数中，this指向触发事件的目标对象。

6. 图片懒加载原理
   
  图片懒加载的原理主要是判断当前图片是否到了可视区域这一核心逻辑实现的

- 拿到所有的图片 dom 。
- 遍历每个图片判断当前图片是否到了可视区范围内。
- 如果到了就设置图片的 src 属性。
- 绑定 window 的 scroll 事件，对其进行事件监听（搭配节流）。

``` js
let imgList = [...document.querySelectorAll('img')]
let length = imgList.length

// 修正错误，需要加上自执行
- const imgLazyLoad = function() {
+ const imgLazyLoad = (function() {
    let count = 0
    
   return function() {
        let deleteIndexList = []
        imgList.forEach((img, index) => {
            let rect = img.getBoundingClientRect()
            if (rect.top < window.innerHeight) {
                img.src = img.dataset.src
                deleteIndexList.push(index)
                count++
                if (count === length) {
                    document.removeEventListener('scroll', imgLazyLoad)
                }
            }
        })
        imgList = imgList.filter((img, index) => !deleteIndexList.includes(index))
   }
- }
+ })()

// 这里最好加上节流处理
document.addEventListener('scroll', imgLazyLoad)

```

7. 懒加载和预加载

  两者都是提高页面性能有效的办法，两者主要区别是一个是提前加载，一个是迟缓甚至不加载。懒加载对服务器前端有一定的缓解压力作用，预加载则会增加服务器前端压力。

8. 如何区分返回内容是文件流还是json数据

``` javascript
await (await fetch(url)).blob();
// Blob {size: 100, type: "application/json"}
// Blob {size: 73226, type: "image/jpeg"}
```

9. 写一个方法判断js的方法是内置的还是自定义的

toString一下
``` javascript
function isNative (f) {
    return typeof f === 'function' && /native code/.test(f.toString())
}
```

10. 微任务与宏任务

- JavaScript是单线程的语言
- Event Loop是javascript的执行机制

![interview-js-event-loop](interview-js-event-loop.jpeg)

- 同步和异步任务分别进入不同的执行"场所"，同步的进入主线程，异步的进入Event Table并注册函数
- 当指定的事情完成时，Event Table会将这个函数移入Event Queue。
- 主线程内的任务执行完毕为空，会去Event Queue读取对应的函数，进入主线程执行。
- 上述过程会不断重复，也就是常说的Event Loop(事件循环)。

  js异步有一个机制，就是遇到宏任务，先执行宏任务，将宏任务放入eventqueue，然后在执行微任务，将微任务放入eventqueue最骚的是，这两个queue不是一个queue。当你往外拿的时候先从微任务里拿这个回掉函数，然后再从宏任务的queue上拿宏任务的回掉函数，也就是说‘同一层’既有微任务也有宏任务的时候，先执行微任务

``` javascript
console.log('1');

setTimeout(function() {
    console.log('2');
    process.nextTick(function() {
        console.log('3');
    })
    new Promise(function(resolve) {
        console.log('4');
        resolve();
    }).then(function() {
        console.log('5')
    })
})
process.nextTick(function() {
    console.log('6');
})
new Promise(function(resolve) {
    console.log('7');
    resolve();
}).then(function() {
    console.log('8')
})

setTimeout(function() {
    console.log('9');
    process.nextTick(function() {
        console.log('10');
    })
    new Promise(function(resolve) {
        console.log('11');
        resolve();
    }).then(function() {
        console.log('12')
    })
})
```

11. 函数的方法 call()、apply()、bind()的区别

  改变函数执行上下文，也就是改变this的指向

- call和apply改变了函数的this上下文后便执行该函数,而bind则是返回改变了上下文后的一个函数。
- call和apply的第一个参数都是要改变上下文的对象，而call从第二个参数开始以参数列表的形式展现，apply则是把除了改变上下文对象的参数放在一个数组里面作为它的第二个参数。


12. 前端性能优化
- 减少 HTTP 请求
- 使用 HTTP2
- 使用服务端渲染
  
  客户端渲染: 获取 HTML 文件，根据需要下载 JavaScript 文件，运行文件，生成 DOM，再渲染。
  服务端渲染：服务端返回 HTML 文件，客户端只需解析 HTML。
- 静态资源使用 CDN
- 将 CSS 放在文件头部，JavaScript 文件放在底部
- 使用字体图标 iconfont 代替图片图标
- 善用缓存，不重复加载相同的资源
- 压缩文件（js，css，图片）
- 图片优化（懒加载，base64）
- 分chunk，大的库考虑用CDN（react，router等）
- 使用事件委托
- if-else 对比 switch
  
  当判断条件数量越来越多时，越倾向于使用 switch 而不是 if-else。
- 使用 Web Workers
- 降低 CSS 选择器的复杂性（勿嵌套多层）

13. 什么是防抖和节流，应用场景是啥
    
    都是用于限制函数被频繁调用

    **防抖：任务频繁触发的情况下，只有任务触发的间隔超过指定间隔的时候，任务才会执行。**

    场景：有个输入框，输入之后会调用接口，获取联想词。但是，因为频繁调用接口不太好，所以我们在代码中使用防抖功能，只有在用户输入完毕的一段时间后，才会调用接口，出现联想词。

    **节流：任务频繁触发的情况下，指定时间间隔内只会执行一次任务。**

    场景：懒加载要监听计算滚动条的位置，使用节流按一定时间的频率获取；双十一抢商品

14. 实现链式调用
    
链式调用的核心就在于调用完的方法将自身实例返回

``` javascript
function Class1() {
    console.log('初始化')
}
Class1.prototype.method = function(param) {
    console.log(param)
    return this
}
let cl = new Class1()
//由于new 在实例化的时候this会指向创建的对象， 所以this.method这个方法会在原型链中找到。
cl.method('第一次调用').method('第二次链式调用').method('第三次链式调用')
```
    
15. 继承
    
**原型链继承**

``` javascript
function Animal() {
    this.colors = ['black', 'white']
}
Animal.prototype.getColor = function() {
    return this.colors
}
function Dog() {}
Dog.prototype =  new Animal()

let dog1 = new Dog()
dog1.colors.push('brown')
let dog2 = new Dog()
console.log(dog2.colors)  // ['black', 'white', 'brown']
```

**问题**

- 原型中的属性会被共享
- 实例化时无法给父类构造函数传参
  
**借用构造函数实现继承**

``` javascript
function Animal(name) {
    this.name = name
    this.getName = function() {
        return this.name
    }
}
function Dog(name) {
    Animal.call(this, name)
}
```
借用构造函数实现继承解决了原型链继承的 2 个问题：引用类型共享问题以及传参问题。但是由于方法必须定义在构造函数中，所以**会导致每次创建子类实例都会创建一遍方法**。

**组合继承**

组合继承结合了原型链和盗用构造函数，将两者的优点集中了起来。基本的思路是使用原型链继承原型上的属性和方法，而通过盗用构造函数继承实例属性。这样既可以把方法定义在原型上以实现重用，又可以让每个实例都有自己的属性。

``` javascript
function Animal(name) {
    this.name = name
    this.colors = ['black', 'white']
}
Animal.prototype.getName = function() {
    return this.name
}
function Dog(name, age) {
    Animal.call(this, name)
    this.age = age
}
Dog.prototype =  new Animal()
Dog.prototype.constructor = Dog

let dog1 = new Dog('奶昔', 2)
dog1.colors.push('brown')
let dog2 = new Dog('哈赤', 1)
console.log(dog2) // { name: "哈赤", colors: ["black", "white"], age: 1 }
```

## 16. js中的堆栈
    
### 栈数据结构

- 栈是一种特殊的列表，栈内的元素只能通过列表的一端访问，这一端称为栈顶。
- 栈被称为是一种后入先出（LIFO，last-in-first-out）的数据结构。

### 堆数据结构

- 堆是一种经过排序的树形数据结构，每个结点都有一个值。
- 堆的特点是根结点的值最小（或最大），且根结点的两个子树也是一个堆。

### 变量类型与内存的关系

#### 基本数据类型

Sting、Number、Boolean、null、undefined、Symbol

- 基本数据类型保存在栈内存中，因为基本数据类型占用空间小、大小固定，通过按值来访问，属于被频繁使用的数据。

- 引用数据类型存储在堆内存中，因为引用数据类型占据空间大、大小不固定；引用数据类型在栈中存储了指针，该指针指向堆中该实体的起始地址
