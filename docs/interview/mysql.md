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