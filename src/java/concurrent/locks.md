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

Java中提供了: `java.util.concurrent.locks.Lock`接口作为显式锁，与内置加锁机制不同的是，Lock提供了一种无条件的、可轮询的、定时的以及可中断的锁获取操作，所有加锁和解锁方法都是显式的、在Lock的实现中必须提供与内部锁相同的内存可见性语义，但在加锁语义、调度算法和顺序保证以及性能特性等方面可以有所不同。

### 2.1 [Lock](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/concurrent/locks/Lock.html)

#### 2.1.1 Lock的使用方式:

```java
Lock l = ...;  
l.lock();  
try {    
  // access the resource protected by this lock  
} finally {    
  l.unlock();  
}
```

::: tip 注意

在`finally`中释放锁，保证在获取锁之后，最终能够被释放

不要将获取锁的过程写在`try`中，因为如果在获取锁(自定义锁的实现)时发生了异常，抛出异常的同时也会导致锁无故释放

:::

#### 2.1.2 Lock比`synchronized`提供了更多的功能性: 

- `tryLock()`:  非阻塞尝试获取锁
- `tryLock(long, TimeUnit)`: 可超时尝试获取锁
- `lockInterruptibly()`: 可中断尝试获取锁

#### 2.1.3 Lock的API

```JAVA
public interface Lock {

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
     * <p>
     * 典型用法:
     * <pre> {@code
     * Lock lock = ...;
     * if (lock.tryLock()) {
     *   try {
     *     // manipulate protected state
     *   } finally {
     *     lock.unlock();
     *   }
     * } else {
     *   // perform alternative actions
     * }}</pre>
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
```

### 2.2 重入锁 [ReentrantLock](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/concurrent/locks/ReentrantLock.html)

ReentrantLock，重入锁，表示该锁能够支持一个线程对资源的重复加锁，任意线程在获取锁之后能够再次获取该锁而不会被锁阻塞，该特性的实现需要解决以下两个问题

1. 线程再次获取锁

   锁需要去识别获取锁的线程是否为当前占据锁的线程，如果是则再次成功获取

2. 锁的最终释放

   线程重复n次获取锁，随后在第n次释放该锁后，其他线程能够获取该锁

#### 2.2.1 轮询锁与定时锁

轮询锁和定时锁的获取模式是由`tryLock`方法实现。

正确的使用可以避免死锁的发生: 如果不能获得所有需要的锁，那么可以使用可定时的或可轮询的锁获取方式，从而是的重新获得控制权，它会释放已经获得的锁，然后重新尝试获取所有锁。

定时锁的实例: 带有时间限制的加锁

```java
ReentrantLock lock = new ReentrantLock();
try {
    if (lock.tryLock(1000, TimeUnit.MILLISECONDS)) { // 尝试获取锁，等待1秒
        // 获取锁成功后的代码逻辑
    } else {
        // 获取锁失败后的处理逻辑
    }
} catch (InterruptedException e) {
    // 处理线程中断异常
} finally {
    lock.unlock(); // 释放锁
}
```

#### 2.2.2 可中断的锁获取操作

可中断的锁获取操作能在可取消的操作中使用加锁，`lockInterruptibly()`方法能够在获得锁的同时保持对中断的响应，并且由于它包含在Lock中，因此无需创建其他类型的不可中断阻塞机制。

```java
ReentrantLock lock = new ReentrantLock();
try {
    lock.lockInterruptibly(); // 尝试获取锁，并响应线程的中断请求
    // 获取锁成功后的代码逻辑
} catch (InterruptedException e) {
    // 处理线程中断异常
} finally {
    lock.unlock(); // 释放锁
}
```

#### 2.2.3 非块结构的加锁

内置锁是对一个块结构进行加锁，ReentrantLock是非块结构进行加锁

#### 2.2.4 公平性

可以通过构造函数传参来决定ReentrantLock的公平性，默认是非公平锁

```java
    public ReentrantLock(boolean fair) {
        sync = fair ? new FairSync() : new NonfairSync();
    }
```

其中FairSync和NonfairSync都继承自内部类Sync，Sync继承AbstractQueuedSynchronizer

公平锁和非公平锁的实现都是独占的，调用了AQS的setExclusiveOwnerThread方法，都是排他锁。

