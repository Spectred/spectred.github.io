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
                    {text: 'Spring',link: '/frame/spring'},
                    {text: 'Netty',link: '/frame/netty'},
                    {text: 'Dubbo',link: '/frame/dubbo'},
                    {text: 'gRPC',link: '/frame/gRPC'},
                ]
            },
            {
                text: '中间件', children: [
                    { text: 'MySQL', link: '/middleware/mysql' },
                    { text: 'Redis', link: '/middleware/redis' },
                    { text: 'ZooKeeper', link: '/middleware/zookeeper' },
                    { text: 'Kafka', link: '/middleware/kafka' },
                    { text: 'Pulsar', link: '/middleware/pulsar' }
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
            '/frame/netty': [
                {
                    text: 'Netty',
                    children: [
                        {
                            text: '源码分析',
                            link: '/frame/netty/sourcecode.md'
                        },
                        {
                            text: 'Socket',
                            link: '/frame/netty/socket.md'
                        },
                        {
                            text: 'I/O模型',
                            link: '/frame/netty/io.md'
                        }
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
            '/middleware/pulsar': [
                {
                    text: 'Pulsar',
                    collapsible: true,
                    children: [
                        { text: '1. 安装', link: '/middleware/pulsar/started.md' }
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
                    ]
                }
            ],
            '/doraemon': [
                { text: '常用网站', link: '/doraemon/website' },
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

