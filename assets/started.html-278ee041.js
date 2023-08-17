import{_ as t,V as l,W as p,Z as n,$ as s,Y as e,a4 as o,F as i}from"./framework-eedf5ae1.js";const c={},u=n("h1",{id:"mongodb-快速开始",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#mongodb-快速开始","aria-hidden":"true"},"#"),s(" MongoDB - 快速开始")],-1),r={href:"https://www.mongodb.com/docs/",target:"_blank",rel:"noopener noreferrer"},d=n("h2",{id:"_1-安装服务端",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#_1-安装服务端","aria-hidden":"true"},"#"),s(" 1. 安装服务端")],-1),k={href:"https://www.mongodb.com/docs/v4.2/tutorial/install-mongodb-on-red-hat-tarball/",target:"_blank",rel:"noopener noreferrer"},v=o(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">wget</span> https://fastdl.mongodb.org/linux/mongodb-linux-x86_64-rhel70-4.2.23.tgz
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-客户端-可视化" tabindex="-1"><a class="header-anchor" href="#_3-客户端-可视化" aria-hidden="true">#</a> 3. 客户端-可视化</h2><p>DataGrip</p><h2 id="_4-k8s部署单实例mongodb" tabindex="-1"><a class="header-anchor" href="#_4-k8s部署单实例mongodb" aria-hidden="true">#</a> 4. k8s部署单实例mongodb</h2><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Namespace
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> mongo
<span class="token punctuation">---</span>
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Service
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> mongodb<span class="token punctuation">-</span>service
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> mongo
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">app</span><span class="token punctuation">:</span> mongodb
  <span class="token key atrule">type</span><span class="token punctuation">:</span> NodePort
  <span class="token key atrule">ports</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">protocol</span><span class="token punctuation">:</span> TCP
      <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">27017</span>
      <span class="token key atrule">targetPort</span><span class="token punctuation">:</span> <span class="token number">27017</span>
      <span class="token key atrule">nodePort</span><span class="token punctuation">:</span> <span class="token number">30017</span>
<span class="token punctuation">---</span>
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> apps/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Deployment
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> mongodb<span class="token punctuation">-</span>deployment
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> mongo
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">replicas</span><span class="token punctuation">:</span> <span class="token number">1</span>
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">matchLabels</span><span class="token punctuation">:</span>
      <span class="token key atrule">app</span><span class="token punctuation">:</span> mongodb
  <span class="token key atrule">template</span><span class="token punctuation">:</span>
    <span class="token key atrule">metadata</span><span class="token punctuation">:</span>
      <span class="token key atrule">labels</span><span class="token punctuation">:</span>
        <span class="token key atrule">app</span><span class="token punctuation">:</span> mongodb
    <span class="token key atrule">spec</span><span class="token punctuation">:</span>
      <span class="token key atrule">containers</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> mongodb
          <span class="token key atrule">image</span><span class="token punctuation">:</span> mongo<span class="token punctuation">:</span>6.0.8
          <span class="token key atrule">ports</span><span class="token punctuation">:</span>
            <span class="token punctuation">-</span> <span class="token key atrule">containerPort</span><span class="token punctuation">:</span> <span class="token number">27017</span>
          <span class="token key atrule">volumeMounts</span><span class="token punctuation">:</span>
            <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> mongodb<span class="token punctuation">-</span>data
              <span class="token key atrule">mountPath</span><span class="token punctuation">:</span> /data/db
      <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> mongodb<span class="token punctuation">-</span>data
          <span class="token key atrule">emptyDir</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,7);function m(b,g){const a=i("ExternalLinkIcon");return l(),p("div",null,[u,n("blockquote",null,[n("p",null,[n("a",r,[s("官网"),e(a)])])]),d,n("p",null,[n("a",k,[s("install mongodb"),e(a)])]),v])}const y=t(c,[["render",m],["__file","started.html.vue"]]);export{y as default};
