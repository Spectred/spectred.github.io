import{_ as e,V as t,W as p,Z as n,Y as o,$ as s,a4 as l,F as c}from"./framework-eedf5ae1.js";const i={},u=n("h1",{id:"instrumentation",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#instrumentation","aria-hidden":"true"},"#"),s(" Instrumentation")],-1),r={href:"https://docs.oracle.com/en/java/javase/17/docs/api/java.instrument/java/lang/instrument/Instrumentation.html",target:"_blank",rel:"noopener noreferrer"},d=n("code",null,"Instrumentation",-1),k=n("code",null,"java.lang.instrument",-1),v=l(`<h2 id="_1-基本原理" tabindex="-1"><a class="header-anchor" href="#_1-基本原理" aria-hidden="true">#</a> 1. 基本原理</h2><p>Java Instrumentation 基于 Java Agent 技术实现，通过 Java Agent，我们可以在 Java 虚拟机启动时，向 JVM 中注入一个代理程序，该代理程序可以在应用程序运行时获取和修改 Java 类的信息。</p><p>Java Agent 的核心是 premain 方法，这个方法会在 JVM 启动时执行，我们可以在这个方法中获取 Instrumentation 对象，并注册 ClassFileTransformer。ClassFileTransformer 会在类被加载时被调用，可以在这里对类字节码进行修改。</p><h2 id="_2-如何使用" tabindex="-1"><a class="header-anchor" href="#_2-如何使用" aria-hidden="true">#</a> 2. 如何使用</h2><ol><li>编写一个实现<code>premain(String agentArgs, Instrumentation inst)</code>的agent类</li></ol><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>lang<span class="token punctuation">.</span>instrument<span class="token punctuation">.</span></span><span class="token class-name">ClassFileTransformer</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>lang<span class="token punctuation">.</span>instrument<span class="token punctuation">.</span></span><span class="token class-name">Instrumentation</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>security<span class="token punctuation">.</span></span><span class="token class-name">ProtectionDomain</span></span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MyAgent</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">premain</span><span class="token punctuation">(</span><span class="token class-name">String</span> agentArgs<span class="token punctuation">,</span> <span class="token class-name">Instrumentation</span> inst<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        inst<span class="token punctuation">.</span><span class="token function">addTransformer</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">MyClassFileTransformer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">static</span> <span class="token keyword">class</span> <span class="token class-name">MyClassFileTransformer</span> <span class="token keyword">implements</span> <span class="token class-name">ClassFileTransformer</span> <span class="token punctuation">{</span>
        <span class="token comment">// 如果要进行字节码操作则需要引入依赖如bytebuddy,javassist,asm等</span>
        <span class="token keyword">public</span> <span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token function">transform</span><span class="token punctuation">(</span><span class="token class-name">ClassLoader</span> loader<span class="token punctuation">,</span> <span class="token class-name">String</span> className<span class="token punctuation">,</span> <span class="token class-name">Class</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span><span class="token punctuation">&gt;</span></span> classBeingRedefined<span class="token punctuation">,</span><span class="token class-name">ProtectionDomain</span> protectionDomain<span class="token punctuation">,</span> <span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> classfileBuffer<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// TODO: 修改字节码</span>
            <span class="token keyword">return</span> classfileBuffer<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li>在pom.xml中增加插件，并指定Premain-Class为MyAgent</li></ol><div class="language-xml line-numbers-mode" data-ext="xml"><pre class="language-xml"><code>    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>build</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>finalName</span><span class="token punctuation">&gt;</span></span>agent-hello<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>finalName</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>plugins</span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>plugin</span><span class="token punctuation">&gt;</span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>org.apache.maven.plugins<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>maven-jar-plugin<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>3.2.2<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>configuration</span><span class="token punctuation">&gt;</span></span>
                    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>archive</span><span class="token punctuation">&gt;</span></span>
                        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>manifestEntries</span><span class="token punctuation">&gt;</span></span>
                            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Premain-Class</span><span class="token punctuation">&gt;</span></span>com.example.MyAgent<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>Premain-Class</span><span class="token punctuation">&gt;</span></span>
                        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>manifestEntries</span><span class="token punctuation">&gt;</span></span>
                    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>archive</span><span class="token punctuation">&gt;</span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>configuration</span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>plugin</span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>plugin</span><span class="token punctuation">&gt;</span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>org.apache.maven.plugins<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>maven-compiler-plugin<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>configuration</span><span class="token punctuation">&gt;</span></span>
                    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>source</span><span class="token punctuation">&gt;</span></span>8<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>source</span><span class="token punctuation">&gt;</span></span>
                    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>target</span><span class="token punctuation">&gt;</span></span>8<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>target</span><span class="token punctuation">&gt;</span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>configuration</span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>plugin</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>plugins</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>build</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3"><li>打成jar包</li></ol><p><code>mvn clean package</code> ，在target下得到<code>myagent.jar</code></p><p>如果解压<code>myagent.jar</code>应该会在<code>META-INF</code>下发现<code>MANIFEST.MF</code>文件，内容如下（重点是Premain-Class）</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Manifest-Version: 1.0
Premain-Class: com.example.MethodCounterAgent
Build-Jdk-Spec: 1.8
Created-By: Maven JAR Plugin 3.2.2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="4"><li>在启动目标应用程序是添加vm参数</li></ol><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">java</span> -javaagent:/path/to/myagent.jar <span class="token parameter variable">-jar</span> YourApp.jar
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_3-应用场景" tabindex="-1"><a class="header-anchor" href="#_3-应用场景" aria-hidden="true">#</a> 3. 应用场景</h2><ul><li><strong>性能监控与优化</strong>：通过修改类字节码，可以在运行时对方法进行计时、统计方法调用次数、消除不必要的方法调用等，以优化程序的性能。</li><li><strong>安全监控</strong>：通过修改类字节码，可以在运行时对代码进行加固、保护敏感信息等，以增强程序的安全性。</li><li><strong>调试与排查问题</strong>：通过修改类字节码，可以在运行时添加调试信息、进行程序分析等，以便排查问题和诊断程序。</li><li><strong>动态生成类和对象</strong>：通过 Instrumentation，我们可以在程序运行时动态地生成新的类和对象，从而实现更灵活的程序设计和实现。</li></ul><h2 id="_4-具体应用" tabindex="-1"><a class="header-anchor" href="#_4-具体应用" aria-hidden="true">#</a> 4. 具体应用</h2><p>在 Java 中，有很多类库使用了 agent 技术来实现自己的功能。其中比较知名的包括：</p><ol><li>SkyWalking：一个开源的应用程序性能监测工具，使用 agent 技术来收集和分析应用程序性能数据。</li><li>Arthas：一个开源的 Java 诊断工具，也是基于 agent 技术实现的。</li><li>JRebel：一个热部署工具，同样使用了 agent 技术来实现修改应用程序的类加载机制。</li></ol><p>除此之外，还有很多类库使用了 agent 技术来实现自己的功能，例如日志工具、安全工具、代码覆盖率工具等等</p><p>例如在SkyWalking的 skywalking-agent.jar中MANIFEST.MF</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Manifest-Version: 1.0
...
Premain-Class: org.apache.skywalking.apm.agent.SkyWalkingAgent
...
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在Arthas的arthas-agent.jar中MANIFEST.MF(这里有Agent-Class)</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Manifest-Version: 1.0
...
Premain-Class: com.taobao.arthas.agent334.AgentBootstrap
...
Agent-Class: com.taobao.arthas.agent334.AgentBootstrap
...
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="hint-container info"><p class="hint-container-title">premain 和 agentmain</p><p><strong>premain</strong> 方法是 Java Agent 中最常用的方法，它会在 Java 应用程序启动时被调用。在 premain 方法中，我们可以获取 Instrumentation 对象，并注册 ClassFileTransformer 对象，用于对类字节码进行转换</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>lang<span class="token punctuation">.</span>instrument<span class="token punctuation">.</span></span><span class="token class-name">Instrumentation</span></span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MyAgent</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">premain</span><span class="token punctuation">(</span><span class="token class-name">String</span> agentArgs<span class="token punctuation">,</span> <span class="token class-name">Instrumentation</span> inst<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 在这里注册 ClassFileTransformer 对象，用于对类字节码进行转换</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>premain 方法的实现必须满足以下要求：</p><ul><li>必须是 public static void 类型的方法。</li><li>方法名必须为 premain。</li><li>方法参数中的 Instrumentation 对象用于在程序运行时获取和修改类信息</li></ul><p><strong>agentmain</strong> 方法也是一种 Java Agent 注册方法，它可以在程序运行时动态注册 Java Agent，从而实现动态修改类字节码</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>lang<span class="token punctuation">.</span>instrument<span class="token punctuation">.</span></span><span class="token class-name">Instrumentation</span></span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MyAgent</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">agentmain</span><span class="token punctuation">(</span><span class="token class-name">String</span> agentArgs<span class="token punctuation">,</span> <span class="token class-name">Instrumentation</span> inst<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 在这里注册 ClassFileTransformer 对象，用于对类字节码进行转换</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>必须满足以下要求：</p><ul><li>必须是 public static void 类型的方法。</li><li>方法名必须为 agentmain。</li><li>方法参数中的 Instrumentation 对象用于在程序运行时获取和修改类信息。</li><li>方法必须在运行时使用 VirtualMachine.attach 方法调用</li></ul><p>agentmain 方法的调用需要通过 VirtualMachine.attach 方法实现。VirtualMachine.attach 方法是在 jdk.tools.jar 包中定义的，因此需要在启动时指定 jdk.tools.jar 包。</p><p>premain 方法是在程序启动时被调用的，而 agentmain 方法是在程序运行时动态注册 Java Agent 的方法</p></div><hr><h2 id="附-instrumentation源码-jdk1-8" tabindex="-1"><a class="header-anchor" href="#附-instrumentation源码-jdk1-8" aria-hidden="true">#</a> 附: Instrumentation源码(JDK1.8)</h2><details class="hint-container details"><summary>Instrumentation.java</summary><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">java<span class="token punctuation">.</span>lang<span class="token punctuation">.</span>instrument</span><span class="token punctuation">;</span>

<span class="token keyword">import</span>  <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>io<span class="token punctuation">.</span></span><span class="token class-name">File</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span>  <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>io<span class="token punctuation">.</span></span><span class="token class-name">IOException</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span>  <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span>jar<span class="token punctuation">.</span></span><span class="token class-name">JarFile</span></span><span class="token punctuation">;</span>

<span class="token comment">/*
 * Copyright 2003 Wily Technology, Inc.
 */</span>

<span class="token doc-comment comment">/**
 * This class provides services needed to instrument Java
 * programming language code.
 * Instrumentation is the addition of byte-codes to methods for the
 * purpose of gathering data to be utilized by tools.
 * Since the changes are purely additive, these tools do not modify
 * application state or behavior.
 * Examples of such benign tools include monitoring agents, profilers,
 * coverage analyzers, and event loggers.
 *
 * <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>P</span><span class="token punctuation">&gt;</span></span>
 * There are two ways to obtain an instance of the
 * <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>code</span><span class="token punctuation">&gt;</span></span><span class="token code-section"><span class="token line"><span class="token code language-java"><span class="token class-name">Instrumentation</span></span></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>code</span><span class="token punctuation">&gt;</span></span> interface:
 *
 * <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ol</span><span class="token punctuation">&gt;</span></span>
 *   <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>li</span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">&gt;</span></span> When a JVM is launched in a way that indicates an agent
 *     class. In that case an <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>code</span><span class="token punctuation">&gt;</span></span><span class="token code-section"><span class="token line"><span class="token code language-java"><span class="token class-name">Instrumentation</span></span></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>code</span><span class="token punctuation">&gt;</span></span> instance
 *     is passed to the <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>code</span><span class="token punctuation">&gt;</span></span><span class="token code-section"><span class="token line"><span class="token code language-java">premain</span></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>code</span><span class="token punctuation">&gt;</span></span> method of the agent class.
 *     <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>li</span><span class="token punctuation">&gt;</span></span>
 *   <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>li</span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">&gt;</span></span> When a JVM provides a mechanism to start agents sometime
 *     after the JVM is launched. In that case an <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>code</span><span class="token punctuation">&gt;</span></span><span class="token code-section"><span class="token line"><span class="token code language-java"><span class="token class-name">Instrumentation</span></span></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>code</span><span class="token punctuation">&gt;</span></span>
 *     instance is passed to the <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>code</span><span class="token punctuation">&gt;</span></span><span class="token code-section"><span class="token line"><span class="token code language-java">agentmain</span></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>code</span><span class="token punctuation">&gt;</span></span> method of the
 *     agent code. <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">&gt;</span></span> <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>li</span><span class="token punctuation">&gt;</span></span>
 * <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>ol</span><span class="token punctuation">&gt;</span></span>
 * <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">&gt;</span></span>
 * These mechanisms are described in the
 * <span class="token punctuation">{</span><span class="token keyword">@linkplain</span> java.lang.instrument package specification<span class="token punctuation">}</span>.
 * <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">&gt;</span></span>
 * Once an agent acquires an <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>code</span><span class="token punctuation">&gt;</span></span><span class="token code-section"><span class="token line"><span class="token code language-java"><span class="token class-name">Instrumentation</span></span></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>code</span><span class="token punctuation">&gt;</span></span> instance,
 * the agent may call methods on the instance at any time.
 *
 * <span class="token keyword">@since</span>   1.5
 */</span>
<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">Instrumentation</span> <span class="token punctuation">{</span>
    <span class="token doc-comment comment">/**
     * Registers the supplied transformer. All future class definitions
     * will be seen by the transformer, except definitions of classes upon which any
     * registered transformer is dependent.
     * The transformer is called when classes are loaded, when they are
     * <span class="token punctuation">{</span><span class="token keyword">@linkplain</span> <span class="token reference"><span class="token punctuation">#</span><span class="token field">redefineClasses</span></span> redefined<span class="token punctuation">}</span>. and if <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>code</span><span class="token punctuation">&gt;</span></span><span class="token code-section"><span class="token line"><span class="token code language-java">canRetransform</span></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>code</span><span class="token punctuation">&gt;</span></span> is true,
     * when they are <span class="token punctuation">{</span><span class="token keyword">@linkplain</span> <span class="token reference"><span class="token punctuation">#</span><span class="token field">retransformClasses</span></span> retransformed<span class="token punctuation">}</span>.
     * See <span class="token punctuation">{</span><span class="token keyword">@link</span> <span class="token reference"><span class="token namespace">java<span class="token punctuation">.</span>lang<span class="token punctuation">.</span>instrument<span class="token punctuation">.</span></span><span class="token class-name">ClassFileTransformer</span><span class="token punctuation">#</span><span class="token field">transform</span></span>
     * ClassFileTransformer.transform<span class="token punctuation">}</span> for the order
     * of transform calls.
     * If a transformer throws
     * an exception during execution, the JVM will still call the other registered
     * transformers in order. The same transformer may be added more than once,
     * but it is strongly discouraged -- avoid this by creating a new instance of
     * transformer class.
     * <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>P</span><span class="token punctuation">&gt;</span></span>
     * This method is intended for use in instrumentation, as described in the
     * <span class="token punctuation">{</span><span class="token keyword">@linkplain</span> <span class="token reference"><span class="token class-name">Instrumentation</span></span> class specification<span class="token punctuation">}</span>.
     *
     * <span class="token keyword">@param</span> <span class="token parameter">transformer</span>          the transformer to register
     * <span class="token keyword">@param</span> <span class="token parameter">canRetransform</span>       can this transformer&#39;s transformations be retransformed
     * <span class="token keyword">@throws</span> <span class="token reference"><span class="token namespace">java<span class="token punctuation">.</span>lang<span class="token punctuation">.</span></span><span class="token class-name">NullPointerException</span></span> if passed a <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>code</span><span class="token punctuation">&gt;</span></span><span class="token code-section"><span class="token line"><span class="token code language-java"><span class="token keyword">null</span></span></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>code</span><span class="token punctuation">&gt;</span></span> transformer
     * <span class="token keyword">@throws</span> <span class="token reference"><span class="token namespace">java<span class="token punctuation">.</span>lang<span class="token punctuation">.</span></span><span class="token class-name">UnsupportedOperationException</span></span> if <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>code</span><span class="token punctuation">&gt;</span></span><span class="token code-section"><span class="token line"><span class="token code language-java">canRetransform</span></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>code</span><span class="token punctuation">&gt;</span></span>
     * is true and the current configuration of the JVM does not allow
     * retransformation (<span class="token punctuation">{</span><span class="token keyword">@link</span> <span class="token reference"><span class="token punctuation">#</span><span class="token field">isRetransformClassesSupported</span></span><span class="token punctuation">}</span> is false)
     * <span class="token keyword">@since</span> 1.6
     */</span>
    <span class="token keyword">void</span>
    <span class="token function">addTransformer</span><span class="token punctuation">(</span><span class="token class-name">ClassFileTransformer</span> transformer<span class="token punctuation">,</span> <span class="token keyword">boolean</span> canRetransform<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * Registers the supplied transformer.
     * <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>P</span><span class="token punctuation">&gt;</span></span>
     * Same as <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>code</span><span class="token punctuation">&gt;</span></span><span class="token code-section"><span class="token line"><span class="token code language-java"><span class="token function">addTransformer</span><span class="token punctuation">(</span>transformer<span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span></span></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>code</span><span class="token punctuation">&gt;</span></span>.
     *
     * <span class="token keyword">@param</span> <span class="token parameter">transformer</span>          the transformer to register
     * <span class="token keyword">@throws</span> <span class="token reference"><span class="token namespace">java<span class="token punctuation">.</span>lang<span class="token punctuation">.</span></span><span class="token class-name">NullPointerException</span></span> if passed a <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>code</span><span class="token punctuation">&gt;</span></span><span class="token code-section"><span class="token line"><span class="token code language-java"><span class="token keyword">null</span></span></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>code</span><span class="token punctuation">&gt;</span></span> transformer
     * <span class="token keyword">@see</span>    <span class="token reference"><span class="token punctuation">#</span><span class="token function">addTransformer</span><span class="token punctuation">(</span><span class="token class-name">ClassFileTransformer</span><span class="token punctuation">,</span><span class="token keyword">boolean</span><span class="token punctuation">)</span></span>
     */</span>
    <span class="token keyword">void</span>
    <span class="token function">addTransformer</span><span class="token punctuation">(</span><span class="token class-name">ClassFileTransformer</span> transformer<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * Unregisters the supplied transformer. Future class definitions will
     * not be shown to the transformer. Removes the most-recently-added matching
     * instance of the transformer. Due to the multi-threaded nature of
     * class loading, it is possible for a transformer to receive calls
     * after it has been removed. Transformers should be written defensively
     * to expect this situation.
     *
     * <span class="token keyword">@param</span> <span class="token parameter">transformer</span>          the transformer to unregister
     * <span class="token keyword">@return</span>  true if the transformer was found and removed, false if the
     *           transformer was not found
     * <span class="token keyword">@throws</span> <span class="token reference"><span class="token namespace">java<span class="token punctuation">.</span>lang<span class="token punctuation">.</span></span><span class="token class-name">NullPointerException</span></span> if passed a <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>code</span><span class="token punctuation">&gt;</span></span><span class="token code-section"><span class="token line"><span class="token code language-java"><span class="token keyword">null</span></span></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>code</span><span class="token punctuation">&gt;</span></span> transformer
     */</span>
    <span class="token keyword">boolean</span>
    <span class="token function">removeTransformer</span><span class="token punctuation">(</span><span class="token class-name">ClassFileTransformer</span> transformer<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * Returns whether or not the current JVM configuration supports retransformation
     * of classes.
     * The ability to retransform an already loaded class is an optional capability
     * of a JVM.
     * Retransformation will only be supported if the
     * <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>code</span><span class="token punctuation">&gt;</span></span><span class="token code-section"><span class="token line"><span class="token code language-java"><span class="token class-name">Can</span><span class="token operator">-</span><span class="token class-name">Retransform</span><span class="token operator">-</span><span class="token class-name">Classes</span></span></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>code</span><span class="token punctuation">&gt;</span></span> manifest attribute is set to
     * <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>code</span><span class="token punctuation">&gt;</span></span><span class="token code-section"><span class="token line"><span class="token code language-java"><span class="token boolean">true</span></span></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>code</span><span class="token punctuation">&gt;</span></span> in the agent JAR file (as described in the
     * <span class="token punctuation">{</span><span class="token keyword">@linkplain</span> java.lang.instrument package specification<span class="token punctuation">}</span>) and the JVM supports
     * this capability.
     * During a single instantiation of a single JVM, multiple calls to this
     * method will always return the same answer.
     * <span class="token keyword">@return</span>  true if the current JVM configuration supports retransformation of
     *          classes, false if not.
     * <span class="token keyword">@see</span> <span class="token reference"><span class="token punctuation">#</span><span class="token field">retransformClasses</span></span>
     * <span class="token keyword">@since</span> 1.6
     */</span>
    <span class="token keyword">boolean</span>
    <span class="token function">isRetransformClassesSupported</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * Retransform the supplied set of classes.
     *
     * <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>P</span><span class="token punctuation">&gt;</span></span>
     * This function facilitates the instrumentation
     * of already loaded classes.
     * When classes are initially loaded or when they are
     * <span class="token punctuation">{</span><span class="token keyword">@linkplain</span> <span class="token reference"><span class="token punctuation">#</span><span class="token field">redefineClasses</span></span> redefined<span class="token punctuation">}</span>,
     * the initial class file bytes can be transformed with the
     * <span class="token punctuation">{</span><span class="token keyword">@link</span> <span class="token reference"><span class="token namespace">java<span class="token punctuation">.</span>lang<span class="token punctuation">.</span>instrument<span class="token punctuation">.</span></span><span class="token class-name">ClassFileTransformer</span></span> ClassFileTransformer<span class="token punctuation">}</span>.
     * This function reruns the transformation process
     * (whether or not a transformation has previously occurred).
     * This retransformation follows these steps:
     *  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ul</span><span class="token punctuation">&gt;</span></span>
     *    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>li</span><span class="token punctuation">&gt;</span></span>starting from the initial class file bytes
     *    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>li</span><span class="token punctuation">&gt;</span></span>
     *    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>li</span><span class="token punctuation">&gt;</span></span>for each transformer that was added with <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>code</span><span class="token punctuation">&gt;</span></span><span class="token code-section"><span class="token line"><span class="token code language-java">canRetransform</span></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>code</span><span class="token punctuation">&gt;</span></span>
     *      false, the bytes returned by
     *      <span class="token punctuation">{</span><span class="token keyword">@link</span> <span class="token reference"><span class="token namespace">java<span class="token punctuation">.</span>lang<span class="token punctuation">.</span>instrument<span class="token punctuation">.</span></span><span class="token class-name">ClassFileTransformer</span><span class="token punctuation">#</span><span class="token field">transform</span></span> transform<span class="token punctuation">}</span>
     *      during the last class load or redefine are
     *      reused as the output of the transformation; note that this is
     *      equivalent to reapplying the previous transformation, unaltered;
     *      except that
     *      <span class="token punctuation">{</span><span class="token keyword">@link</span> <span class="token reference"><span class="token namespace">java<span class="token punctuation">.</span>lang<span class="token punctuation">.</span>instrument<span class="token punctuation">.</span></span><span class="token class-name">ClassFileTransformer</span><span class="token punctuation">#</span><span class="token field">transform</span></span> transform<span class="token punctuation">}</span>
     *      is not called
     *    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>li</span><span class="token punctuation">&gt;</span></span>
     *    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>li</span><span class="token punctuation">&gt;</span></span>for each transformer that was added with <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>code</span><span class="token punctuation">&gt;</span></span><span class="token code-section"><span class="token line"><span class="token code language-java">canRetransform</span></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>code</span><span class="token punctuation">&gt;</span></span>
     *      true, the
     *      <span class="token punctuation">{</span><span class="token keyword">@link</span> <span class="token reference"><span class="token namespace">java<span class="token punctuation">.</span>lang<span class="token punctuation">.</span>instrument<span class="token punctuation">.</span></span><span class="token class-name">ClassFileTransformer</span><span class="token punctuation">#</span><span class="token field">transform</span></span> transform<span class="token punctuation">}</span>
     *      method is called in these transformers
     *    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>li</span><span class="token punctuation">&gt;</span></span>
     *    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>li</span><span class="token punctuation">&gt;</span></span>the transformed class file bytes are installed as the new
     *      definition of the class
     *    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>li</span><span class="token punctuation">&gt;</span></span>
     *  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>ul</span><span class="token punctuation">&gt;</span></span>
     * <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>P</span><span class="token punctuation">&gt;</span></span>
     *
     * The order of transformation is described in the
     * <span class="token punctuation">{</span><span class="token keyword">@link</span> <span class="token reference"><span class="token namespace">java<span class="token punctuation">.</span>lang<span class="token punctuation">.</span>instrument<span class="token punctuation">.</span></span><span class="token class-name">ClassFileTransformer</span><span class="token punctuation">#</span><span class="token field">transform</span></span> transform<span class="token punctuation">}</span> method.
     * This same order is used in the automatic reapplication of retransformation
     * incapable transforms.
     * <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>P</span><span class="token punctuation">&gt;</span></span>
     *
     * The initial class file bytes represent the bytes passed to
     * <span class="token punctuation">{</span><span class="token keyword">@link</span> <span class="token reference"><span class="token namespace">java<span class="token punctuation">.</span>lang<span class="token punctuation">.</span></span><span class="token class-name">ClassLoader</span><span class="token punctuation">#</span><span class="token field">defineClass</span></span> ClassLoader.defineClass<span class="token punctuation">}</span> or
     * <span class="token punctuation">{</span><span class="token keyword">@link</span> <span class="token reference"><span class="token punctuation">#</span><span class="token field">redefineClasses</span></span> redefineClasses<span class="token punctuation">}</span>
     * (before any transformations
     *  were applied), however they might not exactly match them.
     *  The constant pool might not have the same layout or contents.
     *  The constant pool may have more or fewer entries.
     *  Constant pool entries may be in a different order; however,
     *  constant pool indices in the bytecodes of methods will correspond.
     *  Some attributes may not be present.
     *  Where order is not meaningful, for example the order of methods,
     *  order might not be preserved.
     *
     * <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>P</span><span class="token punctuation">&gt;</span></span>
     * This method operates on
     * a set in order to allow interdependent changes to more than one class at the same time
     * (a retransformation of class A can require a retransformation of class B).
     *
     * <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>P</span><span class="token punctuation">&gt;</span></span>
     * If a retransformed method has active stack frames, those active frames continue to
     * run the bytecodes of the original method.
     * The retransformed method will be used on new invokes.
     *
     * <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>P</span><span class="token punctuation">&gt;</span></span>
     * This method does not cause any initialization except that which would occur
     * under the customary JVM semantics. In other words, redefining a class
     * does not cause its initializers to be run. The values of static variables
     * will remain as they were prior to the call.
     *
     * <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>P</span><span class="token punctuation">&gt;</span></span>
     * Instances of the retransformed class are not affected.
     *
     * <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>P</span><span class="token punctuation">&gt;</span></span>
     * The retransformation may change method bodies, the constant pool and attributes.
     * The retransformation must not add, remove or rename fields or methods, change the
     * signatures of methods, or change inheritance.  These restrictions maybe be
     * lifted in future versions.  The class file bytes are not checked, verified and installed
     * until after the transformations have been applied, if the resultant bytes are in
     * error this method will throw an exception.
     *
     * <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>P</span><span class="token punctuation">&gt;</span></span>
     * If this method throws an exception, no classes have been retransformed.
     * <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>P</span><span class="token punctuation">&gt;</span></span>
     * This method is intended for use in instrumentation, as described in the
     * <span class="token punctuation">{</span><span class="token keyword">@linkplain</span> <span class="token reference"><span class="token class-name">Instrumentation</span></span> class specification<span class="token punctuation">}</span>.
     *
     * <span class="token keyword">@param</span> <span class="token parameter">classes</span> array of classes to retransform;
     *                a zero-length array is allowed, in this case, this method does nothing
     * <span class="token keyword">@throws</span> <span class="token reference"><span class="token namespace">java<span class="token punctuation">.</span>lang<span class="token punctuation">.</span>instrument<span class="token punctuation">.</span></span><span class="token class-name">UnmodifiableClassException</span></span> if a specified class cannot be modified
     * (<span class="token punctuation">{</span><span class="token keyword">@link</span> <span class="token reference"><span class="token punctuation">#</span><span class="token field">isModifiableClass</span></span><span class="token punctuation">}</span> would return <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>code</span><span class="token punctuation">&gt;</span></span><span class="token code-section"><span class="token line"><span class="token code language-java"><span class="token boolean">false</span></span></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>code</span><span class="token punctuation">&gt;</span></span>)
     * <span class="token keyword">@throws</span> <span class="token reference"><span class="token namespace">java<span class="token punctuation">.</span>lang<span class="token punctuation">.</span></span><span class="token class-name">UnsupportedOperationException</span></span> if the current configuration of the JVM does not allow
     * retransformation (<span class="token punctuation">{</span><span class="token keyword">@link</span> <span class="token reference"><span class="token punctuation">#</span><span class="token field">isRetransformClassesSupported</span></span><span class="token punctuation">}</span> is false) or the retransformation attempted
     * to make unsupported changes
     * <span class="token keyword">@throws</span> <span class="token reference"><span class="token namespace">java<span class="token punctuation">.</span>lang<span class="token punctuation">.</span></span><span class="token class-name">ClassFormatError</span></span> if the data did not contain a valid class
     * <span class="token keyword">@throws</span> <span class="token reference"><span class="token namespace">java<span class="token punctuation">.</span>lang<span class="token punctuation">.</span></span><span class="token class-name">NoClassDefFoundError</span></span> if the name in the class file is not equal to the name of the class
     * <span class="token keyword">@throws</span> <span class="token reference"><span class="token namespace">java<span class="token punctuation">.</span>lang<span class="token punctuation">.</span></span><span class="token class-name">UnsupportedClassVersionError</span></span> if the class file version numbers are not supported
     * <span class="token keyword">@throws</span> <span class="token reference"><span class="token namespace">java<span class="token punctuation">.</span>lang<span class="token punctuation">.</span></span><span class="token class-name">ClassCircularityError</span></span> if the new classes contain a circularity
     * <span class="token keyword">@throws</span> <span class="token reference"><span class="token namespace">java<span class="token punctuation">.</span>lang<span class="token punctuation">.</span></span><span class="token class-name">LinkageError</span></span> if a linkage error occurs
     * <span class="token keyword">@throws</span> <span class="token reference"><span class="token namespace">java<span class="token punctuation">.</span>lang<span class="token punctuation">.</span></span><span class="token class-name">NullPointerException</span></span> if the supplied classes  array or any of its components
     *                                        is <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>code</span><span class="token punctuation">&gt;</span></span><span class="token code-section"><span class="token line"><span class="token code language-java"><span class="token keyword">null</span></span></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>code</span><span class="token punctuation">&gt;</span></span>.
     *
     * <span class="token keyword">@see</span> <span class="token reference"><span class="token punctuation">#</span><span class="token field">isRetransformClassesSupported</span></span>
     * <span class="token keyword">@see</span> <span class="token reference"><span class="token punctuation">#</span><span class="token field">addTransformer</span></span>
     * <span class="token keyword">@see</span> <span class="token reference"><span class="token namespace">java<span class="token punctuation">.</span>lang<span class="token punctuation">.</span>instrument<span class="token punctuation">.</span></span><span class="token class-name">ClassFileTransformer</span></span>
     * <span class="token keyword">@since</span> 1.6
     */</span>
    <span class="token keyword">void</span>
    <span class="token function">retransformClasses</span><span class="token punctuation">(</span><span class="token class-name">Class</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span> classes<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">UnmodifiableClassException</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * Returns whether or not the current JVM configuration supports redefinition
     * of classes.
     * The ability to redefine an already loaded class is an optional capability
     * of a JVM.
     * Redefinition will only be supported if the
     * <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>code</span><span class="token punctuation">&gt;</span></span><span class="token code-section"><span class="token line"><span class="token code language-java"><span class="token class-name">Can</span><span class="token operator">-</span><span class="token class-name">Redefine</span><span class="token operator">-</span><span class="token class-name">Classes</span></span></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>code</span><span class="token punctuation">&gt;</span></span> manifest attribute is set to
     * <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>code</span><span class="token punctuation">&gt;</span></span><span class="token code-section"><span class="token line"><span class="token code language-java"><span class="token boolean">true</span></span></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>code</span><span class="token punctuation">&gt;</span></span> in the agent JAR file (as described in the
     * <span class="token punctuation">{</span><span class="token keyword">@linkplain</span> java.lang.instrument package specification<span class="token punctuation">}</span>) and the JVM supports
     * this capability.
     * During a single instantiation of a single JVM, multiple calls to this
     * method will always return the same answer.
     * <span class="token keyword">@return</span>  true if the current JVM configuration supports redefinition of classes,
     * false if not.
     * <span class="token keyword">@see</span> <span class="token reference"><span class="token punctuation">#</span><span class="token field">redefineClasses</span></span>
     */</span>
    <span class="token keyword">boolean</span>
    <span class="token function">isRedefineClassesSupported</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * Redefine the supplied set of classes using the supplied class files.
     *
     * <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>P</span><span class="token punctuation">&gt;</span></span>
     * This method is used to replace the definition of a class without reference
     * to the existing class file bytes, as one might do when recompiling from source
     * for fix-and-continue debugging.
     * Where the existing class file bytes are to be transformed (for
     * example in bytecode instrumentation)
     * <span class="token punctuation">{</span><span class="token keyword">@link</span> <span class="token reference"><span class="token punctuation">#</span><span class="token field">retransformClasses</span></span> retransformClasses<span class="token punctuation">}</span>
     * should be used.
     *
     * <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>P</span><span class="token punctuation">&gt;</span></span>
     * This method operates on
     * a set in order to allow interdependent changes to more than one class at the same time
     * (a redefinition of class A can require a redefinition of class B).
     *
     * <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>P</span><span class="token punctuation">&gt;</span></span>
     * If a redefined method has active stack frames, those active frames continue to
     * run the bytecodes of the original method.
     * The redefined method will be used on new invokes.
     *
     * <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>P</span><span class="token punctuation">&gt;</span></span>
     * This method does not cause any initialization except that which would occur
     * under the customary JVM semantics. In other words, redefining a class
     * does not cause its initializers to be run. The values of static variables
     * will remain as they were prior to the call.
     *
     * <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>P</span><span class="token punctuation">&gt;</span></span>
     * Instances of the redefined class are not affected.
     *
     * <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>P</span><span class="token punctuation">&gt;</span></span>
     * The redefinition may change method bodies, the constant pool and attributes.
     * The redefinition must not add, remove or rename fields or methods, change the
     * signatures of methods, or change inheritance.  These restrictions maybe be
     * lifted in future versions.  The class file bytes are not checked, verified and installed
     * until after the transformations have been applied, if the resultant bytes are in
     * error this method will throw an exception.
     *
     * <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>P</span><span class="token punctuation">&gt;</span></span>
     * If this method throws an exception, no classes have been redefined.
     * <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>P</span><span class="token punctuation">&gt;</span></span>
     * This method is intended for use in instrumentation, as described in the
     * <span class="token punctuation">{</span><span class="token keyword">@linkplain</span> <span class="token reference"><span class="token class-name">Instrumentation</span></span> class specification<span class="token punctuation">}</span>.
     *
     * <span class="token keyword">@param</span> <span class="token parameter">definitions</span> array of classes to redefine with corresponding definitions;
     *                    a zero-length array is allowed, in this case, this method does nothing
     * <span class="token keyword">@throws</span> <span class="token reference"><span class="token namespace">java<span class="token punctuation">.</span>lang<span class="token punctuation">.</span>instrument<span class="token punctuation">.</span></span><span class="token class-name">UnmodifiableClassException</span></span> if a specified class cannot be modified
     * (<span class="token punctuation">{</span><span class="token keyword">@link</span> <span class="token reference"><span class="token punctuation">#</span><span class="token field">isModifiableClass</span></span><span class="token punctuation">}</span> would return <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>code</span><span class="token punctuation">&gt;</span></span><span class="token code-section"><span class="token line"><span class="token code language-java"><span class="token boolean">false</span></span></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>code</span><span class="token punctuation">&gt;</span></span>)
     * <span class="token keyword">@throws</span> <span class="token reference"><span class="token namespace">java<span class="token punctuation">.</span>lang<span class="token punctuation">.</span></span><span class="token class-name">UnsupportedOperationException</span></span> if the current configuration of the JVM does not allow
     * redefinition (<span class="token punctuation">{</span><span class="token keyword">@link</span> <span class="token reference"><span class="token punctuation">#</span><span class="token field">isRedefineClassesSupported</span></span><span class="token punctuation">}</span> is false) or the redefinition attempted
     * to make unsupported changes
     * <span class="token keyword">@throws</span> <span class="token reference"><span class="token namespace">java<span class="token punctuation">.</span>lang<span class="token punctuation">.</span></span><span class="token class-name">ClassFormatError</span></span> if the data did not contain a valid class
     * <span class="token keyword">@throws</span> <span class="token reference"><span class="token namespace">java<span class="token punctuation">.</span>lang<span class="token punctuation">.</span></span><span class="token class-name">NoClassDefFoundError</span></span> if the name in the class file is not equal to the name of the class
     * <span class="token keyword">@throws</span> <span class="token reference"><span class="token namespace">java<span class="token punctuation">.</span>lang<span class="token punctuation">.</span></span><span class="token class-name">UnsupportedClassVersionError</span></span> if the class file version numbers are not supported
     * <span class="token keyword">@throws</span> <span class="token reference"><span class="token namespace">java<span class="token punctuation">.</span>lang<span class="token punctuation">.</span></span><span class="token class-name">ClassCircularityError</span></span> if the new classes contain a circularity
     * <span class="token keyword">@throws</span> <span class="token reference"><span class="token namespace">java<span class="token punctuation">.</span>lang<span class="token punctuation">.</span></span><span class="token class-name">LinkageError</span></span> if a linkage error occurs
     * <span class="token keyword">@throws</span> <span class="token reference"><span class="token namespace">java<span class="token punctuation">.</span>lang<span class="token punctuation">.</span></span><span class="token class-name">NullPointerException</span></span> if the supplied definitions array or any of its components
     * is <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>code</span><span class="token punctuation">&gt;</span></span><span class="token code-section"><span class="token line"><span class="token code language-java"><span class="token keyword">null</span></span></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>code</span><span class="token punctuation">&gt;</span></span>
     * <span class="token keyword">@throws</span> <span class="token reference"><span class="token namespace">java<span class="token punctuation">.</span>lang<span class="token punctuation">.</span></span><span class="token class-name">ClassNotFoundException</span></span> Can never be thrown (present for compatibility reasons only)
     *
     * <span class="token keyword">@see</span> <span class="token reference"><span class="token punctuation">#</span><span class="token field">isRedefineClassesSupported</span></span>
     * <span class="token keyword">@see</span> <span class="token reference"><span class="token punctuation">#</span><span class="token field">addTransformer</span></span>
     * <span class="token keyword">@see</span> <span class="token reference"><span class="token namespace">java<span class="token punctuation">.</span>lang<span class="token punctuation">.</span>instrument<span class="token punctuation">.</span></span><span class="token class-name">ClassFileTransformer</span></span>
     */</span>
    <span class="token keyword">void</span>
    <span class="token function">redefineClasses</span><span class="token punctuation">(</span><span class="token class-name">ClassDefinition</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span> definitions<span class="token punctuation">)</span>
        <span class="token keyword">throws</span>  <span class="token class-name">ClassNotFoundException</span><span class="token punctuation">,</span> <span class="token class-name">UnmodifiableClassException</span><span class="token punctuation">;</span>


    <span class="token doc-comment comment">/**
     * Determines whether a class is modifiable by
     * <span class="token punctuation">{</span><span class="token keyword">@linkplain</span> <span class="token reference"><span class="token punctuation">#</span><span class="token field">retransformClasses</span></span> retransformation<span class="token punctuation">}</span>
     * or <span class="token punctuation">{</span><span class="token keyword">@linkplain</span> <span class="token reference"><span class="token punctuation">#</span><span class="token field">redefineClasses</span></span> redefinition<span class="token punctuation">}</span>.
     * If a class is modifiable then this method returns <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>code</span><span class="token punctuation">&gt;</span></span><span class="token code-section"><span class="token line"><span class="token code language-java"><span class="token boolean">true</span></span></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>code</span><span class="token punctuation">&gt;</span></span>.
     * If a class is not modifiable then this method returns <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>code</span><span class="token punctuation">&gt;</span></span><span class="token code-section"><span class="token line"><span class="token code language-java"><span class="token boolean">false</span></span></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>code</span><span class="token punctuation">&gt;</span></span>.
     * <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>P</span><span class="token punctuation">&gt;</span></span>
     * For a class to be retransformed, <span class="token punctuation">{</span><span class="token keyword">@link</span> <span class="token reference"><span class="token punctuation">#</span><span class="token field">isRetransformClassesSupported</span></span><span class="token punctuation">}</span> must also be true.
     * But the value of <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>code</span><span class="token punctuation">&gt;</span></span><span class="token code-section"><span class="token line"><span class="token code language-java"><span class="token function">isRetransformClassesSupported</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>code</span><span class="token punctuation">&gt;</span></span> does not influence the value
     * returned by this function.
     * For a class to be redefined, <span class="token punctuation">{</span><span class="token keyword">@link</span> <span class="token reference"><span class="token punctuation">#</span><span class="token field">isRedefineClassesSupported</span></span><span class="token punctuation">}</span> must also be true.
     * But the value of <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>code</span><span class="token punctuation">&gt;</span></span><span class="token code-section"><span class="token line"><span class="token code language-java"><span class="token function">isRedefineClassesSupported</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>code</span><span class="token punctuation">&gt;</span></span> does not influence the value
     * returned by this function.
     * <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>P</span><span class="token punctuation">&gt;</span></span>
     * Primitive classes (for example, <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>code</span><span class="token punctuation">&gt;</span></span><span class="token code-section"><span class="token line"><span class="token code language-java"><span class="token class-name"><span class="token namespace">java<span class="token punctuation">.</span>lang<span class="token punctuation">.</span></span>Integer</span><span class="token punctuation">.</span><span class="token constant">TYPE</span></span></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>code</span><span class="token punctuation">&gt;</span></span>)
     * and array classes are never modifiable.
     *
     * <span class="token keyword">@param</span> <span class="token parameter">theClass</span> the class to check for being modifiable
     * <span class="token keyword">@return</span> whether or not the argument class is modifiable
     * <span class="token keyword">@throws</span> <span class="token reference"><span class="token namespace">java<span class="token punctuation">.</span>lang<span class="token punctuation">.</span></span><span class="token class-name">NullPointerException</span></span> if the specified class is <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>code</span><span class="token punctuation">&gt;</span></span><span class="token code-section"><span class="token line"><span class="token code language-java"><span class="token keyword">null</span></span></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>code</span><span class="token punctuation">&gt;</span></span>.
     *
     * <span class="token keyword">@see</span> <span class="token reference"><span class="token punctuation">#</span><span class="token field">retransformClasses</span></span>
     * <span class="token keyword">@see</span> <span class="token reference"><span class="token punctuation">#</span><span class="token field">isRetransformClassesSupported</span></span>
     * <span class="token keyword">@see</span> <span class="token reference"><span class="token punctuation">#</span><span class="token field">redefineClasses</span></span>
     * <span class="token keyword">@see</span> <span class="token reference"><span class="token punctuation">#</span><span class="token field">isRedefineClassesSupported</span></span>
     * <span class="token keyword">@since</span> 1.6
     */</span>
    <span class="token keyword">boolean</span>
    <span class="token function">isModifiableClass</span><span class="token punctuation">(</span><span class="token class-name">Class</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span><span class="token punctuation">&gt;</span></span> theClass<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * Returns an array of all classes currently loaded by the JVM.
     *
     * <span class="token keyword">@return</span> an array containing all the classes loaded by the JVM, zero-length if there are none
     */</span>
    <span class="token annotation punctuation">@SuppressWarnings</span><span class="token punctuation">(</span><span class="token string">&quot;rawtypes&quot;</span><span class="token punctuation">)</span>
    <span class="token class-name">Class</span><span class="token punctuation">[</span><span class="token punctuation">]</span>
    <span class="token function">getAllLoadedClasses</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * Returns an array of all classes for which <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>code</span><span class="token punctuation">&gt;</span></span><span class="token code-section"><span class="token line"><span class="token code language-java">loader</span></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>code</span><span class="token punctuation">&gt;</span></span> is an initiating loader.
     * If the supplied loader is <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>code</span><span class="token punctuation">&gt;</span></span><span class="token code-section"><span class="token line"><span class="token code language-java"><span class="token keyword">null</span></span></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>code</span><span class="token punctuation">&gt;</span></span>, classes initiated by the bootstrap class
     * loader are returned.
     *
     * <span class="token keyword">@param</span> <span class="token parameter">loader</span>          the loader whose initiated class list will be returned
     * <span class="token keyword">@return</span> an array containing all the classes for which loader is an initiating loader,
     *          zero-length if there are none
     */</span>
    <span class="token annotation punctuation">@SuppressWarnings</span><span class="token punctuation">(</span><span class="token string">&quot;rawtypes&quot;</span><span class="token punctuation">)</span>
    <span class="token class-name">Class</span><span class="token punctuation">[</span><span class="token punctuation">]</span>
    <span class="token function">getInitiatedClasses</span><span class="token punctuation">(</span><span class="token class-name">ClassLoader</span> loader<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * Returns an implementation-specific approximation of the amount of storage consumed by
     * the specified object. The result may include some or all of the object&#39;s overhead,
     * and thus is useful for comparison within an implementation but not between implementations.
     *
     * The estimate may change during a single invocation of the JVM.
     *
     * <span class="token keyword">@param</span> <span class="token parameter">objectToSize</span>     the object to size
     * <span class="token keyword">@return</span> an implementation-specific approximation of the amount of storage consumed by the specified object
     * <span class="token keyword">@throws</span> <span class="token reference"><span class="token namespace">java<span class="token punctuation">.</span>lang<span class="token punctuation">.</span></span><span class="token class-name">NullPointerException</span></span> if the supplied Object is <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>code</span><span class="token punctuation">&gt;</span></span><span class="token code-section"><span class="token line"><span class="token code language-java"><span class="token keyword">null</span></span></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>code</span><span class="token punctuation">&gt;</span></span>.
     */</span>
    <span class="token keyword">long</span>
    <span class="token function">getObjectSize</span><span class="token punctuation">(</span><span class="token class-name">Object</span> objectToSize<span class="token punctuation">)</span><span class="token punctuation">;</span>


    <span class="token doc-comment comment">/**
     * Specifies a JAR file with instrumentation classes to be defined by the
     * bootstrap class loader.
     *
     * <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">&gt;</span></span> When the virtual machine&#39;s built-in class loader, known as the &quot;bootstrap
     * class loader&quot;, unsuccessfully searches for a class, the entries in the <span class="token punctuation">{</span><span class="token keyword">@link</span>
     * <span class="token reference"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span>jar<span class="token punctuation">.</span></span><span class="token class-name">JarFile</span></span> JAR file<span class="token punctuation">}</span> will be searched as well.
     *
     * <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">&gt;</span></span> This method may be used multiple times to add multiple JAR files to be
     * searched in the order that this method was invoked.
     *
     * <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">&gt;</span></span> The agent should take care to ensure that the JAR does not contain any
     * classes or resources other than those to be defined by the bootstrap
     * class loader for the purpose of instrumentation.
     * Failure to observe this warning could result in unexpected
     * behavior that is difficult to diagnose. For example, suppose there is a
     * loader L, and L&#39;s parent for delegation is the bootstrap class loader.
     * Furthermore, a method in class C, a class defined by L, makes reference to
     * a non-public accessor class C$1. If the JAR file contains a class C$1 then
     * the delegation to the bootstrap class loader will cause C$1 to be defined
     * by the bootstrap class loader. In this example an <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>code</span><span class="token punctuation">&gt;</span></span><span class="token code-section"><span class="token line"><span class="token code language-java"><span class="token class-name">IllegalAccessError</span></span></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>code</span><span class="token punctuation">&gt;</span></span>
     * will be thrown that may cause the application to fail. One approach to
     * avoiding these types of issues, is to use a unique package name for the
     * instrumentation classes.
     *
     * <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">&gt;</span></span>
     * <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>cite</span><span class="token punctuation">&gt;</span></span>The Java<span class="token entity named-entity" title="™">&amp;trade;</span> Virtual Machine Specification<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>cite</span><span class="token punctuation">&gt;</span></span>
     * specifies that a subsequent attempt to resolve a symbolic
     * reference that the Java virtual machine has previously unsuccessfully attempted
     * to resolve always fails with the same error that was thrown as a result of the
     * initial resolution attempt. Consequently, if the JAR file contains an entry
     * that corresponds to a class for which the Java virtual machine has
     * unsuccessfully attempted to resolve a reference, then subsequent attempts to
     * resolve that reference will fail with the same error as the initial attempt.
     *
     * <span class="token keyword">@param</span>   <span class="token parameter">jarfile</span>
     *          The JAR file to be searched when the bootstrap class loader
     *          unsuccessfully searches for a class.
     *
     * <span class="token keyword">@throws</span>  <span class="token reference"><span class="token class-name">NullPointerException</span></span>
     *          If <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>code</span><span class="token punctuation">&gt;</span></span><span class="token code-section"><span class="token line"><span class="token code language-java">jarfile</span></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>code</span><span class="token punctuation">&gt;</span></span> is <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>code</span><span class="token punctuation">&gt;</span></span><span class="token code-section"><span class="token line"><span class="token code language-java"><span class="token keyword">null</span></span></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>code</span><span class="token punctuation">&gt;</span></span>.
     *
     * <span class="token keyword">@see</span>     <span class="token reference"><span class="token punctuation">#</span><span class="token field">appendToSystemClassLoaderSearch</span></span>
     * <span class="token keyword">@see</span>     <span class="token reference"><span class="token namespace">java<span class="token punctuation">.</span>lang<span class="token punctuation">.</span></span><span class="token class-name">ClassLoader</span></span>
     * <span class="token keyword">@see</span>     <span class="token reference"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span>jar<span class="token punctuation">.</span></span><span class="token class-name">JarFile</span></span>
     *
     * <span class="token keyword">@since</span> 1.6
     */</span>
    <span class="token keyword">void</span>
    <span class="token function">appendToBootstrapClassLoaderSearch</span><span class="token punctuation">(</span><span class="token class-name">JarFile</span> jarfile<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * Specifies a JAR file with instrumentation classes to be defined by the
     * system class loader.
     *
     * When the system class loader for delegation (see
     * <span class="token punctuation">{</span><span class="token keyword">@link</span> <span class="token reference"><span class="token namespace">java<span class="token punctuation">.</span>lang<span class="token punctuation">.</span></span><span class="token class-name">ClassLoader</span><span class="token punctuation">#</span><span class="token field">getSystemClassLoader</span></span> getSystemClassLoader()<span class="token punctuation">}</span>)
     * unsuccessfully searches for a class, the entries in the <span class="token punctuation">{</span><span class="token keyword">@link</span>
     * <span class="token reference"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span>jar<span class="token punctuation">.</span></span><span class="token class-name">JarFile</span></span> JarFile<span class="token punctuation">}</span> will be searched as well.
     *
     * <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">&gt;</span></span> This method may be used multiple times to add multiple JAR files to be
     * searched in the order that this method was invoked.
     *
     * <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">&gt;</span></span> The agent should take care to ensure that the JAR does not contain any
     * classes or resources other than those to be defined by the system class
     * loader for the purpose of instrumentation.
     * Failure to observe this warning could result in unexpected
     * behavior that is difficult to diagnose (see
     * <span class="token punctuation">{</span><span class="token keyword">@link</span> <span class="token reference"><span class="token punctuation">#</span><span class="token field">appendToBootstrapClassLoaderSearch</span></span>
     * appendToBootstrapClassLoaderSearch<span class="token punctuation">}</span>).
     *
     * <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">&gt;</span></span> The system class loader supports adding a JAR file to be searched if
     * it implements a method named <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>code</span><span class="token punctuation">&gt;</span></span><span class="token code-section"><span class="token line"><span class="token code language-java">appendToClassPathForInstrumentation</span></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>code</span><span class="token punctuation">&gt;</span></span>
     * which takes a single parameter of type <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>code</span><span class="token punctuation">&gt;</span></span><span class="token code-section"><span class="token line"><span class="token code language-java"><span class="token class-name"><span class="token namespace">java<span class="token punctuation">.</span>lang<span class="token punctuation">.</span></span>String</span></span></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>code</span><span class="token punctuation">&gt;</span></span>. The
     * method is not required to have <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>code</span><span class="token punctuation">&gt;</span></span><span class="token code-section"><span class="token line"><span class="token code language-java"><span class="token keyword">public</span></span></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>code</span><span class="token punctuation">&gt;</span></span> access. The name of
     * the JAR file is obtained by invoking the <span class="token punctuation">{</span><span class="token keyword">@link</span> <span class="token reference"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span>zip<span class="token punctuation">.</span></span><span class="token class-name">ZipFile</span><span class="token punctuation">#</span><span class="token field">getName</span></span>
     * getName()<span class="token punctuation">}</span> method on the <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>code</span><span class="token punctuation">&gt;</span></span><span class="token code-section"><span class="token line"><span class="token code language-java">jarfile</span></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>code</span><span class="token punctuation">&gt;</span></span> and this is provided as the
     * parameter to the <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>code</span><span class="token punctuation">&gt;</span></span><span class="token code-section"><span class="token line"><span class="token code language-java">appendToClassPathForInstrumentation</span></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>code</span><span class="token punctuation">&gt;</span></span> method.
     *
     * <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">&gt;</span></span>
     * <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>cite</span><span class="token punctuation">&gt;</span></span>The Java<span class="token entity named-entity" title="™">&amp;trade;</span> Virtual Machine Specification<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>cite</span><span class="token punctuation">&gt;</span></span>
     * specifies that a subsequent attempt to resolve a symbolic
     * reference that the Java virtual machine has previously unsuccessfully attempted
     * to resolve always fails with the same error that was thrown as a result of the
     * initial resolution attempt. Consequently, if the JAR file contains an entry
     * that corresponds to a class for which the Java virtual machine has
     * unsuccessfully attempted to resolve a reference, then subsequent attempts to
     * resolve that reference will fail with the same error as the initial attempt.
     *
     * <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">&gt;</span></span> This method does not change the value of <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>code</span><span class="token punctuation">&gt;</span></span><span class="token code-section"><span class="token line"><span class="token code language-java">java<span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">.</span>path</span></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>code</span><span class="token punctuation">&gt;</span></span>
     * <span class="token punctuation">{</span><span class="token keyword">@link</span> <span class="token reference"><span class="token namespace">java<span class="token punctuation">.</span>lang<span class="token punctuation">.</span></span><span class="token class-name">System</span><span class="token punctuation">#</span><span class="token field">getProperties</span></span> system property<span class="token punctuation">}</span>.
     *
     * <span class="token keyword">@param</span>   <span class="token parameter">jarfile</span>
     *          The JAR file to be searched when the system class loader
     *          unsuccessfully searches for a class.
     *
     * <span class="token keyword">@throws</span>  <span class="token reference"><span class="token class-name">UnsupportedOperationException</span></span>
     *          If the system class loader does not support appending a
     *          a JAR file to be searched.
     *
     * <span class="token keyword">@throws</span>  <span class="token reference"><span class="token class-name">NullPointerException</span></span>
     *          If <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>code</span><span class="token punctuation">&gt;</span></span><span class="token code-section"><span class="token line"><span class="token code language-java">jarfile</span></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>code</span><span class="token punctuation">&gt;</span></span> is <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>code</span><span class="token punctuation">&gt;</span></span><span class="token code-section"><span class="token line"><span class="token code language-java"><span class="token keyword">null</span></span></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>code</span><span class="token punctuation">&gt;</span></span>.
     *
     * <span class="token keyword">@see</span>     <span class="token reference"><span class="token punctuation">#</span><span class="token field">appendToBootstrapClassLoaderSearch</span></span>
     * <span class="token keyword">@see</span>     <span class="token reference"><span class="token namespace">java<span class="token punctuation">.</span>lang<span class="token punctuation">.</span></span><span class="token class-name">ClassLoader</span><span class="token punctuation">#</span><span class="token field">getSystemClassLoader</span></span>
     * <span class="token keyword">@see</span>     <span class="token reference"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span>jar<span class="token punctuation">.</span></span><span class="token class-name">JarFile</span></span>
     * <span class="token keyword">@since</span> 1.6
     */</span>
    <span class="token keyword">void</span>
    <span class="token function">appendToSystemClassLoaderSearch</span><span class="token punctuation">(</span><span class="token class-name">JarFile</span> jarfile<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * Returns whether the current JVM configuration supports
     * <span class="token punctuation">{</span><span class="token keyword">@linkplain</span> <span class="token reference"><span class="token punctuation">#</span><span class="token function">setNativeMethodPrefix</span><span class="token punctuation">(</span><span class="token class-name">ClassFileTransformer</span><span class="token punctuation">,</span><span class="token class-name">String</span><span class="token punctuation">)</span></span>
     * setting a native method prefix<span class="token punctuation">}</span>.
     * The ability to set a native method prefix is an optional
     * capability of a JVM.
     * Setting a native method prefix will only be supported if the
     * <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>code</span><span class="token punctuation">&gt;</span></span><span class="token code-section"><span class="token line"><span class="token code language-java"><span class="token class-name">Can</span><span class="token operator">-</span><span class="token class-name">Set</span><span class="token operator">-</span><span class="token class-name">Native</span><span class="token operator">-</span><span class="token class-name">Method</span><span class="token operator">-</span><span class="token class-name">Prefix</span></span></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>code</span><span class="token punctuation">&gt;</span></span> manifest attribute is set to
     * <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>code</span><span class="token punctuation">&gt;</span></span><span class="token code-section"><span class="token line"><span class="token code language-java"><span class="token boolean">true</span></span></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>code</span><span class="token punctuation">&gt;</span></span> in the agent JAR file (as described in the
     * <span class="token punctuation">{</span><span class="token keyword">@linkplain</span> java.lang.instrument package specification<span class="token punctuation">}</span>) and the JVM supports
     * this capability.
     * During a single instantiation of a single JVM, multiple
     * calls to this method will always return the same answer.
     * <span class="token keyword">@return</span>  true if the current JVM configuration supports
     * setting a native method prefix, false if not.
     * <span class="token keyword">@see</span> <span class="token reference"><span class="token punctuation">#</span><span class="token field">setNativeMethodPrefix</span></span>
     * <span class="token keyword">@since</span> 1.6
     */</span>
    <span class="token keyword">boolean</span>
    <span class="token function">isNativeMethodPrefixSupported</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * This method modifies the failure handling of
     * native method resolution by allowing retry
     * with a prefix applied to the name.
     * When used with the
     * <span class="token punctuation">{</span><span class="token keyword">@link</span> <span class="token reference"><span class="token namespace">java<span class="token punctuation">.</span>lang<span class="token punctuation">.</span>instrument<span class="token punctuation">.</span></span><span class="token class-name">ClassFileTransformer</span></span> ClassFileTransformer<span class="token punctuation">}</span>,
     * it enables native methods to be
     * instrumented.
     * <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">&gt;</span></span>
     * Since native methods cannot be directly instrumented
     * (they have no bytecodes), they must be wrapped with
     * a non-native method which can be instrumented.
     * For example, if we had:
     * <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>pre</span><span class="token punctuation">&gt;</span></span>
     <span class="token code-section">*   <span class="token line"><span class="token code language-java"><span class="token keyword">native</span> <span class="token keyword">boolean</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token keyword">int</span> x<span class="token punctuation">)</span><span class="token punctuation">;</span></span></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>pre</span><span class="token punctuation">&gt;</span></span>
     * <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">&gt;</span></span>
     * We could transform the class file (with the
     * ClassFileTransformer during the initial definition
     * of the class) so that this becomes:
     * <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>pre</span><span class="token punctuation">&gt;</span></span>
     <span class="token code-section">*   <span class="token line"><span class="token code language-java"><span class="token keyword">boolean</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token keyword">int</span> x<span class="token punctuation">)</span> <span class="token punctuation">{</span></span></span>
     *     <span class="token line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>i</span><span class="token punctuation">&gt;</span></span><span class="token code language-java"><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span> <span class="token keyword">record</span> entry <span class="token keyword">to</span> <span class="token namespace">foo</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>i</span><span class="token punctuation">&gt;</span></span></span>
     *     <span class="token line"><span class="token code language-java"><span class="token keyword">return</span> <span class="token function">wrapped_foo</span><span class="token punctuation">(</span>x<span class="token punctuation">)</span><span class="token punctuation">;</span></span></span>
     *   <span class="token line"><span class="token code language-java"><span class="token punctuation">}</span></span></span>
     *
     *   <span class="token line"><span class="token code language-java"><span class="token keyword">native</span> <span class="token keyword">boolean</span> <span class="token function">wrapped_foo</span><span class="token punctuation">(</span><span class="token keyword">int</span> x<span class="token punctuation">)</span><span class="token punctuation">;</span></span></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>pre</span><span class="token punctuation">&gt;</span></span>
     * <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">&gt;</span></span>
     * Where <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>code</span><span class="token punctuation">&gt;</span></span><span class="token code-section"><span class="token line"><span class="token code language-java">foo</span></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>code</span><span class="token punctuation">&gt;</span></span> becomes a wrapper for the actual native
     * method with the appended prefix &quot;wrapped_&quot;.  Note that
     * &quot;wrapped_&quot; would be a poor choice of prefix since it
     * might conceivably form the name of an existing method
     * thus something like &quot;$$$MyAgentWrapped$$$_&quot; would be
     * better but would make these examples less readable.
     * <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">&gt;</span></span>
     * The wrapper will allow data to be collected on the native
     * method call, but now the problem becomes linking up the
     * wrapped method with the native implementation.
     * That is, the method <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>code</span><span class="token punctuation">&gt;</span></span><span class="token code-section"><span class="token line"><span class="token code language-java">wrapped_foo</span></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>code</span><span class="token punctuation">&gt;</span></span> needs to be
     * resolved to the native implementation of <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>code</span><span class="token punctuation">&gt;</span></span><span class="token code-section"><span class="token line"><span class="token code language-java">foo</span></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>code</span><span class="token punctuation">&gt;</span></span>,
     * which might be:
     * <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>pre</span><span class="token punctuation">&gt;</span></span>
     <span class="token code-section">*   <span class="token line"><span class="token code language-java"><span class="token class-name">Java_somePackage_someClass_foo</span><span class="token punctuation">(</span><span class="token class-name">JNIEnv</span><span class="token operator">*</span> env<span class="token punctuation">,</span> jint x<span class="token punctuation">)</span></span></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>pre</span><span class="token punctuation">&gt;</span></span>
     * <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">&gt;</span></span>
     * This function allows the prefix to be specified and the
     * proper resolution to occur.
     * Specifically, when the standard resolution fails, the
     * resolution is retried taking the prefix into consideration.
     * There are two ways that resolution occurs, explicit
     * resolution with the JNI function <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>code</span><span class="token punctuation">&gt;</span></span><span class="token code-section"><span class="token line"><span class="token code language-java"><span class="token class-name">RegisterNatives</span></span></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>code</span><span class="token punctuation">&gt;</span></span>
     * and the normal automatic resolution.  For
     * <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>code</span><span class="token punctuation">&gt;</span></span><span class="token code-section"><span class="token line"><span class="token code language-java"><span class="token class-name">RegisterNatives</span></span></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>code</span><span class="token punctuation">&gt;</span></span>, the JVM will attempt this
     * association:
     * <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>pre</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">{</span><span class="token keyword">@code</span>
     <span class="token code-section">*   <span class="token code language-java"><span class="token function">method</span><span class="token punctuation">(</span>foo<span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token function">nativeImplementation</span><span class="token punctuation">(</span>foo<span class="token punctuation">)</span></span>
     *</span> <span class="token punctuation">}</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>pre</span><span class="token punctuation">&gt;</span></span>
     * <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">&gt;</span></span>
     * When this fails, the resolution will be retried with
     * the specified prefix prepended to the method name,
     * yielding the correct resolution:
     * <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>pre</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">{</span><span class="token keyword">@code</span>
     <span class="token code-section">*   <span class="token code language-java"><span class="token function">method</span><span class="token punctuation">(</span>wrapped_foo<span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token function">nativeImplementation</span><span class="token punctuation">(</span>foo<span class="token punctuation">)</span></span>
     *</span> <span class="token punctuation">}</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>pre</span><span class="token punctuation">&gt;</span></span>
     * <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">&gt;</span></span>
     * For automatic resolution, the JVM will attempt:
     * <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>pre</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">{</span><span class="token keyword">@code</span>
     <span class="token code-section">*   <span class="token code language-java"><span class="token function">method</span><span class="token punctuation">(</span>wrapped_foo<span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token function">nativeImplementation</span><span class="token punctuation">(</span>wrapped_foo<span class="token punctuation">)</span></span>
     *</span> <span class="token punctuation">}</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>pre</span><span class="token punctuation">&gt;</span></span>
     * <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">&gt;</span></span>
     * When this fails, the resolution will be retried with
     * the specified prefix deleted from the implementation name,
     * yielding the correct resolution:
     * <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>pre</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">{</span><span class="token keyword">@code</span>
     <span class="token code-section">*   <span class="token code language-java"><span class="token function">method</span><span class="token punctuation">(</span>wrapped_foo<span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token function">nativeImplementation</span><span class="token punctuation">(</span>foo<span class="token punctuation">)</span></span>
     *</span> <span class="token punctuation">}</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>pre</span><span class="token punctuation">&gt;</span></span>
     * <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">&gt;</span></span>
     * Note that since the prefix is only used when standard
     * resolution fails, native methods can be wrapped selectively.
     * <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">&gt;</span></span>
     * Since each <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>code</span><span class="token punctuation">&gt;</span></span><span class="token code-section"><span class="token line"><span class="token code language-java"><span class="token class-name">ClassFileTransformer</span></span></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>code</span><span class="token punctuation">&gt;</span></span>
     * can do its own transformation of the bytecodes, more
     * than one layer of wrappers may be applied. Thus each
     * transformer needs its own prefix.  Since transformations
     * are applied in order, the prefixes, if applied, will
     * be applied in the same order
     * (see <span class="token punctuation">{</span><span class="token keyword">@link</span> <span class="token reference"><span class="token punctuation">#</span><span class="token function">addTransformer</span><span class="token punctuation">(</span><span class="token class-name">ClassFileTransformer</span><span class="token punctuation">,</span><span class="token keyword">boolean</span><span class="token punctuation">)</span></span> addTransformer<span class="token punctuation">}</span>).
     * Thus if three transformers applied
     * wrappers, <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>code</span><span class="token punctuation">&gt;</span></span><span class="token code-section"><span class="token line"><span class="token code language-java">foo</span></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>code</span><span class="token punctuation">&gt;</span></span> might become
     * <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>code</span><span class="token punctuation">&gt;</span></span><span class="token code-section"><span class="token line"><span class="token code language-java">$trans3_$trans2_$trans1_foo</span></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>code</span><span class="token punctuation">&gt;</span></span>.  But if, say,
     * the second transformer did not apply a wrapper to
     * <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>code</span><span class="token punctuation">&gt;</span></span><span class="token code-section"><span class="token line"><span class="token code language-java">foo</span></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>code</span><span class="token punctuation">&gt;</span></span> it would be just
     * <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>code</span><span class="token punctuation">&gt;</span></span><span class="token code-section"><span class="token line"><span class="token code language-java">$trans3_$trans1_foo</span></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>code</span><span class="token punctuation">&gt;</span></span>.  To be able to
     * efficiently determine the sequence of prefixes,
     * an intermediate prefix is only applied if its non-native
     * wrapper exists.  Thus, in the last example, even though
     * <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>code</span><span class="token punctuation">&gt;</span></span><span class="token code-section"><span class="token line"><span class="token code language-java">$trans1_foo</span></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>code</span><span class="token punctuation">&gt;</span></span> is not a native method, the
     * <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>code</span><span class="token punctuation">&gt;</span></span><span class="token code-section"><span class="token line"><span class="token code language-java">$trans1_</span></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>code</span><span class="token punctuation">&gt;</span></span> prefix is applied since
     * <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>code</span><span class="token punctuation">&gt;</span></span><span class="token code-section"><span class="token line"><span class="token code language-java">$trans1_foo</span></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>code</span><span class="token punctuation">&gt;</span></span> exists.
     *
     * <span class="token keyword">@param</span>   <span class="token parameter">transformer</span>
     *          The ClassFileTransformer which wraps using this prefix.
     * <span class="token keyword">@param</span>   <span class="token parameter">prefix</span>
     *          The prefix to apply to wrapped native methods when
     *          retrying a failed native method resolution. If prefix
     *          is either <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>code</span><span class="token punctuation">&gt;</span></span><span class="token code-section"><span class="token line"><span class="token code language-java"><span class="token keyword">null</span></span></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>code</span><span class="token punctuation">&gt;</span></span> or the empty string, then
     *          failed native method resolutions are not retried for
     *          this transformer.
     * <span class="token keyword">@throws</span> <span class="token reference"><span class="token namespace">java<span class="token punctuation">.</span>lang<span class="token punctuation">.</span></span><span class="token class-name">NullPointerException</span></span> if passed a <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>code</span><span class="token punctuation">&gt;</span></span><span class="token code-section"><span class="token line"><span class="token code language-java"><span class="token keyword">null</span></span></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>code</span><span class="token punctuation">&gt;</span></span> transformer.
     * <span class="token keyword">@throws</span> <span class="token reference"><span class="token namespace">java<span class="token punctuation">.</span>lang<span class="token punctuation">.</span></span><span class="token class-name">UnsupportedOperationException</span></span> if the current configuration of
     *           the JVM does not allow setting a native method prefix
     *           (<span class="token punctuation">{</span><span class="token keyword">@link</span> <span class="token reference"><span class="token punctuation">#</span><span class="token field">isNativeMethodPrefixSupported</span></span><span class="token punctuation">}</span> is false).
     * <span class="token keyword">@throws</span> <span class="token reference"><span class="token namespace">java<span class="token punctuation">.</span>lang<span class="token punctuation">.</span></span><span class="token class-name">IllegalArgumentException</span></span> if the transformer is not registered
     *           (see <span class="token punctuation">{</span><span class="token keyword">@link</span> <span class="token reference"><span class="token punctuation">#</span><span class="token function">addTransformer</span><span class="token punctuation">(</span><span class="token class-name">ClassFileTransformer</span><span class="token punctuation">,</span><span class="token keyword">boolean</span><span class="token punctuation">)</span></span> addTransformer<span class="token punctuation">}</span>).
     *
     * <span class="token keyword">@since</span> 1.6
     */</span>
    <span class="token keyword">void</span>
    <span class="token function">setNativeMethodPrefix</span><span class="token punctuation">(</span><span class="token class-name">ClassFileTransformer</span> transformer<span class="token punctuation">,</span> <span class="token class-name">String</span> prefix<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details>`,28);function m(g,b){const a=c("ExternalLinkIcon");return t(),p("div",null,[u,n("p",null,[n("a",r,[d,o(a)]),s(" [ˌɪnstrəmenˈteɪʃn] ，位于"),k,s("包，提供了一种在程序运行时修改字节码的机制，通过该API，我们可以在类被加载之前或之后进行修改、增强或替换，这种机制被称为“字节码增强技术”，进而实现AOP编程、方法耗时统计、性能分析、异常分析等诸多应用。")]),v])}const h=e(i,[["render",m],["__file","Instrumentation.html.vue"]]);export{h as default};
