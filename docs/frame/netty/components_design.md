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

## 3. `ChannelFuture`

Netty中素有的I/O操作都是一部分，因为一个操作可能不会立刻返回，所以需要一种用于在之后的某个时间点确定其结果的方法。Netty中提供了`ChannelFuture`中口，`addListener()`方法注册了一个`ChannelFutureListener`，以便在某个操作完成时(无论是否成功)得到通知

## 4. `ChannelHandler`

`ChannelHandler`充当了所有处理入站和出站数据的应用程序逻辑的容器，由网络事件触发，可专门用于几乎任何类型的动作，例如将数据从一种格式转换为另一种格式，或者处理转换过程中所抛出的异常。

`ChannelInboundHandler`接收入站事件和数据，然后被业务逻辑处理。当给连接的客户端发送响应时，也可以从`ChannelInboundHandler`冲刷数据。应用程序的业务逻辑通常驻留在一个或者多个的`ChannelInboundHandler`中

## 5. `ChannelPipeline`

ChannelPipeline提供了ChannelHandler链的容器(简单理解为: ChannelPipeline中维护了一个双向链表用于存放ChannelHandler),并定义了用于在该链上传播入站和出站事件流的API

当Channel被创建时，它会被自动地分配到它专属的ChannelPipeline.

- 一个ChannelInitializer的实现被注册到ServerBootstrap中
- 当ChannelInitializer.initChannel()方法调用时，ChannelInitializer将在ChannelPipline中安装一组自定义的ChannelHandler
- ChannelInitializer将它自己从ChannelPipeline中移除

![](https://s2.loli.net/2023/01/08/lWY5hRx2gL1QDN9.png)

从一个客户端应用程序的角度来看，如果事件的运动方向是从客户端到服务器端，那么称这些时间为**出站**，反之为入站

![](https://s2.loli.net/2023/01/08/mMbcrDHi4NslkTf.png)

> 个人理解: 出站是向外发送数据写到传输层的过程，入站是应用从传输层读取数据的过程

## 6. `ChannelHandlerAdapter`

有一些适配器类可以编写自定义的ChannelHandler所需要的努力降低到最低限度，因为他们提供了定义在对应接口中的所有方法的默认实现

常用的适配器类：

- ChannelHandlerAdapter
- ChannelInboundHandlerAdapter
- ChannelOutboundHandlerAdapter
- ChannelDuplexHandler

### 6.1 编码器和解码器

当Netty发送或者接收一个消息时会发生一次数据转换。入站消息会被解码，出站消息会被编码

所有由Netty提供的编解码器适配器类都实现了ChannelOutboundHandler或者ChannelInboundHandler接口

对于每个从入站Channel读取的消息，都会调用channelRead方法，之后将调用预置解码器提供的decode()方法，并将已解码的字节转发给ChannelPipeline中的下一个ChannelInboundHandler。出站相反。

### 6.2 SimpleChannelInboundHandler

抽象类，最重要的方法是channelRead0

## 7. Bootstrapping

Netty的引导类为应用程序的网络层配置提供了容器，涉及将一个进程绑定到某个指定的端口，或者将一个进程连接到另一个运行在某个指定主机的的指定端口的进程

- 服务器ServerBootstrap: 绑定到一个本地端口，有2个EventLoopGroup，监听连接

- 客户端Bootstrap: 连接到远程主机和端口，有1个EventLoopGroup

服务器需要两组不同的Channel。第一组只包含一个ServerChannel，代表服务器自身的已绑定到某个端口的正在监听的套接字；第二组将包含所有已创建的用来处理传入客户端连接(对于每个服务器已经接受的连接都有一个)的Channel

与ServerChannel相关联的EventLoopGroup将分配一个负责为传入连接请求创建Channel的EventLoop，一旦连接被接受，第二个EventLoop就会给它的Channel分配一个EventLoop

![](https://s2.loli.net/2023/01/09/WB9QvXyJiVOu5aL.png)