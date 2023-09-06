import { sidebar } from "vuepress-theme-hope";

export const zhSidebar = sidebar({
    '/interview': [
        { text: 'JVM', link: '/interview/jvm.md' },
        { text: 'Java', link: '/interview/java.md' },
        { text: 'Spring', link: '/interview/spring.md' },
        { text: 'MyBatis', link: '/interview/mybatis.md' },
        { text: 'Dubbo', link: '/interview/dubbo.md' },
        { text: 'MySQL', collapsible: true, link: '/interview/mysql.md' },
        { text: 'Redis', link: '/interview/redis.md' },
        { text: 'Kafka', link: '/interview/kafka.md' },
        { text: '分布式', link: '/interview/distributed.md' },
        { text: '微服务', link: '/interview/microservices.md' },
        { text: '项目经历', link: '/interview/project.md' },
    ],
    '/java': [
        {
            text: '☕️JVM', collapsible: true, children: [


            ]
        },
        {
            text: '🪄魔法', collapsible: true, children: [
                { text: '1. Unsafe', link: '/java/magic/Unsafe.md' },
                { text: '2. Instrumentation', link: '/java/magic/Instrumentation.md' },
                { text: '3. Reflect', link: '/java/magic/Reflect.md' },
                { text: '4. Proxy', link: '/java/magic/Proxy.md' },
                { text: '5. DirectByteBuffer', link: '/java/magic/DirectByteBuffer.md' },
                { text: '6. PlatformManagedObject', link: '/java/magic/PlatformManagedObject.md' },
                { text: '7. SPI', link: '/java/magic/SPI.md' },
            ]
        },
        {
            text: '🛫并发', collapsible: true, children: [
                { text: '1. Java内存模型', link: '/java/concurrent/jmm.md' },
                { text: '2. 线程与线程池', link: '/java/concurrent/threads.md' },
                { text: '3. 锁', link: '/java/concurrent/locks.md' },
                { text: '4. 并发容器', link: '/java/concurrent/collector.md' },
                { text: '5. 原子类', link: '/java/concurrent/atomic.md' },
                { text: '6. 并发工具', link: '/java/concurrent/tools.md' },
            ]
        }
    ],

    '/middleware/mongodb': [
        {
            text: 'MongoDB',
            children: [
                { text: '快速开始', link: '/middleware/mongodb/started.md' },
                { text: '命令', link: '/middleware/mongodb/command.md' },
                { text: '索引', link: '/middleware/mongodb/indexes.md' },
                { text: '使用', link: '/middleware/mongodb/use.md' },
                { text: '架构', link: '/middleware/mongodb/arch.md' },
                { text: '集群', link: '/middleware/mongodb/cluster.md' },
                { text: '安全认证', link: '/middleware/mongodb/secure.md' },
                { text: '监控', link: '/middleware/mongodb/monitor.md' },
                { text: '备份和恢复', link: '/middleware/mongodb/backups.md' },
            ]
        }
    ],
    '/frame/mybatis': [
        {
            text: 'MyBatis',
            children: [
                { text: '快速开始', link: '/frame/mybatis/started.md' },
                { text: '配置文件', link: '/frame/mybatis/config.md' },
                { text: '缓存', link: '/frame/mybatis/cache.md' },
                { text: '插件', link: '/frame/mybatis/started.md' },
                { text: '架构原理', link: '/frame/mybatis/started.md' },
                { text: '源码分析', link: '/frame/mybatis/started.md' },
            ]
        }
    ],
    '/frame/rpc': [
        {
            text: 'RPC',
            children: [
                { text: '自定义RPC', link: '/frame/rpc/started.md' },
                { text: '使用', link: '/frame/dubbo/started.md' },
            ]
        }
    ],
    '/frame/netty': [
        {
            text: 'Netty',
            children: [
                { text: '源码分析', link: '/frame/netty/sourcecode.md' },
                { text: 'Socket', link: '/frame/netty/socket.md' },
                { text: 'I/O模型', link: '/frame/netty/io.md' },
                { text: '第一个Netty应用:Echo', link: '/frame/netty/echo.md' },
                { text: '组件和设计', link: '/frame/netty/components_design.md    ' },
            ]
        },
    ],
    '/frame/dubbo': [
        {
            text: 'Dubbo',
            children: [
                { text: '使用', link: '/frame/dubbo/started.md' },
                { text: '使用', link: '/frame/dubbo/started.md' },
            ]
        }
    ],
    '/frame/gRPC': [
        {
            text: 'gRPC',
            children: [
                { text: 'Java示例', link: '/frame/gRPC/grpc-java.md' },
                { text: 'SpringBoot示例', link: '/frame/gRPC/grpc-spring-boot.md' },
            ]
        }
    ],

    '/middleware/redis': [
        {
            text: 'Redis',
            collapsible: true,
            children: [
                { text: '安装', link: '/middleware/redis/started.md' },
                { text: '概览', link: '/middleware/redis/overview.md' },
            ]
        }
    ],
    '/middleware/zookeeper': [
        {
            text: 'ZooKeeper',
            collapsible: true,
            children: [
                { text: 'ZooKeeper', link: '/middleware/zookeeper/zookeeper.md' }
            ]
        }
    ],
    '/middleware/pulsar': [
        {
            text: 'Pulsar',
            collapsible: true,
            children: [
                { text: '1. 安装', link: '/middleware/pulsar/started.md' }
            ]
        }
    ],
    '/middleware/flink': [
        {
            text: 'Flink',
            children: [
                { text: '1. 快速应用', link: '/middleware/flink/app.md' },
                { text: '2. 安装部署', link: '/middleware/flink/install.md' },
            ]
        }
    ],
    '/cloud_native/microservices': [
        {
            text: '微服务',
            collapsible: true,
            children: [
                {
                    text: 'Spring Cloud', link: '/cloud_native/microservices/spring_cloud',
                    children: [
                        { text: '项目简介', link: '/cloud_native/microservices/spring_cloud/info.md' },
                        { text: '服务注册与发现', link: '/cloud_native/microservices/spring_cloud/discovery.md' },
                        { text: '网关', link: '/cloud_native/microservices/spring_cloud/gateway.md' }
                    ]
                }
            ]
        }
    ],
    '/architecture': [
        {
            text: '模块一：为何架构设计能力难以提升',
            children: [
                { text: '4R架构', link: '/architecture/module1/class1.md' },
                { text: '如何画架构图', link: '/architecture/module1/class2.md' },
            ]
        }
    ],
    '/base/alg': [
        {
            text: '数据结构和算法',
            collapsible: true,
            children: [
                { text: '复杂度', link: 'base/alg/complexity.md' },
                { text: '数组', link: '/base/alg/array.md' },
                { text: '链表', link: '/base/alg/linkedlist.md' },
                { text: '栈', link: '/base/alg/stack.md' },
                { text: '队列', link: '/base/alg/queue.md' },
                { text: '递归', link: '/base/alg/recursion.md' },
                { text: '排序', link: '/base/alg/sort.md' },
                { text: '前缀树(TrieTree)', link: '/base/alg/trietree.md' },
            ]
        }
    ],
    '/ai/bigmodel': [
        {
            text: 'AI大模型之美',
            collapsible: true,
            children: [
                // {text: '工具',link: '/ai/bigmodel/tools.md'},
            ]
        }
    ],
    '/doraemon': [
        { text: '任意门', link: '/doraemon/tools.md' },
        {
            text: '脚本集', collapsible: true,
            children: [
                { text: 'command', link: '/doraemon/scripts/command' },
                { text: 'shell', link: '/doraemon/scripts/shell' },
                { text: 'python', link: '/doraemon/scripts/python' },
                { text: 'docker', link: '/doraemon/scripts/docker' },
                { text: 'k8s', link: '/doraemon/scripts/k8s' },
            ]
        },
    ]
});
