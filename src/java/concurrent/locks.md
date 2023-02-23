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

::: info markWord

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

第二类是**类型指针**，即对象指向它的类型原数据的指针，Java虚拟机通过这个指针来确定该对象是哪个类的实例

#### 1.2.2 实例数据

对象真正存储的有效信息，即在程序代码里所定义的各种类型的字段内容

#### 1.2.3 对齐填充

不是必然存在的，没有特别的含义，仅仅起占位符的作用

HotSpot虚拟机的自动内存管理系统要求对象起始地址必须是8字节的整数倍，任何对象的大小都必须是8字节的整数倍，如果对象实例数据部分没有对齐，就需要通过对齐填充来补全

### 1.3 锁升级

### 1.4 原理

[objectMonitor.cpp](https://github.com/openjdk/jdk/blob/jdk-17-ga/src/hotspot/share/runtime/objectMonitor.cpp)

[objectMonitor](https://github.com/openjdk/jdk/blob/master/src/hotspot/share/runtime/objectMonitor.hpp)

## 2. 显示锁 `Lock	`
