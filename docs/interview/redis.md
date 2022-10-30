---
sidebar: 'auto'
---

# Redis

### 1. Redis有哪些数据类型

> [Redis Data Types](https://redis.io/docs/data-types/)

#### 1.1 [`string`](https://redis.io/docs/data-types/strings/)

数据结构: `SDS`,包括`len`:已用的长度，`alloc`: 分配的空间长度，`flags`,`buf[]`: 实际存储的内容

为什么不用原生`char`?  `SDS`记录了使用长度和分配空间大小，避免了遍历，降低开销

#### 1.2 [`list`](https://redis.io/docs/data-types/)

应用场景: 消息队列，文章列表

数据结构: 

- 双向链表(为了避免`ziplist`级联更新，采用`quicklist`+`ziplist`)
- 压缩列表

#### 1.3 [`set`](https://redis.io/docs/data-types/sets/)

应用场景: 用户标签，随机数

数据结构: 如果存储的都是`int`类型，则是`int set`，其他为`hash table`

- 哈希表
- 整数集合

#### 1.4 [`hash`](https://redis.io/docs/data-types/hashes/)

数据结构: 

- 哈希表
- 压缩列表

哈希冲突时采用链式哈希

**何时触发`rehash`？**

- 根据hash表的负载因子和能否进行`rehash`标识(`rehashidx`)判断
- 根据`RDB`和`AOF`执行情况，启用或者禁用`rehash`
- `rehash`扩容是扩2倍

**渐进式hash？**

当链长度过大时，采用渐进式rehash：

- 两个哈希表(`ht[0]`和`ht[1]`)交替使用
- 正常时写入到`ht[0]`,当`rehash`时将键值迁移到`ht[`]
- 完成后`ht[0]`释放，将`ht[1]`地址赋值给`ht[0]`

#### 1.5 [`sorted set`](https://redis.io/docs/data-types/sorted-sets/)

应用场景: 排行榜，点赞

数据结构：

- 哈希表: 存member和score的关系
- 跳表: 存key (当`zset`数据少是用`ziplist`，为了省内存)

#### 1.6 [`Stream`](https://redis.io/docs/data-types/streams/)

> A Redis stream is a data structure that acts like an append-only log. You can use streams to record and simultaneously syndicate events in real time.

类似于消息队列

#### 1.7 [`Geo Hash`](https://redis.io/docs/data-types/geospatial/)

存储地理位置

#### 1.8 [`bitmap`](https://redis.io/docs/data-types/bitmaps/)

位图，可用于签到等

#### 1.9 [`bitfield`](https://redis.io/docs/data-types/bitfields/)

#### 1.10 [`HyperLogLog`](https://redis.io/docs/data-types/hyperloglogs/)

基数近似统计，例如网络的uv

#### 1.11 基于模块进行扩展

