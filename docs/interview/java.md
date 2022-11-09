---
sidebar: 'auto'
sidebarDepth: 1
---
# Java

> [Java Documentation](https://docs.oracle.com/en/java/)
>
> [OpenJDK](https://openjdk.org)
>
> [深入理解Java虚拟机](https://book.douban.com/subject/34907497/)

## 1. 如何保证线程安全

> 线程安全：当多个线程同时访问一个对象时，如果不用考虑这些线程在运行时环境下的调度和交替执行，也不需要进行额外的同步，或者在调用方进行任何其他的协调操作，调用这个对象的行为都可以获得正确的结果，那就称这个对象是线程安全的

### 1.1 互斥同步(阻塞同步)

1. `synchronized`

2. `Lock`: 例如`ReentrantLock`

> `synchronized`和`ReentrantLock`的区别:
>
> - `synchronized`是在Java语法层面的同步，`ReentrantLock`是Java语言层面，释放锁要确保在`finally`块中释放锁
>
> - 性能上差不太多，但是两者都可满足需要时优先使用`synchronized`
>
> - `ReentrantLock`相比`synchronized`相比增加了一些高级功能: 
>
> **等待可中断**: 当持有锁的线程长期不释放锁的时候，正在等待的线程可以选择放弃等待，改为处理其他事情
>
> **公平锁**: 多个线程在等待同一个锁时，必须按照申请锁的时间顺序来一次获得锁,`ReentrantLock`使用公平锁将会导致性能下降
>
> **锁绑定多个条件**: 一个`ReentrantLock`对象可以同时绑定多个`Condition`对象,需要多次调用`newCondition()`，`synchronized`需要额外添加锁

### 1.2 无锁编程(非阻塞同步)

> 不管风险，先进行操作，如果没有其他线程争用共享数据，那操作就直接成功；如果共享的数据被争用产生了冲突，最常用的补偿措施是不断地重试，直到出现没有竞争的共享数据为止

基于`CAS`的操作：

- 使用`Unsafe.compareAndSet`方法，
- 基于`CAS`的`j.u.c`包中的原子类（`AtomicInteger`等）
- 使用`j.u.c`中的线程安全的并发集合,如`ConcurrentHashMap`、`ConcurrentSkipListMap`、`CopyOnWriteArrayList`

> `CAS`操作的`ABA`问题
>
> 如果一个变量V初次读取的时候是A值，其他线程把它修改为B,又修改回为A,那`CAS`操作就会误认为它从来没有修改过
>
> 如何解决: 使用版本或者时间戳，例如`AtomicStampedReference`,但是大部分情况下ABA问题不会影响程序并发的正确性，如果需要解决，传统的互斥同步可能会比原子类更高效

### 1.3 无同步方案

> 同步与线程安全两者没有必然的联系

线程本地存储： 通过`ThreadLocal`实现

> 每一个线程的`Thread`对象中都有一个`ThreadLocalMap`对象，这个对象存储了一组以`ThreadLocal.threadLocalHashCode`为键，以本地线程变量为值的`K-V`键值对，`ThreadLocal`就是当前线程的`ThreadLocalMap`的访问入口，每一个`ThreadLocal`对象都包含一个唯一的`threadLocalHashCode`值，使用这个值就可以在线程`K-V`值对中找回对应的本地线程变量

## 2. `Unsafe`如果获取，能做哪些操作

> https://spectred.github.io/java/magic/unsafe.html

可以通过反射来获取`Unsafe`实例，可以实例化一个类、修改私有属性值、`CAS`操作、使用堆外内存和锁的`park/unpark`操作

## 3. `lambda`是如何实现的

> [Lambda 底层实现分析](https://developer.aliyun.com/article/712461)
>
> [Java Lambdas : How it works in JVM & is it OOP?](https://stackoverflow.com/questions/29143803/java-lambdas-how-it-works-in-jvm-is-it-oop)	
>
> [Java 8 Lambdas - A Peek Under the Hood](https://www.infoq.com/articles/Java-8-Lambdas-A-Peek-Under-the-Hood/)

`lambda`引导方法动态生成一个匿名类字节码



































   

