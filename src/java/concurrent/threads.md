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

#### 3.2 线程池的状态

```java
    // runState is stored in the high-order bits
    private static final int RUNNING    = -1 << COUNT_BITS;
    private static final int SHUTDOWN   =  0 << COUNT_BITS;
    private static final int STOP       =  1 << COUNT_BITS;
    private static final int TIDYING    =  2 << COUNT_BITS;
    private static final int TERMINATED =  3 << COUNT_BITS;
```

1. RUNNING：线程池当前正在运行，线程池创建后出入RUNNING状态
2. SHUTDOWN：调用shutdown()后，线程池即将关闭，不再接收新任务，但会继续处理队列中的任务。
3. STOP：调用shutdownNow()后，线程池已经关闭，不再接收新任务，不再处理队列中的任务，并试图中断正在执行的任务。此时poolsize=0,阻塞队列的size=0。
4. TIDYING：线程池当前正在关闭，并且已经完成所有的任务，正在进入收尾阶段。
5. TERMINATED：执行完terminated()后，线程池已经关闭，所有任务已经终止，并且已经进入收尾阶段

#### 3.2 线程池的工作流程

应用程序将任务通过execute()或submit()方法提交的线程池，如下是execute()方法的流程分析

```mermaid
flowchart LR
		提交任务 --> 	是否小于核心线程数\ncorePoolSize
		是否小于核心线程数\ncorePoolSize -->|是| 创建核心线程执行任务\naddWorker:true
		是否小于核心线程数\ncorePoolSize -->|否| 任务队列是否有空闲\nworkQueue未满
		任务队列是否有空闲\nworkQueue未满 -->|是| 将任务放在任务队列里,等待空闲的核心线程执行\nworkQueue.offer:command
		任务队列是否有空闲\nworkQueue未满 -->|否| 是否小于最大线程数\n=核心线程数+非核心线程数\nmaximumPoolSize
		是否小于最大线程数\n=核心线程数+非核心线程数\nmaximumPoolSize -->|是| 创建非核心线程执行任务\naddWorker:false
		是否小于最大线程数\n=核心线程数+非核心线程数\nmaximumPoolSize -->|否| 执行拒绝策略\n处理无法执行的任务\nRejectedExecutionHandler
```

::: details 源码注释 ThreadPoolExecutor#execute

```
/*
 * Proceed in 3 steps:
 *
 * 1. If fewer than corePoolSize threads are running, try to
 * start a new thread with the given command as its first
 * task.  The call to addWorker atomically checks runState and
 * workerCount, and so prevents false alarms that would add
 * threads when it shouldn't, by returning false.
 *
 * 2. If a task can be successfully queued, then we still need
 * to double-check whether we should have added a thread
 * (because existing ones died since last checking) or that
 * the pool shut down since entry into this method. So we
 * recheck state and if necessary roll back the enqueuing if
 * stopped, or start a new thread if there are none.
 *
 * 3. If we cannot queue task, then we try to add a new
 * thread.  If it fails, we know we are shut down or saturated
 * and so reject the task.
 */
```

:::

::: details private final AtomicInteger ctl = new AtomicInteger(ctlOf(RUNNING, 0));

