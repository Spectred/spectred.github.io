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

