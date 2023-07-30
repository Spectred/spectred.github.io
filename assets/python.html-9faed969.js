import{_ as n,V as s,W as a,a4 as e}from"./framework-eedf5ae1.js";const t={},p=e(`<h1 id="python脚本" tabindex="-1"><a class="header-anchor" href="#python脚本" aria-hidden="true">#</a> Python脚本</h1><h2 id="_1-读取-csv文件" tabindex="-1"><a class="header-anchor" href="#_1-读取-csv文件" aria-hidden="true">#</a> 1. 读取.csv文件</h2><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">def</span> <span class="token function">read_csv</span><span class="token punctuation">(</span>path<span class="token punctuation">)</span><span class="token punctuation">:</span>
    lines <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
    <span class="token keyword">with</span> <span class="token builtin">open</span><span class="token punctuation">(</span>path<span class="token punctuation">)</span> <span class="token keyword">as</span> f<span class="token punctuation">:</span>
        f_csv <span class="token operator">=</span> csv<span class="token punctuation">.</span>reader<span class="token punctuation">(</span>f<span class="token punctuation">)</span>

        headers <span class="token operator">=</span> <span class="token builtin">next</span><span class="token punctuation">(</span>f_csv<span class="token punctuation">)</span>
        size <span class="token operator">=</span> <span class="token builtin">len</span><span class="token punctuation">(</span>headers<span class="token punctuation">)</span>

        <span class="token keyword">for</span> row <span class="token keyword">in</span> f_csv<span class="token punctuation">:</span>
            e <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
            <span class="token keyword">for</span> i <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span>size<span class="token punctuation">)</span><span class="token punctuation">:</span>
                e<span class="token punctuation">[</span>headers<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">]</span> <span class="token operator">=</span> row<span class="token punctuation">[</span>i<span class="token punctuation">]</span>
            lines<span class="token punctuation">.</span>append<span class="token punctuation">(</span>e<span class="token punctuation">)</span>

    <span class="token keyword">return</span> lines

<span class="token keyword">if</span> __name__ <span class="token operator">==</span> <span class="token string">&#39;__main__&#39;</span><span class="token punctuation">:</span>
    file_path <span class="token operator">=</span> <span class="token string">&#39;/path/to/csv&#39;</span>
    entities <span class="token operator">=</span> read_csv0<span class="token punctuation">(</span>file_path<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_2-向mongo中插入数据" tabindex="-1"><a class="header-anchor" href="#_2-向mongo中插入数据" aria-hidden="true">#</a> 2. 向Mongo中插入数据</h2><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">def</span> <span class="token function">insert_many</span><span class="token punctuation">(</span>url<span class="token punctuation">,</span> db_name<span class="token punctuation">,</span> coll_name<span class="token punctuation">,</span> docs<span class="token punctuation">)</span><span class="token punctuation">:</span>
    client <span class="token operator">=</span> pymongo<span class="token punctuation">.</span>MongoClient<span class="token punctuation">(</span>url<span class="token punctuation">)</span>
    db <span class="token operator">=</span> client<span class="token punctuation">[</span>db_name<span class="token punctuation">]</span>
    coll <span class="token operator">=</span> db<span class="token punctuation">[</span>coll_name<span class="token punctuation">]</span>
    coll<span class="token punctuation">.</span>insert_many<span class="token punctuation">(</span>docs<span class="token punctuation">)</span>

<span class="token keyword">if</span> __name__ <span class="token operator">==</span> <span class="token string">&#39;__main__&#39;</span><span class="token punctuation">:</span>
    mongo_url <span class="token operator">=</span> <span class="token string">&#39;mongodb://xxxxx:27017/&#39;</span>
    mongo_db_name <span class="token operator">=</span> <span class="token string">&#39;dbname&#39;</span>
    mongo_coll_name <span class="token operator">=</span> <span class="token string">&#39;collname&#39;</span>
    entities <span class="token operator">=</span> read_csv0<span class="token punctuation">(</span>file_path<span class="token punctuation">)</span>
    insert_many<span class="token punctuation">(</span>mongo_url<span class="token punctuation">,</span> mongo_db_name<span class="token punctuation">,</span> mongo_coll_name<span class="token punctuation">,</span> entities<span class="token punctuation">)</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,5),o=[p];function c(i,l){return s(),a("div",null,o)}const r=n(t,[["render",c],["__file","python.html.vue"]]);export{r as default};
