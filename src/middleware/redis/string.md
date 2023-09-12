# String

[数据类型: string](https://redis.io/docs/data-types/strings)

[命令: string](https://redis.io/commands/?group=string)

[命令源码 t_string.c](https://github.com/Spectred/redis/blob/spectred_6.2/src/t_string.c)

[数据结构 sds](https://github.com/Spectred/redis/blob/spectred_6.2/src/sds.h)



## 数据结构
- 如果value是64位有符号整数，Redis保存为8字节的Long类型整数(int编码方式)
- 如果value中包含字符串，Redis使用SDS(Simple Dynamic String)结构体保存

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
