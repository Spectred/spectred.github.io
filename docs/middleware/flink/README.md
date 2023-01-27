# Flink

[Apache Flink](https://flink.apache.org/zh/)

​	Apache Flink是一个框架和分布式处理引擎，用于对无界和有界数据流进行有状态计算。Flink被设计在所有常见的集群环境中运行，以内存执行速度和任意规模来执行计算

![](https://flink.apache.org/img/flink-home-graphic.png)

特点: 

* 批流一体：统一批处理、流处理

* 分布式：Flink程序可以运行在多台机器上
* 高性能：处理性能比较高
* 高可用：Flink支持高可用性（HA）
* 准确：Flink可以保证数据处理的准确性

[应用场景](https://flink.apache.org/zh/usecases.html)：

​	主要应用于流式数据分析场景

* 实时ETL

  集成流计算现有的诸多数据通道和SQL灵活的加工能力，对流式数据进行实时清晰、归并和结构化处理；同时，对离线数仓进行有效的补充和优化，并为数据实时传输提供可计算通道。

* 实时报表

  实时化采集、加工流式数据存储；实时监控和展现业务、客户各类指标，让数据化运营实时化。

* 监控预警

  对系统和用户行为进行实时监测和分析，以便及时发现危险行为

* 在线系统

  实时计算各类数据指标，并利用实时结果及时调整在线系统的相关策略，在各类内容投放、智能推送领域有大量的应用

  

核心组成：

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