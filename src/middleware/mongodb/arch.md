# MongoDB - 架构

## 1. 数据模型

-  内嵌：将相关联的数据保存在同一个文档结构中，文档结构允许一个字段或者一个数组内的值作为一个嵌套的文档

- 引用：引用方式通过存储数据引用信息来实现两个不同文档之间的关联，应用程序可以通过解析这些数据引用来访问相关数据

### 1.1 如何选择数据模型

- 选择内嵌
  - 数据对象之间有包含关系，一般是数据对象之间有一对多或者一对一的关系
  - 需要经常一起读取的数据
  - 有map reduce / aggregation需求的数据放在一起，这些操作只能操作单个collection
- 选择引用
  - 当内嵌数据会导致很多数据重复，并且读性能的优势不足以覆盖数据重复的弊端
  - 需要表达比较复杂的多对多关系
  - 大型层次结果数据集 嵌套不要太深

## 2. 存储引擎

存储引擎是Mongo的核心组件，负责管理数据如何存储在硬盘和内存上。支持的存储引擎有:MMAPv1,WiredTiger和InMemory。

InMemory存储引擎用于数据只存储在内存中，只将少量的元数据和诊断日志存储在磁盘中，由于不需要磁盘的IO就能获取所需的数据，大幅度降低了数据的延迟。

默认引擎: WiredTiger

### 2.1 WiredTiger优势

- 文档空间分配方式

  使用BTree存储，而MMAPv1线性存储，需要Padding

- 并发级别

  文档级别锁，而MMAPv1使用表级锁

- 数据压缩

  snappy和zlib,而MMAPV1无压缩，节省空间

- 内存使用

  可以指定内存的使用大小

- 缓存使用

  使用二阶缓存WiredTiger Cache ,File System Cache来保证磁盘上的数据最终一致性，而MMAPv1只有journal日志

### 2.2 WiredTiger包含的文件和作用

- WiredTiger.basecfg: 存储基本配置信息，与 ConfigServer有关系
- WiredTiger.lock: 定义锁操作
- table*.wt: 存储各张表的数据
- WiredTiger.wt: 存储table* 的元数据
- WiredTiger.turtle: 存储WiredTiger.wt的元数据
- journal: 存储WAL(Write Ahead Log)

### 2.3 WiredTiger存储引擎实现原理

**写请求**

WiredTiger的写操作会默认写入 Cache ,并持久化到 WAL (Write Ahead Log)，每60s或Log文件达到2G做一
 次 checkpoint (当然我们也可以通过在写入时传入 j: true 的参数强制 journal 文件的同步 ，writeConcern{ w: , j: , wtimeout: }) 产生快照文件。WiredTiger初始化时，恢复至最新的快照状态，然后再根据WAL恢复数据， 保证数据的完整性。

Cache是基于BTree的，节点是一个page，root page是根节点，internal page是中间索引节点，leaf page真正存 储数据，数据以page为单位读写。WiredTiger采用Copy on write的方式管理写操作(insert、update、 delete)，写操作会先缓存在cache里，持久化时，写操作不会在原来的leaf page上进行，而是写入新分配的 page，每次checkpoint都会产生一个新的root page

**checkpoint流程**

	1.对所有的table进行一次checkpoint，每个table的checkpoint的元数据更新至WiredTiger.wt 
	2.对WiredTiger.wt进行checkpoint，将该table checkpoint的元数据更新至临时文件 WiredTiger.turtle.set
	3.将WiredTiger.turtle.set重命名为WiredTiger.turtle
	4.上述过程如果中间失败，WiredTiger在下次连接初始化时，首先将数据恢复至最新的快照状态，然后根据WAL恢复 数据，以保证存储可靠性

**Journaling**

在数据库宕机时 , 为保证 MongoDB 中数据的持久性，MongoDB 使用了 Write Ahead Logging 向磁盘上的 journal 文件预先进行写入。除了 journal 日志，MongoDB 还使用检查点(checkpoint)来保证数据的一致性， 当数据库发生宕机时，我们就需要 checkpoint 和 journal 文件协作完成数据的恢复工作

1. 在数据文件中查找上一个检查点的标识符 
2. 在 journal 文件中查找标识符对应的记录 
3. 重做对应记录之后的全部操作