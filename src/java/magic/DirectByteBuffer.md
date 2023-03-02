# DirectByteBuffer

## 1. 简介

DirectByteBuffer扩展了 ByteBuffer ，表示一个字节缓冲区，该缓冲区**在 Java 堆之外分配**，这个区域称为“**直接缓冲区**”。

DirectByteBuffer 提供了一种访问不受 Java 虚拟机 (JVM) 管理的内存区域的方式，这可以为某些类型的操作提供更好的性能，例如文件 I/O 或网络通信。它们通常用于需要直接访问内存的情况，例如与本地代码进行接口调用或执行 I/O 操作时。

使用 DirectByteBuffer 的主要好处之一是可以直接将它们传递给本地方法，而无需进行任何复制或转换。这可以帮助减少 JVM 和本地代码之间数据传输的开销，从而提高性能。

要创建一个 DirectByteBuffer，可以使用 ByteBuffer 类的 allocateDirect() 方法，该方法将返回一个直接缓冲区。

DirectByteBuffer在许多中间件中都有使用,如Netty、Kafka、ES、Hadoop

DirectByteBuffer源码中使用到了Unsafe



（在Java高版本好像移除了这个类，待查...）

## 2. 使用

### 2.1 使用 ByteBuffer 类的 allocateDirect() 方法创建 DirectByteBuffer 对象

```java
// 创建一个大小为 1024 字节的 DirectByteBuffer 对象
ByteBuffer buffer = ByteBuffer.allocateDirect(1024);
```

### 2.2 将数据写入 DirectByteBuffer 中

使用 put() 方法将数据写入缓冲区。例如，以下代码将一个字节数组写入 DirectByteBuffer 中

```java
byte[] data = "Hello, world!".getBytes();
buffer.put(data);
```

### 2.3 从 DirectByteBuffer 中读取数据

使用 get() 方法从缓冲区中读取数据。例如，以下代码从缓冲区中读取数据并将其转换为字符串

```java
buffer.flip();
byte[] result = new byte[buffer.remaining()];
buffer.get(result);
String message = new String(result);
System.out.println(message);
```

### 2.4 清除缓冲区

使用 clear() 方法清除缓冲区。例如，以下代码清除 DirectByteBuffer 缓冲区中的数据：

```java
buffer.clear();
```

::: warning 内存需要手动释放

DirectByteBuffer通过虚引用(Phantom Reference)来实现堆外内存的释放，不受Java垃圾回收器的管理，因此需要手动释放。可以使用 Cleaner 类来释放 DirectByteBuffer 对象所使用的内存。例如，以下代码释放 DirectByteBuffer 对象占用的内存：

```java
Cleaner cleaner = ((DirectBuffer)buffer).cleaner();
cleaner.clean();
```

:::



E