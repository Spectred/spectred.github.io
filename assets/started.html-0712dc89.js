import{_ as s,V as i,W as d,Z as e,$ as t,Y as r,a0 as n,F as l}from"./framework-65e9cb48.js";const c={},o=n(`<h2 id="_1-在centos中安装redis-基于源码" tabindex="-1"><a class="header-anchor" href="#_1-在centos中安装redis-基于源码" aria-hidden="true">#</a> 1. 在CentOS中安装Redis(基于源码)</h2><h3 id="_0-环境" tabindex="-1"><a class="header-anchor" href="#_0-环境" aria-hidden="true">#</a> 0. 环境</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>/etc/hosts

node1  192.168.249.101
node2  192.168.249.102
node3  192.168.249.103
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_1-安装redis" tabindex="-1"><a class="header-anchor" href="#_1-安装redis" aria-hidden="true">#</a> 1. 安装Redis</h4>`,4),v={href:"https://redis.io/docs/getting-started/installation/install-redis-from-source/",target:"_blank",rel:"noopener noreferrer"},u=n(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code> <span class="token comment">#!/bin/bash</span>
yum <span class="token parameter variable">-y</span> <span class="token function">install</span> gcc automake autoconf libtool tcl

<span class="token builtin class-name">cd</span> /opt
<span class="token function">wget</span> https://github.com/redis/redis/archive/7.0.5.tar.gz 

<span class="token function">tar</span> <span class="token parameter variable">-xf</span> redis-7.0.5.tar
<span class="token builtin class-name">cd</span> /opt/redis-7.0.5

<span class="token function">make</span> <span class="token assign-left variable">MALLOC</span><span class="token operator">=</span>libc

<span class="token comment"># make test</span>
<span class="token function">make</span> <span class="token function">install</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-搭建主从环境-一主两从" tabindex="-1"><a class="header-anchor" href="#_2-搭建主从环境-一主两从" aria-hidden="true">#</a> 2. 搭建主从环境（一主两从）</h4><h4 id="_2-1-主库-node1" tabindex="-1"><a class="header-anchor" href="#_2-1-主库-node1" aria-hidden="true">#</a> 2.1 主库(node1)</h4><p><code>vim redis.conf</code></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>daemonize yes
# bind 127.0.0.1 -::1
protected-mode no
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-2-从库-node2-node3" tabindex="-1"><a class="header-anchor" href="#_2-2-从库-node2-node3" aria-hidden="true">#</a> 2.2 从库(node2,node3)</h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>daemonize yes
# bind 127.0.0.1 -::1
protected-mode no
replicaof node1 6379
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-搭建哨兵集群-node1-node2-node3" tabindex="-1"><a class="header-anchor" href="#_3-搭建哨兵集群-node1-node2-node3" aria-hidden="true">#</a> 3. 搭建哨兵集群(node1,node2,node3)</h3><p><code>vim sentinel.conf</code></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>daemonize yes
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><code>$ redis-sentinel /opt/redis-7.0.5/sentinel.conf</code></p>`,11);function m(h,p){const a=l("ExternalLinkIcon");return i(),d("div",null,[o,e("p",null,[e("a",v,[t("官方文档-从源码安装"),r(a)])]),u])}const _=s(c,[["render",m],["__file","started.html.vue"]]);export{_ as default};