> [Redis Modules](https://redis.io/docs/modules/)

- [`RedisBloom`](https://redis.io/docs/stack/bloom/): 布隆过滤器
- [`redis-cell`](https://github.com/brandur/redis-cell): 用于限流

### 2. [缓存过期和淘汰策略](https://redis.io/docs/manual/eviction/)

#### 2.1 过期策略

Redis采用定期过期和惰性过期

- 定期过期： 每隔一点时间，会扫描一定数量的`expires`字段中的部分key，并清除已过期的key
- 惰性过期： 在key被访问时，如果发现已过期，就从内存中删除

#### 2.2 淘汰策略

`maxmemory`：Redis启动时按需申请内存，且Redis不会超过`maxmemory`，如果系统内存快满了，有`swap`则`swap`，无`swap`则`OOM`,当趋近`maxmemory`时则进行缓存淘汰

- `noeviction `: 默认，不驱逐，新写入就报错
- `allkeys-`： 从所有的key中
  - `random`: 随机淘汰，希望请求符合均匀分布
  - `lru`： 最近最少淘汰，不确定时可采用，冷热数据交换
  - `lfu`: 最不经常使用
- `volatile-`: 从设置了过期时间的key中
  - `random`
  - `lru`
  - `lfu`
  - `ttl`: 根据过期时间，越早越先淘汰

### 3. [持久化](https://redis.io/docs/manual/persistence/)

> 持久化是指将数据写入到持久存储，例如磁盘

#### 3.1 有哪几种方式

- `No persistence`
- `RDB (Redis Databases)` : 在指定的时间间隔内执行数据的时间点快照
- `AOF (Append Only File)`: 记录每个写入操作，在服务启动时重放，重建原始数据，当日志变得过大时，Redis可以在后台重写日志
- `RDB+AOF`

#### 3.2 选择哪种方式

- 不能丢失: `RDB+AOF`
- 允许分级丢失: `RDB`
- 只用`AOF`时，选择`everysec`,在可靠性和性能之间平衡

#### 3.3 `RDB(bgsave)`的执行过程

`bgsave ` 或 `save 60 1000 `（每60秒至少更改了1000个键则save）,保存到`dump.rdb`二进制文件

1. `fork`主线程得到`bgsave`子进程
2. 主线程正常读数据，在写数据时，对数据生成副本并进行修改(`COW`，写时复制)
3. `bgsave`子进程读元数据写入到`RDB`文件

#### 3.4 `RDB`的优缺点

**优点**:

- 二进制文件，体积小易传输，最大化性能，适合灾难恢复，相比`AOF`更快重启

**缺点**:

- 会丢失最后一次快照后的数据
- 数据量很大时，`fork`会耗时

#### 3.5 `AOF`的执行过程

`AOF`是写后日志，记录的内容是`RESP`协议的数据，是命令日志

> 写后日志: 先执行命令，写入内存后写入日志
>
> 避免额外的检查开销，不阻塞当前写操作

#### 3.6 `AOF`写回磁盘的策略(`appendfsync`)

- `Always`: 每个命令执行完成，立刻同步将日志写回磁盘

- `EverySec`: 每个命令执行完成，先写到`AOF`内存缓冲，每个1秒写回磁盘

- `No`: 由操作系统控制何时将内存缓冲写回到磁盘

  |            | 写回时机 |      优点      |   缺点   |
  | :--------: | :------: | :------------: | :------: |
  |  `Always`  |   同步   | 可靠，基本不丢 | 影响性能 |
  | `EverySec` |   每秒   |    性能适中    | 丢失1秒  |
  |    `No`    |  OS控制  |     性能好     | 丢数据多 |

#### 3.7 `AOF`重写机制(`rewrite`)

> 解决日志文件太大的问题

将多次修改的命令，合并一个命令（例如: `set k 1`,` set k 2` => `set k 2`）

**不阻塞主线程**:

1. 执行重写时，主线程`fork`出后台的`bgrewriteaof`子进程
2. Redis将写操作写到AOF缓冲区
3. 新的AOF重写日志被写到重写日志的缓冲区，等拷贝数据都写完后，重写的最新操作写入到AOF日志

#### 3.8 `AOF`的优缺点

**优点**:

- 配置不同的写回策略保证数据丢失少
- 不容易损坏，即使某种原因没写完，`redis-check-aof`工具能够修复
- AOF日志易解析
- AOF日志可重写

**缺点**:

- AOF文件通常比同一数据集的RDB文件大
- 可能会比RDB慢

### 4. 高可用-主从复制

#### 4.1 主从复制的流程

1. 从库执行`replica of`，通过`psync`和主库建立连接，协商同步，保存主节点的信息
2. 主库同步数据(RDB)给从库
3. 从库清空现有数据，加载RDB
4. 主库发送`Repl Buffer`（新写入的命令）给从库，从库加载`Repl Buffer`

#### 4.2 如何分担全量复制时的主库压力

可以通过 **主-从-从**，将主库生成的RDB和传输RDB的压力以级联的方式分散到从库上

#### 4.3 主从库间网络断了怎么办

网络断了之后，主从库采用**增量复制**的方式继续同步

- 全量复制: 同步所有数据
- 增量复制: 把主从网络端连期间主库收到的命令同步从库

### 5. 高可用-哨兵

> 实现主从库切换的关键机制

#### 5.1 监控

周期性给所有主从库发送`PING`,检测是否正常运行

**主观下线**: 单哨兵认为下线

**客观下线**: 超半数哨兵认为下线

#### 5.2 选主

- 筛选: 根据从库的当前在线状态和历史网络连接状态过滤
- 打分: 从库优先级，从库复制进度，从库ID号

#### 5.3 通知

- 让从库执行`Replica of`，与新主库同步
- 通知客户端，与新主库连接

#### 5.4 哨兵集群

`sentinel monitor <master-name> <ip> <port> <quorum>`

只有订阅同一个频道的应用才能通过发布的消息进行消息交换

**哨兵-主库**: 基于`pub/sub`机制组成哨兵集群(`__sentinel__:hello`频道)

**哨兵-从库**: 哨兵向主库发送`info`命令，得知从库信息，建立连接

**客户端**: 基于`pub/sub`机制的客户端时间通知

#### 5.5 由哪个哨兵执行主从切换

发起投票，多数为leader

### 6. `Redis Cluster`(分片集群)

> 为了保存大量数据，由两种扩容方案：1.升级单Redis实例的资源配置，2.增加Redis实例个数

#### 6.1 数据切片和实例的对应分布关系

`Redis Cluster`采用哈希槽(`hash slot`)来处理数据和实例之间的关系

`CRC16(KEY) % 16384 = n`

其中: `CRC16 表示CRC16算法得到一个16bit的值，16385个哈希槽，n表示对应的实例`

#### 6.2 客户端如何定位数据

Redis实例会把自己的哈希槽信息通过`Gossip`发送给和它相连的其他实例，客户端收到哈希槽信息缓存在本地，请求时先算哈希槽

`hash slot`可能会重新分配: 1.实例由新增或删除，2.为了负载均衡

#### 6.3 `Moved`（重定向）和 `ASK`

客户端给一个实例发送数据读写操作时，实例上没有相应数据，客户端要再给一个新实例发送操作指令

假设`hash slot`重新分配，数据由`slot 1`迁移到`slot 2`，当客户端访问数据时，先从本地缓存中读到`slot 1`,

如果`slot 1`已迁移到`slot 2`，此时实例1将返回`Moved 1010 ip:port`，客户端再次请求到实例2，并更新本地缓存；

如果正在迁移中(部分迁移)，实例1将返回客户端`ASK 100 ip:port`，

> `ASK`表示`slot`数据还在迁移中，或者把锁请求的数据的最新实例地址返回给客户端

此时客户端向新实例发送`ASKING`,然后再发操作命令

> `Moved`: 会更新客户端缓存，永久向新实例发请求
>
> `Ask`： 不会更新客户端缓存，发一次请求给实例

#### 6.4 如何扩容/缩容

通过命令`redis-cli --cluster`

#### 6.5 什么是副本漂移

当master挂后，只有一个从机，从其他master中的多个(>=2)从机中选一个做主从

#### 6.6 [为什么是16483个哈希槽](https://github.com/redis/redis/issues/2576)

- 如果更多: Redis发送心跳包所有槽信息，使用16383K个会产生2kb的文件，更节省空间，一般来说，Redis集群不会超过1000个，16384个槽位足够用

- 如果更少: 8192个，节省的空间不多，且哈希冲突大

### 7. Redis为什么快

![](https://pbs.twimg.com/media/FMx3JZRUYAIWWKq?format=jpg&name=4096x4096)

#### 7.1 基于内存存储

内存读写优于磁盘

#### 7.2 线程模型(单线程、多路复用)

Redis的网络IO和键值对读写时单线程的，避免了多线程的开销，采用了**多路复用机制**

> 多路复用

#### 7.3 高效的数据结构



### 8. Redis只有单线程吗？

Redis中的网络IO，键值对读写是单线程，RDB、AOF等是其他线程，

Redis6.0 后采用网络I/O多线程出里网络请求，对于键值对读写仍是单线程

### 9. Redis6.0和7.0的新特性

### 10. 缓存异常

#### 10.1 缓存雪崩

突然间大量的key失效，或者redis重启，大量的请求打到数据库

**解决方案**：

- key设置均匀的过期时间
- redis宕机的情况，要采用高可用方案

#### 10.2 缓存击穿

某个热点key过期的瞬间，大量请求打到数据库

**解决方案**:

- 永不过期
- 互斥锁方案，在失效时不立即加载数据库， 而是使用`setnx`等成功的时候加载缓存和数据库

#### 10.3 缓存穿透

查询不存在的key,数据库中也不存在(穿透到数据库)，导致数据库压力过大甚至宕机

**解决方案**:

- 对查询结果为空的情况也进行缓存（空值或者默认值），ttl短些或者有数据时删除，但是会导致太多空值占用空间
- 引入布隆过滤器，不存在则返回

#### 10.4 `BigKey`

#### 10.5 `HotKey`

### 11. 缓存和数据库的一致性

缓存常用的读写模式是旁路缓存: 先读缓存，没有时再读数据库

- 延时双删

  更新时先删除缓存，再更新数据库，等一段时间后再删除缓存。但是需要评估延时多久，在分布式高并发情况下很难评估

- 引入消息队列

  先更新数据库，MySQL产生`binlog`,使用Canal订阅`binlog`，将消息发送到MQ，通过ack异步重试保证删除缓存

### 12. 基于Redis的分布式锁

#### 12.1 `sexnx lock val / del lock`

如果解锁异常，会发生死锁 => 设置过期时间

#### 12.2 `setnx lock val / expire lock n`

不能保证原子性

#### 12.3 `set lock $uuid ex n nx / lua:get+del`

锁的时间不好评估 => 增加守护进程续期

#### 12.4 [Redisson](https://github.com/redisson/redisson/wiki/8.-分布式锁和同步器)

通过Lua脚本(原子性)，对hash(锁的存储结构)进行增减(可重入)，采用看门狗机制进行续期，释放锁是采用发布/订阅的方式

#### 12.5 [redlock](https://github.com/wujunwei/redlock)

> 当发生主从切换时锁失效，采用`redlock`方案（前提: 至少有5个主库实例）

客户端获取当前时间戳`t1`，依次向5个redis实例发起加锁请求，且每个请求有超时时间。

如果某一个失败，则立即向下一个申请；

如果大于半数个锁成功，则获取时间戳`t2`

加锁不成功时则通过lua向全部节点发起释放锁请求