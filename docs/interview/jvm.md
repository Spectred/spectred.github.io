---
sidebar: 'auto'
sidebarDepth: 1
---

# JVM

![](https://www.oracle.com/webfolder/technetwork/tutorials/obe/java/gc01/images/gcslides/Slide1.png)

> 参考
>
> 1. [Java Garbage Collection Basics](https://www.oracle.com/webfolder/technetwork/tutorials/obe/java/gc01/index.html)
> 2. [深入理解Java虚拟机](https://book.douban.com/subject/34907497/)

## 1. JVM通过可达性分析算法来判断对象是否存活，那么可做为`GC Roots`的对象有哪些?

- 在**虚拟机栈**(栈帧中的局部变量表)中引用的对象，譬如各个线程被调用的堆栈中使用到的参数、局部变量表和临时变量等
- 在**方法区**中类静态属性引用的对象，譬如Java类的引用类型静态变量
- 在**方法区**中常量引用的对象，譬如字符串常量池(`String Table`)里的引用
- 在**本地方法栈**中`JNI`(Native方法)引用的对象
- Java虚拟机内部的引用，如基本数据类型对应的Class对象，常驻的异常对象(NPE,OOM)等，还有系统类加载器
- 所有被同步锁(`synchronized`关键字)持有的对象
- 反映Java虚拟机内部情况的`JMXBean`、`JVMTI`中注册的回调、本地代码缓存等
- 根据用户选择的垃圾收集器以及当前回收的内存区域的不同，“临时性”加入的的其他对象

## 2. Java中有哪些引用类型?

- 强引用: 发生GC时不会被回收。例如:`Object obj = new Object();`
- 软引用: 有用但不是必须的对象，在发生OOM之前会被回收
- 弱引用: 强度比软引用更弱些的非必须得对象，在下一次GC时会被回收
- 虚引用: 为一个对象设置虚引用关联的唯一目的只是为了能在这个对象被收集器回收时收到一个系统通知

## 3. 有哪些垃圾收集算法

主流JVM采用“追踪式垃圾收集”(Tracing GC)，遵循“分代收集”的理论，建立在分代假说之上:

- 弱分代假说: 绝大多数对象都是朝生夕灭的
- 强分代假说: 熬过越多次垃圾收集过程的对象就越难以消亡
- 跨代引用假说: 跨代引用相当于同代引用来说仅占极少数

> 新生代收集（`Minor GC/Young GC`）: 指目标只是新生代的垃圾收集
>
> 老年代收集（`Major GC/Old GC`）: 指目标只是老年代的GC(只有CMS收集器有单独收集的行为)
>
> 混合收集（`Mixed GC`）: 指目标是收集整个新生代以及部分老年代的手机(只有G1有这种行为)
>
> 整堆收集（`Full GC`）: 收集整个Java堆和方法区的垃圾收集

### 3.1 标记-清除算法 (`Mark-Sweep`)

标记: 标记出可以回收的对象(判定对象是否属于垃圾的过程)，清除:  回收被标记的对象所占用的空间 

主要有两个缺点: 

- 一是执行效率不稳定，如果Java堆中包含大量对象，而且其中大部分是需要被回收的，此时必须进行大量标记和清除的动作，导致标记和清除两个过程的执行效率都随对象数量增长而降低
- 二是内存空间的碎片化问题，标记、清除之后会产生大量不连续的内存碎片，空间碎片太多可能会导致当以后再程序运行过程中需要分配较大对象时无法找到足够的连续内存而不得不提前触发另一次垃圾收集动作

### 3.2 标记-复制算法 （`Mark-Copying`）

将内存空间划分为两个相等的区域，每次只使用其中一个区域。垃圾收集时遍历当前使用的区域，把存活对象复制到另一个区域中，最后将当前使用区域对象进行回收。一般用于新生代，`s0`和`s1`

优点: 实现简单，运行高效，不用考虑内存碎片

缺点: 可用的内存大小缩小为原来的一半，对象存活率高是会频繁复制

### 3.3 标记-整理算法 （`Mark-Compact`）

标记: 标记出可以回收的对象，整理: 让所有存活的对象都向内存空间一端移动，然后直接清理掉边界以外的内存。

优点: 解决了标记-清理算法存在的内存碎片问题

缺点: 仍然需要进行局部对象的移动会减低效率

> 关注吞吐量的`Parallel Scavenge`收集器基于标记-整理
>
> 关注延迟的`CMS`基于标记-清除
>
> CMS: 不在内存分配和访问上增加太大额外负担: 平时采用标记-清除，暂时容忍内存碎片，直到碎片化程度已经大到影响对象分配时，再采用一次标记-整理算法收集一次，以获得规整的内存空间。

## 4. HotSpot的算法细节实现

1. 根节点枚举
2. 安全点
3. 安全区域
4. 记忆集与卡表
5. 写屏障
6. 并发的可达性分析

## 5. 有哪些垃圾收集器

各款收集器之间的关系: 

> ParNew + CMS
>
> PS+PO

#### 5.1  `Serial`

复制算法，新生代单线程收集器，标记和清理都是单线程

#### 5.2 `ParNew`

复制算法，新生代并行收集器，是`Serial`的多线程版，可和`CMS`搭配

#### 5.3 `Parallel Scavenge`

复制算法，新生代并行收集器，追求高吞吐量

#### 5.4 `Serial Old`

标记-整理算法，老年代单线程收集器，`Serial`收集器的老年代版本

#### 5.5 `Parallel Old`

标记-整理算法，老年代并行收集器，追求高吞吐量，`Parallel Scavenge`的老年代版本

#### 5.6 `CMS`

> -XX:+UseConcMarkSweepGC

`Concurrent Mark Sweep`是一种以获取最短回收停顿时间为目标的收集器，采用标记-清除算法

##### **运作过程**

1) 初始标记(`CMS initial mark`)

   (STW)标记`GC Roots`能直接关联到的对象

2) 并发标记(`CMS concurrent mark`)

   从`GC Roots`的直接关联对象开始遍历整个对象图的过程，耗时长但是和用户线程并发

3) 重新标记(`CMS remark`)

   (STW)修正并发标记期间因用户线程并发产生变动的部分对象标记记录

