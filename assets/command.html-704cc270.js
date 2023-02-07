import{_ as n,V as s,W as a,a1 as t}from"./framework-36369a6e.js";const e={},p=t(`<h1 id="mongodb-命令" tabindex="-1"><a class="header-anchor" href="#mongodb-命令" aria-hidden="true">#</a> MongoDB - 命令</h1><h2 id="_1-基本操作" tabindex="-1"><a class="header-anchor" href="#_1-基本操作" aria-hidden="true">#</a> 1. 基本操作</h2><ul><li><p>查看数据库</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token operator">&gt;</span> show dbs
admin   <span class="token number">0</span>.000GB
config  <span class="token number">0</span>.000GB
<span class="token builtin class-name">local</span>   <span class="token number">0</span>.000GB
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>切换数据库，如果没有对象的数据库则创建</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token operator">&gt;</span> use <span class="token builtin class-name">test</span>
switched to db <span class="token builtin class-name">test</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>创建集合</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token operator">&gt;</span> db.createCollection<span class="token punctuation">(</span><span class="token string">&quot;coll1&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span> <span class="token string">&quot;ok&quot;</span> <span class="token builtin class-name">:</span> <span class="token number">1</span> <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>查看集合</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token operator">&gt;</span> show collections
coll1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>删除集合</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token operator">&gt;</span> db.coll1.drop<span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token boolean">true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>删除当前数据库</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token operator">&gt;</span> db.<span class="token function-name function">dropDatabase</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span> <span class="token string">&quot;dropped&quot;</span> <span class="token builtin class-name">:</span> <span class="token string">&quot;test&quot;</span>, <span class="token string">&quot;ok&quot;</span> <span class="token builtin class-name">:</span> <span class="token number">1</span> <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><h2 id="_2-集合数据操作-crud" tabindex="-1"><a class="header-anchor" href="#_2-集合数据操作-crud" aria-hidden="true">#</a> 2. 集合数据操作-CRUD</h2><h3 id="_2-1-数据添加" tabindex="-1"><a class="header-anchor" href="#_2-1-数据添加" aria-hidden="true">#</a> 2.1 数据添加</h3><ul><li><p>插入单条数据 - <code>db.coll.insert({})</code></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&gt; db.coll.insert({&quot;name&quot;:&quot;a&quot;})
WriteResult({ &quot;nInserted&quot; : 1 }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>插入多条数据 - <code>db.coll.insert([{},{}])</code></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&gt; db.coll.insert([{&quot;age&quot;:1},{&quot;age&quot;:2}])
BulkWriteResult({
        &quot;writeErrors&quot; : [ ],
        &quot;writeConcernErrors&quot; : [ ],
        &quot;nInserted&quot; : 2,
        &quot;nUpserted&quot; : 0,
        &quot;nMatched&quot; : 0,
        &quot;nModified&quot; : 0,
        &quot;nRemoved&quot; : 0,
        &quot;upserted&quot; : [ ]
})
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><h3 id="_2-2-数据查询" tabindex="-1"><a class="header-anchor" href="#_2-2-数据查询" aria-hidden="true">#</a> 2.2 数据查询</h3><ul><li><p>查询所有 - <code>db.coll.find()</code></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token operator">&gt;</span> db.coll.<span class="token function-name function">find</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span> <span class="token string">&quot;_id&quot;</span> <span class="token builtin class-name">:</span> ObjectId<span class="token punctuation">(</span><span class="token string">&quot;638e01311b684188d59dd0c0&quot;</span><span class="token punctuation">)</span>, <span class="token string">&quot;name&quot;</span> <span class="token builtin class-name">:</span> <span class="token string">&quot;a&quot;</span> <span class="token punctuation">}</span>
<span class="token punctuation">{</span> <span class="token string">&quot;_id&quot;</span> <span class="token builtin class-name">:</span> ObjectId<span class="token punctuation">(</span><span class="token string">&quot;638e01941b684188d59dd0c1&quot;</span><span class="token punctuation">)</span>, <span class="token string">&quot;age&quot;</span> <span class="token builtin class-name">:</span> <span class="token number">1</span> <span class="token punctuation">}</span>
<span class="token punctuation">{</span> <span class="token string">&quot;_id&quot;</span> <span class="token builtin class-name">:</span> ObjectId<span class="token punctuation">(</span><span class="token string">&quot;638e01941b684188d59dd0c2&quot;</span><span class="token punctuation">)</span>, <span class="token string">&quot;age&quot;</span> <span class="token builtin class-name">:</span> <span class="token number">2</span> <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>条件查询 - <code>db.coll.find(条件)</code></p><ul><li><p>等值查询</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token operator">&gt;</span> db.coll.find<span class="token punctuation">(</span><span class="token punctuation">{</span>age:1<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span> <span class="token string">&quot;_id&quot;</span> <span class="token builtin class-name">:</span> ObjectId<span class="token punctuation">(</span><span class="token string">&quot;638e01941b684188d59dd0c1&quot;</span><span class="token punctuation">)</span>, <span class="token string">&quot;age&quot;</span> <span class="token builtin class-name">:</span> <span class="token number">1</span> <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>大于</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token operator">&gt;</span> db.coll.find<span class="token punctuation">(</span><span class="token punctuation">{</span>age:<span class="token punctuation">{</span><span class="token variable">$gt</span>:1<span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span> <span class="token string">&quot;_id&quot;</span> <span class="token builtin class-name">:</span> ObjectId<span class="token punctuation">(</span><span class="token string">&quot;638e01941b684188d59dd0c2&quot;</span><span class="token punctuation">)</span>, <span class="token string">&quot;age&quot;</span> <span class="token builtin class-name">:</span> <span class="token number">2</span> <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>小于</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token operator">&gt;</span> db.coll.find<span class="token punctuation">(</span><span class="token punctuation">{</span>age:<span class="token punctuation">{</span><span class="token variable">$gt</span>:1<span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span> <span class="token string">&quot;_id&quot;</span> <span class="token builtin class-name">:</span> ObjectId<span class="token punctuation">(</span><span class="token string">&quot;638e01941b684188d59dd0c2&quot;</span><span class="token punctuation">)</span>, <span class="token string">&quot;age&quot;</span> <span class="token builtin class-name">:</span> <span class="token number">2</span> <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>大于等于</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token operator">&gt;</span> db.coll.find<span class="token punctuation">(</span><span class="token punctuation">{</span>age:<span class="token punctuation">{</span><span class="token variable">$gte</span>:1<span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span> <span class="token string">&quot;_id&quot;</span> <span class="token builtin class-name">:</span> ObjectId<span class="token punctuation">(</span><span class="token string">&quot;638e01941b684188d59dd0c1&quot;</span><span class="token punctuation">)</span>, <span class="token string">&quot;age&quot;</span> <span class="token builtin class-name">:</span> <span class="token number">1</span> <span class="token punctuation">}</span>
<span class="token punctuation">{</span> <span class="token string">&quot;_id&quot;</span> <span class="token builtin class-name">:</span> ObjectId<span class="token punctuation">(</span><span class="token string">&quot;638e01941b684188d59dd0c2&quot;</span><span class="token punctuation">)</span>, <span class="token string">&quot;age&quot;</span> <span class="token builtin class-name">:</span> <span class="token number">2</span> <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>小于等于</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token operator">&gt;</span> db.coll.find<span class="token punctuation">(</span><span class="token punctuation">{</span>age:<span class="token punctuation">{</span><span class="token variable">$lte</span>:2<span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span> <span class="token string">&quot;_id&quot;</span> <span class="token builtin class-name">:</span> ObjectId<span class="token punctuation">(</span><span class="token string">&quot;638e01941b684188d59dd0c1&quot;</span><span class="token punctuation">)</span>, <span class="token string">&quot;age&quot;</span> <span class="token builtin class-name">:</span> <span class="token number">1</span> <span class="token punctuation">}</span>
<span class="token punctuation">{</span> <span class="token string">&quot;_id&quot;</span> <span class="token builtin class-name">:</span> ObjectId<span class="token punctuation">(</span><span class="token string">&quot;638e01941b684188d59dd0c2&quot;</span><span class="token punctuation">)</span>, <span class="token string">&quot;age&quot;</span> <span class="token builtin class-name">:</span> <span class="token number">2</span> <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>不等于</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token operator">&gt;</span> db.coll.find<span class="token punctuation">(</span><span class="token punctuation">{</span>age:<span class="token punctuation">{</span><span class="token variable">$ne</span>:1<span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span> <span class="token string">&quot;_id&quot;</span> <span class="token builtin class-name">:</span> ObjectId<span class="token punctuation">(</span><span class="token string">&quot;638e01311b684188d59dd0c0&quot;</span><span class="token punctuation">)</span>, <span class="token string">&quot;name&quot;</span> <span class="token builtin class-name">:</span> <span class="token string">&quot;a&quot;</span> <span class="token punctuation">}</span>
<span class="token punctuation">{</span> <span class="token string">&quot;_id&quot;</span> <span class="token builtin class-name">:</span> ObjectId<span class="token punctuation">(</span><span class="token string">&quot;638e01941b684188d59dd0c2&quot;</span><span class="token punctuation">)</span>, <span class="token string">&quot;age&quot;</span> <span class="token builtin class-name">:</span> <span class="token number">2</span> <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul></li><li><p>逻辑条件查询 （与 或 非）</p><ul><li><p>and</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token operator">&gt;</span> db.coll.find<span class="token punctuation">(</span><span class="token punctuation">{</span>age:1,name:<span class="token string">&quot;a&quot;</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>or</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token operator">&gt;</span> db.coll.find<span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token variable">$or</span>:<span class="token punctuation">[</span><span class="token punctuation">{</span>age:1<span class="token punctuation">}</span>,<span class="token punctuation">{</span>age:2<span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span> <span class="token string">&quot;_id&quot;</span> <span class="token builtin class-name">:</span> ObjectId<span class="token punctuation">(</span><span class="token string">&quot;638e01941b684188d59dd0c1&quot;</span><span class="token punctuation">)</span>, <span class="token string">&quot;age&quot;</span> <span class="token builtin class-name">:</span> <span class="token number">1</span> <span class="token punctuation">}</span>
<span class="token punctuation">{</span> <span class="token string">&quot;_id&quot;</span> <span class="token builtin class-name">:</span> ObjectId<span class="token punctuation">(</span><span class="token string">&quot;638e01941b684188d59dd0c2&quot;</span><span class="token punctuation">)</span>, <span class="token string">&quot;age&quot;</span> <span class="token builtin class-name">:</span> <span class="token number">2</span> <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>not</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token operator">&gt;</span> db.coll.find<span class="token punctuation">(</span><span class="token punctuation">{</span>age:<span class="token punctuation">{</span><span class="token variable">$not</span>:<span class="token punctuation">{</span><span class="token variable">$lt</span>:1<span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span> <span class="token string">&quot;_id&quot;</span> <span class="token builtin class-name">:</span> ObjectId<span class="token punctuation">(</span><span class="token string">&quot;638e01311b684188d59dd0c0&quot;</span><span class="token punctuation">)</span>, <span class="token string">&quot;name&quot;</span> <span class="token builtin class-name">:</span> <span class="token string">&quot;a&quot;</span> <span class="token punctuation">}</span>
<span class="token punctuation">{</span> <span class="token string">&quot;_id&quot;</span> <span class="token builtin class-name">:</span> ObjectId<span class="token punctuation">(</span><span class="token string">&quot;638e01941b684188d59dd0c1&quot;</span><span class="token punctuation">)</span>, <span class="token string">&quot;age&quot;</span> <span class="token builtin class-name">:</span> <span class="token number">1</span> <span class="token punctuation">}</span>
<span class="token punctuation">{</span> <span class="token string">&quot;_id&quot;</span> <span class="token builtin class-name">:</span> ObjectId<span class="token punctuation">(</span><span class="token string">&quot;638e01941b684188d59dd0c2&quot;</span><span class="token punctuation">)</span>, <span class="token string">&quot;age&quot;</span> <span class="token builtin class-name">:</span> <span class="token number">2</span> <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul></li><li><p>分页查询 - <code>db.coll.find().sort({排序字段:排序方式}).skip(跳过的行数).limit(一页显示多少数据)</code></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&gt; db.coll.find().skip(1).limit(1)
{ &quot;_id&quot; : ObjectId(&quot;638e01941b684188d59dd0c1&quot;), &quot;age&quot; : 1 }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>查询指定字段</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token operator">&gt;</span> db.coll.find<span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token punctuation">}</span>,<span class="token punctuation">{</span>name:1<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span> <span class="token string">&quot;_id&quot;</span> <span class="token builtin class-name">:</span> ObjectId<span class="token punctuation">(</span><span class="token string">&quot;638e0cfe1b684188d59dd0c3&quot;</span><span class="token punctuation">)</span>, <span class="token string">&quot;name&quot;</span> <span class="token builtin class-name">:</span> <span class="token string">&quot;Jack&quot;</span> <span class="token punctuation">}</span>
<span class="token punctuation">{</span> <span class="token string">&quot;_id&quot;</span> <span class="token builtin class-name">:</span> ObjectId<span class="token punctuation">(</span><span class="token string">&quot;638e0cfe1b684188d59dd0c4&quot;</span><span class="token punctuation">)</span>, <span class="token string">&quot;name&quot;</span> <span class="token builtin class-name">:</span> <span class="token string">&quot;Mary&quot;</span> <span class="token punctuation">}</span>
<span class="token punctuation">{</span> <span class="token string">&quot;_id&quot;</span> <span class="token builtin class-name">:</span> ObjectId<span class="token punctuation">(</span><span class="token string">&quot;638e0cfe1b684188d59dd0c5&quot;</span><span class="token punctuation">)</span>, <span class="token string">&quot;name&quot;</span> <span class="token builtin class-name">:</span> <span class="token string">&quot;Rose&quot;</span> <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>查询排除字段</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token operator">&gt;</span> db.coll.find<span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token punctuation">}</span>,<span class="token punctuation">{</span>name:0<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span> <span class="token string">&quot;_id&quot;</span> <span class="token builtin class-name">:</span> ObjectId<span class="token punctuation">(</span><span class="token string">&quot;638e0cfe1b684188d59dd0c3&quot;</span><span class="token punctuation">)</span>, <span class="token string">&quot;age&quot;</span> <span class="token builtin class-name">:</span> <span class="token number">10</span> <span class="token punctuation">}</span>
<span class="token punctuation">{</span> <span class="token string">&quot;_id&quot;</span> <span class="token builtin class-name">:</span> ObjectId<span class="token punctuation">(</span><span class="token string">&quot;638e0cfe1b684188d59dd0c4&quot;</span><span class="token punctuation">)</span>, <span class="token string">&quot;age&quot;</span> <span class="token builtin class-name">:</span> <span class="token number">18</span> <span class="token punctuation">}</span>
<span class="token punctuation">{</span> <span class="token string">&quot;_id&quot;</span> <span class="token builtin class-name">:</span> ObjectId<span class="token punctuation">(</span><span class="token string">&quot;638e0cfe1b684188d59dd0c5&quot;</span><span class="token punctuation">)</span>, <span class="token string">&quot;age&quot;</span> <span class="token builtin class-name">:</span> <span class="token number">8</span> <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><h3 id="_2-3-数据更新" tabindex="-1"><a class="header-anchor" href="#_2-3-数据更新" aria-hidden="true">#</a> 2.3 数据更新</h3><p><code>db.coll.update({条件},{$set:{字段名:值}},{multi:true})</code></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token operator">&gt;</span> db.coll.update<span class="token punctuation">(</span><span class="token punctuation">{</span>age:1<span class="token punctuation">}</span>,<span class="token punctuation">{</span><span class="token variable">$set</span>:<span class="token punctuation">{</span>age:10<span class="token punctuation">}</span><span class="token punctuation">}</span>,<span class="token punctuation">{</span>multi:true<span class="token punctuation">}</span><span class="token punctuation">)</span>
WriteResult<span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token string">&quot;nMatched&quot;</span> <span class="token builtin class-name">:</span> <span class="token number">1</span>, <span class="token string">&quot;nUpserted&quot;</span> <span class="token builtin class-name">:</span> <span class="token number">0</span>, <span class="token string">&quot;nModified&quot;</span> <span class="token builtin class-name">:</span> <span class="token number">1</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><p><code>$set</code> 设置字段值</p></li><li><p><code>$unset</code> 删除指定字段</p></li><li><p><code>$inc</code> 对修改的值进行自增</p></li><li><p><code>upsert</code> 可选 如果不存在update的记录 是否插入objnew true是插入 默认false</p></li><li><p><code>multi</code> 可选 默认false只更新找到的第一条记录,如果是true就把按条件查询出来多条记录全部更新</p></li><li><p><code>writeConcern</code> 可选 用来指定mongod对写操作的回执为比如写的行为需要确认</p></li></ul><h3 id="_2-4-数据删除" tabindex="-1"><a class="header-anchor" href="#_2-4-数据删除" aria-hidden="true">#</a> 2.4 数据删除</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token operator">&gt;</span> db.coll.remove<span class="token punctuation">(</span><span class="token punctuation">{</span>name:<span class="token string">&quot;a&quot;</span><span class="token punctuation">}</span>,<span class="token punctuation">{</span>justOne: <span class="token number">1</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
WriteResult<span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token string">&quot;nRemoved&quot;</span> <span class="token builtin class-name">:</span> <span class="token number">1</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>db.collection.remove<span class="token punctuation">(</span>
   <span class="token operator">&lt;</span>query<span class="token operator">&gt;</span>,
   <span class="token punctuation">{</span>
     justOne: <span class="token operator">&lt;</span>boolean<span class="token operator">&gt;</span>,
     writeConcern: <span class="token operator">&lt;</span>document<span class="token operator">&gt;</span>
     <span class="token punctuation">}</span> <span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>参数说明: query :(可选)删除的文档的条件。 justOne : (可选)如果设为 true 或 1，则只删除一个文档，如果不设置该参数，或使用默认值 false，则删除 所有匹配条件的文档。 writeConcern :(可选)用来指定mongod对写操作的回执行为。</p></blockquote><h2 id="_3-聚合操作" tabindex="-1"><a class="header-anchor" href="#_3-聚合操作" aria-hidden="true">#</a> 3. 聚合操作</h2><p>// TODO</p><p><strong>准备示例数据</strong></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token operator">&gt;</span> db.coll.insert<span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">{</span><span class="token string">&quot;name&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;Jack&quot;</span>,<span class="token string">&quot;age&quot;</span>:10<span class="token punctuation">}</span>,<span class="token punctuation">{</span><span class="token string">&quot;name&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;Mary&quot;</span>,<span class="token string">&quot;age&quot;</span>:18<span class="token punctuation">}</span>,<span class="token punctuation">{</span><span class="token string">&quot;name&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;Rose&quot;</span>,<span class="token string">&quot;age&quot;</span>:8<span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
BulkWriteResult<span class="token punctuation">(</span><span class="token punctuation">{</span>
        <span class="token string">&quot;writeErrors&quot;</span> <span class="token builtin class-name">:</span> <span class="token punctuation">[</span> <span class="token punctuation">]</span>,
        <span class="token string">&quot;writeConcernErrors&quot;</span> <span class="token builtin class-name">:</span> <span class="token punctuation">[</span> <span class="token punctuation">]</span>,
        <span class="token string">&quot;nInserted&quot;</span> <span class="token builtin class-name">:</span> <span class="token number">3</span>,
        <span class="token string">&quot;nUpserted&quot;</span> <span class="token builtin class-name">:</span> <span class="token number">0</span>,
        <span class="token string">&quot;nMatched&quot;</span> <span class="token builtin class-name">:</span> <span class="token number">0</span>,
        <span class="token string">&quot;nModified&quot;</span> <span class="token builtin class-name">:</span> <span class="token number">0</span>,
        <span class="token string">&quot;nRemoved&quot;</span> <span class="token builtin class-name">:</span> <span class="token number">0</span>,
        <span class="token string">&quot;upserted&quot;</span> <span class="token builtin class-name">:</span> <span class="token punctuation">[</span> <span class="token punctuation">]</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token operator">&gt;</span> db.coll.<span class="token function-name function">find</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span> <span class="token string">&quot;_id&quot;</span> <span class="token builtin class-name">:</span> ObjectId<span class="token punctuation">(</span><span class="token string">&quot;638e0cfe1b684188d59dd0c3&quot;</span><span class="token punctuation">)</span>, <span class="token string">&quot;name&quot;</span> <span class="token builtin class-name">:</span> <span class="token string">&quot;Jack&quot;</span>, <span class="token string">&quot;age&quot;</span> <span class="token builtin class-name">:</span> <span class="token number">10</span> <span class="token punctuation">}</span>
<span class="token punctuation">{</span> <span class="token string">&quot;_id&quot;</span> <span class="token builtin class-name">:</span> ObjectId<span class="token punctuation">(</span><span class="token string">&quot;638e0cfe1b684188d59dd0c4&quot;</span><span class="token punctuation">)</span>, <span class="token string">&quot;name&quot;</span> <span class="token builtin class-name">:</span> <span class="token string">&quot;Mary&quot;</span>, <span class="token string">&quot;age&quot;</span> <span class="token builtin class-name">:</span> <span class="token number">18</span> <span class="token punctuation">}</span>
<span class="token punctuation">{</span> <span class="token string">&quot;_id&quot;</span> <span class="token builtin class-name">:</span> ObjectId<span class="token punctuation">(</span><span class="token string">&quot;638e0cfe1b684188d59dd0c5&quot;</span><span class="token punctuation">)</span>, <span class="token string">&quot;name&quot;</span> <span class="token builtin class-name">:</span> <span class="token string">&quot;Rose&quot;</span>, <span class="token string">&quot;age&quot;</span> <span class="token builtin class-name">:</span> <span class="token number">8</span> <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-1-单目的聚合" tabindex="-1"><a class="header-anchor" href="#_3-1-单目的聚合" aria-hidden="true">#</a> 3.1 单目的聚合</h3><ul><li><p>求总数</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token operator">&gt;</span> db.coll.find<span class="token punctuation">(</span><span class="token punctuation">)</span>.count<span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token number">3</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><h3 id="_3-2-聚合管道" tabindex="-1"><a class="header-anchor" href="#_3-2-聚合管道" aria-hidden="true">#</a> 3.2 聚合管道</h3><p><code>db.coll.aggregate(AGGREGATE_OPERATION)</code></p><h3 id="_3-3-mapreduce变成模型" tabindex="-1"><a class="header-anchor" href="#_3-3-mapreduce变成模型" aria-hidden="true">#</a> 3.3 MapReduce变成模型</h3><p><code>db.coll.mapReduce()</code></p>`,25),o=[p];function c(l,i){return s(),a("div",null,o)}const d=n(e,[["render",c],["__file","command.html.vue"]]);export{d as default};