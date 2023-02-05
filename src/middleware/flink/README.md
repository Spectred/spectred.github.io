# Flink

![](https://flink.apache.org/img/flink-header-logo.svg)

[Apache Flink](https://flink.apache.org/zh/)

​	Apache Flink是一个框架和分布式处理引擎，用于对无界和有界数据流进行有状态计算。Flink被设计在所有常见的集群环境中运行，以内存执行速度和任意规模来执行计算

![](https://flink.apache.org/img/flink-home-graphic.png)

**特点**：

* 批流一体：统一批处理、流处理

* 分布式：Flink程序可以运行在多台机器上
* 高性能：处理性能比较高
* 高可用：Flink支持高可用性（HA）
* 准确：Flink可以保证数据处理的准确性

[**应用场景**](https://flink.apache.org/zh/usecases.html)：

​	主要应用于流式数据分析场景

* 实时ETL

  集成流计算现有的诸多数据通道和SQL灵活的加工能力，对流式数据进行实时清晰、归并和结构化处理；同时，对离线数仓进行有效的补充和优化，并为数据实时传输提供可计算通道。

* 实时报表

  实时化采集、加工流式数据存储；实时监控和展现业务、客户各类指标，让数据化运营实时化。

* 监控预警

  对系统和用户行为进行实时监测和分析，以便及时发现危险行为

* 在线系统

  实时计算各类数据指标，并利用实时结果及时调整在线系统的相关策略，在各类内容投放、智能推送领域有大量的应用

  

**核心组成**：

![](https://s2.loli.net/2023/01/27/rUZokgbXvPtKjdp.png)

* Deploy层：

  * 可以启动单个JVM，让Flink以Local模式运行
  * Flink也可以以Standalone 集群模式运行，同时也支持Flink ON YARN，Flink应用直接提交到YARN上面运行
  * Flink还可以运行在GCE（谷歌云服务）和EC2（亚马逊云服务）

* Core层（Runtime）：在Runtime之上提供了两套核心的API，DataStream API（流处理）和DataSet API（批处理）

* APIs & Libraries层：核心API之上又扩展了一些高阶的库和API

  * CEP流处理
  * Table API和SQL
  * Flink ML机器学习库
  * Gelly图计算

  

**生态发展**：

![](https://s2.loli.net/2023/01/27/YURB6AKIrsafLOy.png)

* **输入Connectors（左侧部分）**

  流处理方式：包含Kafka（消息队列）、AWS kinesis（实时数据流服务）、RabbitMQ（消息队列）、NIFI（数据管道）、Twitter（API）

  批处理方式：包含HDFS（分布式文件系统）、HBase（分布式列式数据库）、Amazon S3（文件系统）、MapR FS（文件系统）、ALLuxio（基于内存分布式文件系统）

* **输出Connectors（右侧部分）**

  流处理方式：包含Kafka（消息队列）、AWS kinesis（实时数据流服务）、RabbitMQ（消息队列）、NIFI（数据管道）、Cassandra（NOSQL数据库）、ElasticSearch（全文检索）、HDFS rolling file（滚动文件）

  批处理方式：包含HBase（分布式列式数据库）、HDFS（分布式文件系统）



**处理模型：流处理和批处理**

​    **无限流处理：**

* 输入的数据没有尽头，像水流一样源源不断
* 数据处理从当前或者过去的某一个时间 点开始，持续不停地进行

​    **有限流处理：**

* 从某一个时间点开始处理数据，然后在另一个时间点结束

* 输入数据可能本身是有限的（即输入数据集并不会随着时间增长），也可能出于分析的目的被人为地设定为有限集（即只分析某一个时间段内的事件）

  Flink封装了DataStream API进行流处理，封装了DataSet API进行批处理。

  同时，Flink也是一个批流一体的处理引擎，提供了Table API / SQL统一了批处理和流处理

**流处理引擎的技术选型**：

* 流数据要进行状态管理，选择使用Trident、Spark Streaming或者Flink
* 消息投递需要保证At-least-once（至少一次）或者Exactly-once（仅一次）不能选择Storm
* 对于小型独立项目，有低延迟要求，可以选择使用Storm，更简单
* 如果项目已经引入了大框架Spark，实时处理需求可以满足的话，建议直接使用Spark中的Spark Streaming
* 消息投递要满足Exactly-once（仅一次），数据量大、有高吞吐、低延迟要求，要进行状态管理或窗口统计，建议使用Flink