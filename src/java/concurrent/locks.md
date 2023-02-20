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

### 1.2 Java对象头

### 1.3 锁升级

### 1.4 原理

[objectMonitor.cpp](https://github.com/openjdk/jdk/blob/jdk-17-ga/src/hotspot/share/runtime/objectMonitor.cpp)

[objectMonitor](https://github.com/openjdk/jdk/blob/master/src/hotspot/share/runtime/objectMonitor.hpp)

## 2. 显示锁 `Lock	`
