# Unsafe

> 学习参考: 
>
> - [彤哥读源码-死磕java魔法类只Unsafe解析](https://www.cnblogs.com/tong-yuan/p/Unsafe.html)
> - [Java Magic. Part 4: sun.misc.Unsafe](http://mishadoff.com/blog/java-magic-part-4-sun-dot-misc-dot-unsafe/)

> `sun.misc.Unsafe`

## 1. 通过反射获取`Unsafe`实例

```java
    private static Unsafe unsafe;

    static {
        try {
            Field theUnsafe = Unsafe.class.getDeclaredField("theUnsafe");
            theUnsafe.setAccessible(true);
            unsafe = (Unsafe) theUnsafe.get(null);
        } catch (NoSuchFieldException | IllegalAccessException e) {
            e.printStackTrace();
        }
    }
```

## 2. `Unsafe`实例化一个类

```java
    @DisplayName("Unsafe初始化类(只分配内存不调用构造方法)")
    @Test
    public void test_allocateInstance() throws InstantiationException {
        Entity e = (Entity) unsafe.allocateInstance(Entity.class);
        System.out.println(e.getId()); // 0
    }
```

## 3. 修改私有属性值

```java
    @DisplayName("修改私有属性的值")
    @Test
    public void test_putXXX() throws NoSuchFieldException {
        Entity entity = new Entity(1);
        System.out.println("原值: " + entity.getId()); // 1

        Field field = Entity.class.getDeclaredField("id");
        long objectFieldOffset = unsafe.objectFieldOffset(field);
        unsafe.putInt(entity, objectFieldOffset, 2);

        System.out.println("修改后: " + entity.getId()); // 2
    }
```

## 4. 抛出受检异常

```java
    @DisplayName("正常的受检异常需要在签名中throws，unsafe不需要")
    @Test
    public void test_throwException() {
        unsafe.throwException(new IOException("This is an IOException"));
    }
```

## 5. 使用堆外内存

```java
    @DisplayName("使用堆外内存")
    @Test
    public void test_allocateMemory() {
        unsafe.allocateMemory(1024);
        unsafe.freeMemory(1024);
    }
```

## 6. `CAS`

```java
public class Counter {

    private volatile int count;

    private static long offset;

    static {
        try {
            offset = Unsafe0.unsafe.objectFieldOffset(Counter.class.getDeclaredField("count"));
        } catch (NoSuchFieldException e) {
            e.printStackTrace();
        }
    }

    public void incr() {
        int before = count;
        while (!Unsafe0.unsafe.compareAndSwapInt(this, offset, before, before + 1)) {
            before = count;
        }
    }

    public int getCount() {
        return count;
    }
}
```

```java
    @DisplayName("CAS")
    @Test
    public void test_compareAndSwapInt() throws InterruptedException {
        Counter counter = new Counter();
        ExecutorService pool = Executors.newFixedThreadPool(10);
        for (int i = 0; i < 100; i++) {
            pool.submit(() -> IntStream.range(0, 10000).forEach(j -> counter.incr()));
        }
        pool.shutdown();
        Thread.sleep(1000L);
        System.out.println(counter.getCount()); // 1000000
    }
```

## 7. `park`/`unpark`