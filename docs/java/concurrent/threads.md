# 线程与线程池

![](https://s2.loli.net/2023/01/30/mQez6FX1lUDfBbc.png)

---
[[toc]]

---

## 一. 线程

### 1. 线程的创建和启动

```java
import java.util.concurrent.Callable;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.FutureTask;

public class CreateThread {

    public static void main(String[] args) throws Exception {
        // 1. 继承Thread
        new MyThread().start(); // From Thread:Thread-0
        // 2. 实现Runnable
        new Thread(new MyRunnable()).start(); // From Runnable:Thread-1
        // 3. 实现Callable,使用FutureTask ,有返回值
        FutureTask<String> futureTask = new FutureTask<>(new MyCallable());
        new Thread(futureTask).start();
        System.out.println(futureTask.get()); // From Callable:Thread-2
        // 4. 使用线程池ThreadPoolExecutor
        final ExecutorService threadPool = Executors.newSingleThreadExecutor();
        threadPool.execute(() -> System.out.println("From ThreadPool:" + Thread.currentThread().getName())); // From ThreadPool:pool-1-thread-1
        threadPool.shutdown();
    }

    static class MyThread extends Thread {
        @Override
        public void run() {
            System.out.println("From Thread:" + Thread.currentThread().getName());
        }
    }

    static class MyRunnable implements Runnable {
        @Override
        public void run() {
            System.out.println("From Runnable:" + Thread.currentThread().getName());
        }
    }

    static class MyCallable implements Callable<String> {
        @Override
        public String call() throws Exception {
            return "From Callable:" + Thread.currentThread().getName();
        }
    }
}
```

![](https://s2.loli.net/2023/01/30/TbpqFUAhS1GLHRB.png)

### 2. Java中线程的状态

参考: [Thread.State](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/lang/Thread.State.html)

- `NEW`

  **新建**，还没有启动

- `RUNNABLE`

  **就绪**，在JVM中执行，但是可能需要等待操作系统的调度

- `BLOCKED`

  **阻塞**(等待监视器锁(monitor lock)阻塞)，等待进入同步块或方法，或者在调用`Object.wait()`后等待重入同步块或方法

- `WAITING`

  **等待**，处于等待的线程正在等待另一个线程的操作，例如wait等待notify/notifyAll，调用如下方法线程将进入等待状态:

  - `Object.wait()` 不加超时
  - `Thread.join()` 不加超时
  - `LockSupport.park`

- `TIMED_WAITING`

  **超时等待**，调用如下方法将进入超时等待状态:

  - `Thread.sleep`
  - `Object.wait(long timeout)`
  - `Thread.join(long millis)`
  - `LockSupport.parkNanos`
  - `LockSupport.parkUntil`

- `TERMINATED`

  **终止**，线程已完成执行

![](https://s2.loli.net/2023/01/30/Zzh9kE2lxcLSBKw.png)

### 3. 线程的中断

线程不能被直接终止，可以通过设置一个中断标志位，通知被中断的线程自行处理(如抛出异常，逻辑结束等)

- `Thread.interrupt()` 设置中断标志位为true，并不会真正中断线程

- `Thread.interrupted()` 判断线程是否被中断，注意调用两次时，第二次会返回false（会清除标志位）

  ```java
    public static boolean interrupted() {
          return currentThread().isInterrupted(true);
    }
  ```

- `Thread.isInterrupted()` 判断线程是否被中断

  ```java
    public boolean isInterrupted() {
          return isInterrupted(false);
      }
  ```

正确中断线程示例(逻辑结束)

```java
    public static void main(String[] args) throws InterruptedException {
        Thread thread = new Thread() {
            @Override
            public void run() {
                System.out.println("start");
                while (!isInterrupted()) {
                    System.out.println("线程没有被中断");
                }
                System.out.println("线程被中断了...");
            }
        };
        thread.start();

        Thread.sleep(1_000);
        
        thread.interrupt();

        System.out.println(thread.getName() + ":" + thread.isInterrupted() + ":" + thread.getState());
    }
```

### 4. 线程间的通信

#### 4.1 等待/通知机制

`synchronized + wait + notify/notifyAll`

```java
public class ThreadCommunication {

    private static Object lock = new Object();

    public static void main(String[] args) throws InterruptedException {
        ThreadA threadA = new ThreadA();
        ThreadB threadB = new ThreadB();

        threadA.start();
        Thread.sleep(2_000);
        threadB.start();
        /*
            A先执行，遇到wait等待，2秒后B执行，遇到notify唤醒A,B和A结束
            Thread A start
            Thread B start
            Thread B end
            Thread A end
         */
    }

    static class ThreadA extends Thread {
        @Override
        public void run() {
            synchronized (lock) {
                System.out.println("Thread A start");
                try {
                    lock.wait();
                } catch (InterruptedException e) {
                    throw new RuntimeException(e);
                }
                System.out.println("Thread A end");
            }
        }
    }

    static class ThreadB extends Thread {
        @Override
        public void run() {
            synchronized (lock) {
                System.out.println("Thread B start");
                lock.notifyAll();
                System.out.println("Thread B end");
            }
        }
    }
}
```

#### 4.2 `join`

`Thread#join(long)`,使当前线程进入"等待"状态，等join的线程完成后，再继续执行当前线程

`join`方法通过`Object.wait()`实现

```java
public class ThreadCommunication {

    public static void main(String[] args) throws InterruptedException {
        ThreadC threadC = new ThreadC();
        threadC.start();
        threadC.join();  // 当threadC完成后才能继续执行
				
        // do something
    }

    static class ThreadC extends Thread {
        @Override
        public void run() {
            System.out.println("Thread C start,等待3秒");
            try {
                Thread.sleep(3_000);
            } catch (InterruptedException e) {
                throw new RuntimeException(e);
            }
            System.out.println("Thread C end");
        }
    }
}
```

#### 4.3  `ThreadLocal`和`InheritableThreadLocal`

`ThreadLocal`是一个本地线程副本变量工具类

`InheritableThreadLocal`继承自`ThreadLocal`,不仅当前线程可以存取副本值，它的子线程也可以存取这个副本值

#### 4.4 信号量（`volatile`）

volatile保证了可见性和有序性，线程修改一个变量时，其他线程立刻可见

#### 4.5 锁  、通信工具类

锁如Lock，通信工具类如CountDownLatch