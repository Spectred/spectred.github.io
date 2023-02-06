import{_ as a,V as e,W as d,a0 as r}from"./framework-65e9cb48.js";const i={},h=r('<h1 id="kafka" tabindex="-1"><a class="header-anchor" href="#kafka" aria-hidden="true">#</a> Kafka</h1><h2 id="_1-什么是消息队列-有哪些使用场景" tabindex="-1"><a class="header-anchor" href="#_1-什么是消息队列-有哪些使用场景" aria-hidden="true">#</a> 1. 什么是消息队列，有哪些使用场景</h2><blockquote><p>一发一存一消费</p></blockquote><h3 id="_1-1-应用解耦" tabindex="-1"><a class="header-anchor" href="#_1-1-应用解耦" aria-hidden="true">#</a> 1.1 应用解耦</h3><p>例如A系统将消息写入到队列，B系统订阅消息</p><h3 id="_1-2-流量削峰" tabindex="-1"><a class="header-anchor" href="#_1-2-流量削峰" aria-hidden="true">#</a> 1.2 流量削峰</h3><p>例如5k个请求发送到MQ,MQ只保证向后端发送2k个请求</p><h3 id="_1-3-异步处理" tabindex="-1"><a class="header-anchor" href="#_1-3-异步处理" aria-hidden="true">#</a> 1.3 异步处理</h3><p>例如将用户注册成功的消息发送到MQ,其他系统(发送邮件，发送短信)等订阅MQ消息，并行操作</p><h3 id="_1-4-rpc" tabindex="-1"><a class="header-anchor" href="#_1-4-rpc" aria-hidden="true">#</a> 1.4 RPC</h3><h2 id="_2-如何保证消息不丢失" tabindex="-1"><a class="header-anchor" href="#_2-如何保证消息不丢失" aria-hidden="true">#</a> 2. 如何保证消息不丢失</h2><h3 id="_2-1-生产者-发不丢" tabindex="-1"><a class="header-anchor" href="#_2-1-生产者-发不丢" aria-hidden="true">#</a> 2.1 生产者(发不丢)</h3><p>配置<code>ack=-1</code>和<code>retry</code>,如果重试几次后仍有异常则记录补偿</p><p><code>ack</code>:</p><ul><li><code>1</code>: 只要分区的<code>leader</code>写入成功就是成功</li><li><code>0</code>: 发送消息之后不需要等待任何回应(可达最大吞吐量)</li><li><code>-1</code>: 需等待<code>ISR</code>中的所有副本都成功写入后响应(最强的可靠性，但是<code>ISR=1</code>时不一定可靠)</li></ul><h3 id="_2-2-broker-存不丢" tabindex="-1"><a class="header-anchor" href="#_2-2-broker-存不丢" aria-hidden="true">#</a> 2.2 <code>broker</code>(存不丢)</h3><p>Kafka通过副本机制保证</p><h3 id="_2-3-消费者-消费不丢" tabindex="-1"><a class="header-anchor" href="#_2-3-消费者-消费不丢" aria-hidden="true">#</a> 2.3 消费者(消费不丢)</h3><p>将Kafka的位移提交由自动改为手动</p><h2 id="_3-如何保证顺序性" tabindex="-1"><a class="header-anchor" href="#_3-如何保证顺序性" aria-hidden="true">#</a> 3. 如何保证顺序性</h2><blockquote><p>Kafka保证了单分区时有序的</p></blockquote><h3 id="_3-1-单分区" tabindex="-1"><a class="header-anchor" href="#_3-1-单分区" aria-hidden="true">#</a> 3.1 单分区</h3><p>消息发送到一个分区，由消费者的一个线程来消费</p><h3 id="_3-2-通过分区器" tabindex="-1"><a class="header-anchor" href="#_3-2-通过分区器" aria-hidden="true">#</a> 3.2 通过分区器</h3><p>Kafka生产者发送消息时配置分区器，hash计算后发送到指定分区</p><h2 id="_4-如何避免重复消费-或者说如何保证幂等性" tabindex="-1"><a class="header-anchor" href="#_4-如何避免重复消费-或者说如何保证幂等性" aria-hidden="true">#</a> 4. 如何避免重复消费，或者说如何保证幂等性</h2><h3 id="_4-1-哪些场景可能产生重复的消息" tabindex="-1"><a class="header-anchor" href="#_4-1-哪些场景可能产生重复的消息" aria-hidden="true">#</a> 4.1 哪些场景可能产生重复的消息</h3><ul><li>生产者重试</li><li>消费者位移提前</li></ul><h3 id="_4-2-有哪些手段保证不重复" tabindex="-1"><a class="header-anchor" href="#_4-2-有哪些手段保证不重复" aria-hidden="true">#</a> 4.2 有哪些手段保证不重复</h3><ul><li>生产者不重试</li><li>消费者取消自动提交位移</li><li>做幂等 <ul><li>Kafka 有一个幂等的配置<code>enable.idempotence:true</code><ul><li>消费幂等: 例如利用MySQL去重表、唯一索引、Redis唯一标识</li></ul></li></ul></li></ul><blockquote><p>消息投递的语义</p><ul><li>At Most Once ，最多投递一次，可能丢失但是不会重复传输，一般用于对消息可靠性没有太高要求的场景，比如一些允许数据丢失的日志报表、监控信息等</li><li>At Least Once，至少会投递一次，消息绝不会丢失，但可能重复传输，大部分消息队列都支持，应用广泛</li><li>Exacly Once，每条消息肯定会被传输且只传输一次</li></ul></blockquote><h2 id="_5-如何处理消息积压" tabindex="-1"><a class="header-anchor" href="#_5-如何处理消息积压" aria-hidden="true">#</a> 5. 如何处理消息积压</h2><blockquote><p>发生积压，说明生产速度大于消费速度</p></blockquote><p>在消费者端，首先要排除bug，优化消费逻辑</p><p>临时进行服务端的扩容，增加分区和消费者，消费完后进行恢复</p><h2 id="_6-消息集群高可用" tabindex="-1"><a class="header-anchor" href="#_6-消息集群高可用" aria-hidden="true">#</a> 6. 消息集群高可用</h2><p>Kafka集群，多副本机制，优先副本</p><p><strong>Kafka的分区和副本分配遵循的原则</strong></p><ul><li>一个Topic的Partition数量大于Broker的数量，使得Partition尽量均匀分配到整个集群上</li><li>同一个分区，所有的副本要尽量均匀分配到集群中的多台Broker上</li><li>尽可能保证用一个分区下的主从副本，分配到不同的Broker上</li></ul><h2 id="_7-如何设计一个消息队列" tabindex="-1"><a class="header-anchor" href="#_7-如何设计一个消息队列" aria-hidden="true">#</a> 7. 如何设计一个消息队列</h2><h3 id="_7-1-生产者" tabindex="-1"><a class="header-anchor" href="#_7-1-生产者" aria-hidden="true">#</a> 7.1 生产者</h3><p>生产者需要经历哪些才能发送(拦截器，序列化，分区器，累加器，sender线程)</p><h3 id="_7-2-传输" tabindex="-1"><a class="header-anchor" href="#_7-2-传输" aria-hidden="true">#</a> 7.2 传输</h3><p>传输协议，RPC,序列化协议</p><h3 id="_7-3-消息队列的持久化、广播方式-推-拉-、集群" tabindex="-1"><a class="header-anchor" href="#_7-3-消息队列的持久化、广播方式-推-拉-、集群" aria-hidden="true">#</a> 7.3 消息队列的持久化、广播方式(推/拉)、集群</h3><h3 id="_7-4-如何消费" tabindex="-1"><a class="header-anchor" href="#_7-4-如何消费" aria-hidden="true">#</a> 7.4 如何消费</h3><h2 id="_8-kafka的基础概念" tabindex="-1"><a class="header-anchor" href="#_8-kafka的基础概念" aria-hidden="true">#</a> 8. Kafka的基础概念</h2><blockquote><p>整体体系架构由多个生产者，Kafka集群和多个消费者组成</p></blockquote><p>一个主题<code>Topic</code>有n个分区<code>Partition</code>,每个分区有m个副本<code>Replica</code>，每个分区内有<code>offset</code>（位移/偏移量）</p><p>其中n是分区数，m是副本因子, <code>Topic</code>:<code>Partition</code>:<code>Replica</code>=<code>1:n:m</code>，<code>offset</code>是分区中的唯一标识</p><ul><li><code>AR</code>: 分区的所有副本</li><li><code>ISR</code>: 所有和leader副本保持一定程度同步的(包含leader)的副本</li><li><code>OSR</code>: 与leader副本滞后过多的副本</li></ul><blockquote><p>AR = ISR + OSR</p></blockquote><ul><li><p><code>HW</code>: 高水位(偏移量)，消费者只能拉去到高水位之前的消息</p></li><li><p><code>LEO</code>: 当前日子文件中下一条待写的offset</p><blockquote><p>ISR最小的LEO是分区的HW</p></blockquote></li></ul><h2 id="_9-kafka为什么快" tabindex="-1"><a class="header-anchor" href="#_9-kafka为什么快" aria-hidden="true">#</a> 9. Kafka为什么快</h2><p><strong>Broker</strong>(读-页缓存，写-顺序写，传输-零拷贝)</p><ul><li><p>顺序写盘</p><p>文件追加写入消息，只能在日志文件尾部追加新消息，且不允许修改已写入的消息</p></li><li><p>页缓存</p><p>读磁盘时，先看待读的数据所在页是否在页缓存中，存在则返回；不存在则向磁盘中读，再到页缓存读；</p><p>写磁盘时先检查是否在页缓存中，若不存在则先在页缓存中添加页，脏页随OS写入磁盘</p></li><li><p>零拷贝</p><p>将数据直接从磁盘文件复制到网卡设备中，而不需要经过应用程序，减少内核态和用户态的切换</p><p>Linux中的<code>sendfile()</code>,Java中的<code>FileChanel.transferTo()</code></p></li></ul><p><strong>生产者</strong></p><p>发送消息时，先写入到内存缓冲，直到多条消息组成一个Batch,经过网络通信将Batch发送，</p><p>内存缓冲池优化了GC</p><p><strong>消费者</strong></p><p>多个消费者并行消费</p><h2 id="kafka的再均衡" tabindex="-1"><a class="header-anchor" href="#kafka的再均衡" aria-hidden="true">#</a> #. Kafka的再均衡</h2>',62),c=[h];function o(l,n){return e(),d("div",null,c)}const p=a(i,[["render",o],["__file","kafka.html.vue"]]);export{p as default};
