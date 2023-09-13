# String

[数据类型: string](https://redis.io/docs/data-types/strings)

[命令: string](https://redis.io/commands/?group=string)

[命令源码 t_string.c](https://github.com/Spectred/redis/blob/spectred_6.2/src/t_string.c)

[数据结构 sds](https://github.com/Spectred/redis/blob/spectred_6.2/src/sds.h)



## 数据结构
- 如果value是64位有符号整数，Redis保存为8字节的Long类型整数(int编码方式)
- 如果value中包含字符串，Redis使用SDS(Simple Dynamic String)结构体保存

### 数据结构定义

在[sds.h](https://github.com/Spectred/redis/blob/unstable/src/sds.h)中定义如下结构体(包括sdshdr5,sdshdr8,sdshdr16,sdshdr32,sdshdr64)
```C
struct __attribute__ ((__packed__)) sdshdr8 {
    uint8_t len;            /* buf的已用长度,占4个字节 */
    uint8_t alloc;          /* buf的实际分配长度,占4个字节, 排除了header和null终止符 */
    unsigned char flags;    /* SDS类型,和SDS_TYPE_MASK计算出是sdshdr5/8/16/32/64 */
    char buf[];             /* 实际数据 */
};
```
其中`__attribute__ ((__packed__))`表示 告诉编译器在对结构体进行内存对齐时不要进行字节对齐填充，采用紧凑的方式分配内存。默认如果变量5个字节，不够8字节也会分配8字节，使用后只有5个字节。
::: note
和JDK中的@Contended的异同
:::

### RedisObject
![https://time.geekbang.org/column/article/279649]https://static001.geekbang.org/resource/image/34/57/3409948e9d3e8aa5cd7cafb9b66c2857.jpg)
![https://time.geekbang.org/column/article/279649]https://static001.geekbang.org/resource/image/ce/e3/ce83d1346c9642fdbbf5ffbe701bfbe3.jpg)

### SDS关键函数
[sds.c](https://github.com/Spectred/redis/blob/spectred_6.2/src/sds.c)

😈图中函数可能和新版本有出入
![http://redisbook.com/](https://s2.loli.net/2023/09/13/3nT8eFVHgpXckGC.jpg)

::: info Redis为什么使用SDS，而不是char*
背景：C语言中使用char*字符数组来实现字符串，char*指针指向字符数组起始位置，\0表示字符串的结尾

为什么不用char*字符数组（因/0带来的问题）：
1. 不能存储任意格式数据（例如二进制）
2. 操作字符串获取长度需要遍历到\0，效率不高 O(N)

为什么使用SDS(SDS的优势)（需要掌握SDS结构）：
1. len + buf
    1.1 由于使用len属性表示长度，可以规避\0的问题，即能存储二进制（buf[])，获取长度直接使用属性值，O（1）
    1.2 拼接字符串会检查空间大小是否满足，避免缓冲区溢出
2. flags + alloc +len
    2.1 有多种类型的SDS(flags表示类型，len alloc区分长度)，存储长度不同的字符串
    2.2 __attribute__ ((__packed__))编译优化，采用紧凑方式分配内存
    2.3 字符串内部编码优化，有int raw embstr三种



个人理解：从“降本增效”的角度来看（降低内存使用，增加操作效率）
1. 降本：多种结构头存储不同大小字符串，紧凑型分配内存，内部编码优化
2. 增效：使用len提升效率,避免遍历到\0，基于长度的操作（如复制、追加）提升效率
3. 功能上可以存储二进制数据

引用《Redis设计与实现》中的图:
![http://redisbook.com/](https://s2.loli.net/2023/09/13/PUng9ikxzwZIRJ1.jpg)
:::

### Redis中的String有哪些不足



