## 安全认证

### 1. 用户相关操作

#### 1.1 创建用户

```js
> use admin
> db.createUser({
    "user": "demo",
    "pwd": "demo",
    "roles":[
        {"role": "root","db":"admin"}
    ]
})
```

#### 1.2 修改密码

```js
db.changeUserPassword('demo','demo')
```

#### 1.3 用户添加角色

```js
 db.grantRolesToUser('demo',[{role:'角色名',db:'数据库名'}])
```

#### 1.4 以auth方式启动mongod

`mongod -f mongo.conf --auth`

或在mongo.conf中添加`auth=true`

#### 1.5 验证用户

```
db.auth('demo','demo')
```

#### 1.6 删除用户

```
 db.dropUser('demo')
```

### 2. 角色

数据库内置的角色

```
read：允许用户读取指定数据库
readWrite：允许用户读写指定数据库
dbAdmin：允许用户在指定数据库中执行管理函数，如索引创建、删除，查看统计或访问
system.profile
userAdmin：允许用户向system.users集合写入，可以找指定数据库里创建、删除和管理用户
clusterAdmin：只在admin数据库中可用，赋予用户所有分片和复制集相关函数的管理权限
readAnyDatabase：只在admin数据库中可用，赋予用户所有数据库的读权限
readWriteAnyDatabase：只在admin数据库中可用，赋予用户所有数据库的读写权限
userAdminAnyDatabase：只在admin数据库中可用，赋予用户所有数据库的userAdmin权限
dbAdminAnyDatabase：只在admin数据库中可用，赋予用户所有数据库的dbAdmin权限
root：只在admin数据库中可用。超级账号，超级权限
dbOwner：库拥有者权限，即readWrite、dbAdmin、userAdmin角色的合体
```

各个类型用户对应的角色

```
数据库用户角色：read、readWrite
数据库管理角色：dbAdmin、dbOwner、userAdmin
集群管理角色：clusterAdmin、clusterManager、clusterMonitor、hostManager
备份恢复角色：backup、restore；
所有数据库角色：readAnyDatabase、readWriteAnyDatabase、userAdminAnyDatabase、
dbAdminAnyDatabase
超级用户角色：root
这里还有几个角色间接或直接提供了系统超级用户的访问（dbOwner 、userAdmin、
userAdminAnyDatabase
```

> 数据库连接
>
> mongod://账号:密码@IP:PORT/数据库名
