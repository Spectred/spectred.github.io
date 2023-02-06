import{_ as e,V as n,W as a,a0 as l}from"./framework-65e9cb48.js";const o={},d=l('<h1 id="netty组件和设计" tabindex="-1"><a class="header-anchor" href="#netty组件和设计" aria-hidden="true">#</a> Netty组件和设计</h1><h2 id="_1-channel" tabindex="-1"><a class="header-anchor" href="#_1-channel" aria-hidden="true">#</a> 1. <code>Channel</code></h2><p>基本的I/O操作(<code>bind()</code>,<code>connect()</code>,<code>read()</code>,<code>write()</code>)依赖于底层网络传输所提供的原语。Netty的<code>Channel</code>接口所提供的API，降低了直接使用<code>Socket</code>类的复杂性，<code>Channel</code>是预定义、专门化实现的广泛类层次结构的根</p><figure><img src="https://s2.loli.net/2023/01/05/vFIXnbPAYBMkp4w.png" alt="Channel" tabindex="0" loading="lazy"><figcaption>Channel</figcaption></figure><h2 id="_2-eventloop" tabindex="-1"><a class="header-anchor" href="#_2-eventloop" aria-hidden="true">#</a> 2. <code>EventLoop</code></h2><p><code>EventLoop</code>定义了用于处理连接的生命周期中所发生的事件的核心抽象</p><p>The <code>EventLoop</code> defines Netty&#39;s core abstraction for handling events that occur during the lifetime of a connection.</p><figure><img src="https://s2.loli.net/2023/01/05/QAZY7bn9Cj8EMFS.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><ul><li>一个<code>EventLoopGroup</code>包含一个或者多个<code>EventLoop</code></li><li>一个<code>EventLoop</code>在它的生命周期内只和一个Thread绑定</li><li>所有有<code>EventLoop</code>处理的I/O事件都将在它专有的Thread上被处理</li><li>一个<code>Channel</code>在它的生命周期内只注册于一个<code>EventLoop</code></li><li>一个<code>EventLoop</code>可能会被分配给一个或多个<code>Channel</code></li></ul><blockquote><p>一个给定Channel的I/O操作都是有相同的Thread执行，实际上消除了对同步的需要</p></blockquote><h2 id="_3-channelfuture" tabindex="-1"><a class="header-anchor" href="#_3-channelfuture" aria-hidden="true">#</a> 3. <code>ChannelFuture</code></h2><p>Netty中素有的I/O操作都是一部分，因为一个操作可能不会立刻返回，所以需要一种用于在之后的某个时间点确定其结果的方法。Netty中提供了<code>ChannelFuture</code>中口，<code>addListener()</code>方法注册了一个<code>ChannelFutureListener</code>，以便在某个操作完成时(无论是否成功)得到通知</p><h2 id="_4-channelhandler" tabindex="-1"><a class="header-anchor" href="#_4-channelhandler" aria-hidden="true">#</a> 4. <code>ChannelHandler</code></h2><p><code>ChannelHandler</code>充当了所有处理入站和出站数据的应用程序逻辑的容器，由网络事件触发，可专门用于几乎任何类型的动作，例如将数据从一种格式转换为另一种格式，或者处理转换过程中所抛出的异常。</p><p><code>ChannelInboundHandler</code>接收入站事件和数据，然后被业务逻辑处理。当给连接的客户端发送响应时，也可以从<code>ChannelInboundHandler</code>冲刷数据。应用程序的业务逻辑通常驻留在一个或者多个的<code>ChannelInboundHandler</code>中</p><h2 id="_5-channelpipeline" tabindex="-1"><a class="header-anchor" href="#_5-channelpipeline" aria-hidden="true">#</a> 5. <code>ChannelPipeline</code></h2><p>ChannelPipeline提供了ChannelHandler链的容器(简单理解为: ChannelPipeline中维护了一个双向链表用于存放ChannelHandler),并定义了用于在该链上传播入站和出站事件流的API</p><p>当Channel被创建时，它会被自动地分配到它专属的ChannelPipeline.</p><ul><li>一个ChannelInitializer的实现被注册到ServerBootstrap中</li><li>当ChannelInitializer.initChannel()方法调用时，ChannelInitializer将在ChannelPipline中安装一组自定义的ChannelHandler</li><li>ChannelInitializer将它自己从ChannelPipeline中移除</li></ul><figure><img src="https://s2.loli.net/2023/01/08/lWY5hRx2gL1QDN9.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>从一个客户端应用程序的角度来看，如果事件的运动方向是从客户端到服务器端，那么称这些时间为<strong>出站</strong>，反之为入站</p><figure><img src="https://s2.loli.net/2023/01/08/mMbcrDHi4NslkTf.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><blockquote><p>个人理解: 出站是向外发送数据写到传输层的过程，入站是应用从传输层读取数据的过程</p></blockquote><h2 id="_6-channelhandleradapter" tabindex="-1"><a class="header-anchor" href="#_6-channelhandleradapter" aria-hidden="true">#</a> 6. <code>ChannelHandlerAdapter</code></h2><p>有一些适配器类可以编写自定义的ChannelHandler所需要的努力降低到最低限度，因为他们提供了定义在对应接口中的所有方法的默认实现</p><p>常用的适配器类：</p><ul><li>ChannelHandlerAdapter</li><li>ChannelInboundHandlerAdapter</li><li>ChannelOutboundHandlerAdapter</li><li>ChannelDuplexHandler</li></ul><h3 id="_6-1-编码器和解码器" tabindex="-1"><a class="header-anchor" href="#_6-1-编码器和解码器" aria-hidden="true">#</a> 6.1 编码器和解码器</h3><p>当Netty发送或者接收一个消息时会发生一次数据转换。入站消息会被解码，出站消息会被编码</p><p>所有由Netty提供的编解码器适配器类都实现了ChannelOutboundHandler或者ChannelInboundHandler接口</p><p>对于每个从入站Channel读取的消息，都会调用channelRead方法，之后将调用预置解码器提供的decode()方法，并将已解码的字节转发给ChannelPipeline中的下一个ChannelInboundHandler。出站相反。</p><h3 id="_6-2-simplechannelinboundhandler" tabindex="-1"><a class="header-anchor" href="#_6-2-simplechannelinboundhandler" aria-hidden="true">#</a> 6.2 SimpleChannelInboundHandler</h3><p>抽象类，最重要的方法是channelRead0</p><h2 id="_7-bootstrapping" tabindex="-1"><a class="header-anchor" href="#_7-bootstrapping" aria-hidden="true">#</a> 7. Bootstrapping</h2><p>Netty的引导类为应用程序的网络层配置提供了容器，涉及将一个进程绑定到某个指定的端口，或者将一个进程连接到另一个运行在某个指定主机的的指定端口的进程</p><ul><li><p>服务器ServerBootstrap: 绑定到一个本地端口，有2个EventLoopGroup，监听连接</p></li><li><p>客户端Bootstrap: 连接到远程主机和端口，有1个EventLoopGroup</p></li></ul><p>服务器需要两组不同的Channel。第一组只包含一个ServerChannel，代表服务器自身的已绑定到某个端口的正在监听的套接字；第二组将包含所有已创建的用来处理传入客户端连接(对于每个服务器已经接受的连接都有一个)的Channel</p><p>与ServerChannel相关联的EventLoopGroup将分配一个负责为传入连接请求创建Channel的EventLoop，一旦连接被接受，第二个EventLoop就会给它的Channel分配一个EventLoop</p><figure><img src="https://s2.loli.net/2023/01/09/WB9QvXyJiVOu5aL.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>',39),i=[d];function t(r,h){return n(),a("div",null,i)}const p=e(o,[["render",t],["__file","components_design.html.vue"]]);export{p as default};
