---
icon: light
title: 任意门

# 在线工具
online_tools: [
    {title: 'tool.lu',  desc: '在线工具',         href: 'https://tool.lu/', img: 'https://tool.lu/favicon.ico'},
    {title: '菜鸟工具', desc: '菜鸟工具',href: 'https://c.runoob.com/', img: 'https://static.runoob.com/images/c-runoob-logo.ico'},
    {title: '开源中国',desc: '开源中国在线工具',href: 'https://tool.oschina.net/', img: 'https://tool.oschina.net/img/favicon.ico'},
    {title: '脚本之家',desc: '脚本之家在线工具',href: 'http://tools.jb51.net/', img: 'http://tools.jb51.net/favicon.ico'},
    {title: '编程狮',desc: '整理一些开发者常用的在线工具',href: 'https://123.w3cschool.cn/webtools', img: 'https://7n.w3cschool.cn/statics/images/favicon.ico'},
]

# 框架
frameworks: [
    {title: 'Spring',desc: 'J2EE应用程序框架',href: 'https://spring.io/', img: 'https://spring.io/favicon.svg'},
    {title: 'Netty',desc: '基于NIO的客户、服务器端的编程框架',href: 'https://netty.io//', img: 'https://netty.io/images/favicon.ico'},
    {title: 'MyBatis',desc: '持久层框架',href: 'https://mybatis.org/mybatis-3/zh/index.html', img: 'http://www.mybatis.org/images/mybatis-logo.png'},
    {title: 'MyBatis-Plus',desc: '为简化开发而生',href: 'https://baomidou.com/', img: 'https://baomidou.com/img/favicon.ico'},
]

# 开发工具或类库
dev_tools: [
    {title: 'Arthas',desc: 'Java 应用诊断利器',href: 'https://arthas.aliyun.com/', img: 'https://arthas.aliyun.com/images/favicon.ico'},
    {title: 'Guava',desc: 'Google核心Java类库',href: 'https://github.com/google/guava', img: 'https://github.githubassets.com/favicons/favicon-dark.svg'},
    {title: 'Hutool',desc: '小而全的Java工具类库',href: 'https://www.hutool.cn/', img: 'https://www.hutool.cn/favicon.ico'},
    {title: 'Forest',desc: '声明式HTTP客户端框架',href: 'https://forest.dtflyx.com/', img: 'https://forest.dtflyx.com/img/logo.png'},

]

# 实用工具
utilities: [
    {title: 'smms.app',desc: '图床',href: 'https://smms.app/', img: ''}
]





---

## <font color="yellowgreen">在线工具</font>
<body class="xbody">
    <ul class="project-list">
        <li v-for="item in $frontmatter.online_tools" class="project-list-item-wrap">
            <a class="clearfix project-list-item" style="max-width:100%;height:auto;" :href="item.href" >
                <div class="fl cover">
                    <img :src="item.img"  width="64" height="64">
                </div>
                <div class="info">
                    <h4 class="single-ellipsis info-title">{{item.title}}</h4>
                    <p class="double-ellipsis info-des">{{item.desc}}</p>
                </div>
            </a>
        </li>
    </ul>
</body>

 ## <font color="yellowgreen">框架</font>
<body class="xbody">
    <ul class="project-list">
        <li v-for="item in $frontmatter.frameworks" class="project-list-item-wrap">
            <a class="clearfix project-list-item" style="max-width:100%;height:auto;" :href="item.href" >
                <div class="fl cover">
                    <img :src="item.img"  width="64" height="64">
                </div>
                <div class="info">
                    <h4 class="single-ellipsis info-title">{{item.title}}</h4>
                    <p class="double-ellipsis info-des">{{item.desc}}</p>
                </div>
            </a>
        </li>
    </ul>
</body>

## <font color="yellowgreen">开发工具或类库</font>
<body class="xbody">
    <ul class="project-list">
        <li v-for="item in $frontmatter.dev_tools" class="project-list-item-wrap">
            <a class="clearfix project-list-item" style="max-width:100%;height:auto;" :href="item.href" >
                <div class="fl cover">
                    <img :src="item.img"  width="64" height="64">
                </div>
                <div class="info">
                    <h4 class="single-ellipsis info-title">{{item.title}}</h4>
                    <p class="double-ellipsis info-des">{{item.desc}}</p>
                </div>
            </a>
        </li>
    </ul>
</body>

## <font color="yellowgreen">实用工具</font>
<body class="xbody">
    <ul class="project-list">
        <li v-for="item in $frontmatter.utilities" class="project-list-item-wrap">
            <a class="clearfix project-list-item" style="max-width:100%;height:auto;" :href="item.href" >
                <div class="fl cover">
                    <img :src="item.img"  width="64" height="64">
                </div>
                <div class="info">
                    <h4 class="single-ellipsis info-title">{{item.title}}</h4>
                    <p class="double-ellipsis info-des">{{item.desc}}</p>
                </div>
            </a>
        </li>
    </ul>
</body>