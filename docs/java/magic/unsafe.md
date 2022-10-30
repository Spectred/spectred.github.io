# Unsafe

> 学习参考: 
>
> - [彤哥读源码-死磕java魔法类只Unsafe解析](https://www.cnblogs.com/tong-yuan/p/Unsafe.html)

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
    public void test_() throws InstantiationException {
        Entity e = (Entity) unsafe.allocateInstance(Entity.class);
        System.out.println(e.getId()); // 0
    }
```

