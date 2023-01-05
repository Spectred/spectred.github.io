# Netty组件和设计

## 1. `Channel`

基本的I/O操作(`bind()`,`connect()`,`read()`,`write()`)依赖于底层网络传输所提供的原语。Netty的`Channel`接口所提供的API，降低了直接使用`Socket`类的复杂性，`Channel`是预定义、专门化实现的广泛类层次结构的根

![Channel](https://s2.loli.net/2023/01/05/vFIXnbPAYBMkp4w.png)

## 2. `EventLoop`

`EventLoop`定义了用于处理连接的生命周期中所发生的事件的核心抽象

The `EventLoop` defines Netty's core abstraction for handling events that occur during the lifetime of a connection.

![](https://s2.loli.net/2023/01/05/QAZY7bn9Cj8EMFS.png)

- 一个`EventLoopGroup`包含一个或者多个`EventLoop`
- 一个`EventLoop`在它的生命周期内只和一个Thread绑定
- 所有有`EventLoop`处理的I/O事件都将在它专有的Thread上被处理
- 一个`Channel`在它的生命周期内只注册于一个`EventLoop`
- 一个`EventLoop`可能会被分配给一个或多个`Channel`

> 一个给定Channel的I/O操作都是有相同的Thread执行，实际上消除了对同步的需要