---
icon: lock
tag: [锁,synchronized]
---

# 锁

![](https://s2.loli.net/2023/01/30/bd4GTk58g1HjmUI.png)

---

## 1. 内置锁 `synchronized`

Java提供了内置锁机制来支持原子性、可见性和有序性。

每个Java对象都可以用作一个实现同步的锁，这些锁被称为内置锁（Intrinsic Lock）或监视器锁（Monitor Lock）。线程在进入同步代码块之前会自动获得锁，并且在退出同步代码块时（正常退出或异常退出）自动释放锁。

Java的内置锁相当于一种互斥锁，最多只有一个线程能持有这种锁。当线程A尝试获取一个由线程B持有的锁时，线程A必须等待或阻塞，直到线程B释放这个锁。如果B永远不释放锁，那么A将永远等下去。

### 1.1 `synchronized`的使用

```java
synchronized void method(){
  // 普通同步方法，锁是当前实例对象
}

// 等价于
void method(){
  synchronized(this){
  }
}
```

```java
static synchronized void method(){
  // 静态同步方法，锁是当前类的Class对象
}

// 等价于
void method(){
    synchronized (this.getClass()) {
    }
}
```

```java
Object lock = new Object();
void method(){
  synchronized(lock){
    // 同步方法块，锁是括号里配置的对象
  }
}
```

::: info 临界区

[临界区](https://en.wikipedia.org/wiki/Critical_section)指的是某一块在同一时刻只能由一个线程执行的代码区域

:::

使用`synchronized`确保多线程安全访问共享资源的代码示例
```java
public class SynchronizedExample {
    private int count = 0;

    public synchronized void increment() { count++; }

    public void execute() {
        for (int i = 0; i < 10000; i++) {
            increment();
        }
    }

    public static void main(String[] args) {
        SynchronizedExample example = new SynchronizedExample();

        Thread thread1 = new Thread(() -> {example.execute();});

        Thread thread2 = new Thread(() -> {example.execute();});

        thread1.start();
        thread2.start();

        try {
            thread1.join();
            thread2.join();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        System.out.println("Count: " + example.count);
    }
}
```

### 1.2 对象的内存布局

Java对象在对内存中的存储布局划分为三个部分: 对象头（Object Header）、实例数据（Instance Data）和对齐填充（Padding）。例如:
```
# 这个对象在内存中的总大小是32个字节。
Object Header（8 bytes）    # 对象头占用了8个字节
    Mark Word（4 bytes）
    Class Pointer（4 bytes）
Instance Data（16 bytes）   # 实例数据占用了16个字节
    int field1（4 bytes）   # 由一个int类型
    long field2（8 bytes）  # 一个long类型
    Object Reference field3（4 bytes）  # 个Object类型组成
Padding（8 bytes）					# 为了保证对象在内存中的地址是8的倍数，虚拟机添加了8个字节的填充
```

#### 1.2.1 对象头

HotSpot虚拟机对象的对象头部分包括两类信息:

第一类是用于存储对象自身的运行时数据，如哈希码、GC分代年龄，锁状态标志、线程持有的锁、偏向线程ID、偏向时间戳等，称为**Mark Word**。在JDK17中 [markWord.hpp](https://github.com/openjdk/jdk/blob/jdk-17-ga/src/hotspot/share/oops/markWord.hpp)中描述如下

::: details markWord

 The markWord describes the header of an object.



 Bit-format of an object header (most significant first, big endian layout below):



  32 bits:

  \--------

​             hash:25 ------------>| age:4    biased_lock:1 lock:2 (normal object)

​             JavaThread*:23 epoch:2 age:4    biased_lock:1 lock:2 (biased object)



  64 bits:

  \--------

  unused:25 hash:31 -->| unused_gap:1   age:4    biased_lock:1 lock:2 (normal object)

  JavaThread*:54 epoch:2 unused_gap:1   age:4    biased_lock:1 lock:2 (biased object)



  \- hash contains the identity hash value: largest value is 31 bits, see os::random().  

​    Also, 64-bit vm's require a hash value no bigger than 32 bits because they will not  properly generate a mask larger than that: see library_call.cpp



  \- the biased lock pattern is used to bias a lock toward a given thread. 

​    When this pattern is set in the low three bits, the lock is either biased toward a given thread or "anonymously" biased,

​    indicating that it is possible for it to be biased. 

​    When the lock is biased toward a given thread, locking and unlocking can be performed by that thread without using atomic operations.

​    When a lock's bias is revoked, it reverts back to the normal locking scheme described below.



​    Note that we are overloading the meaning of the "unlocked" state  of the header. 

​    Because we steal a bit from the age we can guarantee that the bias pattern will never be seen for a truly unlocked object.



​    Note also that the biased state contains the age bits normally contained in the object header. 

​    Large increases in scavenge times were seen when these bits were absent and an arbitrary age  assigned to all biased objects, 

​    because they tended to consume a significant fraction of the eden semispaces and were not promoted promptly, 

​    causing an increase in the amount of copying performed. 

​    The runtime system aligns all JavaThread* pointers to a very large value (currently 128 bytes (32bVM) or 256 bytes (64bVM))

​    to make room for the age bits & the epoch bits (used in support of biased locking).



​    [JavaThread* | epoch | age | 1 | 01]       lock is biased toward given thread

​    [0           | epoch | age | 1 | 01]       lock is anonymously biased



  \- the two lock bits are used to describe three states: locked/unlocked and monitor.



​    [ptr             | 00]  locked             ptr points to real header on stack

​    [header      | 0 | 01]  unlocked           regular object header

​    [ptr             | 10]  monitor            inflated lock (header is wapped out)

​    [ptr             | 11]  marked             used to mark an object

​    [0 ............ 0| 00]  inflating          inflation in progress



​    We assume that stack/thread pointers have the lowest two bits cleared.



  \- INFLATING() is a distinguished markword value of all zeros that is  used when inflating an existing stack-lock into an ObjectMonitor.

​    See below for is_being_inflated() and INFLATING().

:::

![图来自: 《深入理解Java虚拟机》13.3 锁优化)](https://s2.loli.net/2023/02/23/OmH3FRYujgBaJ7W.png)

第二类是**类型指针**，即对象指向它的类型原数据的指针，Java虚拟机通过这个指针来确定该对象是哪个类的实例

#### 1.2.2 实例数据

对象真正存储的有效信息，即在程序代码里所定义的各种类型的字段内容

#### 1.2.3 对齐填充

不是必然存在的，没有特别的含义，仅仅起占位符的作用

HotSpot虚拟机的自动内存管理系统要求对象起始地址必须是8字节的整数倍，任何对象的大小都必须是8字节的整数倍，如果对象实例数据部分没有对齐，就需要通过对齐填充来补全

::: info JOL

**JOL** (Java Object Layout) 是分析对象内存布局的工具。详情点击: [openjdk/jol](https://github.com/openjdk/jol)

:::

### 1.3 锁升级

锁升级(或锁膨胀)指的是在多线程并发访问时，根据竞争情况将锁状态逐渐升级，包括: 无锁 -> 偏向锁 -> 轻量级锁 -> 重量级锁。锁可以升级但不能降级(目的是为了提高获得锁和释放锁的效率)

#### 1.3.1 无锁

当一个线程访问一个没有被锁定的对象时，它会尝试使用CAS操作（Compare And Swap）来获取对象的锁。如果CAS操作成功，则表示该线程获得了对象的锁，此时对象处于无锁状态

#### 1.3.2 偏向锁

> [biasedLocking.hpp](https://github.com/openjdk/jdk/blob/jdk-17-ga/src/hotspot/share/runtime/biasedLocking.hpp)

如果一个线程多次访问一个对象，并且其他线程没有竞争该对象的锁，那么该对象会被标记为偏向锁状态。这时，当该线程再次访问该对象时，就不需要CAS操作来获取锁了，而是直接获取该对象的锁。

假设当前虚拟机启动了偏向锁（-XX: +UseBiasedLocking）,那么当锁对象第一次被线程获取的时候，虚拟机将会把对象头中的标志位设置为`01`,把偏向模式设置为`1`,表示进入偏向模式。同时使用CAS操作把获取到这个锁的线程ID记录在对象的MardWord中。如果CAS成功，持有偏向锁的线程以后每次进入这个锁相关的同步块是，虚拟机都可以不再进行任何通过操作(如加锁、解锁和对MarkWord的更新)。

偏向锁在Java6和Java7里是默认启用的(准确的说是Java6到Java14)，但是在应用启动几秒中之后才激活，如有必要可以使用JVM参数来关闭延迟: `-XX:BiasedLockingStartupDelay=0`。如果确定应用程序里所有的锁通常情况下处于竞争状态，可以通过JVM参数关闭偏向锁: `-XX:-UseBiasedLocking=false`，那么程序默认会进入轻量级锁状态。

::: tip 

偏向锁在Java15中废弃，参考: [jeps-374](https://openjdk.org/jeps/374)

:::

#### 1.3.3 轻量级锁

如果一个线程尝试获取一个对象的锁，但该对象已经被另一个线程获取了锁，那么该线程会将对象的锁升级为轻量级锁状态。升级为轻量级锁状态后，该线程会在自己的线程栈中申请一块空间作为锁记录（Lock Record），并将对象的Mark Word指向该锁记录的地址。此时，线程通过CAS操作更新对象的Mark Word，将其指向自己的锁记录，以获取对象的锁。（线程尝试使用CAS将MarkWord替换为只想锁记录的指针，如果成功，当前线程获得锁，如果失败，表示其他线程竞争锁，当前线程便擦灰姑娘是使用自旋来获取锁）

#### 1.3.4 重量级锁

如果一个对象的轻量级锁升级失败，即多个线程竞争同一个锁，那么该锁会升级为重量级锁状态（如轻量级锁自旋达到设定的次数）。重量级锁是一种基于操作系统的锁，它使用操作系统的互斥量来实现锁的竞争，相对于前面的三种锁级别，重量级锁的竞争强度更高，但开销也更大

::: note 锁优化

锁优化还包括 自旋锁与自适应锁、锁消除、锁粗化

:::

### 1.4 原理

`synchronized`的原理是通过对象头的 Mark Word 和操作系统的互斥量实现

在源码中的实现如下：

对于同步代码块,`monitorenter`和`monitorexit`分别对应加锁和解锁操作
```java
synchronized (obj) {
    // synchronized code block
}
```

编译后的字节码
```
0: aload_1
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
```

对于同步方法，使用ACC_SYNCHRONIZED标志来表示该方法是一个同步方法，进入该方法时会自动获取对象监视器（或称为锁），方法执行完成后会自动释放锁。

```java
public synchronized void method() {
    // synchronized method
}
```

编译后的字节码:
```
public synchronized void method();
    descriptor: ()V
    flags: ACC_PUBLIC, ACC_SYNCHRONIZED   // ACC_SYNCHRONIZED标志
    Code:
      stack=0, locals=1, args_size=1
         0: return
      LineNumberTable:
        line 7: 0
```

::: info 在JVM源码中的实现

[objectMonitor.hpp](https://github.com/openjdk/jdk/blob/master/src/hotspot/share/runtime/objectMonitor.hpp)

[objectMonitor.cpp](https://github.com/openjdk/jdk/blob/jdk-17-ga/src/hotspot/share/runtime/objectMonitor.cpp)   

:::



## 2. 显式锁 `Lock`

锁时用来控制多个线程访问共享资源的方式，一般来说一个锁能够防止多个线程同时访问共享资源。
