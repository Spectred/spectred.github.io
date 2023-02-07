import{_ as o,V as l,W as t,Z as n,a3 as a,Y as e,a1 as r,F as i}from"./framework-36369a6e.js";const c={},d=n("h1",{id:"mongodb-快速开始",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#mongodb-快速开始","aria-hidden":"true"},"#"),a(" MongoDB - 快速开始")],-1),p={href:"https://www.mongodb.com/docs/",target:"_blank",rel:"noopener noreferrer"},m=n("h2",{id:"_1-安装服务端",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#_1-安装服务端","aria-hidden":"true"},"#"),a(" 1. 安装服务端")],-1),b={href:"https://www.mongodb.com/docs/v4.2/tutorial/install-mongodb-on-red-hat-tarball/",target:"_blank",rel:"noopener noreferrer"},u=r(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">wget</span> https://fastdl.mongodb.org/linux/mongodb-linux-x86_64-rhel70-4.2.23.tgz
$ <span class="token function">tar</span> <span class="token parameter variable">-zxvf</span> mongodb-linux-x86_64-rhel70-4.2.23.tgz
$ <span class="token function">mv</span> mongodb-linux-x86_64-rhel70-4.2.23 mongodb-4.2.23 <span class="token punctuation">;</span> <span class="token builtin class-name">cd</span> mongodb-4.2.23/

<span class="token comment"># 新建配置文件mongo.conf</span>
<span class="token assign-left variable">dbpath</span><span class="token operator">=</span>/data/mongo/
<span class="token assign-left variable">port</span><span class="token operator">=</span><span class="token number">27017</span>
<span class="token assign-left variable">bind_ip</span><span class="token operator">=</span><span class="token number">0.0</span>.0.0
<span class="token comment"># fork=true</span>
<span class="token assign-left variable">logpath</span><span class="token operator">=</span>/data/mongo/MongoDB.log
<span class="token assign-left variable">logappend</span><span class="token operator">=</span>true
<span class="token assign-left variable">auth</span><span class="token operator">=</span>false

<span class="token comment"># 指定配置文件启动</span>
$ ./bin/mongod <span class="token parameter variable">-f</span> mongo.conf
about to fork child process, waiting <span class="token keyword">until</span> server is ready <span class="token keyword">for</span> connections.
forked process: <span class="token number">1487</span>
child process started successfully, parent exiting
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_2-客户端-mongo-shell" tabindex="-1"><a class="header-anchor" href="#_2-客户端-mongo-shell" aria-hidden="true">#</a> 2. 客户端-mongo shell</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ ./bin/mongo <span class="token parameter variable">--host</span><span class="token operator">=</span>localhost <span class="token parameter variable">--port</span><span class="token operator">=</span><span class="token number">27017</span>
<span class="token operator">&gt;</span> db.version<span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token number">4.2</span>.23
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-客户端-可视化" tabindex="-1"><a class="header-anchor" href="#_3-客户端-可视化" aria-hidden="true">#</a> 3. 客户端-可视化</h2><p>DataGrip</p>`,5);function v(h,g){const s=i("ExternalLinkIcon");return l(),t("div",null,[d,n("blockquote",null,[n("p",null,[n("a",p,[a("官网"),e(s)])])]),m,n("p",null,[n("a",b,[a("install mongodb"),e(s)])]),u])}const _=o(c,[["render",v],["__file","started.html.vue"]]);export{_ as default};