```
The main pool control state, ctl, is an atomic integer packing two conceptual fields workerCount, indicating the effective number of threads runState, indicating whether running, shutting down etc
In order to pack them into one int, we limit workerCount to (2^29)-1 (about 500 million) threads rather than (2^31)-1 (2 billion) otherwise representable. If this is ever an issue in the future, the variable can be changed to be an AtomicLong, and the shift/mask constants below adjusted. But until the need arises, this code is a bit faster and simpler using an int.
The workerCount is the number of workers that have been permitted to start and not permitted to stop. The value may be transiently different from the actual number of live threads, for example when a ThreadFactory fails to create a thread when asked, and when exiting threads are still performing bookkeeping before terminating. The user-visible pool size is reported as the current size of the workers set.
The runState provides the main lifecycle control, taking on values:
RUNNING: Accept new tasks and process queued tasks SHUTDOWN: Don't accept new tasks, but process queued tasks STOP: Don't accept new tasks, don't process queued tasks, and interrupt in-progress tasks TIDYING: All tasks have terminated, workerCount is zero, the thread transitioning to state TIDYING will run the terminated() hook method TERMINATED: terminated() has completed
The numerical order among these values matters, to allow ordered comparisons. The runState monotonically increases over time, but need not hit each state. The transitions are:
RUNNING -> SHUTDOWN On invocation of shutdown() (RUNNING or SHUTDOWN) -> STOP On invocation of shutdownNow() SHUTDOWN -> TIDYING When both queue and pool are empty STOP -> TIDYING When pool is empty TIDYING -> TERMINATED When the terminated() hook method has completed
Threads waiting in awaitTermination() will return when the state reaches TERMINATED.
Detecting the transition from SHUTDOWN to TIDYING is less straightforward than you'd like because the queue may become empty after non-empty and vice versa during SHUTDOWN state, but we can only terminate if, after seeing that it is empty, we see that workerCount is 0 (which sometimes entails a recheck -- see below).

// 翻译一下~
主池控制状态ctl是一个原子整数，打包了两个概念字段workerCount和runState。workerCount表示已经允许启动但不允许停止的线程数，runState表示运行状态，是否处于运行、关闭等状态。
为了将它们打包在一个int中，我们将workerCount限制为(2^29)-1（约5亿）线程，而不是(2^31)-1（20亿）可以表示的数。如果将来出现问题，可以将该变量更改为AtomicLong，并调整下面的shift/mask常量。但是在需要之前，使用int代码更快且更简单。
workerCount可能与实际存活线程数不同，例如当ThreadFactory在请求时无法创建线程，以及当退出线程在终止前仍在执行记录簿时。用户可见的池大小报告为工作者集的当前大小。
runState提供主要的生命周期控制，取以下值：
RUNNING：接受新任务并处理队列中的任务
SHUTDOWN：不接受新任务，但处理队列中的任务
STOP：不接受新任务，不处理队列中的任务，并中断正在进行的任务
TIDYING：所有任务已经终止，workerCount为零，正在转换为TIDYING状态的线程将运行terminated()钩子方法
TERMINATED：terminated() 函数已完成
这些值之间的数值顺序很重要，以允许有序比较。runState 随时间递增，但不一定要达到每个状态。转换如下：
RUNNING -> SHUTDOWN 在调用 shutdown() 时 (RUNNING 或 SHUTDOWN) -> STOP 在调用 shutdownNow() 时 SHUTDOWN -> TIDYING 当队列和池都为空时 STOP -> TIDYING 当池为空时 TIDYING -> TERMINATED 当 terminated() 钩子方法已完成
在 awaitTermination() 中等待的线程将在状态达到 TERMINATED 时返回。
从 SHUTDOWN 到 TIDYING 的转换不是很直接，因为在 SHUTDOWN 状态下队列可能在非空后变为空，反之亦然，但是我们只能在看到它为空后，看到 workerCount 为 0 时终止（有时需要重新检查 - 请参见下面）
```

:::

#### 3.3 `execute()`源码分ad析

```java
    public void execute(Runnable command) {
        if (command == null)
            throw new NullPointerException();

        int c = ctl.get(); // 获取线程池状态

        if (workerCountOf(c) < corePoolSize) { // 1. 当前线程数 < corePoolSize
            if (addWorker(command, true)) // 调用addWorker创建核心线程
                return;
            c = ctl.get();
        }

        // 2.如果不小于corePoolSize，则将任务添加到workQueue队列
        if (isRunning(c) && workQueue.offer(command)) { // 2. 当前线程数 ≥ corePoolSize 且 RUNNING 且成功入队workQueue
            int recheck = ctl.get();

            if (!isRunning(recheck) && remove(command)) { // 线程池不是RUNNING，remove任务后执行拒绝策略
                reject(command);
            } else if (workerCountOf(recheck) == 0) { //  线程池处于running状态，但是没有线程，则创建线程
                addWorker(null, false);
            }
        } else if (!addWorker(command, false)) { // 3. 如果放入workQueue失败，则创建非核心线程执行任务，
            reject(command); // 如果这时创建非核心线程失败(当前线程总数不小于maximumPoolSize时)，就会执行拒绝策略。
        }
    }

		// isRunning
    private static boolean isRunning(int c) {
        return c < SHUTDOWN;
    }
```



execute执行时，会将线程通过`addWorker()`封装成`worker`,并放入工作线程组中，然后这个worker反复从阻塞队列中取任务执行，做到线程复用。

```java
 private final class Worker
            extends AbstractQueuedSynchronizer
            implements Runnable {
        /**
         * Thread this worker is running in.  Null if factory fails.
         */
        @SuppressWarnings("serial") // Unlikely to be serializable
        final Thread thread;

      	/**
         * Initial task to run.  Possibly null.
         */
        Runnable firstTask;

        /**
         * Creates with given first task and thread from ThreadFactory.
         *
         * @param firstTask the first task (null if none)
         */
        Worker(Runnable firstTask) {
            setState(-1); // inhibit interrupts until runWorker
            this.firstTask = firstTask;
            this.thread = getThreadFactory().newThread(this);
        }

        /**
         * Delegates main run loop to outer runWorker.
         */
        public void run() {
            runWorker(this);
        }
 }
```

