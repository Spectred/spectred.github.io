import{_ as s,V as a,W as d,Z as e,$ as i,Y as t,a4 as r,F as l}from"./framework-eedf5ae1.js";const c={},o=e("h1",{id:"redis概览",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#redis概览","aria-hidden":"true"},"#"),i(" Redis概览")],-1),u=e("h2",{id:"redis全景图",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#redis全景图","aria-hidden":"true"},"#"),i(" Redis全景图")],-1),v={href:"https://time.geekbang.org/column/article/268247",target:"_blank",rel:"noopener noreferrer"},m=r(`<figure><img src="https://static001.geekbang.org/resource/image/79/e7/79da7093ed998a99d9abe91e610b74e7.jpg?wh=2001*1126" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><figure><img src="https://static001.geekbang.org/resource/image/70/b4/70a5bc1ddc9e3579a2fcb8a5d44118b4.jpeg?wh=2048*1536" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h2 id="redis目录结构" tabindex="-1"><a class="header-anchor" href="#redis目录结构" aria-hidden="true">#</a> Redis目录结构</h2><figure><img src="https://static001.geekbang.org/resource/image/59/35/5975c57d9ac404fe3a774ea28a7ac935.jpg?wh=2238x811" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>redis
├── redis.conf          # Redis配置文件
├── sentinel.conf       # 哨兵配置文件
├── deps                # Redis依赖的第三方代码库
├── src                 # 功能模块的代码文件
├── tests               # 功能模块测试和单元测试
└── utils               # 辅助性功能
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>deps
├── hdr_histogram
├── hiredis         # C语言版客户端代码
├── jemalloc        # 替换glibc的内存分配器
├── linenoise       # 替代readline功能
└── lua             # lua脚本代码
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>tests
├── cluster					# Cluster功能测试
├── integration				# 主从复制功能测试
├── sentinel				# 哨兵功能测试
├── unit					# 单元测试
├── support
├── test_helper.tcl
├── tmp
├── modules
├── helpers
├── instances.tcl
└── assets
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,7);function g(b,h){const n=l("ExternalLinkIcon");return a(),d("div",null,[o,u,e("p",null,[e("em",null,[i("图片来源:"),e("a",v,[i("https://time.geekbang.org/column/article/268247"),t(n)])])]),m])}const f=s(c,[["render",g],["__file","overview.html.vue"]]);export{f as default};
