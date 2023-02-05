import{ab as i,G as e,H as a,ac as r}from"./framework-11534bf9.js";const o={},l=r('<h1 id="dubbo" tabindex="-1"><a class="header-anchor" href="#dubbo" aria-hidden="true">#</a> Dubbo</h1><h2 id="_1-dubbo是什么-有哪些使用场景-有哪些核心功能" tabindex="-1"><a class="header-anchor" href="#_1-dubbo是什么-有哪些使用场景-有哪些核心功能" aria-hidden="true">#</a> 1. Dubbo是什么，有哪些使用场景，有哪些核心功能</h2><p>Dubbo是一款高性能、轻量级的开源RPC框架，提供服务自动注册、自动发现等高效服务治理方案</p><p>使用场景:</p><ul><li>透明化的远程方法调用，就像调用本地方法一样调用远程方法</li><li>软负载均衡及容错机制，可在内网替代F5等硬件负载均衡器，降低成本减少单点</li><li>服务自动注册与发现</li></ul><p>核心功能:</p><ul><li>Remoting，网络通信框架，提供对多种NIO框架抽象封装，包括同步转异步和请求-响应模式的信息交换方式</li><li>Cluster，服务框架，提供基于接口方法的透明远程过程调用，包括多协议的支持，软负载，容错，路由等集群支持</li><li>Registry，服务注册，基于注册中心目录服务，使服务消费方能动态地查找提供方，使地址透明，提供方平滑增减</li></ul><h2 id="_2-dubbo核心组件有哪些-服务注册与发现的流程" tabindex="-1"><a class="header-anchor" href="#_2-dubbo核心组件有哪些-服务注册与发现的流程" aria-hidden="true">#</a> 2. Dubbo核心组件有哪些，服务注册与发现的流程</h2><figure><img src="https://dubbo.apache.org/imgs/architecture.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>Container: 服务运行容器；Provider: 暴露服务的服务提供方；Consumer: 调用远程服务消费方；Registry: 服务注册与发现中心；Monitor: 监控中心和访问调用统计</p><ol><li>服务容器Container负责启动、加载、运行服务提供者</li><li>服务提供者Provider在启动时向注册中心注册自己提供的服务</li><li>服务消费者Consumer在启动时向注册中心订阅自己所需的服务</li><li>服务中心Registry返回服务提供者地址列表给小费者，如果有变更注册中心将基于长连接推送变更数据给消费者</li><li>服务消费者Consumer从提供者地址列表中基于软负载均衡算法选择一台提供者进行调用，如果失败则选另一台</li><li>服务消费者Consumber和提供者Provider,在内存中累计调用次数和调用时间，定时每分钟发送一次统计数据到监控中心Monitor</li></ol><h2 id="_3-dubbo的整体架构设计有哪些分层" tabindex="-1"><a class="header-anchor" href="#_3-dubbo的整体架构设计有哪些分层" aria-hidden="true">#</a> 3. Dubbo的整体架构设计有哪些分层</h2>',12),t=[l];function d(n,b){return e(),a("div",null,t)}const s=i(o,[["render",d],["__file","dubbo.html.vue"]]);export{s as default};
