---
tag: [线程,线程池]
---

# 线程与线程池

![](https://s2.loli.net/2023/01/30/mQez6FX1lUDfBbc.png)

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

### 5. 线程的常见方法

- `currentThread`
  返回当前线程

- `yield`
  放弃当前的CPU资源，将它让给其他的任务去占用CPU执行时间。但放弃的时间不确定，有可能刚刚放弃，马上又获得CPU时间片

- `sleep`
  在指定时间内让当前正在执行的线程休眠

  > Thread.sleep 和 Object.wait的区别
  >
  > - sleep释放CPU资源但是不释放锁，wait都释放
  > - sleep必须指定时间，wait可不指定
  > - sleep可以在任意位置，wait只能方法同步块或同步方法中

- `interrupt`

  线程中断标志位

- `join`

  使当前线程进入"等待"状态，等join的线程完成后，再继续执行当前线程

- `setDaemon`

  设置为后台线程

---

## 二. 线程池

### 1. 为什么使用线程池

如果为每一个任务都分配一个线程会产生一些问题，尤其是在需要创建大量线程的场景，主要如下：

- **线程生命周期的开销非常高**

  线程的创建和销毁需要时间，需要JVM和操作系统辅助

- **资源消耗**

  活跃的线程后消耗系统资源，尤其是内存。如果可运行的线程数量多于可用处理器的数量，那么有些线程将闲置，大量闲置的线程还会占用许多内存，给GC带来压力，而且大量线程在竞争CPU资源时还将产生其他的性能开销

- **稳定性**

  可创建线程的数量会受到操作系统、JVM参数等的限制，超过限制会引发异常不稳定

那么在使用线程池时会有如下的优势：

- 可以**复用已创建的线程**
- 可以**控制并发的数量**
- 可以对线程做**统一管理**（分配、调优、监控等）

### 2. 线程池的使用

![](https://s2.loli.net/2023/01/31/IbvM3KwAJGUqBmt.png)

#### 2.1 创建线程池

可以通过[ThreadPoolExecutor](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/concurrent/ThreadPoolExecutor.html)来创建线程池（或者通过其他方式，如Spring中的`ThreadPoolTaskExecutor`），例如

```java
ThreadPoolExecutor threadPool = = new ThreadPoolExecutor(10,20,60, TimeUnit.SECONDS,new ArrayBlockingQueue<>(10));
```

#### 2.2 向线程池提交任务

- 提交不需要返回值的任务

  ```java
  threadPool.execute(() -> System.out.println(Thread.currentThread().getName()));
  // print: pool-1-thread-1
  ```

- 提交需要返回值的任务

  ```java
  Future<String> future = threadPool.submit(() -> Thread.currentThread().getName());
  System.out.println(future.get());
  // print: pool-1-thread-1
  ```

#### 2.3 关闭线程池

- `threadPool.shutdown()`

  将线程池的状态设置为`SHUTDOWN`,然后中断所有没有正在执行任务的线程

  ```java
      public void shutdown() {
          final ReentrantLock mainLock = this.mainLock;
          mainLock.lock();
          try {
              checkShutdownAccess();
              advanceRunState(SHUTDOWN);
              interruptIdleWorkers();
              onShutdown(); // hook for ScheduledThreadPoolExecutor
          } finally {
              mainLock.unlock();
          }
          tryTerminate();
      }
  ```

- `threadPool.shutdownNow()`

  将线程池的状态设置为`STOP`，然后尝试停止所有的正在执行或者暂停任务的线程，并返回等待执行任务的列表

  ```java
      public List<Runnable> shutdownNow() {
          List<Runnable> tasks;
          final ReentrantLock mainLock = this.mainLock;
          mainLock.lock();
          try {
              checkShutdownAccess();
              advanceRunState(STOP);
              interruptWorkers();
              tasks = drainQueue();
          } finally {
              mainLock.unlock();
          }
          tryTerminate();
          return tasks;
      }
  ```

`shutdown`和`shutdownNow`的异同:
- 都是通过遍历线程池中的线程，然后调用`t.interrupt()`来中断线程；
- 两个方法都会使`isShutdown`返回true；
- 当所有的任务都已关闭后，才表示线程池关闭成功，这时`isTerminated`方法会返回true；
- 通常用`shutdown`来关闭线程池，如果任务不一定要执行完可以调用`shutdownNow`

> 如果在工程中，线程池尽量不要随着请求创建和关闭（频繁的创建关闭线程池是一个不小的开销），可以随着项目创建和关闭。特殊场景下，如每天定时跑一次任务，可以尝试由方法管理生命周期。
>
> 《Java并发编程实战》（7.2.4 示例:只执行一次的服务 ）：
> 某个方法需要处理一批任务并且当所有任务都处理完成后才返回，可以通过一个私有的Executor来简化服务的生命周期管理，其中该Executor的生命周期是由这个方法来控制

### 3. 线程池的工作原理

#### 3.1 线程池的构造参数

ThreadPoolExecutor的构造方法最长的参数有7个

```java
public ThreadPoolExecutor(int corePoolSize,
                          int maximumPoolSize,
                          long keepAliveTime,
                          TimeUnit unit,
                          BlockingQueue<Runnable> workQueue,
                          ThreadFactory threadFactory,
                          RejectedExecutionHandler handler) {...}
```

##### 3.1.1 `int corePoolSize` 核心线程数

线程池中分为核心线程和非核心线程，通过`addWorker(Runnable firstTask, boolean core)`的第二个参数区分。

核心线程默认情况会一直存在于线程池中（即使什么都不干），非核心线程如果长时间闲置，就会被销毁。

但是当`allowCoreThreadTimeOut`为true时，核心线程也会长时间闲置被销毁

::: info corePoolSize
Core pool size is the minimum number of workers to keep alive (and not allow to time out etc) unless allowCoreThreadTimeOut is set, in which case the minimum is zero. 

Since the worker count is actually stored in COUNT_BITS bits, the effective limit is corePoolSize & COUNT_MASK.
::: 

#### 3.1.2 `int maximumPoolSize` 最大线程数

最先线程数 = 核心线程数 + 非核心线程数

::: info maximumPoolSize
Maximum pool size. 

Since the worker count is actually stored in COUNT_BITS bits, the effective limit is maximumPoolSize & COUNT_MASK.
:::

#### 3.1.3 `long keepAliveTime` 非核心线程闲置超时时长

存活时间，非核心线程如果处于闲置状态超过该值就会被销毁。

如果设置`allowCoreThreadTimeOut(true)`，则也会作用于核心线程

```java
  Runnable r = timed 
  	? workQueue.poll(keepAliveTime, TimeUnit.NANOSECONDS) 
  	: workQueue.take();
```

::: info keepAliveTime

Timeout in nanoseconds for idle threads waiting for work. 

Threads use this timeout when there are more than corePoolSize present or if allowCoreThreadTimeOut. Otherwise they wait forever for new work.

:::

#### 3.1.4 `TimeUnit unit` 时间单位

`keepAliveTime`的单位

`this.keepAliveTime = unit.toNanos(keepAliveTime);`

#### 3.1.5 `BlockingQueue<Runnable> workQueue` 工作队列

工作队列（阻塞队列），保存等待执行任务的队列

常用的阻塞队列有 无界队列、有界队列和同步移交

- `LinkedBlockingQueue` 链表为基础的阻塞队列，默认大小是Integer.MAX_VALUE，也可以指定大小
- `ArrayBlockingQueue` 数组为基础的阻塞队列，需要指定队列的大小
- `SynchronousQueue` 同步队列，内部容量为0，每个put操作必须等待一个take操作，反之亦然
- `DelayQueue` 延迟队列，队列中的元素只有当其指定的延迟时间到了才能从队列中获取该元素

::: info workQueue

The queue used for holding tasks and handing off to worker threads.

 We do not require that workQueue.poll() returning null necessarily means that workQueue.isEmpty(), so rely solely on isEmpty to see if the queue is empty (which we must do for example when deciding whether to transition from SHUTDOWN to TIDYING). 

This accommodates special-purpose queues such as DelayQueues for which poll() is allowed to return null even if it may later return non-null when delays expire.

:::

#### 3.1.6 `ThreadFactory threadFactory` 线程工厂

创建线程的工厂，统一在创建线程时设置参数，如守护线程、优先级等，不指定时新建一个默认的线程工厂

```java
        Worker(Runnable firstTask) {
            setState(-1); // inhibit interrupts until runWorker
            this.firstTask = firstTask;
            this.thread = getThreadFactory().newThread(this);
        }
```

::: details 默认线程工厂

```java
    /**
     * The default thread factory.
     */
    private static class DefaultThreadFactory implements ThreadFactory {
        private static final AtomicInteger poolNumber = new AtomicInteger(1);
        private final ThreadGroup group;
        private final AtomicInteger threadNumber = new AtomicInteger(1);
        private final String namePrefix;

        DefaultThreadFactory() {
            SecurityManager s = System.getSecurityManager();
            group = (s != null) ? s.getThreadGroup() :
                                  Thread.currentThread().getThreadGroup();
            namePrefix = "pool-" +
                          poolNumber.getAndIncrement() +
                         "-thread-";
        }

        public Thread newThread(Runnable r) {
            Thread t = new Thread(group, r,
                                  namePrefix + threadNumber.getAndIncrement(),
                                  0);
            if (t.isDaemon())
                t.setDaemon(false);
            if (t.getPriority() != Thread.NORM_PRIORITY)
                t.setPriority(Thread.NORM_PRIORITY);
            return t;
        }
    }
```

:::

::: info threadFactory

Factory for new threads. 

All threads are created using this factory (via method addWorker). All callers must be prepared for addWorker to fail, which may reflect a system or user's policy limiting the number of threads. Even though it is not treated as an error, failure to create threads may result in new tasks being rejected or existing ones remaining stuck in the queue. We go further and preserve pool invariants even in the face of errors such as OutOfMemoryError, that might be thrown while trying to create threads. Such errors are rather common due to the need to allocate a native stack in Thread.start, and users will want to perform clean pool shutdown to clean up. There will likely be enough memory available for the cleanup code to complete without encountering yet another OutOfMemoryError.

:::

#### 3.1.7 `RejectedExecutionHandler handler` 拒绝策略

拒绝处理策略，线程数量大于最大线程就会采用拒绝策略，在线程池shutdown时再新来任务也会执行，预定义四种拒绝策略，

也可以通过实现`RejectedExecutionHandler`来实现自定义拒绝策略，如拒绝的任务可以存入日志等

- ::: details AbortPolicy 默认，丢弃任务并抛出RejectedExecutionException异常

  ```java
      /**
       * A handler for rejected tasks that throws a
       * {@link RejectedExecutionException}.
       *
       * This is the default handler for {@link ThreadPoolExecutor} and
       * {@link ScheduledThreadPoolExecutor}.
       */
      public static class AbortPolicy implements RejectedExecutionHandler {
          /**
           * Creates an {@code AbortPolicy}.
           */
          public AbortPolicy() { }
  
          /**
           * Always throws RejectedExecutionException.
           *
           * @param r the runnable task requested to be executed
           * @param e the executor attempting to execute this task
           * @throws RejectedExecutionException always
           */
          public void rejectedExecution(Runnable r, ThreadPoolExecutor e) {
              throw new RejectedExecutionException("Task " + r.toString() +
                                                   " rejected from " +
                                                   e.toString());
          }
      }
  ```

  :::

- ::: details DiscardPolicy丢弃新来的任务，但是不抛出异常

  ```java
      /**
       * A handler for rejected tasks that silently discards the
       * rejected task.
       */
      public static class DiscardPolicy implements RejectedExecutionHandler {
          /**
           * Creates a {@code DiscardPolicy}.
           */
          public DiscardPolicy() { }
  
          /**
           * Does nothing, which has the effect of discarding task r.
           *
           * @param r the runnable task requested to be executed
           * @param e the executor attempting to execute this task
           */
          public void rejectedExecution(Runnable r, ThreadPoolExecutor e) {
          }
      }
  ```

  :::

- ::: details DiscardOldestPolicy  丢弃队列头部(最旧的)任务，然后重新尝试执行程序，如果再次失败则重复此过程

  ```java
      /**
       * A handler for rejected tasks that discards the oldest unhandled
       * request and then retries {@code execute}, unless the executor
       * is shut down, in which case the task is discarded.
       */
      public static class DiscardOldestPolicy implements RejectedExecutionHandler {
          /**
           * Creates a {@code DiscardOldestPolicy} for the given executor.
           */
          public DiscardOldestPolicy() { }
  
          /**
           * Obtains and ignores the next task that the executor
           * would otherwise execute, if one is immediately available,
           * and then retries execution of task r, unless the executor
           * is shut down, in which case task r is instead discarded.
           *
           * @param r the runnable task requested to be executed
           * @param e the executor attempting to execute this task
           */
          public void rejectedExecution(Runnable r, ThreadPoolExecutor e) {
              if (!e.isShutdown()) {
                  e.getQueue().poll();
                  e.execute(r);
              }
          }
      } 
  ```

  :::

- ::: details CallerRunsPolicy 由调用线程处理该任务

  ```java
      /**
       * A handler for rejected tasks that runs the rejected task
       * directly in the calling thread of the {@code execute} method,
       * unless the executor has been shut down, in which case the task
       * is discarded.
       */
      public static class CallerRunsPolicy implements RejectedExecutionHandler {
          /**
           * Creates a {@code CallerRunsPolicy}.
           */
          public CallerRunsPolicy() { }
  
          /**
           * Executes task r in the caller's thread, unless the executor
           * has been shut down, in which case the task is discarded.
           *
           * @param r the runnable task requested to be executed
           * @param e the executor attempting to execute this task
           */
          public void rejectedExecution(Runnable r, ThreadPoolExecutor e) {
              if (!e.isShutdown()) {
                  r.run();
              }
          }
      }
  
  ```

  :::

::: info handler

Handler called when saturated or shutdown in execute.

:::

#### 3.2 线程池的工作流程

#### 3.3 `execute`源码分析

联想记忆

### 4. Executor框架

### 5. 线程池的监控

### 6. 动态线程池
