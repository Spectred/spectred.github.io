import{_ as e,V as n,W as s,a4 as a}from"./framework-b6120433.js";const i={},d=a(`<h1 id="shell脚本" tabindex="-1"><a class="header-anchor" href="#shell脚本" aria-hidden="true">#</a> Shell脚本</h1><h2 id="_1-设置免密登录" tabindex="-1"><a class="header-anchor" href="#_1-设置免密登录" aria-hidden="true">#</a> 1. 设置免密登录</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$  <span class="token function">cat</span> /etc/hosts
aa.aa.aa.aa  node1
bb.bb.bb.bb  node2
cc.cc.cc.cc  node3

<span class="token comment"># 分别在三个节点中执行，如node1</span>
$ ssh-keygen
$ ssh-copy-id node2
$ ssh-copy-id node3
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,3),c=[d];function l(r,t){return n(),s("div",null,c)}const h=e(i,[["render",l],["__file","shell.html.vue"]]);export{h as default};
