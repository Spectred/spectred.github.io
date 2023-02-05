import{ab as e,G as n,H as a,ac as s}from"./framework-11534bf9.js";const i={},d=s(`<h3 id="_1-向文件中追加内容-tee" tabindex="-1"><a class="header-anchor" href="#_1-向文件中追加内容-tee" aria-hidden="true">#</a> 1. 向文件中追加内容(<code>tee</code>)</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">cat</span> a.txt 
Hello World
--- 
$ <span class="token function">tee</span> <span class="token parameter variable">-a</span> a.txt <span class="token operator">&lt;&lt;-</span><span class="token string">&#39;EOF&#39;
hello
world
EOF</span>
---
$ <span class="token function">cat</span> a.txt 
Hello World
hello
world
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-时间格式化-date" tabindex="-1"><a class="header-anchor" href="#_2-时间格式化-date" aria-hidden="true">#</a> 2. 时间格式化(<code>date</code>)</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token builtin class-name">echo</span> <span class="token variable"><span class="token variable">\`</span><span class="token function">date</span> <span class="token string">&#39;+%Y-%m-%d %H:%M:%S&#39;</span><span class="token variable">\`</span></span>
<span class="token number">1970</span>-01-01 00:00:00
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-免密登录" tabindex="-1"><a class="header-anchor" href="#_3-免密登录" aria-hidden="true">#</a> 3. 免密登录</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>$  cat /etc/hosts
192.168.249.101  node1
192.168.249.102  node2
192.168.249.103  node3

# 分别在三个节点中执行，如node1
$ ssh-keygen
$ ssh-copy-id node2
$ ssh-copy-id node3
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,6),l=[d];function c(t,r){return n(),a("div",null,l)}const v=e(i,[["render",c],["__file","linux.html.vue"]]);export{v as default};
