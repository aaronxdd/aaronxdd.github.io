---
title: 面试题集合（真题篇）
date: 2021-07-16T17:28:32.169Z
description: 
---

## 1. 性能优化 ：项⽬⾥做过哪些性能优化，怎么检测性能，有没有实际测过优化的数据有多少提升
  ![性能优化](performance.jpeg)

### 性能优化

- 避免过多的回流与重绘
  
  实质上是避免过多的 **render tree** 操作，避免使用table布局；DOM结构避免嵌套过深

- JavaScript、Css、Html压缩
- splitChunks 拆包
- 网页中可视化部分（图片，视频等）采用骨架
- 函数的频繁调用考虑使用防抖节流
- 多利用缓存（多跟服务器端有关）
- 大的基础库使用CDN
- 用上懒加载和预加载
- 使用Service Worker
  
### 检测性能

- 很直观的看network页面的load时间
- lighthouse进行检测
- 用webpack-bundle-analyzer查看打包后资源情况
  
## 2. http2.0有哪些特性？https是怎么加密的，https强缓存在项目中怎么用的

### http2.0的特性
- 二进制分帧

  HTTP 1.x 的解析是基于文本，HTTP 2之后将所有传输的信息分割为更小的消息和帧，并对它们采用二进制格式的编码，提高传输效率

- 多路复用
  
  一次链接成功后，只要链接还没断开，那么 client 端就可以在一个链接中**并发**地发起多个请求，每个请求及该请求的响应不需要等待其他的请求，某个请求任务耗时严重，不会影响到其它连接的正常执行

- 头部压缩
  
  由于 HTTP 是无状态的，每一个请求都需要头部信息标识这次请求相关信息，所以会造成传输很多重复的信息，当请求数量增大的时候，消耗的资源就会慢慢积累上去。所以 HTTP 2 可以维护一个头部信息字典，差量进行更新头信息，减少头部信息传输占用的资源

### HTTP 与 HTTPS

- HTTP 是明文传输，HTTPS 通过 SSL\TLS 进行了加密
- HTTP 的端口号是 80，HTTPS 是 443
- HTTPS 需要到 CA 申请证书，一般免费证书很少，需要交费
- HTTPS 的连接很简单，是无状态的；HTTPS 协议是由 SSL+HTTP 协议构建的可进行加密传输、身份认证的网络协议，比 HTTP 协议安全。

### 浏览器缓存策略

## 3. web安全（xss/csrf）

### xss（Cross-Site Scripting）

**定义**

跨站脚本攻击，简称脚本注入

**原理**

恶意攻击者往 Web 页面里插入恶意可执行网页脚本代码，当用户浏览该页之时，嵌入其中 Web 里面的脚本代码会被执行，从而可以达到攻击者盗取用户信息或其他侵犯用户安全隐私的目的。

**防范**

- HttpOnly 防止劫取 Cookie，浏览器将禁止页面的Javascript 访问带有 HttpOnly 属性的Cookie。
- 输入检查，对 **<**  、 **>** 进行转译，使得恶意的脚本内容无法执行（React DOM 会在渲染的时候把内容（字符串）进行转义）


### csrf

**定义**

跨站请求伪造，是一种劫持受信任用户向服务器发送非预期请求的攻击方式

**原理**

利用同域下cookie可以共享，在A页面中嵌入B页面的请求，如果用户登录过B页面，即在A中的B请求可以获取B服务器信任。

**防范**

- Token验证

## 4. 前端能在Http缓存上做哪些优化

- 对于经常不改动的静态资源可以在 nginx 上增加相关的缓存配置，尽可能的命中强缓存
- 正确使用好前端资源打包的 hash
- Service Worke 也可以针对缓存做一些优化