import{_ as a,V as e,W as r,Z as i}from"./framework-7404058e.js";const l={},h=i('<h1 id="apache-pulsar" tabindex="-1"><a class="header-anchor" href="#apache-pulsar" aria-hidden="true">#</a> Apache Pulsar</h1><blockquote><p>Pulsar是一个云原生企业级的发布订阅消息系统，功能与特性:多租户模式，灵活的消息系统，云原生架构，分片流，支持跨地域复制</p></blockquote><h2 id="_1-组件" tabindex="-1"><a class="header-anchor" href="#_1-组件" aria-hidden="true">#</a> 1. 组件</h2><h3 id="_1-1-层级存储" tabindex="-1"><a class="header-anchor" href="#_1-1-层级存储" aria-hidden="true">#</a> 1.1 层级存储</h3><ul><li>以流的方式<strong>永久保存</strong>原始数据</li><li>分区的容量不再受限制</li><li>充分利用云存储或现有的廉价存储</li><li>数据统一表征：客户端无需关系数据究竟存储在哪</li></ul><h3 id="_1-2-io连接器" tabindex="-1"><a class="header-anchor" href="#_1-2-io连接器" aria-hidden="true">#</a> 1.2 IO连接器</h3><p>分为输入输出两个模块，通过Sink实现数据输出，Pulsar提出Connector,也称为Pulsar IO,用于解决Pulsar与周边系统的集成问题，如HDFS,Spark,Flink,ES,HBase,Flume等</p><h3 id="_1-3-pulsar-funcations-轻量级计算框架" tabindex="-1"><a class="header-anchor" href="#_1-3-pulsar-funcations-轻量级计算框架" aria-hidden="true">#</a> 1.3 Pulsar Funcations （轻量级计算框架）</h3><p>Pulsar Funcations是一个轻量级的计算框架，可以给用户提供一个部署简单、运维简单、API简单的FAAS平台。提供基于事件的服务，支持有状态与无状态的多语言计算</p><h2 id="_2-pulsar和kafka对比" tabindex="-1"><a class="header-anchor" href="#_2-pulsar和kafka对比" aria-hidden="true">#</a> 2. Pulsar和Kafka对比</h2><h3 id="_2-1-模型概念" tabindex="-1"><a class="header-anchor" href="#_2-1-模型概念" aria-hidden="true">#</a> 2.1 模型概念</h3><ul><li>Pulsar: producer - topic - subsciption - consumer</li><li>Kafka: producer - topic - consumer group - consumer</li></ul><h3 id="_2-2-消息消费模式" tabindex="-1"><a class="header-anchor" href="#_2-2-消息消费模式" aria-hidden="true">#</a> 2.2 消息消费模式</h3><ul><li>Pulsar: 提供了统一的消息模型和API，流模式 - 独占和故障切换订阅方式；队列模式-共享订阅的方式</li><li>Kafka: 流模式，对单个分区是独占消息，没有共享的消费模式</li></ul><h3 id="_2-3-消息确认-ack" tabindex="-1"><a class="header-anchor" href="#_2-3-消息确认-ack" aria-hidden="true">#</a> 2.3 消息确认(ack)</h3><ul><li>Plusar: 使用专门的cursor管理，累计确认和kafka效果一样，提供单条或选择性确认</li><li>Kafka: 使用偏移量<code>offset</code></li></ul><h3 id="_2-4-消息保留" tabindex="-1"><a class="header-anchor" href="#_2-4-消息保留" aria-hidden="true">#</a> 2.4 消息保留</h3><ul><li>Pulsar: 消息只有被所有订阅消费后才会删除，不会丢失数据，也运行设置保留期，保留被消费的数据，支持TTL</li><li>Kafka： 根据设置的保留期来删除消息，有可能消息没被消费，过期后被删除，不支持TTL</li></ul><h3 id="_2-5-存储中心" tabindex="-1"><a class="header-anchor" href="#_2-5-存储中心" aria-hidden="true">#</a> 2.5 存储中心</h3><ul><li>Pulsar: 以Segment为存储中心</li><li>Kafka: 以分区为存储中心</li></ul><h2 id="_3-aapche-pulsar-集群架构" tabindex="-1"><a class="header-anchor" href="#_3-aapche-pulsar-集群架构" aria-hidden="true">#</a> 3. Aapche Pulsar 集群架构</h2><p>单个Pulsar集群由三部分组成：</p><ul><li>多个Broker负责处理和负载均衡producer发出的消息，并将这些消息分派给consumer;Broker与Pulsar配置存储交互来处理相应的任务，并将消息存储在BookKeeper实例中，Broker依赖ZooKeeper集群处理特定的任务</li><li>多个bookie的BookKeeper集群负责消息的持久化存储</li><li>一个ZooKeeper集群，用来处理多个Pulsar集群间的协调任务</li></ul>',23),s=[h];function d(u,c){return e(),r("div",null,s)}const o=a(l,[["render",d],["__file","started.html.vue"]]);export{o as default};
