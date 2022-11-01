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
                    {
                        text: 'Spring',
                        link: '/frame/spring'
                    },
                    {
                        text: 'Netty',
                        link: '/frame/netty'
                    },
                ]
            },
            {
                text: '中间件', children: [
                    {
                        text: 'MySQL',
                        link: '/middleware/mysql'
                    },
                    {
                        text: 'Redis',
                        link: '/middleware/redis'
                    },
                    {
                        text: 'ZooKeeper',
                        link: '/middleware/zookeeper'
                    },
                    {
                        text: 'Kafka',
                        link: '/middleware/kafka'
                    }
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
                text: '百宝箱',
                link: '/doraemon',
            },
        ],
        sidebar: {
            '/interview': [
                {text: 'MySQL', collapsible: true, link: '/interview/mysql.md'},
                {text: 'Redis',link: '/interview/redis.md' },
                {text: 'Kafka',link: '/interview/kafka.md' },
                {text: '项目经历',link: '/interview/project.md' },
            ],
            '/java': [
                {text: '😈魔法',collapsible: true,children:[
                    {text: '1. Unsafe',link: '/java/magic/unsafe.md'}
                ]}
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
            ],
            '/middleware/redis':[
                {
                    text: 'Redis',
                    collapsible: true,
                    children:[
                        { text: '1. 安装', link: '/middleware/redis/started.md' }
                    ]
                }
            ],
            '/cloud_native/microservices': [
                {
                    text: 'microservices',
                    collapsible: true,
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

