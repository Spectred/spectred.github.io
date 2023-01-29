# 体系结构

## 角色

Flink采用Master/Slave结构

* JobManager（Master）

  协调分布式执行，它们用来调度task，协调检查点(CheckPoint)，协调失败时恢复等

  - task：任务。同一个阶段的多个SubTask的集合

  - SubTask：

  

* TaskManager处理器（Slave）

  ​		也称之为Worker

  * 主要职责是从JobManager处接收任务, 并部署和启动任务, 接收上游的数据并处理
  * Task Manager 是在 JVM 中的一个或多个线程中执行任务的工作节点