import{_ as a,V as e,W as n,a4 as s}from"./framework-eedf5ae1.js";const i={},t=s(`<h1 id="命令" tabindex="-1"><a class="header-anchor" href="#命令" aria-hidden="true">#</a> 命令</h1><h2 id="_1-tee" tabindex="-1"><a class="header-anchor" href="#_1-tee" aria-hidden="true">#</a> 1. <code>tee</code></h2><p>1.1向文件中追加内容</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">tee</span> <span class="token parameter variable">-a</span> a.txt <span class="token operator">&lt;&lt;-</span><span class="token string">&#39;EOF&#39;
hello
world
EOF</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_2-date" tabindex="-1"><a class="header-anchor" href="#_2-date" aria-hidden="true">#</a> 2. <code>date</code></h2><p>格式化时间</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token builtin class-name">echo</span> <span class="token variable"><span class="token variable">\`</span><span class="token function">date</span> <span class="token string">&#39;+%Y-%m-%d %H:%M:%S&#39;</span><span class="token variable">\`</span></span>
<span class="token number">1970</span>-01-01 00:00:00
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-git" tabindex="-1"><a class="header-anchor" href="#_3-git" aria-hidden="true">#</a> 3. <code>git</code></h2><p>3.1 比较分支中的提交差异</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 查看dev有 而master没有</span>
<span class="token function">git</span> log dev ^master 
<span class="token comment"># 查看dev比master多提交的</span>
<span class="token function">git</span> log master<span class="token punctuation">..</span>dev
<span class="token comment"># 查看两个分支的不同</span>
<span class="token function">git</span> log master<span class="token punctuation">..</span>.dev
<span class="token comment"># 额外显示每个提交在哪个分支上</span>
<span class="token function">git</span> log --left-right dev<span class="token punctuation">..</span>.master
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,10),d=[t];function l(c,r){return e(),n("div",null,d)}const p=a(i,[["render",l],["__file","command.html.vue"]]);export{p as default};
