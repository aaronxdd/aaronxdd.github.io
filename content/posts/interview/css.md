---
title: 面试题集合（CSS篇）
date: 2021-07-16T12:00:32.169Z
description: 
---

## 1. css 伪类与伪元素区别
   
### 伪类(pseudo-classes)

其核⼼就是⽤来选择DOM树之外的信息,不能够被普通选择器选择的⽂档之外的元素，⽤来添加⼀些选择器的特殊效果。⽐如:hover :active :visited :link :visited :first-child :focus :lang等；由于状态的变化是⾮静态的，所以元素达到⼀个特定状态时，它可能得到⼀个伪类的样式；当状态改变时，它⼜会失去这个样式。由此可以看出，它的功能和class有些类似，但它是基于⽂档之外的抽象，所以叫 伪类。
  
### 伪元素(Pseudo-elements)

DOM树没有定义的虚拟元素

核⼼就是需要创建通常不存在于⽂档中的元素，⽐如::before ::after 它选择的是元素指定内容，表示选择元素内容的之前内容或之后内容。伪元素控制的内容和元素是没有差别的，但是它本身只是基于元素的抽象，并不存在于⽂档中，所以称为伪元素。⽤于将特殊的效果添加到某些选择器
    
### 伪类与伪元素的区别
    
表示⽅法

CSS2 中伪类、伪元素都是以单冒号:表示,CSS2.1 后规定伪类⽤单冒号表示,伪元素⽤双冒号::表示，浏览器同样接受 CSS2 时代已经存在的伪元素(:before, :after, :first�line, :first-letter 等)的单冒号写法。CSS2 之后所有新增的伪元素(如::selection)，应该采⽤双冒号的写法。CSS3中，伪类与伪元素在语法上也有所区别，伪元素修改为以::开头。浏览器对以:开头的伪元素也继续⽀持，但建议规范书写为::开头定义不同

伪类即假的类，可以添加类来达到效果

伪元素即假元素，需要通过添加元素才能达到效果
    
总结:

伪类和伪元素都是⽤来表示⽂档树以外的"元素"。伪类和伪元素分别⽤单冒号:和双冒号::来表示。伪类和伪元素的区别，关键点在于如果没有伪元素(或伪类)，是否需要添加元素才能达到效果，如果是则是伪元素，反之则是伪类。

### 相同之处：

伪类和伪元素都不出现在源⽂件和DOM树中。也就是说在html源⽂件中是看不到伪类和伪元素的。
  
### 不同之处：
    
伪类其实就是基于普通DOM元素⽽产⽣的不同状态，他是DOM元素的某⼀特征。伪元素能够创建在DOM树中不存在的抽象对象，⽽且这些抽象对象是能够访问到的。

## 2. position

- static： 默认值。没有定位，元素出现在正常的流中（top, right, bottom, left 和 z-index 属性无效）
- relative： 该关键字下，元素先放置在未添加定位时的位置，再在不改变页面布局的前提下调整元素位置（因此会在此元素未添加定位时所在位置留下空白）
- absolute： 元素会被移出正常文档流，并不为元素预留空间，通过指定元素相对于最近的 **非 static** 定位祖先元素的偏移，来确定元素位置。
- fixed： 元素会被移出正常文档流，并不为元素预留空间，而是通过指定元素相对于屏幕视口（viewport）的位置来指定元素位置。元素的位置在屏幕滚动时不会改变。

## 3. 水平垂直居中

- 定宽居中
  
  - absolute+负maigin
  ``` css
  .father {
      width: 400px;
      height: 400px;
      border: 1px solid blue;
      position: relative;
  }
  
  .son {
      width: 100px;
      height: 100px;
      background-color: orange;
      /* 1、定宽高定位：absolute + 负边距margin */
      position: absolute;
      top: 50%;
      left: 50%;
      margin-top: -50px;
      margin-left: -50px;
  }
  ```

  - absolute+maigin:auto
  ``` css
  .father {
      border: 1px solid red;
      width: 300px;
      height: 300px;
      position: relative;
  }
  
  .son {
      width: 100px;
      height: 100px;
      background: green;
      /*2、定宽高定位：absolute + margin:auto */
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      margin: auto;
  }
  ```

- 不定宽居中

  - absolute+transform

  ``` css
  .father {
      border: 1px solid red;
      width: 300px;
      height: 300px;
      position: relative;
  }
  
  .son {
      background: green;
      /* 1、不定宽高居中：（依赖translate 2d的兼容性）absolute+transform */
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
  }
  ```

  - lineheight（行内元素）

  ``` css
  .father {
      border: 1px solid red;
      width: 300px;
      height: 300px;
      /* 2、不定宽高居中  */
      text-align: center;
      line-height: 300px;
      font-size: 0px;
  }
  
  .son {
      /* 2、不定宽高居中lineheight */
      display: inline-block;
      vertical-align: middle;
      line-height: inherit;
      text-align: left;
      font-size: 16px;
  }
  ```

  - flex布局

  ``` css
  .father {
      border: 1px solid red;
      width: 300px;
      height: 300px;
      /* 4、不定宽高居中flex */
      display: flex;
      justify-content: center;
      align-items: center;
  }
  ```

  - grid布局

  ``` css
  .father {
      border: 1px solid red;
      width: 300px;
      height: 300px;
      /* 5、grid */
      display: grid;
  }
  
  .son {
      /* 5、不定宽高居中grid(兼容性不如flex 不推荐使用) */
      justify-self: center;
      align-self: center;
  }
  ```




