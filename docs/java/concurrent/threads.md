[[toc]]

# 线程与线程池

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