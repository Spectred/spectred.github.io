# Dubbo

>[Apache Dubbo](https://dubbo.apache.org/zh/)
>
>**Apache Dubbo 是一款微服务框架，为大规模微服务实践提供高性能 RPC 通信、流量治理、可观测性等解决方案，**
>**涵盖 Java、Golang 等多种语言 SDK 实现**

 **Dubbo架构**

![](https://dubbo.apache.org/imgs/architecture.png)

## 1. 服务注册中新(`ZooKeeper`)

```bash
wget https://www.apache.org/dyn/closer.lua/zookeeper/zookeeper-3.8.0/apache-zookeeper-3.8.0-bin.tar.gz
tar -zcvf apache-zookeeper-3.8.0-bin.tar.gz
cp conf/zoo_sample.cfg  conf/zoo.cfg
编辑配置文件
data=$ZOOKEEPER_HOME/data

bin/zkServer.sh start

客户端: bin/zkCli.sh
```