公平锁：线程将按照他们发出请求的顺序来获得锁

非公平锁：当一个线程请求非公平锁时，如果在发出请求的同时该锁的状态变为可用，那么这个线程将跳过队列中所有的等待线程并获得这个锁

::: warning 公平锁

对于公平锁，可轮询的tryLock仍然会“插队”

:::

::: info 为什么ReentrantLock默认是非公平锁

非公平模式效率更高，因为非公平模式会在一开始就尝试两次获取锁，如果当时正好state是0，那么它就会成功获取锁，少了排队导致的阻塞/唤醒过程，并且减少了线程频繁的切换带来的性能损耗

但是非公平锁有可能导致一开始排队的线程一直获取不到锁，导致线程饿死

:::

#### 2.2.5 `synchronized`和`ReentrantLock`的选择

**功能**上: 优先使用`synchronized`，如果无法满足需求，需要一些高级功能时使用`ReentrantLock`,高级功能包括:

- 可轮询的、可定时的 （tryLock）

- 可中断的锁获取操作 （lockInterruptibly）

- 公平队列 （FairSync）

- 非块结构的锁

**性能**上: 优先选择`synchronized`

因为`synchronized`是JVM的内置属性，能执行一些优化，例如对线程封闭的锁对象的锁消除优化，通过加锁的粒度来消除内置锁

### 2.3 读-写锁 [ReentrantReadWriteLock](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/concurrent/locks/ReentrantReadWriteLock.html)

`synchronized`和`ReentrantLock`属于排他锁。读-写锁适用于: 一个资源可以被多个读操作访问，或被一个写操作访问，但两者不能同时进行。读-写锁解决了读-读冲突的问题，更适合于读多写少的场景。

Java中提供了一个接口java.util.concurrent.locks.ReadWriteLock，用于实现读写锁。该接口有两个方法：readLock()和writeLock()，分别返回读锁和写锁。当一个线程请求读锁时，如果没有其他线程持有写锁，则该线程会立即获得读锁，否则它会被阻塞，直到所有持有写锁的线程释放写锁。同样地，当一个线程请求写锁时，如果没有其他线程持有读锁或写锁，则该线程会立即获得写锁，否则它会被阻塞，直到所有持有读锁和写锁的线程都释放它们。

示例: 用读-写锁来包装Map

```java
import java.util.Map;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReadWriteLock;
import java.util.concurrent.locks.ReentrantReadWriteLock;

public class ReadWriteMap<K, V> {

    private final Map<K, V> map;

    private final ReadWriteLock lock = new ReentrantReadWriteLock();

    private final Lock r = lock.readLock();

    private final Lock w = lock.writeLock();

    public ReadWriteMap(Map<K, V> map) {
        this.map = map;
    }

    public V put(K key, V val) {
        // 对remove,putAll等方法执行相同的操作
        w.lock();
        try {
            return map.put(key, val);
        } finally {
            w.unlock();
        }
    }

    public V get(K key) {
        r.lock();
        try {
            return map.get(key);
        } finally {
            r.unlock();
        }
    }
}
```

### 2.4 [StampedLock](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/concurrent/locks/StampedLock.html)

StampedLock实现了读写锁的功能，将读锁分为乐观读锁和悲观读锁，不会像ReentrantReadWriteLock发生写饥饿，核心思想: 在读的时候如果发生了写，应该通过重试的方式来获取新的值，而不是阻塞该写操作，适用于读多写少，例如缓存系统、数据库系统。

StampedLock的内部实现是基于一个整数stamp，它类似于一个版本号，用来标记当前锁的状态。在读操作的时候，线程会获取一个stamp值，并用这个stamp值来判断读操作是否仍然有效；在写操作的时候，线程需要先获取一个独占锁，然后将stamp值+1，以表示读操作无效。这样，在读操作过程中如果发现当前stamp值已经发生变化，那么就需要重新获取读锁，以保证数据的一致性。

StampedLock提供了三种锁模式，分别是读锁、写锁和乐观锁。

在读锁模式下，多个线程可以同时读取共享数据，但是写操作会被阻塞；

在写锁模式下，独占锁被用于保证数据的一致性，所有读写操作都会被阻塞；

在乐观锁模式下，线程会获取一个stamp值，并尝试读取共享数据，如果读取成功，则返回true，否则需要重新获取锁。

