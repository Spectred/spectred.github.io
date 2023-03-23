import{_ as p,V as c,W as o,Z as n,$ as s,X as e,a4 as t,F as i}from"./framework-b6120433.js";const l={},u=t(`<h1 id="锁" tabindex="-1"><a class="header-anchor" href="#锁" aria-hidden="true">#</a> 锁</h1><figure><img src="https://s2.loli.net/2023/01/30/bd4GTk58g1HjmUI.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><hr><h2 id="_1-内置锁-synchronized" tabindex="-1"><a class="header-anchor" href="#_1-内置锁-synchronized" aria-hidden="true">#</a> 1. 内置锁 <code>synchronized</code></h2><p>Java提供了内置锁机制来支持原子性、可见性和有序性。</p><p>每个Java对象都可以用作一个实现同步的锁，这些锁被称为内置锁（Intrinsic Lock）或监视器锁（Monitor Lock）。线程在进入同步代码块之前会自动获得锁，并且在退出同步代码块时（正常退出或异常退出）自动释放锁。</p><p>Java的内置锁相当于一种互斥锁，最多只有一个线程能持有这种锁。当线程A尝试获取一个由线程B持有的锁时，线程A必须等待或阻塞，直到线程B释放这个锁。如果B永远不释放锁，那么A将永远等下去。</p><h3 id="_1-1-synchronized的使用" tabindex="-1"><a class="header-anchor" href="#_1-1-synchronized的使用" aria-hidden="true">#</a> 1.1 <code>synchronized</code>的使用</h3><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">synchronized</span> <span class="token keyword">void</span> <span class="token function">method</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token comment">// 普通同步方法，锁是当前实例对象</span>
<span class="token punctuation">}</span>

<span class="token comment">// 等价于</span>
<span class="token keyword">void</span> <span class="token function">method</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token keyword">synchronized</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">static</span> <span class="token keyword">synchronized</span> <span class="token keyword">void</span> <span class="token function">method</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token comment">// 静态同步方法，锁是当前类的Class对象</span>
<span class="token punctuation">}</span>

<span class="token comment">// 等价于</span>
<span class="token keyword">void</span> <span class="token function">method</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">synchronized</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">getClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token class-name">Object</span> lock <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Object</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">void</span> <span class="token function">method</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token keyword">synchronized</span><span class="token punctuation">(</span>lock<span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token comment">// 同步方法块，锁是括号里配置的对象</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,11),d={class:"hint-container info"},r=n("p",{class:"hint-container-title"},"临界区",-1),k={href:"https://en.wikipedia.org/wiki/Critical_section",target:"_blank",rel:"noopener noreferrer"},v=t(`<p>使用<code>synchronized</code>确保多线程安全访问共享资源的代码示例</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SynchronizedExample</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">int</span> count <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token keyword">synchronized</span> <span class="token keyword">void</span> <span class="token function">increment</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> count<span class="token operator">++</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">execute</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">10000</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token function">increment</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">SynchronizedExample</span> example <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">SynchronizedExample</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">Thread</span> thread1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Thread</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>example<span class="token punctuation">.</span><span class="token function">execute</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">Thread</span> thread2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Thread</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>example<span class="token punctuation">.</span><span class="token function">execute</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        thread1<span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        thread2<span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            thread1<span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            thread2<span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">InterruptedException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;Count: &quot;</span> <span class="token operator">+</span> example<span class="token punctuation">.</span>count<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_1-2-对象的内存布局" tabindex="-1"><a class="header-anchor" href="#_1-2-对象的内存布局" aria-hidden="true">#</a> 1.2 对象的内存布局</h3><p>Java对象在对内存中的存储布局划分为三个部分: 对象头（Object Header）、实例数据（Instance Data）和对齐填充（Padding）。例如:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># 这个对象在内存中的总大小是32个字节。
Object Header（8 bytes）    # 对象头占用了8个字节
    Mark Word（4 bytes）
    Class Pointer（4 bytes）
Instance Data（16 bytes）   # 实例数据占用了16个字节
    int field1（4 bytes）   # 由一个int类型
    long field2（8 bytes）  # 一个long类型
    Object Reference field3（4 bytes）  # 个Object类型组成
Padding（8 bytes）					# 为了保证对象在内存中的地址是8的倍数，虚拟机添加了8个字节的填充
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_1-2-1-对象头" tabindex="-1"><a class="header-anchor" href="#_1-2-1-对象头" aria-hidden="true">#</a> 1.2.1 对象头</h4><p>HotSpot虚拟机对象的对象头部分包括两类信息:</p>`,7),m=n("strong",null,"Mark Word",-1),b={href:"https://github.com/openjdk/jdk/blob/jdk-17-ga/src/hotspot/share/oops/markWord.hpp",target:"_blank",rel:"noopener noreferrer"},h=t('<details class="hint-container details"><summary>markWord</summary><p>The markWord describes the header of an object.</p><p>Bit-format of an object header (most significant first, big endian layout below):</p><p>32 bits:</p><p>--------</p><p>​ hash:25 ------------&gt;| age:4 biased_lock:1 lock:2 (normal object)</p><p>​ JavaThread*:23 epoch:2 age:4 biased_lock:1 lock:2 (biased object)</p><p>64 bits:</p><p>--------</p><p>unused:25 hash:31 --&gt;| unused_gap:1 age:4 biased_lock:1 lock:2 (normal object)</p><p>JavaThread*:54 epoch:2 unused_gap:1 age:4 biased_lock:1 lock:2 (biased object)</p><p>- hash contains the identity hash value: largest value is 31 bits, see os::random().</p><p>​ Also, 64-bit vm&#39;s require a hash value no bigger than 32 bits because they will not properly generate a mask larger than that: see library_call.cpp</p><p>- the biased lock pattern is used to bias a lock toward a given thread.</p><p>​ When this pattern is set in the low three bits, the lock is either biased toward a given thread or &quot;anonymously&quot; biased,</p><p>​ indicating that it is possible for it to be biased.</p><p>​ When the lock is biased toward a given thread, locking and unlocking can be performed by that thread without using atomic operations.</p><p>​ When a lock&#39;s bias is revoked, it reverts back to the normal locking scheme described below.</p><p>​ Note that we are overloading the meaning of the &quot;unlocked&quot; state of the header.</p><p>​ Because we steal a bit from the age we can guarantee that the bias pattern will never be seen for a truly unlocked object.</p><p>​ Note also that the biased state contains the age bits normally contained in the object header.</p><p>​ Large increases in scavenge times were seen when these bits were absent and an arbitrary age assigned to all biased objects,</p><p>​ because they tended to consume a significant fraction of the eden semispaces and were not promoted promptly,</p><p>​ causing an increase in the amount of copying performed.</p><p>​ The runtime system aligns all JavaThread* pointers to a very large value (currently 128 bytes (32bVM) or 256 bytes (64bVM))</p><p>​ to make room for the age bits &amp; the epoch bits (used in support of biased locking).</p><p>​ [JavaThread* | epoch | age | 1 | 01] lock is biased toward given thread</p><p>​ [0 | epoch | age | 1 | 01] lock is anonymously biased</p><p>- the two lock bits are used to describe three states: locked/unlocked and monitor.</p><p>​ [ptr | 00] locked ptr points to real header on stack</p><p>​ [header | 0 | 01] unlocked regular object header</p><p>​ [ptr | 10] monitor inflated lock (header is wapped out)</p><p>​ [ptr | 11] marked used to mark an object</p><p>​ [0 ............ 0| 00] inflating inflation in progress</p><p>​ We assume that stack/thread pointers have the lowest two bits cleared.</p><p>- INFLATING() is a distinguished markword value of all zeros that is used when inflating an existing stack-lock into an ObjectMonitor.</p><p>​ See below for is_being_inflated() and INFLATING().</p></details><figure><img src="https://s2.loli.net/2023/02/23/OmH3FRYujgBaJ7W.png" alt="图来自: 《深入理解Java虚拟机》13.3 锁优化)" tabindex="0" loading="lazy"><figcaption>图来自: 《深入理解Java虚拟机》13.3 锁优化)</figcaption></figure><p>第二类是<strong>类型指针</strong>，即对象指向它的类型原数据的指针，Java虚拟机通过这个指针来确定该对象是哪个类的实例</p><h4 id="_1-2-2-实例数据" tabindex="-1"><a class="header-anchor" href="#_1-2-2-实例数据" aria-hidden="true">#</a> 1.2.2 实例数据</h4><p>对象真正存储的有效信息，即在程序代码里所定义的各种类型的字段内容</p><h4 id="_1-2-3-对齐填充" tabindex="-1"><a class="header-anchor" href="#_1-2-3-对齐填充" aria-hidden="true">#</a> 1.2.3 对齐填充</h4><p>不是必然存在的，没有特别的含义，仅仅起占位符的作用</p><p>HotSpot虚拟机的自动内存管理系统要求对象起始地址必须是8字节的整数倍，任何对象的大小都必须是8字节的整数倍，如果对象实例数据部分没有对齐，就需要通过对齐填充来补全</p>',8),y={class:"hint-container info"},w=n("p",{class:"hint-container-title"},"JOL",-1),f=n("strong",null,"JOL",-1),g={href:"https://github.com/openjdk/jol",target:"_blank",rel:"noopener noreferrer"},_=t('<h3 id="_1-3-锁升级" tabindex="-1"><a class="header-anchor" href="#_1-3-锁升级" aria-hidden="true">#</a> 1.3 锁升级</h3><p>锁升级(或锁膨胀)指的是在多线程并发访问时，根据竞争情况将锁状态逐渐升级，包括: 无锁 -&gt; 偏向锁 -&gt; 轻量级锁 -&gt; 重量级锁。锁可以升级但不能降级(目的是为了提高获得锁和释放锁的效率)</p><h4 id="_1-3-1-无锁" tabindex="-1"><a class="header-anchor" href="#_1-3-1-无锁" aria-hidden="true">#</a> 1.3.1 无锁</h4><p>当一个线程访问一个没有被锁定的对象时，它会尝试使用CAS操作（Compare And Swap）来获取对象的锁。如果CAS操作成功，则表示该线程获得了对象的锁，此时对象处于无锁状态</p><h4 id="_1-3-2-偏向锁" tabindex="-1"><a class="header-anchor" href="#_1-3-2-偏向锁" aria-hidden="true">#</a> 1.3.2 偏向锁</h4>',5),j={href:"https://github.com/openjdk/jdk/blob/jdk-17-ga/src/hotspot/share/runtime/biasedLocking.hpp",target:"_blank",rel:"noopener noreferrer"},x=n("p",null,"如果一个线程多次访问一个对象，并且其他线程没有竞争该对象的锁，那么该对象会被标记为偏向锁状态。这时，当该线程再次访问该对象时，就不需要CAS操作来获取锁了，而是直接获取该对象的锁。",-1),L=n("p",null,[s("假设当前虚拟机启动了偏向锁（-XX: +UseBiasedLocking）,那么当锁对象第一次被线程获取的时候，虚拟机将会把对象头中的标志位设置为"),n("code",null,"01"),s(",把偏向模式设置为"),n("code",null,"1"),s(",表示进入偏向模式。同时使用CAS操作把获取到这个锁的线程ID记录在对象的MardWord中。如果CAS成功，持有偏向锁的线程以后每次进入这个锁相关的同步块是，虚拟机都可以不再进行任何通过操作(如加锁、解锁和对MarkWord的更新)。")],-1),S=n("p",null,[s("偏向锁在Java6和Java7里是默认启用的(准确的说是Java6到Java14)，但是在应用启动几秒中之后才激活，如有必要可以使用JVM参数来关闭延迟: "),n("code",null,"-XX:BiasedLockingStartupDelay=0"),s("。如果确定应用程序里所有的锁通常情况下处于竞争状态，可以通过JVM参数关闭偏向锁: "),n("code",null,"-XX:-UseBiasedLocking=false"),s("，那么程序默认会进入轻量级锁状态。")],-1),q={class:"hint-container tip"},C=n("p",{class:"hint-container-title"},"提示",-1),A={href:"https://openjdk.org/jeps/374",target:"_blank",rel:"noopener noreferrer"},I=t(`<h4 id="_1-3-3-轻量级锁" tabindex="-1"><a class="header-anchor" href="#_1-3-3-轻量级锁" aria-hidden="true">#</a> 1.3.3 轻量级锁</h4><p>如果一个线程尝试获取一个对象的锁，但该对象已经被另一个线程获取了锁，那么该线程会将对象的锁升级为轻量级锁状态。升级为轻量级锁状态后，该线程会在自己的线程栈中申请一块空间作为锁记录（Lock Record），并将对象的Mark Word指向该锁记录的地址。此时，线程通过CAS操作更新对象的Mark Word，将其指向自己的锁记录，以获取对象的锁。（线程尝试使用CAS将MarkWord替换为只想锁记录的指针，如果成功，当前线程获得锁，如果失败，表示其他线程竞争锁，当前线程便擦灰姑娘是使用自旋来获取锁）</p><h4 id="_1-3-4-重量级锁" tabindex="-1"><a class="header-anchor" href="#_1-3-4-重量级锁" aria-hidden="true">#</a> 1.3.4 重量级锁</h4><p>如果一个对象的轻量级锁升级失败，即多个线程竞争同一个锁，那么该锁会升级为重量级锁状态（如轻量级锁自旋达到设定的次数）。重量级锁是一种基于操作系统的锁，它使用操作系统的互斥量来实现锁的竞争，相对于前面的三种锁级别，重量级锁的竞争强度更高，但开销也更大</p><div class="hint-container note"><p class="hint-container-title">锁优化</p><p>锁优化还包括 自旋锁与自适应锁、锁消除、锁粗化</p></div><h3 id="_1-4-原理" tabindex="-1"><a class="header-anchor" href="#_1-4-原理" aria-hidden="true">#</a> 1.4 原理</h3><p><code>synchronized</code>的原理是通过对象头的 Mark Word 和操作系统的互斥量实现</p><p>在源码中的实现如下：</p><p>对于同步代码块,<code>monitorenter</code>和<code>monitorexit</code>分别对应加锁和解锁操作</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">synchronized</span> <span class="token punctuation">(</span>obj<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// synchronized code block</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>编译后的字节码</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>0: aload_1
1: dup
2: astore_2
3: monitorenter    // 加锁
4: aload_2
5: monitorexit     // 解锁
6: goto 14
9: astore_3
10: aload_2
11: monitorexit    // 解锁
12: aload_3
13: athrow
14: return
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对于同步方法，使用ACC_SYNCHRONIZED标志来表示该方法是一个同步方法，进入该方法时会自动获取对象监视器（或称为锁），方法执行完成后会自动释放锁。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">synchronized</span> <span class="token keyword">void</span> <span class="token function">method</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// synchronized method</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>编译后的字节码:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public synchronized void method();
    descriptor: ()V
    flags: ACC_PUBLIC, ACC_SYNCHRONIZED   // ACC_SYNCHRONIZED标志
    Code:
      stack=0, locals=1, args_size=1
         0: return
      LineNumberTable:
        line 7: 0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,16),T={class:"hint-container info"},R=n("p",{class:"hint-container-title"},"在JVM源码中的实现",-1),z={href:"https://github.com/openjdk/jdk/blob/master/src/hotspot/share/runtime/objectMonitor.hpp",target:"_blank",rel:"noopener noreferrer"},O={href:"https://github.com/openjdk/jdk/blob/jdk-17-ga/src/hotspot/share/runtime/objectMonitor.cpp",target:"_blank",rel:"noopener noreferrer"},M=n("h2",{id:"_2-显式锁-lock",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#_2-显式锁-lock","aria-hidden":"true"},"#"),s(" 2. 显式锁 "),n("code",null,"Lock")],-1),W=n("p",null,"锁时用来控制多个线程访问共享资源的方式，一般来说一个锁能够防止多个线程同时访问共享资源。",-1),E=n("p",null,[s("Java中提供了: "),n("code",null,"java.util.concurrent.locks.Lock"),s("接口作为显式锁，与内置加锁机制不同的是，Lock提供了一种无条件的、可轮询的、定时的以及可中断的锁获取操作，所有加锁和解锁方法都是显式的、在Lock的实现中必须提供与内部锁相同的内存可见性语义，但在加锁语义、调度算法和顺序保证以及性能特性等方面可以有所不同。")],-1),H={id:"_2-1-lock",tabindex:"-1"},J=n("a",{class:"header-anchor",href:"#_2-1-lock","aria-hidden":"true"},"#",-1),V={href:"https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/concurrent/locks/Lock.html",target:"_blank",rel:"noopener noreferrer"},N=t(`<h4 id="_2-1-1-lock的使用方式" tabindex="-1"><a class="header-anchor" href="#_2-1-1-lock的使用方式" aria-hidden="true">#</a> 2.1.1 Lock的使用方式:</h4><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token class-name">Lock</span> l <span class="token operator">=</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">;</span>  
l<span class="token punctuation">.</span><span class="token function">lock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  
<span class="token keyword">try</span> <span class="token punctuation">{</span>    
  <span class="token comment">// access the resource protected by this lock  </span>
<span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>    
  l<span class="token punctuation">.</span><span class="token function">unlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="hint-container tip"><p class="hint-container-title">注意</p><p>在<code>finally</code>中释放锁，保证在获取锁之后，最终能够被释放</p><p>不要将获取锁的过程写在<code>try</code>中，因为如果在获取锁(自定义锁的实现)时发生了异常，抛出异常的同时也会导致锁无故释放</p></div><h4 id="_2-1-2-lock比synchronized提供了更多的功能性" tabindex="-1"><a class="header-anchor" href="#_2-1-2-lock比synchronized提供了更多的功能性" aria-hidden="true">#</a> 2.1.2 Lock比<code>synchronized</code>提供了更多的功能性:</h4><ul><li><code>tryLock()</code>: 非阻塞尝试获取锁</li><li><code>tryLock(long, TimeUnit)</code>: 可超时尝试获取锁</li><li><code>lockInterruptibly()</code>: 可中断尝试获取锁</li></ul><h4 id="_2-1-3-lock的api" tabindex="-1"><a class="header-anchor" href="#_2-1-3-lock的api" aria-hidden="true">#</a> 2.1.3 Lock的API</h4><div class="language-JAVA line-numbers-mode" data-ext="JAVA"><pre class="language-JAVA"><code>public interface Lock {

    /**
     * 获取锁
     * 调用该方法当前线程将会获取锁，获锁成功后从该方法返回
     */
    void lock();

    /**
     * 可中断地获取锁
     * 该方法会响应中断，即在锁的获取中可以终端当前线程
     */
    void lockInterruptibly() throws InterruptedException;

    /**
     * 尝试非阻塞的获取锁
     * 调用该方法护立刻返回，如果能够获取则返回true,否则返回false
     * &lt;p&gt;
     * 典型用法:
     * &lt;pre&gt; {@code
     * Lock lock = ...;
     * if (lock.tryLock()) {
     *   try {
     *     // manipulate protected state
     *   } finally {
     *     lock.unlock();
     *   }
     * } else {
     *   // perform alternative actions
     * }}&lt;/pre&gt;
     */
    boolean tryLock();

    /**
     * 超时的获取锁，当前线程在以下3种情况下会返回:
     * - 当前线程在超时时间内 获得锁
     * - 当前线程在超时时间内 被中断
     * - 超时时间结束，返回false
     */
    boolean tryLock(long time, TimeUnit unit) throws InterruptedException;

    /**
     * 释放锁
     */
    void unlock();

    /**
     * 获取Condition
     * 该Condition和当前锁绑定，当前线程只有获得了锁，才能调用Condition的wait()方法，而调用后，当前线程将释放锁
     */
    Condition newCondition();
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,7),Q={id:"_2-2-重入锁-reentrantlock",tabindex:"-1"},B=n("a",{class:"header-anchor",href:"#_2-2-重入锁-reentrantlock","aria-hidden":"true"},"#",-1),D={href:"https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/concurrent/locks/ReentrantLock.html",target:"_blank",rel:"noopener noreferrer"},F=t(`<p>ReentrantLock，重入锁，表示该锁能够支持一个线程对资源的重复加锁，任意线程在获取锁之后能够再次获取该锁而不会被锁阻塞，该特性的实现需要解决以下两个问题</p><ol><li><p>线程再次获取锁</p><p>锁需要去识别获取锁的线程是否为当前占据锁的线程，如果是则再次成功获取</p></li><li><p>锁的最终释放</p><p>线程重复n次获取锁，随后在第n次释放该锁后，其他线程能够获取该锁</p></li></ol><h4 id="_2-2-1-轮询锁与定时锁" tabindex="-1"><a class="header-anchor" href="#_2-2-1-轮询锁与定时锁" aria-hidden="true">#</a> 2.2.1 轮询锁与定时锁</h4><p>轮询锁和定时锁的获取模式是由<code>tryLock</code>方法实现。</p><p>正确的使用可以避免死锁的发生: 如果不能获得所有需要的锁，那么可以使用可定时的或可轮询的锁获取方式，从而是的重新获得控制权，它会释放已经获得的锁，然后重新尝试获取所有锁。</p><p>定时锁的实例: 带有时间限制的加锁</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token class-name">ReentrantLock</span> lock <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ReentrantLock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">try</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>lock<span class="token punctuation">.</span><span class="token function">tryLock</span><span class="token punctuation">(</span><span class="token number">1000</span><span class="token punctuation">,</span> <span class="token class-name">TimeUnit</span><span class="token punctuation">.</span><span class="token constant">MILLISECONDS</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// 尝试获取锁，等待1秒</span>
        <span class="token comment">// 获取锁成功后的代码逻辑</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token comment">// 获取锁失败后的处理逻辑</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">InterruptedException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 处理线程中断异常</span>
<span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
    lock<span class="token punctuation">.</span><span class="token function">unlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 释放锁</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-2-2-可中断的锁获取操作" tabindex="-1"><a class="header-anchor" href="#_2-2-2-可中断的锁获取操作" aria-hidden="true">#</a> 2.2.2 可中断的锁获取操作</h4><p>可中断的锁获取操作能在可取消的操作中使用加锁，<code>lockInterruptibly()</code>方法能够在获得锁的同时保持对中断的响应，并且由于它包含在Lock中，因此无需创建其他类型的不可中断阻塞机制。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token class-name">ReentrantLock</span> lock <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ReentrantLock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">try</span> <span class="token punctuation">{</span>
    lock<span class="token punctuation">.</span><span class="token function">lockInterruptibly</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 尝试获取锁，并响应线程的中断请求</span>
    <span class="token comment">// 获取锁成功后的代码逻辑</span>
<span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">InterruptedException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 处理线程中断异常</span>
<span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
    lock<span class="token punctuation">.</span><span class="token function">unlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 释放锁</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-2-3-非块结构的加锁" tabindex="-1"><a class="header-anchor" href="#_2-2-3-非块结构的加锁" aria-hidden="true">#</a> 2.2.3 非块结构的加锁</h4><p>内置锁是对一个块结构进行加锁，ReentrantLock是非块结构进行加锁</p><h4 id="_2-2-4-公平性" tabindex="-1"><a class="header-anchor" href="#_2-2-4-公平性" aria-hidden="true">#</a> 2.2.4 公平性</h4><p>可以通过构造函数传参来决定ReentrantLock的公平性，默认是非公平锁</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code>    <span class="token keyword">public</span> <span class="token class-name">ReentrantLock</span><span class="token punctuation">(</span><span class="token keyword">boolean</span> fair<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        sync <span class="token operator">=</span> fair <span class="token operator">?</span> <span class="token keyword">new</span> <span class="token class-name">FairSync</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">:</span> <span class="token keyword">new</span> <span class="token class-name">NonfairSync</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其中FairSync和NonfairSync都继承自内部类Sync，Sync继承AbstractQueuedSynchronizer</p><p>公平锁和非公平锁的实现都是独占的，调用了AQS的setExclusiveOwnerThread方法，都是排他锁。</p><p>公平锁：线程将按照他们发出请求的顺序来获得锁</p><p>非公平锁：当一个线程请求非公平锁时，如果在发出请求的同时该锁的状态变为可用，那么这个线程将跳过队列中所有的等待线程并获得这个锁</p><div class="hint-container warning"><p class="hint-container-title">公平锁</p><p>对于公平锁，可轮询的tryLock仍然会“插队”</p></div><div class="hint-container info"><p class="hint-container-title">为什么ReentrantLock默认是非公平锁</p><p>非公平模式效率更高，因为非公平模式会在一开始就尝试两次获取锁，如果当时正好state是0，那么它就会成功获取锁，少了排队导致的阻塞/唤醒过程，并且减少了线程频繁的切换带来的性能损耗</p><p>但是非公平锁有可能导致一开始排队的线程一直获取不到锁，导致线程饿死</p></div><h4 id="_2-2-5-synchronized和reentrantlock的选择" tabindex="-1"><a class="header-anchor" href="#_2-2-5-synchronized和reentrantlock的选择" aria-hidden="true">#</a> 2.2.5 <code>synchronized</code>和<code>ReentrantLock</code>的选择</h4><p><strong>功能</strong>上: 优先使用<code>synchronized</code>，如果无法满足需求，需要一些高级功能时使用<code>ReentrantLock</code>,高级功能包括:</p><ul><li><p>可轮询的、可定时的 （tryLock）</p></li><li><p>可中断的锁获取操作 （lockInterruptibly）</p></li><li><p>公平队列 （FairSync）</p></li><li><p>非块结构的锁</p></li></ul><p><strong>性能</strong>上: 优先选择<code>synchronized</code></p><p>因为<code>synchronized</code>是JVM的内置属性，能执行一些优化，例如对线程封闭的锁对象的锁消除优化，通过加锁的粒度来消除内置锁</p>`,26),U={id:"_2-3-读-写锁-reentrantreadwritelock",tabindex:"-1"},X=n("a",{class:"header-anchor",href:"#_2-3-读-写锁-reentrantreadwritelock","aria-hidden":"true"},"#",-1),K={href:"https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/concurrent/locks/ReentrantReadWriteLock.html",target:"_blank",rel:"noopener noreferrer"},P=t(`<p><code>synchronized</code>和<code>ReentrantLock</code>属于排他锁。读-写锁适用于: 一个资源可以被多个读操作访问，或被一个写操作访问，但两者不能同时进行。读-写锁解决了读-读冲突的问题，更适合于读多写少的场景。</p><p>Java中提供了一个接口java.util.concurrent.locks.ReadWriteLock，用于实现读写锁。该接口有两个方法：readLock()和writeLock()，分别返回读锁和写锁。当一个线程请求读锁时，如果没有其他线程持有写锁，则该线程会立即获得读锁，否则它会被阻塞，直到所有持有写锁的线程释放写锁。同样地，当一个线程请求写锁时，如果没有其他线程持有读锁或写锁，则该线程会立即获得写锁，否则它会被阻塞，直到所有持有读锁和写锁的线程都释放它们。</p><p>示例: 用读-写锁来包装Map</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">Map</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span>concurrent<span class="token punctuation">.</span>locks<span class="token punctuation">.</span></span><span class="token class-name">Lock</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span>concurrent<span class="token punctuation">.</span>locks<span class="token punctuation">.</span></span><span class="token class-name">ReadWriteLock</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span>concurrent<span class="token punctuation">.</span>locks<span class="token punctuation">.</span></span><span class="token class-name">ReentrantReadWriteLock</span></span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ReadWriteMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">K</span><span class="token punctuation">,</span> <span class="token class-name">V</span><span class="token punctuation">&gt;</span></span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">Map</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">K</span><span class="token punctuation">,</span> <span class="token class-name">V</span><span class="token punctuation">&gt;</span></span> map<span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">ReadWriteLock</span> lock <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ReentrantReadWriteLock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">Lock</span> r <span class="token operator">=</span> lock<span class="token punctuation">.</span><span class="token function">readLock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">Lock</span> w <span class="token operator">=</span> lock<span class="token punctuation">.</span><span class="token function">writeLock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">ReadWriteMap</span><span class="token punctuation">(</span><span class="token class-name">Map</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">K</span><span class="token punctuation">,</span> <span class="token class-name">V</span><span class="token punctuation">&gt;</span></span> map<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>map <span class="token operator">=</span> map<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">V</span> <span class="token function">put</span><span class="token punctuation">(</span><span class="token class-name">K</span> key<span class="token punctuation">,</span> <span class="token class-name">V</span> val<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 对remove,putAll等方法执行相同的操作</span>
        w<span class="token punctuation">.</span><span class="token function">lock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> map<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> val<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
            w<span class="token punctuation">.</span><span class="token function">unlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">V</span> <span class="token function">get</span><span class="token punctuation">(</span><span class="token class-name">K</span> key<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        r<span class="token punctuation">.</span><span class="token function">lock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> map<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
            r<span class="token punctuation">.</span><span class="token function">unlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,4),Y={id:"_2-4-stampedlock",tabindex:"-1"},G=n("a",{class:"header-anchor",href:"#_2-4-stampedlock","aria-hidden":"true"},"#",-1),Z={href:"https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/concurrent/locks/StampedLock.html",target:"_blank",rel:"noopener noreferrer"},$=t(`<p>StampedLock实现了读写锁的功能，将读锁分为乐观读锁和悲观读锁，不会像ReentrantReadWriteLock发生写饥饿，核心思想: 在读的时候如果发生了写，应该通过重试的方式来获取新的值，而不是阻塞该写操作，适用于读多写少，例如缓存系统、数据库系统。</p><p>StampedLock的内部实现是基于一个整数stamp，它类似于一个版本号，用来标记当前锁的状态。在读操作的时候，线程会获取一个stamp值，并用这个stamp值来判断读操作是否仍然有效；在写操作的时候，线程需要先获取一个独占锁，然后将stamp值+1，以表示读操作无效。这样，在读操作过程中如果发现当前stamp值已经发生变化，那么就需要重新获取读锁，以保证数据的一致性。</p><p>StampedLock提供了三种锁模式，分别是读锁、写锁和乐观锁。</p><p>在读锁模式下，多个线程可以同时读取共享数据，但是写操作会被阻塞；</p><p>在写锁模式下，独占锁被用于保证数据的一致性，所有读写操作都会被阻塞；</p><p>在乐观锁模式下，线程会获取一个stamp值，并尝试读取共享数据，如果读取成功，则返回true，否则需要重新获取锁。</p><p>相比于ReadWriteLock，StampedLock具有以下几个特性：</p><ol><li>更高的并发性能。StampedLock采用了乐观锁的思想，减少了线程阻塞的情况，从而提高了并发性能。</li><li>更低的线程阻塞。StampedLock内部采用了自旋锁的方式，避免了线程阻塞的情况，从而提高了线程的响应速度。</li><li>更好的可扩展性。StampedLock支持多个读线程同时读取共享数据，从而提高了系统的可扩展性。</li><li>更好的数据一致性。StampedLock内部采用了独占锁的方式，保证了数据的一致性，避免了读写冲突的情况。</li></ol><p>代码示例</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span>concurrent<span class="token punctuation">.</span>locks<span class="token punctuation">.</span></span><span class="token class-name">StampedLock</span></span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">StampedLockDemo</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">double</span> x<span class="token punctuation">,</span> y<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">StampedLock</span> lock <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">StampedLock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">move</span><span class="token punctuation">(</span><span class="token keyword">double</span> deltaX<span class="token punctuation">,</span> <span class="token keyword">double</span> deltaY<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 获取写锁</span>
        <span class="token keyword">long</span> stamp <span class="token operator">=</span> lock<span class="token punctuation">.</span><span class="token function">writeLock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            x <span class="token operator">+=</span> deltaX<span class="token punctuation">;</span>
            y <span class="token operator">+=</span> deltaY<span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
            <span class="token comment">// 释放写锁</span>
            lock<span class="token punctuation">.</span><span class="token function">unlockWrite</span><span class="token punctuation">(</span>stamp<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">double</span> <span class="token function">distanceFromOrigin</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 获取乐观读锁</span>
        <span class="token keyword">long</span> stamp <span class="token operator">=</span> lock<span class="token punctuation">.</span><span class="token function">tryOptimisticRead</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">double</span> currentX <span class="token operator">=</span> x<span class="token punctuation">,</span> currentY <span class="token operator">=</span> y<span class="token punctuation">;</span>
        <span class="token comment">// 检查锁是否有效</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>lock<span class="token punctuation">.</span><span class="token function">validate</span><span class="token punctuation">(</span>stamp<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// 获取悲观读锁</span>
            stamp <span class="token operator">=</span> lock<span class="token punctuation">.</span><span class="token function">readLock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">try</span> <span class="token punctuation">{</span>
                currentX <span class="token operator">=</span> x<span class="token punctuation">;</span>
                currentY <span class="token operator">=</span> y<span class="token punctuation">;</span>
            <span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
                <span class="token comment">// 释放悲观读锁</span>
                lock<span class="token punctuation">.</span><span class="token function">unlockRead</span><span class="token punctuation">(</span>stamp<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> <span class="token class-name">Math</span><span class="token punctuation">.</span><span class="token function">sqrt</span><span class="token punctuation">(</span>currentX <span class="token operator">*</span> currentX <span class="token operator">+</span> currentY <span class="token operator">*</span> currentY<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><details class="hint-container details"><summary>在缓存中的应用代码示例</summary><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">HashMap</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">Map</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span>concurrent<span class="token punctuation">.</span>locks<span class="token punctuation">.</span></span><span class="token class-name">StampedLock</span></span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">StampedLockCache</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">K</span><span class="token punctuation">,</span> <span class="token class-name">V</span><span class="token punctuation">&gt;</span></span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">Map</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">K</span><span class="token punctuation">,</span> <span class="token class-name">V</span><span class="token punctuation">&gt;</span></span> cache <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">StampedLock</span> lock <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">StampedLock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">V</span> <span class="token function">get</span><span class="token punctuation">(</span><span class="token class-name">K</span> key<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 尝试获取乐观读锁</span>
        <span class="token keyword">long</span> stamp <span class="token operator">=</span> lock<span class="token punctuation">.</span><span class="token function">tryOptimisticRead</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">V</span> value <span class="token operator">=</span> cache<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 检查锁是否有效</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>lock<span class="token punctuation">.</span><span class="token function">validate</span><span class="token punctuation">(</span>stamp<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// 获取悲观读锁</span>
            stamp <span class="token operator">=</span> lock<span class="token punctuation">.</span><span class="token function">readLock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">try</span> <span class="token punctuation">{</span>
                value <span class="token operator">=</span> cache<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
                <span class="token comment">// 释放悲观读锁</span>
                lock<span class="token punctuation">.</span><span class="token function">unlockRead</span><span class="token punctuation">(</span>stamp<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> value<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">put</span><span class="token punctuation">(</span><span class="token class-name">K</span> key<span class="token punctuation">,</span> <span class="token class-name">V</span> value<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 获取写锁</span>
        <span class="token keyword">long</span> stamp <span class="token operator">=</span> lock<span class="token punctuation">.</span><span class="token function">writeLock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            cache<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> value<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
            <span class="token comment">// 释放写锁</span>
            lock<span class="token punctuation">.</span><span class="token function">unlockWrite</span><span class="token punctuation">(</span>stamp<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">clear</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 获取写锁</span>
        <span class="token keyword">long</span> stamp <span class="token operator">=</span> lock<span class="token punctuation">.</span><span class="token function">writeLock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            cache<span class="token punctuation">.</span><span class="token function">clear</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
            <span class="token comment">// 释放写锁</span>
            lock<span class="token punctuation">.</span><span class="token function">unlockWrite</span><span class="token punctuation">(</span>stamp<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details>`,11),nn={id:"_2-5-condition",tabindex:"-1"},sn=n("a",{class:"header-anchor",href:"#_2-5-condition","aria-hidden":"true"},"#",-1),an={href:"https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/concurrent/locks/Condition.html",target:"_blank",rel:"noopener noreferrer"},en=t(`<p>Java中的Condition是一个与Lock相关联的条件队列，它提供了一种让线程能够等待某个条件成立的机制。在Java中，Condition通常用于解决线程间的协作问题，比如生产者消费者问题等。</p><p>代码示例: 使用Condition的有界缓存</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span>concurrent<span class="token punctuation">.</span>locks<span class="token punctuation">.</span></span><span class="token class-name">Condition</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span>concurrent<span class="token punctuation">.</span>locks<span class="token punctuation">.</span></span><span class="token class-name">Lock</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span>concurrent<span class="token punctuation">.</span>locks<span class="token punctuation">.</span></span><span class="token class-name">ReentrantLock</span></span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ConditionBoundedBuffer</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token keyword">int</span> <span class="token constant">BUFFER_SIZE</span> <span class="token operator">=</span> <span class="token number">1</span> <span class="token operator">&lt;&lt;</span> <span class="token number">10</span><span class="token punctuation">;</span>
    <span class="token keyword">protected</span> <span class="token keyword">final</span> <span class="token class-name">Lock</span> lock <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ReentrantLock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// count &lt; items.length</span>
    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">Condition</span> notFull <span class="token operator">=</span> lock<span class="token punctuation">.</span><span class="token function">newCondition</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// count &gt; 0</span>
    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">Condition</span> notEmpty <span class="token operator">=</span> lock<span class="token punctuation">.</span><span class="token function">newCondition</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">T</span><span class="token punctuation">[</span><span class="token punctuation">]</span> items <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">T</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token keyword">new</span> <span class="token class-name">Object</span><span class="token punctuation">[</span><span class="token constant">BUFFER_SIZE</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">int</span> head<span class="token punctuation">,</span> tail<span class="token punctuation">,</span> count<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">put</span><span class="token punctuation">(</span><span class="token class-name">T</span> x<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">InterruptedException</span> <span class="token punctuation">{</span>
        lock<span class="token punctuation">.</span><span class="token function">lock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            <span class="token keyword">while</span> <span class="token punctuation">(</span>count <span class="token operator">==</span> items<span class="token punctuation">.</span>length<span class="token punctuation">)</span> notFull<span class="token punctuation">.</span><span class="token function">await</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

            items<span class="token punctuation">[</span>tail<span class="token punctuation">]</span> <span class="token operator">=</span> x<span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">++</span>tail <span class="token operator">==</span> items<span class="token punctuation">.</span>length<span class="token punctuation">)</span> tail <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
            <span class="token operator">++</span>count<span class="token punctuation">;</span>

            notEmpty<span class="token punctuation">.</span><span class="token function">signal</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
            lock<span class="token punctuation">.</span><span class="token function">unlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">T</span> <span class="token function">take</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">InterruptedException</span> <span class="token punctuation">{</span>
        lock<span class="token punctuation">.</span><span class="token function">lock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            <span class="token keyword">while</span> <span class="token punctuation">(</span>count <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span> notEmpty<span class="token punctuation">.</span><span class="token function">await</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token class-name">T</span> x <span class="token operator">=</span> items<span class="token punctuation">[</span>head<span class="token punctuation">]</span><span class="token punctuation">;</span>
            items<span class="token punctuation">[</span>head<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">++</span>head <span class="token operator">==</span> items<span class="token punctuation">.</span>length<span class="token punctuation">)</span> head <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
            <span class="token operator">--</span>count<span class="token punctuation">;</span>

            notEmpty<span class="token punctuation">.</span><span class="token function">signal</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> x<span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
            lock<span class="token punctuation">.</span><span class="token function">unlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="hint-container warning"><p class="hint-container-title">特别注意</p><p>在Condition对象中，与wait、notify和notifyAll方法对应的分别是await，signal和signalAll。</p><p>但是Condition对Object进行了扩展，也包含wait、notify和notifyAll。</p></div>`,4),tn={class:"hint-container details"},pn=n("summary",null,"Java分段锁示例",-1),cn={href:"https://juejin.cn/post/6898255397497339912",target:"_blank",rel:"noopener noreferrer"},on=t(`<div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span>concurrent<span class="token punctuation">.</span></span><span class="token class-name">ConcurrentHashMap</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span>concurrent<span class="token punctuation">.</span>locks<span class="token punctuation">.</span></span><span class="token class-name">Lock</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span>concurrent<span class="token punctuation">.</span>locks<span class="token punctuation">.</span></span><span class="token class-name">ReentrantLock</span></span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SegmentedLockExample</span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">ConcurrentHashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Lock</span><span class="token punctuation">&gt;</span></span> locks <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ConcurrentHashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token keyword">void</span> <span class="token function">updateProperty</span><span class="token punctuation">(</span><span class="token class-name">String</span> objectId<span class="token punctuation">,</span> <span class="token class-name">String</span> propertyName<span class="token punctuation">,</span> <span class="token class-name">Object</span> value<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Lock</span> lock <span class="token operator">=</span> <span class="token function">getLock</span><span class="token punctuation">(</span>objectId<span class="token punctuation">)</span><span class="token punctuation">;</span>
        lock<span class="token punctuation">.</span><span class="token function">lock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            <span class="token comment">// 进行修改操作</span>
        <span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
            lock<span class="token punctuation">.</span><span class="token function">unlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">private</span> <span class="token class-name">Lock</span> <span class="token function">getLock</span><span class="token punctuation">(</span><span class="token class-name">String</span> objectId<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Lock</span> lock <span class="token operator">=</span> locks<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>objectId<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>lock <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            locks<span class="token punctuation">.</span><span class="token function">putIfAbsent</span><span class="token punctuation">(</span>objectId<span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">ReentrantLock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            lock <span class="token operator">=</span> locks<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>objectId<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> lock<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1),ln=t(`<hr><h2 id="_3-锁相关的源码分析" tabindex="-1"><a class="header-anchor" href="#_3-锁相关的源码分析" aria-hidden="true">#</a> 3. 锁相关的源码分析</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>jdk/src/java.base/share/classes/java/util/concurrent/locks
├── AbstractOwnableSynchronizer.java
├── AbstractQueuedLongSynchronizer.java
├── AbstractQueuedSynchronizer.java
├── Condition.java
├── Lock.java
├── LockSupport.java
├── ReadWriteLock.java
├── ReentrantLock.java
├── ReentrantReadWriteLock.java
└── StampedLock.java
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,3),un={id:"_3-1-aqs",tabindex:"-1"},dn=n("a",{class:"header-anchor",href:"#_3-1-aqs","aria-hidden":"true"},"#",-1),rn={href:"https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/concurrent/locks/AbstractQueuedSynchronizer.html",target:"_blank",rel:"noopener noreferrer"},kn=t(`<p>AQS是<code>AbstractQueuedSynchronizer</code>的简称，译成抽象队列同步器</p><p>AQS可以用来构建锁和同步器的框架，如ReentrantLock,Semaphore,FutureTash,CountDownLatch等</p><div class="hint-container tip"><p class="hint-container-title">AOS、AQLS</p><p>相关的类有AOS:AbstractOwnableSynchronizer、AQLS: AbstractQueuedLongSynchronizer，AQLS的state是long,AOS是两者的基类</p></div><h4 id="_3-1-1-源码注释中的-overview" tabindex="-1"><a class="header-anchor" href="#_3-1-1-源码注释中的-overview" aria-hidden="true">#</a> 3.1.1 源码注释中的&quot;Overview&quot;</h4><details class="hint-container details"><summary>AQS Overview</summary><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>The wait queue is a variant of a &quot;CLH&quot; (Craig, Landin, and Hagersten) lock queue. 
CLH locks are normally used for spinlocks.
We instead use them for blocking synchronizers by including explicit (&quot;prev&quot; and &quot;next&quot;) links plus a &quot;status&quot; field that allo w nodes to signal successors when releasinglocks, and handle cancellation due to interrupts and timeouts.
The status field includes bits that track whether a thread needs a signal (using LockSupport.unpark). 
Despite these additions, we maintain most CLH locality properties.

等待队列是“CLH”（Craig，Landin和Hagersten）锁队列的一种变体。
CLH锁通常用于自旋锁。
而我们使用它们用于阻塞同步器，包括显式的（“prev”和“next”）链接以及一个“status”字段，允许节点在释放锁时向后继发出信号，并处理由于中断和超时而取消的情况。
状态字段包括跟踪线程是否需要信号（使用LockSupport.unpark）的位。
尽管有这些添加，我们仍然保持大部分CLH局部性质。

To enqueue into a CLH lock, you atomically splice it in as newtail. 
To dequeue, you set the head field, so the next eligible waiter becomes first.

将元素入队到CLH锁中，需要将其作为新的尾节点原子地插入。
要出队，您需要设置头节点，这样下一个可用的等待者就会成为第一个。

  +------+  prev +-------+       +------+
  | head | &lt;---- | first | &lt;---- | tail |
  +------+       +-------+       +------+
  
Insertion into a CLH queue requires only a single atomic operation on &quot;tail&quot;, so there is a simple point of demarcation from unqueued to queued. 
The &quot;next&quot; link of the predecessor is set by the enqueuing thread after successful CAS. 
Even though non-atomic, this suffices to ensure that any blocked thread is signalled by a predecessor when eligible (although in the case of cancellation, possibly with the assistance of a signal in method cleanQueue). 
Signalling is based in part on a Dekker-like scheme in which the to-be waiting thread indicates WAITING status, then retries acquiring, and then rechecks status before blocking. 
The signaller atomically clears WAITING status when unparking.

将元素插入到CLH队列中仅需要对“tail”进行单个原子操作，因此从未排队到已排队有一个简单的分界点。
在成功的CAS操作之后，前置节点的“next”链接由入队线程设置。
即使非原子性，这也足以确保任何被阻塞的线程在符合条件时由前置节点发出信号（尽管在取消的情况下，可能需要在cleanQueue方法中使用信号来协助）。
信号部分基于类似Dekker方案的方案，在该方案中，待等待的线程指示等待状态，然后重试获取，然后在阻塞之前重新检查状态。
发信号者在解除阻塞时原子性地清除WAITING状态。

Dequeuing on acquire involves detaching (nulling) a node&#39;s &quot;prev&quot; node and then updating the &quot;head&quot;. 
Other threads check if a node is or was dequeued by checking &quot;prev&quot; rather than head. 
We enforce the nulling then setting order by spin-waiting if necessary. 
Because of this, the lock algorithm is not itself strictly &quot;lock-free&quot; because an acquiring thread may need to wait for a previous acquire to make progress. 
When used with exclusive locks, such progress is required anyway. 
However Shared mode may (uncommonly) require a spin-wait before setting head field to ensure proper propagation. 
(Historical note: This allows some simplifications and efficiencies compared to previous versions of this class.)

获取时出列涉及分离（清空）节点的“prev”节点，然后更新“head”。
其他线程通过检查“prev”而不是 head 来检查节点是否出队。
如有必要，我们通过自旋等待来强制执行清零然后设置顺序。
因此，锁定算法本身并不是严格意义上的“无锁”，因为获取线程可能需要等待先前的获取才能取得进展。
当与独占锁一起使用时，无论如何都需要这样的进展。
然而，共享模式可能（不常见）需要在设置 head 字段之前进行自旋等待以确保正确传播。
（历史记录：与此类的先前版本相比，这允许一些简化和效率。）

A node&#39;s predecessor can change due to cancellation while it is waiting, until the node is first in queue, at which point it cannot change. 
The acquire methods cope with this by rechecking &quot;prev&quot; before waiting. 
The prev and next fields are modified only via CAS by cancelled nodes in method cleanQueue. 
The unsplice strategy is reminiscent of Michael-Scott queues in that after a successful CAS to prev field, other threads help fix next fields.  
Because cancellation often occurs in bunches that complicate decisions about necessary signals, each call to cleanQueue traverses the queue until a clean sweep. 
Nodes that become relinked as first are unconditionally unparked (sometimes unnecessarily, but those cases are not worth avoiding).

节点的前任节点在等待期间可能会因取消而发生更改，直到该节点位于队列中的第一个节点，此时它不能更改。
acquire 方法通过在等待之前重新检查“prev”来解决这个问题。
prev 和 next 字段只能通过 cleanQueue 方法中取消的节点通过 CAS 进行修改。
unsplice 策略让人想起 Michael-Scott 队列，因为在成功 CAS 到上一个字段之后，其他线程帮助修复下一个字段。
由于取消通常成批发生，这使得有关必要信号的决策变得复杂，因此每次调用 cleanQueue 都会遍历队列，直到彻底清除。
首先重新链接的节点将无条件地取消停放（有时是不必要的，但这些情况不值得避免）。

A thread may try to acquire if it is first (frontmost) in the queue, and sometimes before.  
Being first does not guarantee success; it only gives the right to contend. 
We balance throughput, overhead, and fairness by allowing incoming threads to &quot;barge&quot; and acquire the synchronizer while in the process of enqueuing, in which case an awakened first thread may need to rewait.  
To counteract possible repeated unlucky rewaits, we exponentially increase retries (up to 256) to acquire each time a thread is unparked.
Except in this case, AQS locks do not spin; they instead interleave attempts to acquire with bookkeeping steps. 
(Users who want spinlocks can use tryAcquire.)

如果线程在队列中排在第一位（最前面），有时可能会尝试获取。
成为第一并不能保证成功； 它只赋予竞争的权利。
我们通过允许传入线程在排队过程中“闯入”并获取同步器来平衡吞吐量、开销和公平性，在这种情况下，第一个被唤醒的线程可能需要重新等待。
为了抵消可能重复的不幸重新等待，我们以指数方式增加重试次数（最多 256 次）以获取每次线程未停放的时间。
除了这种情况，AQS 锁不会自旋； 相反，他们将获取的尝试与簿记步骤交织在一起。
（想要自旋锁的用户可以使用 tryAcquire。）

To improve garbage collectibility, fields of nodes not yet on list are null. 
(It is not rare to create and then throw away a node without using it.) 
Fields of nodes coming off the list are nulled out as soon as possible. 
This accentuates the challenge of externally determining the first waiting thread (as in method getFirstQueuedThread). 
This sometimes requires the fallback of traversing backwards from the atomically updated &quot;tail&quot; when fields appear null. (This is never needed in the process of signalling though.)

为了提高垃圾回收能力，尚未在列表中的节点的字段为空。
（创建然后丢弃一个节点而不使用它的情况并不少见。）
离开列表的节点字段将尽快清零。
这突出了从外部确定第一个等待线程的挑战（如在方法 getFirstQueuedThread 中）。
这有时需要在字段显示为空时从原子更新的“尾部”向后遍历的回退。 （尽管在信号发送过程中从来不需要这样做。）

CLH queues need a dummy header node to get started. 
But we don&#39;t create them on construction, because it would be wasted effort if there is never contention. 
Instead, the node is constructed and head and tail pointers are set upon first contention.

CLH 队列需要一个虚拟头节点才能开始。
但是我们不会在构建时创建它们，因为如果永远没有争用，那将是浪费精力。
取而代之的是，构造节点并在第一次争用时设置头指针和尾指针。

Shared mode operations differ from Exclusive in that an acquire signals the next waiter to try to acquire if it is also Shared. 
The tryAcquireShared API allows users to indicate the degree of propagation, but in most applications, it is more efficient to ignore this, allowing the successor to try acquiring in any case.

Shared 模式操作与 Exclusive 的不同之处在于，如果它也是 Shared，则 acquire 会通知下一个服务员尝试获取。
tryAcquireShared API 允许用户指示传播程度，但在大多数应用程序中，忽略这一点效率更高，让后继者在任何情况下都可以尝试获取。

Threads waiting on Conditions use nodes with an additional link to maintain the (FIFO) list of conditions. 
Conditions only need to link nodes in simple (non-concurrent) linked queues because they are only accessed when exclusively held.  
Upon await, a node is inserted into a condition queue.  
Upon signal, the node is enqueued on the main queue.  
A special status field value is used to track and atomically trigger this.

等待条件的线程使用带有附加链接的节点来维护 (FIFO) 条件列表。
条件只需要链接简单（非并发）链接队列中的节点，因为它们仅在独占时才被访问。
在等待时，一个节点被插入到条件队列中。
收到信号后，节点将在主队列中排队。
一个特殊的状态字段值用于跟踪和自动触发它。

Accesses to fields head, tail, and state use full Volatile mode, along with CAS. 
Node fields status, prev and next also do so while threads may be signallable, but sometimes use weaker modes otherwise. 
Accesses to field &quot;waiter&quot; (the thread to be signalled) are always sandwiched between other atomic accesses so are used in Plain mode. 
We use jdk.internal Unsafe versions of atomic access methods rather than VarHandles to avoid potential VM bootstrap issues.

对字段 head、tail 和 state 的访问使用完整的 Volatile 模式以及 CAS。
节点字段 status、prev 和 next 也这样做，而线程可能是可发信号的，但有时使用较弱的模式。
对字段“waiter”（要发出信号的线程）的访问总是夹在其他原子访问之间，因此在普通模式下使用。
我们使用 jdk.internal 原子访问方法的不安全版本而不是 VarHandles 来避免潜在的 VM 引导问题。

Most of the above is performed by primary internal method acquire, that is invoked in some way by all exported acquire methods.  
(It is usually easy for compilers to optimize call-site specializations when heavily used.)

上面的大部分是由主要的内部方法 acquire 执行的，所有导出的 acquire 方法都以某种方式调用它。
（编译器通常很容易在大量使用时优化调用站点特化。）

There are several arbitrary decisions about when and how to check interrupts in both acquire and await before and/or after blocking. 
The decisions are less arbitrary in implementation updates because some users appear to rely on original behaviors in ways that are racy and so (rarely) wrong in general but hard to justify changing.

关于何时以及如何在阻塞之前和/或之后检查 acquire 和 await 中的中断，有几个任意的决定。
这些决定在实施更新中不那么随意，因为一些用户似乎以活泼的方式依赖原始行为，因此（很少）通常是错误的，但很难证明改变是合理的。

Thanks go to Dave Dice, Mark Moir, Victor Luchangco, Bill Scherer and Michael Scott, along with members of JSR-166 expert group, for helpful ideas, discussions, and critiques on the design of this class.

感谢 Dave Dice、Mark Moir、Victor Luchangco、Bill Scherer 和 Michael Scott 以及 JSR-166 专家组的成员，感谢他们对本课程的设计提出了有益的想法、讨论和批评。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><h4 id="_3-1-2-aqs的使用示例" tabindex="-1"><a class="header-anchor" href="#_3-1-2-aqs的使用示例" aria-hidden="true">#</a> 3.1.2 AQS的使用示例</h4><blockquote><p>来自于源码类注释中的Usage Examples</p></blockquote><h5 id="_3-1-2-1-不可重入的互斥锁" tabindex="-1"><a class="header-anchor" href="#_3-1-2-1-不可重入的互斥锁" aria-hidden="true">#</a> 3.1.2.1 不可重入的互斥锁</h5><details class="hint-container details"><summary>Mutex (non-reentrant mutual exclusion lock)</summary><p>Here is a non-reentrant mutual exclusion lock class that uses the value zero to represent the unlocked state, and one to represent the locked state. While a non-reentrant lock does not strictly require recording of the current owner thread, this class does so anyway to make usage easier to monitor. It also supports conditions and exposes some instrumentation methods:</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>io<span class="token punctuation">.</span></span><span class="token class-name">IOException</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>io<span class="token punctuation">.</span></span><span class="token class-name">ObjectInputStream</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>io<span class="token punctuation">.</span></span><span class="token class-name">Serializable</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span>concurrent<span class="token punctuation">.</span></span><span class="token class-name">TimeUnit</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span>concurrent<span class="token punctuation">.</span>locks<span class="token punctuation">.</span></span><span class="token class-name">AbstractQueuedSynchronizer</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span>concurrent<span class="token punctuation">.</span>locks<span class="token punctuation">.</span></span><span class="token class-name">Condition</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span>concurrent<span class="token punctuation">.</span>locks<span class="token punctuation">.</span></span><span class="token class-name">Lock</span></span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Mutex</span> <span class="token keyword">implements</span> <span class="token class-name">Lock</span><span class="token punctuation">,</span> <span class="token class-name">Serializable</span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">class</span> <span class="token class-name">Sync</span> <span class="token keyword">extends</span> <span class="token class-name">AbstractQueuedSynchronizer</span> <span class="token punctuation">{</span>

        <span class="token comment">// Acquires the lock if state is zero</span>
        <span class="token annotation punctuation">@Override</span>
        <span class="token keyword">protected</span> <span class="token keyword">boolean</span> <span class="token function">tryAcquire</span><span class="token punctuation">(</span><span class="token keyword">int</span> acquires<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">assert</span> acquires <span class="token operator">==</span> <span class="token number">1</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">compareAndSetState</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token function">setExclusiveOwnerThread</span><span class="token punctuation">(</span><span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">currentThread</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment">// Releases the lock by setting state to zero</span>
        <span class="token annotation punctuation">@Override</span>
        <span class="token keyword">protected</span> <span class="token keyword">boolean</span> <span class="token function">tryRelease</span><span class="token punctuation">(</span><span class="token keyword">int</span> releases<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">assert</span> releases <span class="token operator">==</span> <span class="token number">1</span><span class="token punctuation">;</span>
            <span class="token comment">// 非独占锁则抛出异常</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token function">isHeldExclusively</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">IllegalMonitorStateException</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token function">setExclusiveOwnerThread</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token function">setState</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">isLocked</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// 状态不为零则持有锁</span>
            <span class="token keyword">return</span> <span class="token function">getState</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">isHeldExclusively</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// 持有锁的线程如果是当前线程则返回true</span>
            <span class="token comment">// a data race, but safe due to out-of-thin-air guarantees</span>
            <span class="token keyword">return</span> <span class="token function">getExclusiveOwnerThread</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">currentThread</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment">// Provides a Condition      </span>
        <span class="token keyword">public</span> <span class="token class-name">Condition</span> <span class="token function">newCondition</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">ConditionObject</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment">// Deserializes properly      </span>
        <span class="token keyword">private</span> <span class="token keyword">void</span> <span class="token function">readObject</span><span class="token punctuation">(</span><span class="token class-name">ObjectInputStream</span> s<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span><span class="token punctuation">,</span> <span class="token class-name">ClassNotFoundException</span> <span class="token punctuation">{</span>
            s<span class="token punctuation">.</span><span class="token function">defaultReadObject</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token function">setState</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// reset to unlocked state      </span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// The sync object does all the hard work. We just forward to it.</span>
    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">Sync</span> sync <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Sync</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">lock</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        sync<span class="token punctuation">.</span><span class="token function">acquire</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">tryLock</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> sync<span class="token punctuation">.</span><span class="token function">tryAcquire</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">tryLock</span><span class="token punctuation">(</span><span class="token keyword">long</span> timeout<span class="token punctuation">,</span> <span class="token class-name">TimeUnit</span> unit<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">InterruptedException</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> sync<span class="token punctuation">.</span><span class="token function">tryAcquireNanos</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> unit<span class="token punctuation">.</span><span class="token function">toNanos</span><span class="token punctuation">(</span>timeout<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>


    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">lockInterruptibly</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">InterruptedException</span> <span class="token punctuation">{</span>
        sync<span class="token punctuation">.</span><span class="token function">acquireInterruptibly</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>


    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">unlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        sync<span class="token punctuation">.</span><span class="token function">release</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>


    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">Condition</span> <span class="token function">newCondition</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> sync<span class="token punctuation">.</span><span class="token function">newCondition</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><p>3.1.2.2 闩锁类 （类似于CountDownLatch，但是只计数1则触发）</p><details class="hint-container details"><summary>BooleanLatch</summary><p>Here is a latch class that is like a CountDownLatch except that it only requires a single signal to fire. Because a latch is non-exclusive, it uses the shared acquire and release methods.</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span>concurrent<span class="token punctuation">.</span>locks<span class="token punctuation">.</span></span><span class="token class-name">AbstractQueuedSynchronizer</span></span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">BooleanLatch</span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">class</span> <span class="token class-name">Sync</span> <span class="token keyword">extends</span> <span class="token class-name">AbstractQueuedSynchronizer</span> <span class="token punctuation">{</span>
        <span class="token keyword">boolean</span> <span class="token function">isSignalled</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token function">getState</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token annotation punctuation">@Override</span>
        <span class="token keyword">protected</span> <span class="token keyword">int</span> <span class="token function">tryAcquireShared</span><span class="token punctuation">(</span><span class="token keyword">int</span> ignore<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token function">isSignalled</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">?</span> <span class="token number">1</span> <span class="token operator">:</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token annotation punctuation">@Override</span>
        <span class="token keyword">protected</span> <span class="token keyword">boolean</span> <span class="token function">tryReleaseShared</span><span class="token punctuation">(</span><span class="token keyword">int</span> ignore<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token function">setState</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">Sync</span> sync <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Sync</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">isSignalled</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> sync<span class="token punctuation">.</span><span class="token function">isSignalled</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">signal</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        sync<span class="token punctuation">.</span><span class="token function">releaseShared</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">await</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">InterruptedException</span> <span class="token punctuation">{</span>
        sync<span class="token punctuation">.</span><span class="token function">acquireSharedInterruptibly</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><h4 id="_3-2-locksupport" tabindex="-1"><a class="header-anchor" href="#_3-2-locksupport" aria-hidden="true">#</a> 3.2 LockSupport</h4><h4 id="_3-3-reentrantlock" tabindex="-1"><a class="header-anchor" href="#_3-3-reentrantlock" aria-hidden="true">#</a> 3.3 ReentrantLock</h4><h4 id="_3-4-reentrantreadwritelock" tabindex="-1"><a class="header-anchor" href="#_3-4-reentrantreadwritelock" aria-hidden="true">#</a> 3.4 ReentrantReadWriteLock</h4><h4 id="_3-5-stampedlock" tabindex="-1"><a class="header-anchor" href="#_3-5-stampedlock" aria-hidden="true">#</a> 3.5 StampedLock</h4><h2 id="_4-死锁" tabindex="-1"><a class="header-anchor" href="#_4-死锁" aria-hidden="true">#</a> 4. 死锁</h2><h2 id="_5-无锁" tabindex="-1"><a class="header-anchor" href="#_5-无锁" aria-hidden="true">#</a> 5. 无锁</h2>`,17);function vn(mn,bn){const a=i("ExternalLinkIcon");return c(),o("div",null,[u,n("div",d,[r,n("p",null,[n("a",k,[s("临界区"),e(a)]),s("指的是某一块在同一时刻只能由一个线程执行的代码区域")])]),v,n("p",null,[s("第一类是用于存储对象自身的运行时数据，如哈希码、GC分代年龄，锁状态标志、线程持有的锁、偏向线程ID、偏向时间戳等，称为"),m,s("。在JDK17中 "),n("a",b,[s("markWord.hpp"),e(a)]),s("中描述如下")]),h,n("div",y,[w,n("p",null,[f,s(" (Java Object Layout) 是分析对象内存布局的工具。详情点击: "),n("a",g,[s("openjdk/jol"),e(a)])])]),_,n("blockquote",null,[n("p",null,[n("a",j,[s("biasedLocking.hpp"),e(a)])])]),x,L,S,n("div",q,[C,n("p",null,[s("偏向锁在Java15中废弃，参考: "),n("a",A,[s("jeps-374"),e(a)])])]),I,n("div",T,[R,n("p",null,[n("a",z,[s("objectMonitor.hpp"),e(a)])]),n("p",null,[n("a",O,[s("objectMonitor.cpp"),e(a)])])]),M,W,E,n("h3",H,[J,s(" 2.1 "),n("a",V,[s("Lock"),e(a)])]),N,n("h3",Q,[B,s(" 2.2 重入锁 "),n("a",D,[s("ReentrantLock"),e(a)])]),F,n("h3",U,[X,s(" 2.3 读-写锁 "),n("a",K,[s("ReentrantReadWriteLock"),e(a)])]),P,n("h3",Y,[G,s(" 2.4 "),n("a",Z,[s("StampedLock"),e(a)])]),$,n("h3",nn,[sn,s(" 2.5 "),n("a",an,[s("Condition"),e(a)])]),en,n("details",tn,[pn,n("blockquote",null,[n("p",null,[n("a",cn,[s("Java 中常见的细粒度锁实现 - 掘金 (juejin.cn)"),e(a)])])]),on]),ln,n("h3",un,[dn,s(" 3.1 "),n("a",rn,[s("AQS"),e(a)])]),kn])}const yn=p(l,[["render",vn],["__file","locks.html.vue"]]);export{yn as default};
