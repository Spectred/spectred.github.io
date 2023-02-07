import{_ as a,V as e,W as t,Z as l}from"./framework-7404058e.js";const r={},i=l('<h1 id="体系结构" tabindex="-1"><a class="header-anchor" href="#体系结构" aria-hidden="true">#</a> 体系结构</h1><h2 id="角色" tabindex="-1"><a class="header-anchor" href="#角色" aria-hidden="true">#</a> 角色</h2><p>Flink采用Master/Slave结构</p><ul><li><p>JobManager（Master）</p><p>协调分布式执行，它们用来调度task，协调检查点(CheckPoint)，协调失败时恢复等</p><ul><li><p>task：任务。同一个阶段的多个SubTask的集合</p></li><li><p>SubTask：</p></li></ul></li><li><p>TaskManager处理器（Slave）</p><p>​ 也称之为Worker</p><ul><li>主要职责是从JobManager处接收任务, 并部署和启动任务, 接收上游的数据并处理</li><li>Task Manager 是在 JVM 中的一个或多个线程中执行任务的工作节点</li></ul></li></ul>',4),s=[i];function n(c,o){return e(),t("div",null,s)}const p=a(r,[["render",n],["__file","struct.html.vue"]]);export{p as default};
