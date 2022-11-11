---
sidebar: 'auto'
sidebarDepth: 1
---
# 分布式

## 1. 分布式锁

> [深度剖析：Redis分布式锁到底安全吗？看完这篇文章彻底懂了！](https://mp.weixin.qq.com/s/s8xjm1ZCKIoTGT3DCVA4aw)
>
> [Redisson-8.分布式锁和同步器](https://github.com/redisson/redisson/wiki/8.-%E5%88%86%E5%B8%83%E5%BC%8F%E9%94%81%E5%92%8C%E5%90%8C%E6%AD%A5%E5%99%A8)

分布式锁实现多个进程对共享资源的互斥。实现方式上可以采用第三方中间件来做，如`MySQL`、`ZooKeeper`、`Redis`、`etcd`等

### 1.1 基于关系型数据库(MySQL)的分布式锁

悲观锁： `select id from t where col = xx for update`，会一直阻塞到事务提交，

乐观锁: `select id,old_version from t where col = xx`和 `update t set ver = old_version+1 where col=xx and ver=old_verison`

### 1.2 基于Redis的分布式锁

#### 1.2.1 `setnx lock v` 和`del lock`

**加锁**时客户端1加锁成功 `SETNX lock 1 => 1`,客户端2加锁失败`SETNX lock 1 => 0`

**解锁**时客户端1 `del lock => 1`

**存在的问题**: 当客户端1中没能释放锁(如业务异常或进程崩溃)，导致其他客户端一直都拿不到锁，导致死锁 （这种情况需要人工介入解锁）

#### 1.2.2 `set lock v ex n nx`

为了避免死锁的问题，添加过期时间自动释放锁，用一行命令保证原子性，如`set lock 1 ex 10 nx => OK`,其他客户端尝试加锁时返回`(nil)`

**存在的问题:** 

A. 过期时间可能不准确，设置少了导致提前释放锁，设置多了会加锁时间过长(一般没这个问题，锁可以释放时可以指定del lock,但是会导致B问题)，

B. 一个客户端可能释放了其他客户端锁持有的锁

#### 1.2.3 `set lock $uuid ex n nx`

对于客户端释放其他客户端持有锁的问题，可以将val设置为一个随机且唯一的值(只有加锁的客户端知道，也可以是线程号)

**加锁**时: `set lock 45r8iu ex 10 nx` 

**解锁**时: 采用Lua脚本保证原子性，先判断是否为当前客户端加锁，是的话进行删除

```lua
// 判断锁是自己的，才释放
if redis.call("GET",KEYS[1]) == ARGV[1]
then
    return redis.call("DEL",KEYS[1])
else
    return 0
end
```

#### 1.2.4 使用[Redisson](https://github.com/redisson/redisson)

为了解决锁可能提前过期的问题，可以在加锁时设置过期时间，然后通过守护线程定时检测锁的失效时间，如果快过期了但是业务操作还未完成，就自动进行续期

> 此时，只通过Redis解决分布式锁的方案如下：
>
> 1. 🔐加锁时，采用`set lock $uuid ex 10 nx`，来保证互斥性，自动失效性，只能加锁客户端解锁，并且开启守护线程检测失效，根据业务决定是否需要续期
> 2. 🔓解锁时, 通过Lua脚本保证原子性，先判断是否为客户单加锁，是的话才解锁

**`Redisson`的分布式锁原理是怎样的？**

**加锁：**

Redisson首先通过hash选择一个redis节点，然后执行加锁的Lua脚本来保证原子性，设置一个hash结构的锁 `hset lock $uuid:1 1`,其中$uudi:1表示完成了加锁，val的1表示加锁加了一次(可重入)，

当其他客户段想获取锁时执行同样的脚本先判断key lock是否存在，在判断是否有客户端2的ID，以及锁的剩余时间，进行自旋，

在加锁成功的同时会启用一个`watch dog`的后台线程，每隔10秒进行检查，判断是否需要续期

**解锁：**

由于是可重入锁，当val值为0时表示不再持有锁，通过`pub/sub`的方式进行释放锁执行`del lock`

#### 1.2.5 RedLock

RedLock的大概流程是先有多于5个的Redis实例，然后分别向各个实例请求加锁，当大于半数加锁成功就认为是加锁成功，释放锁时操作所有节点

但是要考虑加锁的耗时，网络等原因

### 1.3 基于ZooKeeper的分布式锁

ZooKeeper实现的分布式锁: 

1. 客户端1创建临时节点（会产生惊群效应，一般使用临时有序节点） 如`/lock`
2. 客户端2尝试创建临时节点失败，加锁失败，
3. 客户端1操作共享资源完成后，删除`/lock`节点，释放锁，客户端2通过watcher机制发现可以加锁

**可能有的问题**: ZooKeeper长时间收不到客户端的心跳(例如GC或者网络延迟)，也会把临时节点删除，导致其他客户端提前拿到了锁，但是原客户端认为自己有锁

> ZooKeeper和Redis实现分布式锁的优劣
>
> ZooKeeper实现简单，不需要考虑锁的过期时间，通过`watcher`加锁失败可以等待锁的释放，实现乐观锁，
>
> 但是ZooKeeper的部署和运维成本高，性能上不如Redis，也存在着客户端与ZooKeeper长时间失联导致的锁提前释放的问题



## 2. 分布式缓存

如何保证缓存和数据库一致性

## 3. 分布基础理论

## 4. 分布式事务

## 5. 分布式服务

## 6. 分布式锁

## 7. 消息队列

## 8. 分布式存储

## 9. 分布式高可用
