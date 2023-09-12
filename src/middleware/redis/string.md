# String

[数据类型: string](https://redis.io/docs/data-types/strings)

[命令: string](https://redis.io/commands/?group=string)

[命令源码 t_string.c](https://github.com/Spectred/redis/blob/spectred_6.2/src/t_string.c)

[数据结构 sds](https://github.com/Spectred/redis/blob/spectred_6.2/src/sds.h)



## 数据结构
- 如果value是64位有符号整数，Redis保存为8字节的Long类型整数(int编码方式)
- 如果value中包含字符串，Redis使用SDS(Simple Dynamic String)结构体保存