Worker类实现了Runnable接口，继承了AQS，构造方法中创建了一个线程，线程的任务是自己

`this.thread = getThreadFactory().newThread(this);`

在调用`t.start()`时则会调用到worker.run，然后执行`runWorker()`

```java
    final void runWorker(Worker w) {
        Thread wt = Thread.currentThread();
        Runnable task = w.firstTask;
        w.firstTask = null;
        w.unlock(); // allow interrupts
        boolean completedAbruptly = true;
        try {
            while (task != null || (task = getTask()) != null) {
                w.lock();
                // 如果池正在停止，确保线程已被中断
                // 如果没有，确保线程没有被中断
                // 在第二种情况下，需要重新检查以解决在清除中断时的 shutdownNow 竞争
                if ((runStateAtLeast(ctl.get(), STOP) || (Thread.interrupted() && runStateAtLeast(ctl.get(), STOP)))
                        && !wt.isInterrupted()) {
                    wt.interrupt();
                }
                try {
                    // 钩子函数，在线程执行之前的操作
                    beforeExecute(wt, task);
                    try {
                        // 执行任务
                        task.run();
                        // 钩子函数，在线程执行之后的操作
                        afterExecute(task, null);
                    } catch (Throwable ex) {
                        afterExecute(task, ex);  // 钩子函数，在线程执行之后的操
                        throw ex;
                    }
                } finally {
                    task = null;
                    w.completedTasks++;
                    w.unlock();
                }
            }
            completedAbruptly = false;
        } finally {
            processWorkerExit(w, completedAbruptly);
        }
    }
```

首先去执行创建这个worker时就有的任务，当执行完这个任务后，worker的生命周期并没有结束，在`while`循环中，worker会不断地调用`getTask`方法从**阻塞队列**中获取任务然后调用`task.run()`执行任务,从而达到**复用线程**的目的。只要`getTask`方法不返回`null`,此线程就不会退出。核心线程池中创建的线程想要拿到阻塞队列中的任务，先要判断线程池的状态，如果是STOP或者TERMINATED返回null。

```java
    /**
     * 执行阻塞或定时等待任务，具体取决于当前配置设置。如果该工作者必须因以下原因退出，则返回null：
     * <p>
     * 1. 工作者数量超过 maximumPoolSize（由于调用 setMaximumPoolSize）。
     * 2. 池已停止。
     * 3. 池已关闭，队列为空。
     * 4. 此工作者在等待任务时超时，并且超时的工作者可能会被终止（即，allowCoreThreadTimeOut || workerCount > corePoolSize），无论是在定时等待之前还是之后，如果队列不为空，此工作者不是池中的最后一个线程。
     *
     * @return 任务，如果工作者必须退出，则返回null，此时 workerCount 会减少。
     */
    private Runnable getTask() {
        boolean timedOut = false; // 上次的poll()是否超时？

        for (; ; ) {
            int c = ctl.get();

            // 仅在必要时检查队列是否为空
            if (runStateAtLeast(c, SHUTDOWN) && (runStateAtLeast(c, STOP) || workQueue.isEmpty())) {
                decrementWorkerCount();
                return null;
            }

            int wc = workerCountOf(c);

            // Are workers subject to culling?
            // 1.allowCoreThreadTimeOut变量默认是false,核心线程即使空闲也不会被销毁
            // 如果为true,核心线程在keepAliveTime内仍空闲则会被销毁
            boolean timed = allowCoreThreadTimeOut || wc > corePoolSize;

            // 2.如果运行线程数超过了最大线程数，但是缓存队列已经空了，这时递减worker数量。
            // 如果有设置允许线程超时或者线程数量超过了核心线程数量，
            // 并且线程在规定时间内均未poll到任务且队列为空则递减worker数量
            if ((wc > maximumPoolSize || (timed && timedOut)) && (wc > 1 || workQueue.isEmpty())) {
                if (compareAndDecrementWorkerCount(c))
                    return null;
                continue;
            }

            try {
                // 3.如果timed为true,则会调用workQueue的poll方法获取任务.
                // 超时时间是keepAliveTime。如果超过keepAliveTime时长，poll返回了null，上边提到的while循序就会退出，线程也就执行完了。
                // 如果timed为false（allowCoreThreadTimeOut为false且wc > corePoolSize为false），则会调用workQueue的take方法阻塞在当前。队列中有任务加入时，线程被唤醒，take方法返回任务，并执行。
                Runnable r = timed ?
                        workQueue.poll(keepAliveTime, TimeUnit.NANOSECONDS) :
                        workQueue.take();
                if (r != null)
                    return r;
                timedOut = true;
            } catch (InterruptedException retry) {
                timedOut = false;
            }
        }
    }
```

