## 备份和恢复

> 任意时间点备份恢复=全量备份(mongodump/复制数据库文件/文件系统快照) + oplog

#### `mongodump`

```
mongodump -h HOST -d DB_NAME -o 备份的数据存放位置
```

#### `mongorestore`

```
mongorestore -h HOST:PORT -d DB_NAME PATH
```

#### 备份和恢复的重要选项

`mongodump`：

- --oplog 只对全库导出有效，不能指定-d

  幂等性，已存在的数据，重做oplog不会重复；不存在的数据重做oplog就可以进入数据库

`mongoresotre`:

- --oplogReplay: 可以重放oplog.bson中的操作内容
- --oplogLimit: 回放的时间节点，此时间之前的数据可恢复

通过oplog查询误操作的最后时间

```
bsondump oplog.rs.bson | grep ""op":"d"" |head
```

或

```
db.oplog.rs.find({"op":"d"}).sort({"ts":=1})
```

#### 全量加增量备份和恢复案例

>删除复制集中原来的数据文件目录 重新建立数据目录
>
>重新启动复制集中的实例 进行复制集的配置
>
>var cfg ={"_id":"cluster_id",
>
>"protocolVersion" : 1,
>
>"members":[
>
>{"_id":1,"host":"ip:37017","priority":10},
>
>{"_id":2,"host":"ip:37018"},
>
>{"_id":3,"host":"ip:37019"}
>
>]
>
>}
>
>rs.initiate(cfg)

##### 全量备份

```
./bin/mongodump --host=HOST --port=PORT--out=/root/fullbackup
```

##### 增量备份

模拟插入数据和更新后

```
/bin/mongodump --host=HOST --port=PORT -d local -c oplog.rs -o=/root/oplog_bak
```

##### 恢复全量数据

先删除所有数据

```
/bin/mongorestore --host=HOST --port=PORT --dir=/root/fullbackup
```

##### 恢复数据到指定的时间点

```
改变oplog.rs.bson 为 oplog.bson 删除oplog.rs.metadata.bson
mv /root/oplog_bak/local/oplog.rs.bson /root/oplog_bak/local/oplog.bson
rm /root/oplog_bak/local/oplog.rs.metadata.json -rf

找出第一次更新的时间
use local
db.oplog.rs.find({"op" : "u"}).sort({"ts":1})
恢复到指定的时间点的数据
./bin/mongorestore --host=HOST --port=PORT --oplogReplay --oplogLimit "实际查询出来的时间" /root/oplog_bak/local
1606651336

./bin/mongorestore --host=HOST --port=PORT --oplogReplay --oplogLimit "1606651336:4" /root/oplog_bak/local
```

##### 恢复所有的增量数据

```
./bin/mongorestore --host=HOST --port=PORT --oplogReplay /root/oplog_bak/local
```

#### 定时备份

##### 编写备份脚本 `/root/backup/mongobk.sh`

`chmod +x /root/backup/mongobk.sh`

```
#!/bin/sh
# dump 命令执行路径，根据mongodb安装路径而定
DUMP=/root/mongodb/bin/mongodump
# 临时备份路径
OUT_DIR=/root/backup/mongod_bak/mongod_bak_now
# 压缩后的备份存放路径
TAR_DIR=/root/backup/mongod_bak/mongod_bak_list
# 当前系统时间
DATE=`date +%Y_%m_%d%H%M%S`
# 数据库账号
#DB_USER=user
# 数据库密码
#DB_PASS=password
# 代表删除7天前的备份，即只保留近 7 天的备份
DAYS=7
# 最终保存的数据库备份文件
TAR_BAK="mongod_bak_$DATE.tar.gz"
cd $OUT_DIR
rm -rf $OUT_DIR/*
mkdir -p $OUT_DIR/$DATE
$DUMP -h 127.0.0.1 --port 37017 -o $OUT_DIR/$DATE
# 压缩格式为 .tar.gz 格式
tar -zPcvf $TAR_DIR/$TAR_BAK $OUT_DIR/$DATE
# 删除 7 天前的备份文件
find $TAR_DIR/ -mtime +$DAYS -delete
exit
```

##### 编辑crontab

```
crontab -e

# 每天凌晨2点30分执行备份
30 2 * * * /root/backup/mongobk.sh
```

##### 查看crontab的状态

`service crond status`

##### 启动定时任务和加入开机自启动

```
# 启动定时任务
service crond start
# 加入开机自动启动
chkconfig --level 35 crond on
```

##### 查看定时任务和删除定时任务

```
crontab -l
crontab -r 
crontab -e
```

