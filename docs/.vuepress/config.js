import { defineUserConfig, defaultTheme } from 'vuepress'
import { copyCodePlugin } from "vuepress-plugin-copy-code2";
import { navbar0 , sidebar0 } from './configs'

export default defineUserConfig({
    lang: 'zh-CN',
    title: '学习笔记',
    description: '✍🏻好记性不如烂笔头，站在岸上学不会游泳。泉水挑不干，知识学不完',
    head: [['link', { rel: 'icon', href: 'logo.jpeg' }]],
    theme: defaultTheme({
        navbar: navbar0,
        sidebar: sidebar0
    }),
    plugins: [
        copyCodePlugin({
            pure: true,
        }),
     
    ],
})