相比于ReadWriteLock，StampedLock具有以下几个特性：

1. 更高的并发性能。StampedLock采用了乐观锁的思想，减少了线程阻塞的情况，从而提高了并发性能。
2. 更低的线程阻塞。StampedLock内部采用了自旋锁的方式，避免了线程阻塞的情况，从而提高了线程的响应速度。
3. 更好的可扩展性。StampedLock支持多个读线程同时读取共享数据，从而提高了系统的可扩展性。
4. 更好的数据一致性。StampedLock内部采用了独占锁的方式，保证了数据的一致性，避免了读写冲突的情况。

代码示例

```java
import java.util.concurrent.locks.StampedLock;

public class StampedLockDemo {
    private double x, y;
    private final StampedLock lock = new StampedLock();

    public void move(double deltaX, double deltaY) {
        // 获取写锁
        long stamp = lock.writeLock();
        try {
            x += deltaX;
            y += deltaY;
        } finally {
            // 释放写锁
            lock.unlockWrite(stamp);
        }
    }

    public double distanceFromOrigin() {
        // 获取乐观读锁
        long stamp = lock.tryOptimisticRead();
        double currentX = x, currentY = y;
        // 检查锁是否有效
        if (!lock.validate(stamp)) {
            // 获取悲观读锁
            stamp = lock.readLock();
            try {
                currentX = x;
                currentY = y;
            } finally {
                // 释放悲观读锁
                lock.unlockRead(stamp);
            }
        }
        return Math.sqrt(currentX * currentX + currentY * currentY);
    }
}
```

::: details 在缓存中的应用代码示例
```java
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.locks.StampedLock;

public class StampedLockCache<K, V> {
    private final Map<K, V> cache = new HashMap<>();
    private final StampedLock lock = new StampedLock();

    public V get(K key) {
        // 尝试获取乐观读锁
        long stamp = lock.tryOptimisticRead();
        V value = cache.get(key);
        // 检查锁是否有效
        if (!lock.validate(stamp)) {
            // 获取悲观读锁
            stamp = lock.readLock();
            try {
                value = cache.get(key);
            } finally {
                // 释放悲观读锁
                lock.unlockRead(stamp);
            }
        }
        return value;
    }

    public void put(K key, V value) {
        // 获取写锁
        long stamp = lock.writeLock();
        try {
            cache.put(key, value);
        } finally {
            // 释放写锁
            lock.unlockWrite(stamp);
        }
    }

    public void clear() {
        // 获取写锁
        long stamp = lock.writeLock();
        try {
            cache.clear();
        } finally {
            // 释放写锁
            lock.unlockWrite(stamp);
        }
    }
}
```

:::

### 2.5 [Condition](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/concurrent/locks/Condition.html)

Java中的Condition是一个与Lock相关联的条件队列，它提供了一种让线程能够等待某个条件成立的机制。在Java中，Condition通常用于解决线程间的协作问题，比如生产者消费者问题等。

代码示例: 使用Condition的有界缓存
```java
import java.util.concurrent.locks.Condition;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

public class ConditionBoundedBuffer<T> {

    private static final int BUFFER_SIZE = 1 << 10;
    protected final Lock lock = new ReentrantLock();
    // count < items.length
    private final Condition notFull = lock.newCondition();
    // count > 0
    private final Condition notEmpty = lock.newCondition();

    private final T[] items = (T[]) new Object[BUFFER_SIZE];
    private int head, tail, count;

    public void put(T x) throws InterruptedException {
        lock.lock();
        try {
            while (count == items.length) notFull.await();

            items[tail] = x;
            if (++tail == items.length) tail = 0;
            ++count;

            notEmpty.signal();
        } finally {
            lock.unlock();
        }
    }

    public T take() throws InterruptedException {
        lock.lock();
        try {
            while (count == 0) notEmpty.await();

            T x = items[head];
            items[head] = null;
            if (++head == items.length) head = 0;
            --count;

            notEmpty.signal();
            return x;
        } finally {
            lock.unlock();
        }
    }
}
```

::: warning 特别注意

在Condition对象中，与wait、notify和notifyAll方法对应的分别是await，signal和signalAll。

但是Condition对Object进行了扩展，也包含wait、notify和notifyAll。

:::



::: details Java分段锁示例