4) 并发清除（`CMS concurrent sweep`）

   清理删除标记判断的已经死亡的对象，由于不需要移动存活对象，所以也是并发的

##### 缺点

1. `CMS`收集器对处理器资源敏感

   默认启动回收线程数是(处理器核心数量+3)/4,当处理器核心数小于4时对用户程序的影响变大

2. 由于`CMS`无法处理“浮动垃圾”，有可能出现`Concurrent Mode Failure`失败进而导致另一次完全`STW`的`FullGC`产生

   `CMS`必须预留一部分空间供并发收集时的程序运作，在JDK6时`CMS`的启动阈值是`92%`，如果`CMS`运行期间预留的内存无法满足程序分配新对象的需要，就会出现一次并发失败(`Concurrent Mode Failure`)，此时虚拟机将冻结用户线程的执行，临时启用`Serial Old`来重新进行老年代的垃圾收集，停顿时间加长

   > `-XX:CMSInitiatingOccupoancyFraction`来设置阈值百分比，设置的太高会导致大量的并发失败性能降低，要根据实际情况设置

3. `CMS`是基于标记-清除算法的收集器，会产生大量内存碎片

   当空间碎片过多时，会给大对象分配带来麻烦，不得不提前触发一次`Full GC`，对此`CMS`提供了参数

   `-XX:+UseCMSCompactAtFullCollection`默认开启： 不得不进行`Full GC`时开启内存碎片的合并整理过程

   `-XX:CMSFullGCsBeforeCompaction`(默认值是0）要求`CMS`在执行过程若干次(参数值)不整理空间的`FullGC`后，下一次进入`Full GC`前会先进行碎片整理

#### 5.7 `G1`

Java堆(新生代+老年代)并行收集器，基于标记-整理算法实现

`G1`是基于`Region`的堆内存布局，可以面对内存任何部分来**回收集**（Collection Set,CSet）进行回收，衡量的标准不再是属于哪个分代，而是哪块内存中存放的垃圾数量最多，回收效益最大，是`G1`的`Mixed GC`模式。

`G1`将连续的Java堆划分为多个大小相等的独立的区域`Region`,每一个区域根据需要扮演Eden，Survivor或老年代空间，还有一类特殊的`Humongous`区域用来存储大对象（`G1`认为只要超过了一个区域容量一半的对象即可判定为大对象）

> 每个`Region`的大小可以通过参数`-XX:G1HeapRegionSize`进行设定，取值范围是1MB~32MB,且应为2的N次幂

##### 为什么叫`Garbage First`?

`G1`能建立可预测的停顿时间模型，因为它将区域作为单次回收的最小单元，即每次收集到的内存空间都是`Region`大小的整数倍，可以有计划地避免在整个Java堆中进行全区域的垃圾收集。让`G1`去跟踪各个`Region`里的垃圾堆积的“价值”大小(价值: 回收所获得的空间大小以及回收所需时间的经验值)，然后再后台维护一个优先级列表，每次根据用户设定允许的收集停顿时间(`-XX:MaxGCPauseMills`)指定，默认200ms，**优先处理回收价值收益最大的那些`Region`**

##### Java堆分为多个独立`Region`后，`Region`里面存在的跨`Region`引用的对象如何解决?

使用记忆集避免全堆作为`GC Roots`扫描，`G1`的记忆集在存储结构的本质上是一种哈希表(K: 其他区域的起始地址，V是卡表的索引号的集合)，双向的卡表结构（"我指向谁"，"谁指向我"）

##### 并发标记阶段如何保证收集线程和用户线程互不干扰的运行?

- 用户线程改变对象引用关系是，必须保证不能打破原来的对象图结构，导致标记结果出现错误，`G1`采用原始快照`SATB`算法（`CMS`采用增量更新算法）
- 回收过程汇总新创建对象的内存分配上，`G1`为每一个`Region`设计了两个名为`TAMS`（Top At Mark Start）的指针，把区域中的一部分空间划分出来用于并发回收过程中的新对象的分配，并发回收时新分配的对象地址都必须要在这两个指针以上

##### 怎样建立可靠的停顿预测模型?

停顿预测模型是以**衰减均值**为理论基础实现的，在垃圾收集的过程中，`G1`会记录每个`Region`的回收耗时、每个`Region`记忆集里的张卡数量等各个可测量的步骤花费的成本，并分析得出平均值、标准偏差和置信度等统计信息

##### 运作过程

- **初始标记** (`Initial Marking`)

  只是标记`GC Roots`能直接关联到的对象，并且修改`TAMS`指针的值，让下一阶段用户线程并发运行时，能正确的在可用的区域中分配区域对象

- **并发标记** (`Concurrent Markding`)

  从`GC Roots`开始对堆中对象进行可达性分析，递归扫描整个堆里的对象图，找出要回收的对象，当对象图扫描完成以后，还要重新处理`SATB`记录下的在并发时有引用变动的对象

- **最终标记** (`Final Marking`)

  对用户线程做另一个短暂的暂停，用于处理并发阶段结束后仍遗留下来的少量的`SATB`记录

- **筛选回收** (`Live Data Counting and Evacuation`)

  负责更新`Region`的统计数据，对各个`Region`的回收价值和成本进行排序，根据用户期望的停顿时间来制定回收计划，可以自由选择任意多个`Region`构成回收集，然后把决定回收的那一部分`Region`的存活对象复制到空的`Region`中，再清理掉整个旧`Region`的全部空间，因为需要移动存活对象，必须要暂停用户线程，由多条收集器线程并行执行

#### 5.8 `ZGC`

> `ZGC`收集器是一款基于`Region`内存布局的，不设分代的，使用了读屏障、染色指针和内存多重映射等技术来实现可并发的标记-整理算法的，以低延迟为首要目标的一款垃圾收集器

##### 内存布局

- `Small Region`：容量固定为2MB,存放`(0,256KB)`的小对象
- `Medium Region`: 容量固定为32MB,存放`[256KB,4MB)`的对象
- `Large Region`: 容量不规定，可以动态变化，但必须是2MB的整数倍，用户存放4MB或以上的大对象，每个`Large Region`中只会存放一个大对象，实际最小容量可低至4MB，在`ZGC`的实现中不会被重分配，因为复制一个大对象代价高昂

##### 并发整理算法的实现

采用**染色指针技术**(`Colored Pointeer`)，是一种直接将少量额外的信息存储在指针上的技术，优势有三点:

- 染色指针可以使得一旦某个区域的存活对象被移走后，这个区域立即就能够被释放和重用掉，而不必等待整个堆中所有指向该区域的引用都被修正后才能清理
- 染色指针可以大幅减少在垃圾收集过程中内存屏障的使用数量
- 染色指针可以作为一种可扩展的存储结构用来记录更多与对象标记、重定位过程相关的数据

##### 运作过程

- **并发标记** （`Concurrent Mark`）

  遍历对象图做可达性分析，`ZGC`的标记是在指针上而不是对象上进行，标记阶段会更新染色指针中的`Marked0`、`Marked1`标志位

- **并发预备重分配** (`Concurrent Prepare for Relocate`)

  需要根据特定的查询条件统计得出本次收集过程要清理哪些区域，将这些区域组成**重分配集**(`Relocation Set`)

- **并发重分配** (`Concurrent Relocate`)

  重分配是`ZGC`执行过程中的核心阶段，要把重分配集中的存活对象复制到新的区域上，并位重分配集中的每个区域维护一个**转发表**(`Forward Table`)，记录从旧对象到新对象的转向关系，得益于染色指针的支持

- **并发重映射** (`Concurrent Remap`)

  修正整个堆中指向重分配集中旧对象的所有引用

## 6. 运行时数据区域

### 6.1 程序计数器 (`Program Counter Register`)

线程私有内存，可以看做是当前线程所执行的字节码的行号指示器，分支、循环、跳转、异常处理和线程恢复等基础功能都要依赖计数器完成

如果线程正在执行一个Java方法，则计数器记录的是正在执行的虚拟机字节码指令的地址；

如果正在执行的是一个本地Native方法， 则计数器的值是空(`Undefined`)

此内存区域是唯一一个在《Java虚拟机规范》中没有规定任何OutOfMemmoryError情况的区域

### 6.2 Java虚拟机栈 (`Java Virtual Machine Stack`)

线程私有，生命周期与线程相同

虚拟机栈描述的是Java方法执行的线程内存模型: 每个方法被执行的时候，Java虚拟机都会同步创建一个栈帧(`Stack Frame`)用于存储局部变量表、操作数栈、动态连接和方法出口等信息。每一个方法被调用直至执行完毕的过程，就对应着一个栈帧在虚拟机栈中从入栈到出栈的过程

局部变量表: 存放编译期可知的各种Java虚拟机**基本数据类型**(8种数据类型)、**对象引用**和`returnAddress`类型(指向一条字节码指令的地址)，数据类型在局部变量表中的存储空间以局部变量槽`Slot`来表示

- `OutOfMemoryError`: 如果Java虚拟机栈容量可以动态扩展，当栈扩展时无法申请到足够的内存，会抛出OOM (HotSpot虚拟机的栈容量不可以动态扩展)
- `StackOverflowError`: 如果线程请求的栈深度大于虚拟机所允许的深度，则抛出异常

### 6.3 本地方法栈 (`Native Method Stacks`)

为虚拟机使用到的本地(Native)方法服务

### 6.4 Java堆 (`Java Heap`)

线程共享，在虚拟机启动时创建，此内存区域的唯一目的就是存放对象实例，"几乎"所有的对象实例都在堆中分配内存，物理上可不连续，逻辑上是连续的

由于**即时编译**(`JIT`)和**逃逸分析**，可以**栈上分配**、**标量替换**，所有线程共享的Java堆中可以划分出多个线程私有的分配缓冲区(`TLAB`,Thread Local Allocation Buffer)，以提升对象分配时的效率

#### 6.5 方法区 (`Method Area`)

线程共享，存储已被虚拟机加载的类型信息、常量、静态变量、即使编译期编译后的代码缓存等数据

JDK8前的实现是**永久代**，之后是**元空间**(`Meta Space`)

运行时常量池(`Runtime Constant Pool`)时方法区的一部分，常量池表存在于Class文件中，用于存方编译器生成的各种字面量与符号引用，这部分内容将在类加载后存放到方法区的运行时常量池中

- OutOfMemoryError： 如果方法区无法满足新的内存分配需求时，将抛出OOM

### 6.6 直接内存 (`Direct Memory`)

直接内存不是虚拟机运行时数据区的一部分，也不是虚拟机规范中定义的内存区域，但是也可能导致OOM

可以NIO或Unsafe中使用直接内存，通过Java堆里的`DirectByteBuffer`对象作为直接内存的引用

> **堆和栈的区别**
>
> a. 物理地址: 堆的物理地址分配对象可以不连续，但是逻辑上是连续的，栈的物理地址是连续的
>
> b. 内存大小: 堆分配的内存在**运行期**确认，大小不固定，栈分配的内存在**编译器**确认，大小固定
>
> c. 存放内容: 堆存放对象的实例和数组，栈存放栈帧更关注方法的执行
>
> d. 线程共享: 堆是线程共享的，栈是线程私有的，和线程生命周期相同

## 7. 内存分配策略

1. 对象优先分配在`Eden`区
2. 大对象直接进入到老年代 (避免在Eden和S区复制)
3. 长期存活的对象进入老年代 (对象的年龄，默认15，每次MinorGC年龄加1)
4. 动态对象年龄判定 (如果S区中相同年龄所有对象大小的总和大于S空间的一半，则大于的对象直接进入老年代 )
5. 空间分配担保机制 （检查老年代是否有连续的空间存放大对象，有就进入老年代，没有就FullGC）

## 8. 对象的创建和内存布局

### 8.1 对象的创建

1. 检查常量池中是否能定位到类的符号引用，并检查符号引用代表的类是否已被加载、解析和初始化
2. 如果没有，需要先执行响应的类加载过程
3. 虚拟机为新生对象分配内存 (规整-指针碰撞，不规整-空闲列表)
4. 虚拟机将分配到的内存空间(不包含对象头)都初始化为零值
5. 设置对象头信息(`Object Header`)
6. 开始执行构造函数

### 8.2 对象的内存布局

对象在堆内存中的存储布局可以划分为: 对象头(`Header`)，实例数据(`Instance Data`)，对齐填充(`Padding`)

对象头包含`Mark Word`和类型指针

- `Mark Word` 

  存储对象自身的运行时数据，如哈希码、GC分代年龄、锁状态标志、线程持有的锁、偏向线程ID和偏向时间戳等

- 类型指针

  对象指向它的类型元数据的指针，Java虚拟机通过这个指针来确定该对象是哪个类的实例 

## 9. OOM有哪些情况，频繁Full GC有哪些可能的原因，如何解决

### 9.1 OOM有哪些情况

1. Java堆溢出: 随着对象数量的增加，总容量触及最大堆的容量限制后产生内存溢出异常

   首先通过MAT堆dump出来的堆转储快照进行分析，区分是内存泄露(`Memory Leak`)还是内存溢出(`Memory Overflow`)

   如果是内存泄露，进一步通过工具查看泄露对象到`GC Roots`的引用链，找到泄露对象是通过怎样的引用路径、与哪些`GC Roots`相关联

   如果是内存溢出，则需要查看堆参数(`-Xms` 、`-Xmx`)的设置是否合理是否有调整空间，再从代码检查对象的状态， 尽量减少运行期的内存消耗

2. 栈溢出: `-Xss`

3. 方法区和运行时常量池溢出

   经常运行时生成大量动态类的应用场景里可能出现，例如GCLib字节码增强，JSP,基于OSGi的应用

   相关参数: `-XX:MaxMetaspaceSize`,`-XX:MetaspaceSize`

4. 本机直接内存溢出

   `-XX:MaxDirectMemorySize`,默认和`-Xmx`一致

### 9.2 频繁Full GC有哪些可能的原因，如何解决

频繁`Full GC`的表现: CPU负载过高，整个应用卡慢，通过`jstat -gcutil pid n m`发现`FGC`次数过多

- 显式调用`System.gc()` - 要注意代码规范和添加VM参数禁止
- 系统并发高，执行耗时长，导致`ygc`频繁，对象快如进入老年代迅速打满
- 一次性加载过多对象或大对象到堆内存，或者是内存泄露
- 方法区加载类太多
- 堆外内存是用不当
- 线程池使用不当

**定位和解决**

下载GC日志，通过如GCEasy等工具分析GC

Dump堆日志，通过MAT或JProfiler或Java自带的工具分析

## 10. JVM有哪些工具，常用的VM参数有哪些

### 10.1 基础故障处理工具

- `jps`: 虚拟机进程状况 

- `jstat`: 虚拟机统计信息监视工具 

  `jstat -gcutil pid n m`

- `jinfo`: Java配置信息工具 

- `jmap`: Java内存映像工具 

  `jmap -dump:format=b,file=/path/to/file pid`

- `jhat`: 虚拟机堆转储快照分析 

- `jstack`: Java堆栈跟踪工具 

  `jstack -l pid`

### 10.2 可视化故障处理工具

- `JConsole`
- `Visul VM`
- `MAT`
- `JProfiler`
- `JFR`、`JMC`
- `GC Easy`

### 10.3 常用的VM参数

1. 堆栈内存

   如 `-Xms`,`-Xmx`,`-Xss`

2. GC相关

   指定了哪款垃圾收集器，收集器的参数

3. 辅助信息

   如打印GC日志的格式，存储位置，OOM时dump内存或退出程序

## 11. 类加载过程，类加载器有哪些，如何打破双亲委派机制

### 11.1 类加载的过程

1. **加载**

   通过一个类的权限定名来获取定义此类的二进制字节流，将这个字节流所带标的静态存储结构转化为方法区的运行时数据结构，在内存中生成一个代表这个类的`java.lang.Class`对象，作为方法区这个类的各种数据入口

2. **连接**

   - **验证**: 文件格式验证、元数据验证、字节码验证、符号引用验证
   - **准备**: 为类中定义的变量(静态变量，被`static`修饰的变量)分配内存并设置类变量初始值
   - **解析**: Java虚拟机将常量池内符号引用替换为直接引用的过程，包括类或接口的解析，字段解析和方法解析

3. **初始化**

   通过程序编码指定的主观计划区初始化类变量和其他资源，例如构造器
### 11.2 类加载器有哪些

- `Bootstrap Class Loader`

  加载存放在`<JAVA_HOME>/lib`目录或者被`-Xbootclasspath`参数指定的路径中存放的，如`rt.jar`,`toos.jar`

- `Extension Class Loader`

  加载`<JAVA_HOME>/lib/ext`目录中或者被`java.ext.dirs`系统变量指定路径下的类库

- `Application Class Loader`

  加载用户类路径(`ClassPath`)上的所有类库

- `User Class Loader`

  用户自定义类加载器

### 11.3 双亲委派机制是什么，如何打破

双亲委派模型的工作过程: 如果一个类加载器收到了类加载的请求，它首先不会自己去尝试加载这个类，而是把请求委派给父加载器去完成，只有当父加载器无法完成加载请求时，子加载器才会尝试自己去完成加载

**破坏双亲委派**

> Tomcat , OSGi 都破坏了双亲委派

**OSGi**实现模块化热部署的关键是它自定义的类加载器机制的实现，每一个程序模块(Bundle)都有一个自己的类加载器，当需要更换一个Bundle是，就把Bundle连同类加载器一起换掉以实现代码的热替换，在OSGi环境下，类加载器不再是双亲委派模型的梳妆各机构，而是更复杂的网状结构

**Tomcat**: 假如在Tomcat的webapps下部署两个不同版本的应用，在不同版本中的类内容是不同的，在Tomcat中定义了Commons类加载器，Catalina类加载器，Shared类加载器，WebApp类加载器，类加载过程如下:

- 首先从Bootstrap Class Loader加载指定的类
- 如果未加载到，则从`/WEB-INF/classes`加载
- 如果未加载到，则从`/WEB-INFO/lib/*.jar`加载
- 如果未加载到，则依次从System、Commons、Shared加载

## 12. 记录一次JVM问题的排查过程

问题现象: CPU变高，更准确的说是随着一个HTTP请求的执行而变高

排查过程:

1. `top`,使用`shift+p`查看CPU最高的进程(Java进程),得到进程号`18619`(示例)![](https://raw.githubusercontent.com/Spectred/pictures/main/spectred.github.io/docs/interview/jvm/top.png)
2. `top -Hp 18169` 查看占用CPU高的线程![](https://raw.githubusercontent.com/Spectred/pictures/main/spectred.github.io/docs/interview/jvm/top_hp.png)
3. `jstack 18619 >> temp.txt`，dump一份stack文件，将线程`18633`转换为16进制Hex: 48c9，发现是GC线程![](https://raw.githubusercontent.com/Spectred/pictures/main/spectred.github.io/docs/interview/jvm/jstack.png)
4. `jstat -gcutil 18619 1000`  查看进程的gc状况,在频繁的FGC![](https://raw.githubusercontent.com/Spectred/pictures/main/spectred.github.io/docs/interview/jvm/jstat.png)

5. `jmap -dump:format=b,file=/path/to/dump 18619` dump一份内存快照heap_dump.hprof
6. 下载快照，并用MAT打开![](https://raw.githubusercontent.com/Spectred/pictures/main/spectred.github.io/docs/interview/jvm/mat.png)

7. 找到占用最大的对象，来源于一次SQL查询，返回的数据量很大，导致大对象，频繁full gc
