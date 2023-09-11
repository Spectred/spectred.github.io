# Redis概览

## Redis全景图

*图片来源:https://time.geekbang.org/column/article/268247*

![](https://static001.geekbang.org/resource/image/79/e7/79da7093ed998a99d9abe91e610b74e7.jpg?wh=2001*1126)

![](https://static001.geekbang.org/resource/image/70/b4/70a5bc1ddc9e3579a2fcb8a5d44118b4.jpeg?wh=2048*1536)



## Redis目录结构

![](https://static001.geekbang.org/resource/image/59/35/5975c57d9ac404fe3a774ea28a7ac935.jpg?wh=2238x811)

```
redis
├── redis.conf          # Redis配置文件
├── sentinel.conf       # 哨兵配置文件
├── deps                # Redis依赖的第三方代码库
├── src                 # 功能模块的代码文件
├── tests               # 功能模块测试和单元测试
└── utils               # 辅助性功能
```

```
deps
├── hdr_histogram
├── hiredis         # C语言版客户端代码
├── jemalloc        # 替换glibc的内存分配器
├── linenoise       # 替代readline功能
└── lua             # lua脚本代码
```

```
tests
├── cluster					# Cluster功能测试
├── integration				# 主从复制功能测试
├── sentinel				# 哨兵功能测试
├── unit					# 单元测试
├── support
├── test_helper.tcl
├── tmp
├── modules
├── helpers
├── instances.tcl
└── assets
```

```
src
├── modules     模块示例代码
├────────────────────────────────────────
├── 初始化和主体控制流程
├── server.h    | server.c
├── config.h    | config.c
├── connection.h | connection.c
├────────────────────────────────────────
├── 基于事件驱动机制的网络通信框架
├── ae.h        | ae.c
├── ae_epoll.c
├── ae_evport.c
├── ae_kqueue.c
├── ae_select.c
├── anet.h      | anet.c
├────────────────────────────────────────
├── 客户端的创建、消息回复等
├── networking.c
├────────────────────────────────────────
├── 数据结构
├── sds.h       | sds.c     | sdsalloc.h
├── adlist.h    | adlist.c
├── ziplist.h   | ziplist.c 
├── dict.h      | dict.c
├── intset.h    | intset.c
├── zipmap.c    | zipmap.h
├── quicklist.h | quicklist.c
├── geo.h | geo.c | geohash.h | geohash.c | geohash_helper.h | geohash_helper.c
├── hyperloglog.c
├── bitops.c
├── stream.h
├────────────────────────────────────────
├── 数据类型
├── t_string.c
├── t_hash.c
├── t_list.c
├── t_set.c
├── t_zset.c
├── t_stream.c
├────────────────────────────────────────
├── 数据库操作
├── db.c
├────────────────────────────────────────
├── 内存优化
├── evict.c
├── expire.c
├── lazyfree.c
├── zmalloc.h   | zmalloc.c
├────────────────────────────────────────
├── 持久化
├── rdb.h       | rdb.c
├── aof.c
├── redis-check-rdb.c
├── redis-check-aof.c
├────────────────────────────────────────
├── 主从复制
├── sentinel.c
├── cluster.h   | cluster.c
├────────────────────────────────────────
├── 辅助功能
├── latency.h   | latency.c
├── slowlog.h   | slowlog.c
├── redis-benchmark.c
├────────────────────────────────────────
├── 其他
├── acl.c
├── asciilogo.h
├── atomicvar.h
├── bio.h	| bio.c
├── blocked.c
├── childinfo.c
├── cli_common.h  | cli_common.c
├── connhelpers.h
├── crc16.c
├── crc16_slottable.h
├── crc64.h	| crc64.c
├── crcspeed.h	| crcspeed.c
├── debug.c
├── debugmacro.h
├── defrag.c
├── endianconv.h  | endianconv.c
├── fmacros.h
├── gopher.c
├── help.h
├── listpack.h	| listpack.c
├── listpack_malloc.h
├── localtime.c
├── lolwut.h	| lolwut.c
├── lolwut5.c
├── lolwut6.c
├── lzf.h
├── lzfP.h
├── lzf_c.c
├── lzf_d.c
├── memtest.c
├── mkreleasehdr.sh
├── module.c
├── monotonic.h | monotonic.c
├── mt19937-64.h  | mt19937-64.c
├── multi.c
├── notify.c
├── object.c
├── pqsort.c
├── pqsort.h
├── pubsub.c
├── rand.h  | rand.c
├── rax.h   | rax.c
├── rax_malloc.h
├── redis-benchmark.c
├── redis-cli.c
├── redisassert.h
├── redismodule.h
├── release.c
├── release.h
├── replication.c
├── rio.c
├── rio.h
├── scripting.c
├── setcpuaffinity.c
├── setproctitle.c
├── sha1.c
├── sha1.h
├── sha256.h    | sha256.c
├── siphash.c
├── solarisfixes.h
├── sort.c
├── sparkline.c
├── sparkline.h
├── syncio.c
├── testhelp.h
├── timeout.c
├── tls.c
├── tracking.c
├── util.c
├── util.h
├── version.h
└────────────────────────────────────────
```
