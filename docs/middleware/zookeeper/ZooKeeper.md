# ZooKeeper

> [官网](http://zookeeper.apache.org/index.html)

[toc]

## 一. ZooKeeper系统模型

#### 1.1 ZNode

在ZooKeeper中，数据信息保存在数据节点上，节点被称为**ZNode**，是ZooKeeper中最小数据单位。

所有ZNode按照层次化组织，形成ZNode Tree。

![zk_ZNodeTree](./imgs/zookeeper/zk_ZNodeTree.png)

##### 1.1.1 ZNode的类型

持久性节点(Persistent)、临时性节点(Ephemeral)、顺序性节点(Sequential)

- **持久节点:** 节点被创建后一直存在服务器，直到删除操作主动清除（例如:/tmp）
- **持久顺序节点**: 带有顺序的持久节点。（持久节点后边带有数字后缀表示顺序）(例如/tmp0000000002)
- **临时节点**: 当客户端会话结束，节点就会被删除，临时节点不能创建子节点
- **临时顺序节点**: 带有顺序的临时节点。（临时节点带有数字后缀表示顺序）

**事务ID(ZXID)**

在ZK中事务是指鞥能够改变ZK服务器状态的操作，包括数据节点的创建删除更新等。

对于每个事务请求，ZK都会为其分配一个全局唯一的事务ID: **ZXID**，通常是一个64位数字。每个ZXID对应一次更新操作，从ZXID中可以间接是被出ZK处理这些更新操作请求的全局顺序。

##### 1.1.2 ZNode的状态信息

```bash
[zk: localhost:2181(CONNECTED) 5] ls -s /zookeeper
[config, quota] 											# 数据内容
cZxid = 0x0														# 节点被创建时的ZXID-CreateZxid
ctime = Thu Jan 01 08:00:00 CST 1970  # 节点创建时间
mZxid = 0x0														# 节点最后一次修改时的ZXID-ModifiedZxid
mtime = Thu Jan 01 08:00:00 CST 1970  # 节点最后一次修改时间
pZxid = 0x0														# 节点的子节点列表最后一次被修改时的ZXID(仅限子节点列表变更才会更新，变更子节点内容不会更新)
cversion = -2													# 节点的版本号
dataVersion = 0												# 内容版本号
aclVersion = 0												# ACL版本
ephemeralOwner = 0x0									# 创建临时节点时的会话SessionID,持久节点时为0
dataLength = 0												# 数据长度
numChildren = 2												# 直系子节点数
```

#### 1.2 Watcher

ZK使用**Watcher机制**实现分布式数据的发布/订阅功能

ZK允许客户端向服务端注册一个Watch监听，当服务端的一些指定事件触发了这个Watcher，那么就会向指定客户端发送一个事件通知来实现分布式的通知功能。

![zk_Watcher](./imgs/zookeeper/zk_Watcher.png)

ZK的Watcher机制主要包括: **客户端线程**、**客户端WatcherManager**、**ZooKeerper服务器**

**流程:**

1. 客户端在向ZK服务器注册的同时，会将Watcher对象存储在客户端的WatchManager当中
2. 当ZK服务器触发Watcher事件后，会向客户端发送通知
3. 客户端线程从WatcherManager中取出对应的Watcher对象来执行回调逻辑

#### 1.3 ACL

**ACL**(Access Control List)控制机制来保证数据安全.

**Scheme(权限模式):ID(授权对象):Permission(权限)**

##### 1.3.1 Scheme 权限模式

1. **IP**: 通过IP地址粒度来进行权限控制，也可支持按照网段方式进行配置(例如: 192.168.0.220或者 192.168.0.1/24)
2. **Digest**: 使用“username:password”形式的权限标识进行配置
3. **World**: 所有用户都可以在不进行权限校验的情况下操作ZK数据，相当于Digest:“world:anyone”
4. **Super**: 超级用户可以对任意ZK上的数据节点进行任何操作

##### 1.3.2 ID 授权对象

指权限赋予的用户或一个指定实体，例如IP地址或机器等。在不同的权限模式下，授权对象是不同的，授权模式与授权对象的关系

| 权限模式 | 授权对象                                                     |
| :------: | :----------------------------------------------------------- |
|    IP    | IP地址或者IP段，例如192.168.0.220或者 192.168.0.1/24         |
|  Digest  | 自定义，username:BASE64(SHA-1(username:password)),例如zs:fafsadgf= |
|  Super   | 只有一个ID: anyone                                           |
|  Supper  | 超级用户                                                     |

##### 1.3.3 权限

**C(CREATE)**: 数据节点的创建权限，允许授权对象在该节点下创建子节点

**R(READ)**: 数据节点的读取权限，允许授权对象访问改数据节点并读取数据内容和子节点列表

**W(WRITE)**: 数据节点的更新权限，允许授权对象对该数据节点进行更新操作

**D(DELETE)**: 子节点的删除权限，允许授权对象删除该数据节点的子节点

**A(ADMIN)**: 数据节点的管理权限，允许授权对象对该数据节点进行ACL相关的设置操作

## 二. ZooKeeper命令操作

```bash
zkCli.sh  # 连接本地服务器
zkCli.sh -server ip:port  # 连接指定服务器
```

### 1.帮助信息

```bash
[zk: localhost:2181(CONNECTED) 1] help
ZooKeeper -server host:port -client-configuration properties-file cmd args
	addWatch [-m mode] path # optional mode is one of [PERSISTENT, PERSISTENT_RECURSIVE] - default is PERSISTENT_RECURSIVE
	addauth scheme auth
	close
	config [-c] [-w] [-s]
	connect host:port
	create [-s] [-e] [-c] [-t ttl] path [data] [acl]
	delete [-v version] path
	deleteall path [-b batch size]
	delquota [-n|-b] path
	get [-s] [-w] path
	getAcl [-s] path
	getAllChildrenNumber path
	getEphemerals path
	history
	listquota path
	ls [-s] [-w] [-R] path
	printwatches on|off
	quit
	reconfig [-s] [-v version] [[-file path] | [-members serverID=host:port1:port2;port3[,...]*]] | [-add serverId=host:port1:port2;port3[,...]]* [-remove serverId[,...]*]
	redo cmdno
	removewatches path [-c|-d|-a] [-l]
	set [-s] [-v version] path data
	setAcl [-s] [-v version] [-R] path acl
	setquota -n|-b val path
	stat [-w] path
	sync path
	version
```

### 2. 创建节点

`create [-s] [-e] [-c] [-t ttl] path [data] [acl]`

-s或-e指定节点特性顺序或临时节点，不指定时创建持久节点；acl控制权限控制

#### 2.1 创建顺序节点

```bash
[zk: localhost:2181(CONNECTED) 5] create -s /test mydata
Created /test0000000000
```

#### 2.2 创建临时节点

```bash
[zk: localhost:2181(CONNECTED) 6] create -e /test-temp mydata
Created /test-temp
```

客户端会话结束后自动删除

#### 2.3 创建永久节点

```bash
[zk: localhost:2181(CONNECTED) 1] create /test mydata
Created /test
```

### 3. 读取节点

**列出指定节点下的第一级的所有子节点**

`ls [-s] [-w] [-R] path`

```bash
[zk: localhost:2181(CONNECTED) 3] ls /
[test, test0000000000, zookeeper]
```

**获取指定节点的数据内容和属性信息**

`get [-s] [-w] path`

```
[zk: localhost:2181(CONNECTED) 15] get -s /test
mydata
cZxid = 0x28
ctime = Sat Dec 04 17:57:23 CST 2021
mZxid = 0x28
mtime = Sat Dec 04 17:57:23 CST 2021
pZxid = 0x28
cversion = 0
dataVersion = 0
aclVersion = 0
ephemeralOwner = 0x0
dataLength = 6
numChildren = 0
```

### 4. 更新节点

`set [-s] [-v version] path data`

```bash
[zk: localhost:2181(CONNECTED) 17] set /test qwer

[zk: localhost:2181(CONNECTED) 19] get -s /test
qwer
cZxid = 0x28
ctime = Sat Dec 04 17:57:23 CST 2021
mZxid = 0x29
mtime = Sat Dec 04 18:02:54 CST 2021
pZxid = 0x28
cversion = 0
dataVersion = 1 # 数据版本+1
aclVersion = 0
ephemeralOwner = 0x0
dataLength = 4
numChildren = 0
```

### 5. 删除节点

`delete [-v version] path`

```bash
[zk: localhost:2181(CONNECTED) 21] delete /test
```

若删除的节点存在子节点，需要先删除子节点，再删除父节点

## 三.  应用场景

### 1. 数据发布/订阅

配置

ZK采用Push / Pull 结合模式: 客户端向服务端注册自己需要关注的节点，一旦该节点的数据发生变更，服务端就会向相应的客户端发送Watcher事件通知，客户端接收到消息通知之后，需要主动到服务端获取最新的数据。

如果将配置信息存放到ZK上进行集中管理，通常情况下，应用在启动的时候都会主动到ZK服务端上进行一次配置信息的获取，同时在指定节点上注册一个Watcher监听，当配置信息发生变更，服务端都会实时通知到所有订阅的客户端，从而达到实时获取最新配置信息的目的。

**示例: 数据库信息切换-配置中心**

#### 1.1 配置存储

```bash
[zk: localhost:2181(CONNECTED) 36] get /configserver/app1/database_config
db.url=localhost:3306
db.username=root
db.password=mysql
```

![zk_配置存储](./imgs/zookeeper/zk_配置存储.png)

#### 1.2 配置获取

集群中每台机器在启动初始化阶段，首先会从上面的ZK配置节点上读取数据库信息，同时客户端还需要在该配置节点上注册一个数据变更的Watcher监听，一旦发生节点数据变更，所有订阅的客户端都能够获取到数据变更通知

#### 1.3 配置变更

在系统运行中，对ZK中的节点内容更新，ZK通知发送到客户端，每个客户端收到变更通知后，可以重新进行最新数据的获取

### 2. 命名服务

ZooKeeper提供的命名服务功能能够帮助应用系统通过一个资源引用的方式来实现对资源的定位和使用（顺序节点）

![zk_命名服务](./imgs/zookeeper/zk_命名服务.png)

**基本步骤**

在对应分类下创建一个顺序节点，创建完毕后会返回完整的节点名,例如id0000001,客户端添加业务属性即可获取全局唯一ID

### 3. 集群管理

客户端可以对ZK的数据节点注册Watcher监听(发布/订阅)，临时节点会随着客户端与服务器会话失效删除。

利用如上两点可以实现集群机器存活监控系统，若监控系统在/clusterservers节点上注册一个Watcher监听，那么但凡进行动态添加机器的操作，就会在/clusterServers节点下创建一个临时节点: /clusterServers/[hostname]，监控系统就能实时检测机器的变动情况。

### 4. Master选举

利用ZK会保证客户端无法重复创建一个已经存在的数据节点

### 5. 分布式锁

// TODO 链接到分布式篇

### 6. 分布式队列

// TODO 链接到分布式篇

## 四. ZAB协议

> ZooKeeper中采用**ZAB**(ZooKeeper Atmoic Broadcast ZooKeeper原子消息广播)协议作为**数据一致性**的核心算法

ZAB协议的核心是定义了对于会改变ZK服务器状态的事务请求的处理方式。

所有事务请求还需有一个全局唯一的Leader服务器来协调处理，其他服务器成为Follower服务器。Leader服务器负责讲一个客户端事务请求转化为一个事务提议（Proposal）,并将该提议分发给集群中所有的Follower服务器，之后Leader服务器需要等待所有Follower服务器反馈，一旦超半数的Follower服务器进行了正确反馈，那么Leder就会再次向所有的Follower服务器分发Commi消息，要求其将前一个提议进行提交

![](./imgs/zookeeper/zk_zab_core.png)

### 1. 崩溃恢复模式

当整个服务框架启动过程中，或者是Leader服务器出现网络中断、崩溃退出或者重启等异常情况是，ZAB协议就会进入崩溃服务模式，同时选举产生新的Leader服务器。

但选举产生了新的Leader服务器，同时集群中已经有过半的机器与该Leader服务器完成了状态同步之后，ZAB协议就会有退出恢复模式。

其中状态同步是数据同步，用来保证集群中过半的机器能够和Leader服务器的数据状态保持一致

### 2. 消息广播模式

当集群中已经有过半的Follower服务器完成了和Leader服务器的状态同步，那么整个服务框架就可以进入消息广播模式。

当一台同样遵守ZAB协议的服务器启动后加入到集群中，如果此时集群中已经存在一个Leader服务器在负责进行消息广播，那么加入的服务器就会自觉地进入数据恢复模式：找到Leader所在的服务器，并与其进行数据同步，然后一起参与到消息广播流程中去。

ZooKeeper中值允许唯一的一个Leader服务器来进行事务请求的处理，Leader服务器在接受到客户端的事务请求后，会生成对应的事务提议并发起一轮广播协议，而如果集群中的其他机器收到客户端的事务请求后，那么这些非Leader服务器首先将这个事务请求转发给Leader服务器

### 3. 基本特性

ZAB协议需要确保哪些已经在Leader服务器上提交的事务最终被所有服务器都提交

ZAB协议需要确保丢弃哪些只在Leader服务器上被提交的事务

// TODO....

## 五. 服务器角色

// TODO....

## 六. 服务器启动

// TODO...

## 七. Leader选举

// TODO...





## X. 实战



------



## X. 实战

> [Apache ZooKeeper™ Releases](http://zookeeper.apache.org/releases.html)

### 1. 单机环境搭建

#### 1.1 环境准备

```bash
# 下载
wget https://downloads.apache.org/zookeeper/zookeeper-3.6.3/apache-zookeeper-3.6.3-bin.tar.gz
# 解压
tar -zxvf apache-zookeeper-3.6.3-bin.tar.gz
# 重命名
mv apache-zookeeper-3.6.3-bin zookeeper-3.6.3
# 创建data目录
mkdir -p zookeeper-3.6.3/data
# 查看当前目录结构
$ tree /opt/zookeeper/zookeeper-3.6.3 -L 1
zookeeper-3.6.3/
├── bin
├── conf
├── data
├── docs
├── lib
├── LICENSE.txt
├── NOTICE.txt
├── README.md
└── README_packaging.md

# 重命名默认配置文件
mv conf/zoo_sample.cfg conf/zoo.cfg

# 更改配置
# 更改dataDir
sed -i "s/^dataDir=\/tmp\/zookeeper/dataDir=\/opt\/zookeeper\/zookeeper-3\.6\.3\/data/g" conf/zoo.cfg
```

#### 1.2 启动与停止

```bash
# 启动
$ bin/zkServer.sh start
ZooKeeper JMX enabled by default
Using config: /opt/zookeeper/zookeeper-3.6.3/bin/../conf/zoo.cfg
Starting zookeeper ... STARTED

# 查看状态
$ bin/zkServer.sh status
ZooKeeper JMX enabled by default
Using config: /opt/zookeeper/zookeeper-3.6.3/bin/../conf/zoo.cfg
Client port found: 2181. Client address: localhost. Client SSL: false.
Mode: standalone

# 停止
$ bin/zkServer.sh stop
ZooKeeper JMX enabled by default
Using config: /opt/zookeeper/zookeeper-3.6.3/bin/../conf/zoo.cfg
Stopping zookeeper ... STOPPED

```

### 2. 伪集群搭建

#### 2.1 环境准备

```bash
# 创建目录zkcluster
mkdir -p /opt/zookeeper/zkcluster
# 解压
tar -zxvf apache-zookeeper-3.6.3-bin.tar.gz -C zkcluster/
# 重命名
mv apache-zookeeper-3.6.3-bin/ zookeeper01
# 复制
cp -r zookeeper01/ zookeeper02
cp -r zookeeper01/ zookeeper03	

# 在01、02、03下创建data和logs目录
mkdir -p zookeeper01/data; mkdir -p zookeeper01/data/logs
mkdir -p zookeeper02/data; mkdir -p zookeeper02/data/logs
mkdir -p zookeeper03/data; mkdir -p zookeeper03/data/logs

# 查看当前目录结构
$ tree /opt/zookeeper/zkcluster/zookeeper0*/data -L 1
/opt/zookeeper/zkcluster/zookeeper01/data
└── logs
/opt/zookeeper/zkcluster/zookeeper02/data
└── logs
/opt/zookeeper/zkcluster/zookeeper03/data
└── logs

# 重命名配置文件(3个节点)
mv conf/zoo_sample.cfg conf/zoo.cfg

# 修改zoo.cfg
clientPort=2181
dataDir=/opt/zookeeper/zkcluster/zookeeper01/data
dataLogDir=/opt/zookeeper/zkcluster/zookeeper01/data/logs
---
clientPort=2182
dataDir=/opt/zookeeper/zkcluster/zookeeper02/data
dataLogDir=/opt/zookeeper/zkcluster/zookeeper02/data/logs
---
clientPort=2183
dataDir=/opt/zookeeper/zkcluster/zookeeper03/data
dataLogDir=/opt/zookeeper/zkcluster/zookeeper03/data/logs

# ! 创建文件myid
echo "1" > zookeeper01/data/myid
echo "2" > zookeeper02/data/myid
echo "3" > zookeeper03/data/myid
# ! zoo.cfg配置clientPort和集群服务器IP列表
# server.服务器ID=服务器IP:服务器之间通信端口:服务器之间投票选举端口
server.1=127.0.0.1:2881:3881
server.2=127.0.0.1:2882:3882
server.3=127.0.0.1:2883:3883
```

#### 2.2 启动集群

```bash
zookeeper01/bin/zkServer.sh start
zookeeper02/bin/zkServer.sh start
zookeeper03/bin/zkServer.sh start
```

### 3. 客户端连接

#### 3.1 Java客户端

// TODO

#### 3.2 ZkClient

// TODO

#### 3.3 Curator

// TODO







 
