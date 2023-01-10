import{_ as e,o as n,c as a,e as s}from"./app.2fb84565.js";const i={},l=s(`<h3 id="_1-\u5411\u6587\u4EF6\u4E2D\u8FFD\u52A0\u5185\u5BB9-tee" tabindex="-1"><a class="header-anchor" href="#_1-\u5411\u6587\u4EF6\u4E2D\u8FFD\u52A0\u5185\u5BB9-tee" aria-hidden="true">#</a> 1. \u5411\u6587\u4EF6\u4E2D\u8FFD\u52A0\u5185\u5BB9(<code>tee</code>)</h3><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>$ <span class="token function">cat</span> a.txt 
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-\u65F6\u95F4\u683C\u5F0F\u5316-date" tabindex="-1"><a class="header-anchor" href="#_2-\u65F6\u95F4\u683C\u5F0F\u5316-date" aria-hidden="true">#</a> 2. \u65F6\u95F4\u683C\u5F0F\u5316(<code>date</code>)</h3><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>$ <span class="token builtin class-name">echo</span> <span class="token variable"><span class="token variable">\`</span><span class="token function">date</span> <span class="token string">&#39;+%Y-%m-%d %H:%M:%S&#39;</span><span class="token variable">\`</span></span>
<span class="token number">1970</span>-01-01 00:00:00
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div>`,4),d=[l];function c(t,r){return n(),a("div",null,d)}const v=e(i,[["render",c],["__file","linux.html.vue"]]);export{v as default};
