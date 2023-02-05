import{_ as s,r as i,o as d,c as r,a as e,b as t,d as l,e as n}from"./app.94cd83f3.js";const c={},o=n(`<h2 id="_1-\u5728centos\u4E2D\u5B89\u88C5redis-\u57FA\u4E8E\u6E90\u7801" tabindex="-1"><a class="header-anchor" href="#_1-\u5728centos\u4E2D\u5B89\u88C5redis-\u57FA\u4E8E\u6E90\u7801" aria-hidden="true">#</a> 1. \u5728CentOS\u4E2D\u5B89\u88C5Redis(\u57FA\u4E8E\u6E90\u7801)</h2><h3 id="_0-\u73AF\u5883" tabindex="-1"><a class="header-anchor" href="#_0-\u73AF\u5883" aria-hidden="true">#</a> 0. \u73AF\u5883</h3><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>/etc/hosts

node1  192.168.249.101
node2  192.168.249.102
node3  192.168.249.103
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_1-\u5B89\u88C5redis" tabindex="-1"><a class="header-anchor" href="#_1-\u5B89\u88C5redis" aria-hidden="true">#</a> 1. \u5B89\u88C5Redis</h4>`,4),v={href:"https://redis.io/docs/getting-started/installation/install-redis-from-source/",target:"_blank",rel:"noopener noreferrer"},u=n(`<div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code> <span class="token comment">#!/bin/bash</span>
yum <span class="token parameter variable">-y</span> <span class="token function">install</span> gcc automake autoconf libtool tcl

<span class="token builtin class-name">cd</span> /opt
<span class="token function">wget</span> https://github.com/redis/redis/archive/7.0.5.tar.gz 

<span class="token function">tar</span> <span class="token parameter variable">-xf</span> redis-7.0.5.tar
<span class="token builtin class-name">cd</span> /opt/redis-7.0.5

<span class="token function">make</span> <span class="token assign-left variable">MALLOC</span><span class="token operator">=</span>libc

<span class="token comment"># make test</span>
<span class="token function">make</span> <span class="token function">install</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-\u642D\u5EFA\u4E3B\u4ECE\u73AF\u5883-\u4E00\u4E3B\u4E24\u4ECE" tabindex="-1"><a class="header-anchor" href="#_2-\u642D\u5EFA\u4E3B\u4ECE\u73AF\u5883-\u4E00\u4E3B\u4E24\u4ECE" aria-hidden="true">#</a> 2. \u642D\u5EFA\u4E3B\u4ECE\u73AF\u5883\uFF08\u4E00\u4E3B\u4E24\u4ECE\uFF09</h4><h4 id="_2-1-\u4E3B\u5E93-node1" tabindex="-1"><a class="header-anchor" href="#_2-1-\u4E3B\u5E93-node1" aria-hidden="true">#</a> 2.1 \u4E3B\u5E93(node1)</h4><p><code>vim redis.conf</code></p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>daemonize yes
# bind 127.0.0.1 -::1
protected-mode no
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-2-\u4ECE\u5E93-node2-node3" tabindex="-1"><a class="header-anchor" href="#_2-2-\u4ECE\u5E93-node2-node3" aria-hidden="true">#</a> 2.2 \u4ECE\u5E93(node2,node3)</h4><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>daemonize yes
# bind 127.0.0.1 -::1
protected-mode no
replicaof node1 6379
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-\u642D\u5EFA\u54E8\u5175\u96C6\u7FA4-node1-node2-node3" tabindex="-1"><a class="header-anchor" href="#_3-\u642D\u5EFA\u54E8\u5175\u96C6\u7FA4-node1-node2-node3" aria-hidden="true">#</a> 3. \u642D\u5EFA\u54E8\u5175\u96C6\u7FA4(node1,node2,node3)</h3><p><code>vim sentinel.conf</code></p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>daemonize yes
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><code>$ redis-sentinel /opt/redis-7.0.5/sentinel.conf</code></p>`,11);function m(h,p){const a=i("ExternalLinkIcon");return d(),r("div",null,[o,e("p",null,[e("a",v,[t("\u5B98\u65B9\u6587\u6863-\u4ECE\u6E90\u7801\u5B89\u88C5"),l(a)])]),u])}const _=s(c,[["render",m],["__file","started.html.vue"]]);export{_ as default};
