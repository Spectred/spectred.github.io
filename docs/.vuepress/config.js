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
            '/algorithm': [
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

