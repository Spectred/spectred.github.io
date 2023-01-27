import { defineUserConfig, defaultTheme } from 'vuepress'
import { prismjsPlugin } from '@vuepress/plugin-prismjs'

export default defineUserConfig({
    lang: 'zh-CN',
    title: '学习笔记',
    description: 'xxxx',
    head: [['link', { rel: 'icon', href: 'logo.jpeg' }]],
    theme: defaultTheme({
        navbar: [
            { text: '首页', link: '/', },
            { text: '😈面试', link: '/interview', },
            {
                text: 'Java', link: '/java'
            },
            { text: '算法', link: '/algorithm', },
            {
                text: '框架', children: [
                    {text: 'MyBatis',link: '/frame/mybatis'},
                    {text: 'Spring',link: '/frame/spring'},
                    {text: 'RPC',link: '/frame/rpc'},
                    {text: 'Netty',link: '/frame/netty'},
                    {text: 'RPC',link: '/frame/netty'},
                    {text: 'Dubbo',link: '/frame/dubbo'},
                    {text: 'gRPC',link: '/frame/gRPC'},
                ]
            },
            {
                text: '中间件', children: [
                    { text: 'MySQL', link: '/middleware/mysql' },
                    { text: 'Redis', link: '/middleware/redis' },
                    { text: 'MongoDB', link: '/middleware/mongodb/README.md' },
                    { text: 'ZooKeeper', link: '/middleware/zookeeper' },
                    { text: 'Kafka', link: '/middleware/kafka' },
                    { text: 'Pulsar', link: '/middleware/pulsar' },
                    { text: 'Flink', link: '/middleware/flink' }
                ]
            },
            {
                text: '云原生', link: '/cloud_native',
                children: [
                    {
                        text: '微服务',
                        link: '/cloud_native/microservices'
                    },
                    {
                        text: 'CI/CD',
                        link: 'https://github.com'
                    },
                    {
                        text: 'DevOps',
                        link: 'https://github.com'
                    },
                    {
                        text: '容器',
                        link: 'https://github.com'
                    },
                ]
            },
            {
                text: '架构', link: '/architecture',

                // children: [
                //     {
                //         text: '',
                //         link: '/architecture/microservices'
                //     },
                // ]
            },
            {
                text: '基础', link: '/base',
                children: [
                    { text: '操作系统',link: '/base/os' },
                    { text: '计算机网络',link: '/base/network' },
                    { text: '编译原理',link: '/base/compiler' },
                    { text: '数据结构和算法',link: '/base/alg' },
                ]
            },
            {
                text: '百宝箱',
                link: '/doraemon',
            },
        ],
        sidebar: {
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
                    text: '😈魔法', collapsible: true, children: [
                        { text: '1. Unsafe', link: '/java/magic/unsafe.md' }
                    ]
                }
            ],
            '/algorithm': [
                {
                    text: '打卡',
                    collapsible: true,
                    link: '/algorithm/clockin.md'

                },
                {
                    text: '数学',
                    collapsible: true,
                    children: [
                        {
                            text: 'README',
                            link: '/algorithm/README.md'
                        },
                        {
                            text: 'a',
                            link: '/algorithm/a.md'
                        }
                    ]
                },
                {
                    text: '链表',
                    collapsible: true,

                },
                {
                    text: '二叉树',
                    collapsible: true,
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
                        {text: '源码分析',link: '/frame/netty/sourcecode.md'},
                        {text: 'Socket',link: '/frame/netty/socket.md' },
                        {text: 'I/O模型',link: '/frame/netty/io.md'},
                        {text: '第一个Netty应用:Echo',link: '/frame/netty/echo.md'},
                        {text: '组件和设计',link: '/frame/netty/components_design.md    '},
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
                        { text: '使用', link: '/frame/gRPC/started.md' },
                    ]
                }
            ],

            '/middleware/redis': [
                {
                    text: 'Redis',
                    collapsible: true,
                    children: [
                        { text: '1. 安装', link: '/middleware/redis/started.md' }
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
                    collapsible: true,
                    children: [
                        { text: '', link: '' }
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
            '/architecture':[
                {   text: '模块一：为何架构设计能力难以提升', 
                    children: [
                        { text: '4R架构', link: '/architecture/module1/class1.md' },
                        { text: '如何画架构图', link: '/architecture/module1/class2.md' },
                ]}
            ],
            '/base/alg': [
                {
                    text: '数据结构和算法',
                    collapsible: true,
                    children: [
                        {text: '数组', link: '/base/alg/array.md'},
                        {text: '链表', link: '/base/alg/linkedlist.md'},
                        {text: '栈', link: '/base/alg/stack.md'},
                        {text: '队列', link: '/base/alg/queue.md'},
                        {text: '递归', link: '/base/alg/recursion.md'},
                        {text: '排序', link: '/base/alg/sort.md'},
                        {text: '前缀树(TrieTree)', link: '/base/alg/trietree.md'},
                    ]
                }
            ],
            '/doraemon': [
                { text: '常用网站', link: '/doraemon/website' },
                { text: '小记', link: '/doraemon/x' },
                {
                    text: '平时积累',
                    collapsible: true,
                    children: [
                        { text: 'Linux', link: '/doraemon/qianli/linux' }
                    ]
                }
            ]
        }
    }),
    plugins: [
        prismjsPlugin({
            // 配置项
        }),
    ],
})

