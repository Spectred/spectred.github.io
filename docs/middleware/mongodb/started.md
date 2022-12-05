# MongoDB - 快速开始

> [官网](https://www.mongodb.com/docs/)

## 1. 安装服务端

[install mongodb](https://www.mongodb.com/docs/v4.2/tutorial/install-mongodb-on-red-hat-tarball/)

```shell
$ wget https://fastdl.mongodb.org/linux/mongodb-linux-x86_64-rhel70-4.2.23.tgz
$ tar -zxvf mongodb-linux-x86_64-rhel70-4.2.23.tgz
$ mv mongodb-linux-x86_64-rhel70-4.2.23 mongodb-4.2.23 ; cd mongodb-4.2.23/

# 新建配置文件mongo.conf
dbpath=/data/mongo/
port=27017
bind_ip=0.0.0.0
# fork=true
logpath=/data/mongo/MongoDB.log
logappend=true
auth=false

# 指定配置文件启动
$ ./bin/mongod -f mongo.conf
about to fork child process, waiting until server is ready for connections.
forked process: 1487
child process started successfully, parent exiting
```

## 2. 客户端-mongo shell

```sh
$ ./bin/mongo --host=localhost --port=27017
> db.version()
4.2.23
```

## 3. 客户端-可视化

DataGrip