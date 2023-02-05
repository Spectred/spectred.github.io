## 1. 在CentOS中安装Redis(基于源码)

### 0. 环境

```
/etc/hosts

node1  192.168.249.101
node2  192.168.249.102
node3  192.168.249.103
```



#### 1. 安装Redis

[官方文档-从源码安装](https://redis.io/docs/getting-started/installation/install-redis-from-source/)

```bash
 #!/bin/bash
yum -y install gcc automake autoconf libtool tcl

cd /opt
wget https://github.com/redis/redis/archive/7.0.5.tar.gz 

tar -xf redis-7.0.5.tar
cd /opt/redis-7.0.5

make MALLOC=libc

# make test
make install
```

#### 2. 搭建主从环境（一主两从）

#### 2.1 主库(node1)

`vim redis.conf`

```
daemonize yes
# bind 127.0.0.1 -::1
protected-mode no
```

#### 2.2 从库(node2,node3)

```
daemonize yes
# bind 127.0.0.1 -::1
protected-mode no
replicaof node1 6379
```

### 3. 搭建哨兵集群(node1,node2,node3)

`vim sentinel.conf`

```
daemonize yes
```

`$ redis-sentinel /opt/redis-7.0.5/sentinel.conf`





