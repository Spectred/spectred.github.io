### 1. 体系架构

![](https://dev.mysql.com/doc/refman/8.0/en/images/mysql-architecture.png)

### 2. 一条SQL查询语句如何执行

1. 客户端通过**连接器**连接到数据库，连接器负责管理连接和权限验证
2. **查询缓存**，不建议使用(对表更新时表的所有查询缓存都被清空)，8.0后删除了缓存功能
3. **分析器**对SQL语句进行词法分析和语法分析
4. **优化器**执行计划生成和索引选择
5. **执行器**调用存储引擎提供的读写接口返回结果

### 3. 有哪些存储引擎

通过`mysql> SHOW ENGINES;`或者`mysql> SELECT * FROM INFORMATION_SCHEMA.ENGINES;`查看有哪些引擎

```mysql
mysql>  SELECT * FROM INFORMATION_SCHEMA.ENGINES;
+--------------------+---------+----------------------------------------------------------------+--------------+------+------------+
| ENGINE             | SUPPORT | COMMENT                                                        | TRANSACTIONS | XA   | SAVEPOINTS |
+--------------------+---------+----------------------------------------------------------------+--------------+------+------------+
| InnoDB             | DEFAULT | Supports transactions, row-level locking, and foreign keys     | YES          | YES  | YES        |
| MRG_MYISAM         | YES     | Collection of identical MyISAM tables                          | NO           | NO   | NO         |
| MEMORY             | YES     | Hash based, stored in memory, useful for temporary tables      | NO           | NO   | NO         |
| BLACKHOLE          | YES     | /dev/null storage engine (anything you write to it disappears) | NO           | NO   | NO         |
| MyISAM             | YES     | MyISAM storage engine                                          | NO           | NO   | NO         |
| CSV                | YES     | CSV storage engine                                             | NO           | NO   | NO         |
| ARCHIVE            | YES     | Archive storage engine                                         | NO           | NO   | NO         |
| PERFORMANCE_SCHEMA | YES     | Performance Schema                                             | NO           | NO   | NO         |
| FEDERATED          | NO      | Federated MySQL storage engine                                 | NULL         | NULL | NULL       |
+--------------------+---------+----------------------------------------------------------------+--------------+------+------------+
9 rows in set (0.01 sec)
```

### 4. `InnoDB`和`MyISAM`的区别

- 从功能上看，`InnoDB`支持事务，行锁，外键
- 从存储文件上看，`InnoDB`的表结构文件是`.frm`，数据文件是`.idb`,`MyISAM`的表数据是`.myd`，索引文件是`myi`
- 从索引结构上看，`InnoDB`是聚簇，`MyISAM`非聚簇

### 5. `InnoDB`架构

![](https://dev.mysql.com/doc/refman/8.0/en/images/innodb-architecture-8-0.png)

#### 5.1 [内存架构](https://dev.mysql.com/doc/refman/8.0/en/innodb-in-memory-structures.html)

1. [Buffer Pool](https://dev.mysql.com/doc/refman/8.0/en/innodb-buffer-pool.html)

   > 知道如何利用缓冲池将经常访问的数据保存在内存中是MySQL调优的一个重要方面

   以16k的`Page`为单位，采用链表管理`Page`

   `Page`分为:

   - `Free Page`: 空闲页，未被使用  => 空闲缓冲区: `Free List`
   - `Clean Page`: 数据没有被修改过  => 正在使用的缓冲区: `LRU List`
   - `Dirty Page`: 脏页，被修改过，和磁盘不一致  => 需要刷新到磁盘缓冲区: Flush List

2. [Change Buffer](https://dev.mysql.com/doc/refman/8.0/en/innodb-change-buffer.html)

   更新一条记录时，

   - 若在`Buffer Pool`中存在，则直接在`Buffer Pool`中修改；

   - 若在`Buffer Pool`中不存在，则直接在`Change Buffer`中进行内存操作，当下次查询时，会先从磁盘中读取，再从`Change Buffer`中读取，并合并，最终载入到`Buffer Pool`

   `Change Buffer`仅适用于**非唯一普通索引**，若设置了索引的唯一性，修改时必须做唯一性校验，查磁盘

3. [Adaptive Hash](https://dev.mysql.com/doc/refman/8.0/en/innodb-adaptive-hash.html)

   自适应哈希索引，`InnoDB`会自动根据访问的频率的模式来建立哈希索引

4. [Log Buffer](https://dev.mysql.com/doc/refman/8.0/en/innodb-redo-log-buffer.html)

   日志缓冲区，保存`Redo Log`、`Undo Log`，定期或者写满时刷新到磁盘，节省磁盘IO

#### 5.2 [磁盘架构](https://dev.mysql.com/doc/refman/8.0/en/innodb-on-disk-structures.html)

> 包含表，表空间，索引，双写缓冲，Redo Log，Undo Log

### 6. MySQL中有哪些日志

#### 6.1 [Binary Log](https://dev.mysql.com/doc/refman/8.0/en/binary-log.html)

`bin log`是MySQL Server层的日志，是记录所有数据库表结构变更和表数据修改的二进制日志，不会记录`select`和`show`,以事件形式记录，也包含了执行的消耗时间

**[记录格式](https://dev.mysql.com/doc/refman/8.0/en/binary-log-formats.html):**

- `ROW`: 日志中记录每一行数据被修改的情况，然后在`slave`端对相同的数据进行修改

  优点: 记录每一行数据的修改细节，完全实现主从数据同步的数据恢复

  缺点: 批量操作会产生大量日志

- `STAMENT`: 每一条被修改数据的SQL都会记录到`master`的`bin log`中，`slave`在复制时对SQL进行解析执行

  优点: 日志量小，减少磁盘IO，提升存储和恢复速度

  缺点: 在某些情况下会导致主从数据不一致，例如`now()`

- `MIXED`: 混合使用，优先使用`STAMENT`保存`bin log`，对于无法复制的操作使用`ROW`模式保存`bin log`

**使用场景:**

- 主从复制

- 数据恢复

  `mysqlbinlog`可以指定时间或时间位置恢复，做增量备份和恢复

  > `mysqldump`可以定期全部备份数据库数据

#### 6.2 [Redo Log](https://dev.mysql.com/doc/refman/8.0/en/innodb-redo-log.html)

重做日志基于磁盘，用于崩溃恢复期间更正不完整事务，以循环方式写入(`ib_logfile0`、`ib_logfile1`)，记录所有对`Buffer Pool`修改的日志

随着事务操作的执行就会产生`Redo Log`，在事务提交时将产生的`Redo Log`写入`Log Buffer`,等事务操作的脏页写入到磁盘后，`Redo Log`可重用复写，是`WAL`写前日志

作用: 实现事务的**持久性**，防止在发生故障的时间点，尚有脏页未写入表`ibd`文件，在重启MySQL服务时，根据`Redo Log`重做，从而达到事务的未入磁盘的数据持久化

- `bin Log`和`Redo Log`的区别

|                  bin log                   |            Redo Log            |
| :----------------------------------------: | :----------------------------: |
|       MySQL Server层日志，二进制文件       |        InnoDB引擎的日志        |
|           逻辑日志(记录更新过程)           | 物理日志(记录数据更新状态内容) |
|       追加写(写完写下一个，不会覆写)       |    循环写(日志空间大小固定)    |
| 主从复制，数据恢复(没有自动Crash Safe能力) |  服务器宕机后事务数据自动恢复  |

#### 6.3 [Undo Logs](https://dev.mysql.com/doc/refman/8.0/en/innodb-undo-logs.html)

撤销日志，事务开始之前保存的被修改的数据备份，可回滚事务

在事务开始之前产生，在事务提交时，将事务对应的`Undo Log`放到删除列表中，之后通过后台线程`Purge Thread`进行回收

属于逻辑日志，记录一个变化的相反过程，例如`INSERT`对应`DELETE`

存储: 采用`段`的方式管理和记录，有1024个回滚段

`show variables like '%innodb_undo%';`

**作用:** 

- 实现事务的原子性

  利用`Undo Log`中的备份数据恢复到事务开始之前的状态

- 实现`MVCC`

  事务未提交之前，`Undo Log`保存了未提交之前的数据，`Undo Log`中的数据可作为数据旧版本快照工其他事务进行快照读

#### 6.4 [Slow Query Log](https://dev.mysql.com/doc/refman/8.0/en/slow-query-log.html)

慢查询日志，超过 [long_query_time](https://dev.mysql.com/doc/refman/8.0/en/server-system-variables.html#sysvar_long_query_time) 秒的日志会记录，需要主动开启，可以通过 [mysqldumpslow](https://dev.mysql.com/doc/refman/8.0/en/mysqldumpslow.html) 命令进行查看(也可以直接查看,例如`cat slow.log`)，日志中主要包括的属性: 具体的语句，记录的时间，执行的时间等

### 7. 有哪些索引

#### 7.1 按照数据存储和键值逻辑关系

- 聚簇索引  -  数据在索引数上(主键)
- 非聚簇索引  -  数据不在索引数上(非主键)

#### 7.2 按照索引的存储结构划分

- B+ Tree
- Hash
- Full Text
- R Tree

#### 7.3 按照应用层次划分

- 主键索引
- 唯一索引
- 普通索引
- 复合索引

### 8. 回表，覆盖索引，索引下推分别是什么

#### 8.1 回表

通过非聚簇索引得到主键，再到聚簇索引中查询数据

#### 8.2 覆盖索引

查询列被索引覆盖，不必从数据表中查询，例如`select name from tb where name ='x';`  其中`name`字段有索引

#### 8.3 [索引下推](https://dev.mysql.com/doc/refman/8.0/en/index-condition-pushdown-optimization.html)

将部分Server层的索引交给引擎层处理，减少回表次数，索引下推只适用于非聚簇索引

### 9. 索引失效场景

- 隐式转换
- 内置函数
- 数学运算(加减乘除)
- `IS NULL` 或 `IS NOT NULL`
- `!=` 或者 `NOT IN`
- 条件中包含`OR` ,可能失效(OR 的一方无所索引，会导致全表查询)
- 不符合最左前缀，联合索引不符合
- MySQL估计全表比索引快
- 过滤性不好，例如性别，不适合做索引

### 10. SQL语句的优化

先获取到慢查询日志，通过`Explain`分析执行计划

- `type`

  `NULL` > `const` > `eq_ref` > `ref` > `range` > `index` > `ALL`

  - `const`: 主键/唯一索引等值查询
  - `eq_ref`: 多表`join`,前表每一个记录都只能匹配后表的一个记录
  - `ref`: 非唯一索引等值查询
  - `range`: 索引范围查询
  - `index`: 基于索引全表扫描

- `key`: 真正用的索引

- `rows`: 需要扫描多少行，越少越好

- `key_len`: 越小越好

- `Extra`: 额外信息

  - `Using Index`: 覆盖索引
  - `Using Where`: 回表
  - `Using temporay`: 临时表，分组
  - `Using filesort`: `order by` 没索引
  - `Using join buffer`:  联表条件没索引

### 11. MySQL如何优化

#### 1. 参考官方文档: [Optimizaition](https://dev.mysql.com/doc/refman/8.0/en/optimization.html)

#### 2. 要符合开发规范

- 避免`select *`
- 减少`join`
- 不在有限数据建立索引

#### 3. SQL语句优化(慢查询，执行计划)

#### 4. 表设计优化

- 禁止`null`字段
- 避免`text`大字段
- 自增主键

#### 5. 数据库配置

- 全局内存参数
- 线程内存参数

#### 6. 硬件升级(内存，磁盘，网络)

#### 7. 减少数据库的访问(本地缓存，分布式缓存)

#### 8. 架构优化

- 主从  -  读写分离
- 分库分表

> 分页优化 `select * from t where id >= (select id from t2 limit 10000,1) limit 10`

### 12. 事务

> 事务可分为本地事务，分布式事务等，这里只描述MySQL本地事务

#### 12.1 原子性-Automicity  (Redo Undo)

事务是一个原子单元，数据的修改要么全部执行要么全部执行

**如何实现：**

数据的修改要经过: 修改->`Buffer Pool`修改->刷盘

- 事务没有提交，但是`Buffer Pool`中的脏页刷盘了，使用`Undo`撤销
- 事务已经提交，但是`Buffer Pool`中的脏页未刷盘，使用`Redo`生效

#### 12.2 持久性-Durability (Redo)

事务一旦提交，它对数据的改变是永久性的，后续的操作或故障不应该对其有影响，不是丢失

实现上和`WAL`写前日志有关，`Redo Log`在系统宕机重启时保证持久性

> 原子性保证逻辑上的持久性，存储引擎的刷盘保证物理上持久

#### 12.3 一致性-Consistency

事务开始之前和结束之后，数据库的完整性没有被破坏

- 数据一致性: 通过A、I、D共同保证
- 约束一致性: 创建表时所指定的外键、唯一索引等约束

#### 12.4 隔离性-Isolation

一个事务的执行不能被其他事务干扰，并发事务隔离

`show variables like 'transaction_isolation'`

**隔离级别:**

- 读未提交 `Read Uncomitted`

  可能读到其他会话未提交事务修改数据

- 读已提交 `Read Comitted`

  只能读到其他会话中已提交的数据

- 可重复度 `Repateble Read`

  同一个事务的多一个实例在并发时，会读到相同的数据

- 串行化 `Serializable`

  串行执行

**并发事务问题:**

- 脏读: 读取到另一个事务修改，但未提交的数据
- 不可重复读: 一个事务中多次读取同一张记录不一致
- [幻读(幻行](https://dev.mysql.com/doc/refman/8.0/en/innodb-next-key-locking.html)): 在同一查询在不同时间产生不同的行，例如`select`执行两次，但第二次返回了第一次没有返回的行

|          | 脏读 | 不可重复读 | 幻读 |
| -------- | :--: | :--------: | :--: |
| 读未提交 |  ✅   |     ✅      |  ✅   |
| 读已提交 |  ✖️   |     ✅      |  ✅   |
| 可重复读 |  ✖️   |     ✖️      |  ✅   |
| 串行化   |  ✖️   |     ✖️      |  ✖️   |

### 13. [MVCC](https://dev.mysql.com/doc/refman/8.0/en/innodb-multi-versioning.html) - 多版本并发控制

适用于`RC`、`RR`的隔离级别，适合读读、读写；如果发生读写冲突仍需要用锁

**隐藏字段**: 

- `DB_ROW_ID`: 递增的id,非必须，没有主键时有`row_id`
- `DB_TRX_ID`: 操作该数据事务的事务ID
- `DB_ROLL_PTR`: 指向该回滚段的`undo log`

**事务版本号**: 事务每次开启前，都会从数据库获得一个自增的事务ID，用来判断事务执行的顺序

**版本链**: 多个事务并行操作某一行数据时，不同事务对改行的修改产生多个版本，通过回滚指针形成的链表

**快照读**：读取数据的可见版本(有旧版本)，不加锁，普通的`select`都是快照读

**当前读**：读取数据的最新版本，显示加锁的都是当前读，例如`select * from t where id >1 [for update | lock in share mode]`

**Read View**： 事务执行SQL语句时产生的读视图，在InnoDB中，每个SQL语句执行前都会有一个`ReadView`,用来做可见性判断（判断当前事务可见哪个版本的数据）

#### 13.1 基于MVCC的查询记录流程

1. 获取事务id （事务自己的版本号），获取`Read View`
2. 查询得到的数据，和`Read View`中事务版本号进行比较
3. 如果不符合`ReadView`可见性规则则从`Undo Log`中查询历史快照
4. 返回符合规则的数据

#### 13.2 MVCC解决不可重复读

- 在`RC`，同事务每次查询产生一个新的`Read View`副本，产生不可重复读
- 在`RR`,一个事务里只获取一次`Read View`，副本共用，保证可重复读

#### 13.3 MVCC是否彻底解决了幻读？

否，事务a先select,事务b insert,加gaplock，commit后gaplock释放，a再select和第一次一样，不加条件的update会作用到所有行，a再select回出现b的新行，且被a修改

### 14. MySQL中有哪些锁:lock:

> :shark: [InnoDB Locking](https://dev.mysql.com/doc/refman/8.0/en/innodb-locking.html) 中介绍有共享锁锁、独占锁、意向锁，插入意向锁，记录锁，间隙锁，临键锁，自增锁，空间索引锁

> 锁是加在索引记录上的

#### 14.1 加锁范围

1. **全局锁**

   全库的逻辑备份

2. **表级锁**

   - 表锁: `lock tables ... read / write`
   - MDL: 访问表时自动加锁

3. **行锁**(`Row Lock`)

   - `Record Lock`: 记录锁，锁定单个记录的锁
   - `Gap Lock`：间隙锁，锁定索引记录的间隙(防幻读)，`(a,b)`
   - `Next-Key Lock`：临键锁 `(a,b]`

**如何加锁？**

> 来源: https://blog.csdn.net/m0_67261762/article/details/125522033  侵删

- `update ... where id = 1`
  - 如果不存在id = 1的数据，则加锁范围:`(1,10]`
  - 如果存在id = 1 的数据，则`Next-Key Lock`退化为`Record Lock`，即`[1]`

- `update ... where id > 1 and id <10` , 加间隙锁

- `update ... where id >1 and id <= 10`,加临键锁

假设表t中已有数据如下，要执行`update ... where age = 5`

| id   | Name | Age  |
| ---- | ---- | ---- |
| 1    | a    | 1    |
| 10   | b    | 10   |

- 如果age是索引，将产生3个索引范围`(-∞,1]`，`(1,10]`，`(10,+∞)`
  - 由于`age=5`的记录不存在，且在`(1,10]`区间内，则对`(1,10]`的范围加锁
  - 如果`age=5`的记录已存在，先对`(1,5]`加锁，再向右遍历到不满足条件位置`(5,10]`,综合就是`(1,10]`

#### 14.2 乐观锁和悲观锁

- 乐观锁: 对数据记录的版本进行对比，更新提交时进行冲突检测，使用版本号或者时间戳

  `updte t set c = c+1 where version = 2;`

- 悲观锁: 修改前进行锁定，S/X都属于悲观锁

#### 14.3 操作类型

- IS: 意向读锁，事务打算在表中的单个行上设置共享锁，`select ... for share`
- IX: 意向写锁，表级锁，事务打算在表中的单个行上设置独占锁， `select ... for update`
- S: 读锁，行级锁，允许持有锁的事务进行读
- X: 写锁，行级锁，允许持有锁的事务进行更新、删除行

### 15. [死锁](https://dev.mysql.com/doc/refman/8.0/en/innodb-deadlocks.html)

查看死锁日志: `show engine innodb status \G`

查看锁状态变量: `show status like 'innodb_row_lock%' \G`

### 16. MySQL集群架构

#### 16.1 主从模式

数据可以从一个MySQL服务器主节点复制到一个或多个从节点

必要条件: 1.从库连通主库，2.主从`server_id`不同，3.主库开启`binlog`

实现原理: 

1. 主库将数据的变更操作记录到`binlog`,`BinlogDump Thread`接到写入请求后，读取`binlog`信息推送给从库的`IO Thread`
2. 从库的`IO Thread`读取主库的`binlog`,并写入到从库的`Relay Log`
3. 从库的`SQL Thread`检测到`Relay Log`的变更请求，解析`Relay Log`的内容在从库中执行

由于上述都是异步操作，一般成为**异步复制**

异步主从复制存在的问题和解决:

- 主库宕机后，数据可能丢失 => **[半同步复制](https://dev.mysql.com/doc/refman/8.0/en/replication-semisync.html)**: 让主库在某一个时间点等待，等到从库的ack，收到后才提交

- 从库只有一个`SQL Thread`,主库压力大时从库复制延迟 => **并行复制**: 对`SQL Thread`采用多线程

>  使用读写分离架构需要注意主从同步延迟和读写路由分配机制的问题

**主从同步延迟**:

- 写后立刻读： 在写入数据库后的一段时间内在主库读

- 二次查询: 先从从库读，读不到读主库

- 根据业务处理

  实时性高的读主库，不高的读从库

**读写路由分配机制**:

- 基于编程和配置实现
- 基于服务器端代理中间件的实现
  - [MySQL Router](https://dev.mysql.com/doc/mysql-router/8.0/en/)
  - [MyCat2](http://www.mycat.org.cn)
  - [ShardingSphere](https://shardingsphere.apache.org)

#### 16.2 双主模式

> 避免主从的单点故障；两台服务器互为主从，双方复制
>
> 避免ID冲突更新丢失：双主单写

[MHA](https://code.google.com/archive/p/mysql-master-ha/)

### 17. 关于分库分表

#### 17.1 拆分方式

- 纵向拆分

  分库分表: 解决表过多，表字段过度的问题

  - 优点： 业务清晰，规则明确，易维护和扩展，便于冷热分离
  - 缺点:  主键荣誉，引起`join`的复杂度，事务处理复杂，存在单表过大

- 横向拆分

  解决表中记录过多

  拆分规则: `Range`,`Hash`

  - 优点: 不存在单库大数据高并发性能瓶颈，提高稳定和负载
  - 缺点: 跨库`join`性能差，分片事务一致性，数据扩容难度和维护量大

#### 17.2 主键策略

- UUID
- 数据库ID
- Redis生成ID
- [Snowflake](https://github.com/twitter-archive/snowflake)：41bit毫秒数，10bit机器id，12bit流水号，0

#### 17.3 分片策略

- 基于范围(`Range`): 优点-扩容无需迁移，缺点-冷热不均
- 哈希取模(`Hash`): 优点-分配均匀，缺点-扩容时大量迁移
- 一致性哈希（哈希环）

#### 17.4 扩展方案

- 横向: 一个库变多个库-加机器
- 纵向: 优化机器性能

#### 17.5 扩容方案

- 停机

- 平滑扩容

  新增两个库配置双主同步，配置双主双写，清理多余数据