核心线程的会一直卡在`workQueue.take`方法，被阻塞并挂起，不会占用CPU资源，直到拿到`Runnable` 然后返回（当然如果**allowCoreThreadTimeOut**设置为`true`,那么核心线程就会去调用`poll`方法，因为`poll`可能会返回`null`,所以这时候核心线程满足超时条件也会被销毁）

非核心线程会workQueue.poll(keepAliveTime, TimeUnit.NANOSECONDS) ，如果超时还没有拿到，下一次循环判断`compareAndDecrementWorkerCount`就会返回`null`,Worker对象的`run()`方法循环体的判断为`null`,任务结束，然后线程被系统回收 

回到上边的addWorker方法上

```java
    /**
     * 这个方法检查是否可以添加新的工作线程，并考虑当前线程池状态和给定的边界（核心或最大）.
     * 如果可以，则相应地调整工作线程计数，并且如果可能，创建并启动一个新的工作线程，并运行 firstTask 作为其第一个任务。
     * 如果线程池已停止或有资格关闭，则此方法返回 false。
     * 如果线程工厂在询问时无法创建线程，也会返回 false。
     * 如果线程创建失败，无论是由于线程工厂返回 null，还是由于异常（通常是在 Thread.start() 中的 OutOfMemoryError），我们都会干净地回滚。
     *
     * @param firstTask 新线程应该先运行的任务（如果没有则为 null）。
     *                  工作线程是使用初始 firstTask（在 execute() 方法中）创建的，
     *                  以在线程数小于 corePoolSize 时（此时我们总是启动一个）或队列已满时（此时我们必须绕过队列）绕过排队。
     *                  最初的空闲线程通常是通过 prestartCoreThread 创建的，或者用于替换其他垂死的工作线程
     * @param core      如果为 true，则使用 corePoolSize 作为界限，否则使用 maximumPoolSize。（在这里使用布尔指示符而不是值是为了确保在检查其他池状态后读取新值
     * @return 如果成功，则返回 true
     */
    private boolean addWorker(Runnable firstTask, boolean core) {
        retry:
        for (int c = ctl.get(); ; ) {
            // Check if queue empty only if necessary.
            if (runStateAtLeast(c, SHUTDOWN) && (runStateAtLeast(c, STOP) || firstTask != null || workQueue.isEmpty())) {
                return false;
            }
            for (; ; ) {
                if (workerCountOf(c) >= ((core ? corePoolSize : maximumPoolSize) & COUNT_MASK))
                    return false;
                if (compareAndIncrementWorkerCount(c))
                    break retry;
                c = ctl.get();  // Re-read ctl
                if (runStateAtLeast(c, SHUTDOWN))
                    continue retry;
                // else CAS failed due to workerCount change; retry inner loop
            }
        }
        // 如上主要是判断线程数量是否超出阈值，超过了就返回false

        boolean workerStarted = false;
        boolean workerAdded = false;
        Worker w = null;
        try {
            // 1.创建一个worker对象
            w = new Worker(firstTask);
            // 2.实例化一个Thread对象
            final Thread t = w.thread;
            if (t != null) {
                // 3.线程池全局锁
                final ReentrantLock mainLock = this.mainLock;
                mainLock.lock();
                try {
                    // Recheck while holding lock.
                    // Back out on ThreadFactory failure or if
                    // shut down before lock acquired.
                    int c = ctl.get();

                    if (isRunning(c) || (runStateLessThan(c, STOP) && firstTask == null)) {
                        if (t.getState() != Thread.State.NEW) {
                            throw new IllegalThreadStateException();
                        }
                        workers.add(w);
                        workerAdded = true;
                        int s = workers.size();
                        if (s > largestPoolSize)
                            largestPoolSize = s;
                    }
                } finally {
                    mainLock.unlock();
                }
                if (workerAdded) {
                    // 4. 启动线程
                    t.start();
                    workerStarted = true;
                }
            }
        } finally {
            if (!workerStarted)
                addWorkerFailed(w);
        }
        return workerStarted;
    }
```



### 4. Executor框架

### 5. 线程池的监控

### 6. 动态线程池