> [Java 中常见的细粒度锁实现 - 掘金 (juejin.cn)](https://juejin.cn/post/6898255397497339912)

```java
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

public class SegmentedLockExample {

    private final ConcurrentHashMap<String, Lock> locks = new ConcurrentHashMap<>();

    private void updateProperty(String objectId, String propertyName, Object value) {
        Lock lock = getLock(objectId);
        lock.lock();
        try {
            // 进行修改操作
        } finally {
            lock.unlock();
        }
    }

    private Lock getLock(String objectId) {
        Lock lock = locks.get(objectId);
        if (lock == null) {
            locks.putIfAbsent(objectId, new ReentrantLock());
            lock = locks.get(objectId);
        }
        return lock;
    }
}
```

:::

---

## 3. 锁相关的源码分析

```
jdk/src/java.base/share/classes/java/util/concurrent/locks
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
```

### 3.1 [AQS](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/concurrent/locks/AbstractQueuedSynchronizer.html)

AQS是`AbstractQueuedSynchronizer`的简称，译成抽象队列同步器

AQS可以用来构建锁和同步器的框架，如ReentrantLock,Semaphore,FutureTash,CountDownLatch等

::: tip AOS、AQLS

相关的类有AOS:AbstractOwnableSynchronizer、AQLS: AbstractQueuedLongSynchronizer，AQLS的state是long,AOS是两者的基类

::: 

#### 3.1.1 源码注释中的"Overview"

::: details AQS Overview
```
The wait queue is a variant of a "CLH" (Craig, Landin, and Hagersten) lock queue. 
CLH locks are normally used for spinlocks.
We instead use them for blocking synchronizers by including explicit ("prev" and "next") links plus a "status" field that allo w nodes to signal successors when releasinglocks, and handle cancellation due to interrupts and timeouts.
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
  | head | <---- | first | <---- | tail |
  +------+       +-------+       +------+
  
Insertion into a CLH queue requires only a single atomic operation on "tail", so there is a simple point of demarcation from unqueued to queued. 
The "next" link of the predecessor is set by the enqueuing thread after successful CAS. 
Even though non-atomic, this suffices to ensure that any blocked thread is signalled by a predecessor when eligible (although in the case of cancellation, possibly with the assistance of a signal in method cleanQueue). 
Signalling is based in part on a Dekker-like scheme in which the to-be waiting thread indicates WAITING status, then retries acquiring, and then rechecks status before blocking. 
The signaller atomically clears WAITING status when unparking.

将元素插入到CLH队列中仅需要对“tail”进行单个原子操作，因此从未排队到已排队有一个简单的分界点。
在成功的CAS操作之后，前置节点的“next”链接由入队线程设置。
即使非原子性，这也足以确保任何被阻塞的线程在符合条件时由前置节点发出信号（尽管在取消的情况下，可能需要在cleanQueue方法中使用信号来协助）。
信号部分基于类似Dekker方案的方案，在该方案中，待等待的线程指示等待状态，然后重试获取，然后在阻塞之前重新检查状态。
发信号者在解除阻塞时原子性地清除WAITING状态。

Dequeuing on acquire involves detaching (nulling) a node's "prev" node and then updating the "head". 
Other threads check if a node is or was dequeued by checking "prev" rather than head. 
We enforce the nulling then setting order by spin-waiting if necessary. 
Because of this, the lock algorithm is not itself strictly "lock-free" because an acquiring thread may need to wait for a previous acquire to make progress. 
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

A node's predecessor can change due to cancellation while it is waiting, until the node is first in queue, at which point it cannot change. 
The acquire methods cope with this by rechecking "prev" before waiting. 
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
We balance throughput, overhead, and fairness by allowing incoming threads to "barge" and acquire the synchronizer while in the process of enqueuing, in which case an awakened first thread may need to rewait.  
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
This sometimes requires the fallback of traversing backwards from the atomically updated "tail" when fields appear null. (This is never needed in the process of signalling though.)

为了提高垃圾回收能力，尚未在列表中的节点的字段为空。
（创建然后丢弃一个节点而不使用它的情况并不少见。）
离开列表的节点字段将尽快清零。
这突出了从外部确定第一个等待线程的挑战（如在方法 getFirstQueuedThread 中）。
这有时需要在字段显示为空时从原子更新的“尾部”向后遍历的回退。 （尽管在信号发送过程中从来不需要这样做。）

CLH queues need a dummy header node to get started. 
But we don't create them on construction, because it would be wasted effort if there is never contention. 
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
Accesses to field "waiter" (the thread to be signalled) are always sandwiched between other atomic accesses so are used in Plain mode. 
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
```
:::

#### 3.1.2 AQS的使用示例

> 来自于源码类注释中的Usage Examples

##### 3.1.2.1 不可重入的互斥锁

::: details Mutex (non-reentrant mutual exclusion lock)

Here is a non-reentrant mutual exclusion lock class that uses the value zero to represent the unlocked state, and one to represent the locked state. While a non-reentrant lock does not strictly require recording of the current owner thread, this class does so anyway to make usage easier to monitor. It also supports conditions and exposes some instrumentation methods:

```java
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.Serializable;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.locks.AbstractQueuedSynchronizer;
import java.util.concurrent.locks.Condition;
import java.util.concurrent.locks.Lock;

public class Mutex implements Lock, Serializable {

    private static class Sync extends AbstractQueuedSynchronizer {

        // Acquires the lock if state is zero
        @Override
        protected boolean tryAcquire(int acquires) {
            assert acquires == 1;
            if (compareAndSetState(0, 1)) {
                setExclusiveOwnerThread(Thread.currentThread());
                return true;
            }
            return false;
        }

        // Releases the lock by setting state to zero
        @Override
        protected boolean tryRelease(int releases) {
            assert releases == 1;
            // 非独占锁则抛出异常
            if (!isHeldExclusively()) throw new IllegalMonitorStateException();
            setExclusiveOwnerThread(null);
            setState(0);
            return true;
        }

        public boolean isLocked() {
            // 状态不为零则持有锁
            return getState() != 0;
        }

        public boolean isHeldExclusively() {
            // 持有锁的线程如果是当前线程则返回true
            // a data race, but safe due to out-of-thin-air guarantees
            return getExclusiveOwnerThread() == Thread.currentThread();
        }

        // Provides a Condition      
        public Condition newCondition() {
            return new ConditionObject();
        }

        // Deserializes properly      
        private void readObject(ObjectInputStream s) throws IOException, ClassNotFoundException {
            s.defaultReadObject();
            setState(0); // reset to unlocked state      
        }
    }

    // The sync object does all the hard work. We just forward to it.
    private final Sync sync = new Sync();

    @Override
    public void lock() {
        sync.acquire(1);
    }

    @Override
    public boolean tryLock() {
        return sync.tryAcquire(1);
    }

    
    @Override
    public boolean tryLock(long timeout, TimeUnit unit) throws InterruptedException {
        return sync.tryAcquireNanos(1, unit.toNanos(timeout));
    }


    @Override
    public void lockInterruptibly() throws InterruptedException {
        sync.acquireInterruptibly(1);
    }


    @Override
    public void unlock() {
        sync.release(1);
    }


    @Override
    public Condition newCondition() {
        return sync.newCondition();
    }
}
```

:::

3.1.2.2 闩锁类 （类似于CountDownLatch，但是只计数1则触发）

::: details BooleanLatch

Here is a latch class that is like a CountDownLatch except that it only requires a single signal to fire. Because a latch is non-exclusive, it uses the shared acquire and release methods.

```java
import java.util.concurrent.locks.AbstractQueuedSynchronizer;

public class BooleanLatch {

    private static class Sync extends AbstractQueuedSynchronizer {
        boolean isSignalled() {
            return getState() != 0;
        }

        @Override
        protected int tryAcquireShared(int ignore) {
            return isSignalled() ? 1 : -1;
        }

        @Override
        protected boolean tryReleaseShared(int ignore) {
            setState(1);
            return true;
        }
    }

    private final Sync sync = new Sync();

    public boolean isSignalled() {
        return sync.isSignalled();
    }

    public void signal() {
        sync.releaseShared(1);
    }

    public void await() throws InterruptedException {
        sync.acquireSharedInterruptibly(1);
    }
}
```

:::

#### 3.2 LockSupport

#### 3.3 ReentrantLock

#### 3.4 ReentrantReadWriteLock

#### 3.5 StampedLock

## 4. 死锁

## 5. 无锁

