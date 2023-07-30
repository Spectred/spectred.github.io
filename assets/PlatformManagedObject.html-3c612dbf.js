import{_ as o,V as c,W as p,Z as a,$ as n,Y as s,a4 as t,F as l}from"./framework-eedf5ae1.js";const r={},i={id:"platformmanagedobject",tabindex:"-1"},u=a("a",{class:"header-anchor",href:"#platformmanagedobject","aria-hidden":"true"},"#",-1),d={href:"https://docs.oracle.com/en/java/javase/17/docs/api/java.management/java/lang/management/PlatformManagedObject.html",target:"_blank",rel:"noopener noreferrer"},m=t(`<p>PlatformManagedObject是Java Management Extensions (JMX) 规范中的一个重要接口，它允许开发人员轻松地访问和管理Java虚拟机（JVM）中的资源和服务。PlatformManagedObject接口是MBeanServer中所有MBeans的基类，它定义了MBean的基本属性和操作方法。</p><p>PlatformManagedObject接口提供了一组标准的MBean属性和操作方法，这些属性和操作方法可以让应用程序轻松地管理JVM中的各种资源和服务。例如，PlatformManagedObject接口提供了获取JVM的内存使用情况、线程信息、类加载情况等方法，这些信息可以用于调试和优化JVM性能。</p><h2 id="使用platformmanagedobject接口" tabindex="-1"><a class="header-anchor" href="#使用platformmanagedobject接口" aria-hidden="true">#</a> 使用PlatformManagedObject接口</h2><p>PlatformManagedObject接口定义了一些基本的属性和操作方法，这些方法可以通过MBeanServer接口来访问和管理。MBeanServer是JMX的核心组件之一，它提供了一组API，用于管理MBeans。以下是使用PlatformManagedObject接口的基本步骤：</p><ol><li>获取MBeanServer实例。</li></ol><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token class-name">MBeanServer</span> mbs <span class="token operator">=</span> <span class="token class-name">ManagementFactory</span><span class="token punctuation">.</span><span class="token function">getPlatformMBeanServer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="2"><li>创建PlatformManagedObject实例。</li></ol><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token class-name">MemoryMXBean</span> memoryBean <span class="token operator">=</span> <span class="token class-name">ManagementFactory</span><span class="token punctuation">.</span><span class="token function">getMemoryMXBean</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="3"><li>注册PlatformManagedObject实例到MBeanServer中。</li></ol><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token class-name">ObjectName</span> name <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ObjectName</span><span class="token punctuation">(</span><span class="token string">&quot;java.lang:type=Memory&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
mbs<span class="token punctuation">.</span><span class="token function">registerMBean</span><span class="token punctuation">(</span>memoryBean<span class="token punctuation">,</span> name<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ol start="4"><li>通过MBeanServer获取PlatformManagedObject实例的属性或执行操作。</li></ol><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token class-name">MemoryUsage</span> heapMemoryUsage <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">MemoryUsage</span><span class="token punctuation">)</span>mbs<span class="token punctuation">.</span><span class="token function">getAttribute</span><span class="token punctuation">(</span>name<span class="token punctuation">,</span> <span class="token string">&quot;HeapMemoryUsage&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="platformmanagedobject接口的实现方式" tabindex="-1"><a class="header-anchor" href="#platformmanagedobject接口的实现方式" aria-hidden="true">#</a> PlatformManagedObject接口的实现方式</h2><p>PlatformManagedObject接口是一个标准的Java接口，任何实现该接口的类都可以作为一个MBean来管理。JVM中许多资源和服务都实现了PlatformManagedObject接口，这些资源和服务可以通过MBeanServer来访问和管理。</p><p>PlatformManagedObject接口的实现方式通常有两种：</p><ol><li>手动实现PlatformManagedObject接口。</li></ol><p>开发人员可以手动编写实现PlatformManagedObject接口的类，该类包含必要的属性和操作方法。手动实现PlatformManagedObject接口需要一定的技术水平，但是可以自定义MBean的属性和操作方法，更加灵活。</p><ol start="2"><li>使用JMX代理。</li></ol><p>Java提供了一个JMX代理类，可以动态地为Java对象生成MBean。这种方式比手动实现PlatformManagedObject接口更加简单，但是无法自定义MBean的属性和操作方法。</p><h2 id="创建和注册platformmanagedobject的方法" tabindex="-1"><a class="header-anchor" href="#创建和注册platformmanagedobject的方法" aria-hidden="true">#</a> 创建和注册PlatformManagedObject的方法</h2>`,20),k={href:"https://docs.oracle.com/javase/7/docs/api/java/lang/management/ManagementFactory.html",target:"_blank",rel:"noopener noreferrer"},g={href:"https://docs.oracle.com/javase/7/docs/api/java/lang/management/ManagementFactory.html",target:"_blank",rel:"noopener noreferrer"},v={href:"https://docs.oracle.com/javase/7/docs/api/java/lang/management/ManagementFactory.html",target:"_blank",rel:"noopener noreferrer"},M=a("p",null,"如果要创建自己的PlatformManagedObject类， 需要遵循以下步骤：",-1),b={href:"https://docs.oracle.com/javase/7/docs/api/java/lang/management/ManagementFactory.html",target:"_blank",rel:"noopener noreferrer"},j={href:"https://docs.oracle.com/javase/7/docs/api/java/lang/management/ManagementFactory.html",target:"_blank",rel:"noopener noreferrer"},f={href:"https://docs.oracle.com/javase/7/docs/api/java/lang/management/ManagementFactory.html",target:"_blank",rel:"noopener noreferrer"},h=t(`<div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token class-name">MyPlatformManagedObject</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">super</span><span class="token punctuation">(</span><span class="token string">&quot;com.example:type=MyPlatformManagedObject&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1),_={start:"4"},y={href:"https://docs.oracle.com/javase/7/docs/api/java/lang/management/ManagementFactory.html",target:"_blank",rel:"noopener noreferrer"},B=t(`<div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">register</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
    <span class="token class-name">MBeanServer</span> mbs <span class="token operator">=</span> <span class="token class-name">ManagementFactory</span><span class="token punctuation">.</span><span class="token function">getPlatformMBeanServer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">MyPlatformManagedObject</span> mpmo <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">MyPlatformManagedObject</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    mbs<span class="token punctuation">.</span><span class="token function">registerMBean</span><span class="token punctuation">(</span>mpmo<span class="token punctuation">,</span> mpmo<span class="token punctuation">.</span><span class="token function">getObjectName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1),O={start:"5"},P={href:"https://docs.oracle.com/javase/7/docs/api/java/lang/management/ManagementFactory.html",target:"_blank",rel:"noopener noreferrer"},S=t(`<div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">unregister</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
    <span class="token class-name">MBeanServer</span> mbs <span class="token operator">=</span> <span class="token class-name">ManagementFactory</span><span class="token punctuation">.</span><span class="token function">getPlatformMBeanServer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">MyPlatformManagedObject</span> mpmo <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">MyPlatformManagedObject</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    mbs<span class="token punctuation">.</span><span class="token function">unregisterMBea</span><span class="token punctuation">(</span>mpmo<span class="token punctuation">,</span> mpmo<span class="token punctuation">.</span><span class="token function">getObjectName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1);function X(x,J){const e=l("ExternalLinkIcon");return c(),p("div",null,[a("h1",i,[u,n(),a("a",d,[n("PlatformManagedObject"),s(e)])]),m,a("ol",null,[a("li",null,[a("a",k,[n("直接访问MXBean接口。 可以使用ManagementFactory类提供的静态工厂方法来获取平台MXBean的示实例"),s(e)]),n("。例如， 可以使用ManagementFactory.getMemoryMXBean()方法来获取MemoryMXBean的实例，然后调用其方法来监控和管理内存系统。")]),a("li",null,[a("a",g,[n("通过平台MBeanServer访问。 可以使用ManagementFactory.getPlatformMBeanServer()方法来获取平台MBeanServer的实例，然后使用其方法来查询和操作平台MXBeans"),s(e)]),n("。例如， 可以使用MBeanServer.getAttribute(ObjectName, String)方法来获取MemoryMXBean的HeapMemoryUsage属性值。")]),a("li",null,[a("a",v,[n("通过JMX连接器访问。 可以使用JMX连接器技术来远程访问平台MBeanServer，然后按照第二种方式进行操作"),s(e)]),n("。例如， 可以使用JMXConnectorFactory.connect(JMXServiceURL)方法来建立一个到远程平台MBeanServer的连接，然后使用其getMBeanServerConnection()方法来获取一个MBeanServerConnection对象。")])]),M,a("ol",null,[a("li",null,[a("a",b,[n("定义一个符合JMX MXBean规范的接口，并将其标注为@MXBean或命名为*MXBean"),s(e)]),n("。例如， 可以定义一个名为MyPlatformManagedObjectMXBean的接口，并声明一些属性和操作。")]),a("li",null,[a("a",j,[n("实现该接口，并提供相应的属性值和操作逻辑"),s(e)]),n("。例如， 可以定义一个名为MyPlatformManagedObject类，并实现MyPlatformManagedObjectMXBean接口。")]),a("li",null,[a("a",f,[n("在构造函数中创建一个唯一的ObjectName对象，并将其作为参数传递给父类构造函数"),s(e)]),n("。例如， 可以在MyPlatformManagedObject类中定义如下构造函数：")])]),h,a("ol",_,[a("li",null,[a("a",y,[n("在平台MBeanServer中注册该对象"),s(e)]),n("。例如， 可以在MyPlatformManagedObject类中定义如下静态方法：")])]),B,a("ol",O,[a("li",null,[a("a",P,[n("在需要时，在平台MBeanServer中注销该对象"),s(e)]),n("。例如， 可以在MyPlatformManagedObject类中定义如下静态方法：")])]),S])}const F=o(r,[["render",X],["__file","PlatformManagedObject.html.vue"]]);export{F as default};