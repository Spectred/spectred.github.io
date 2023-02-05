import{_ as t,r as e,o,c,a as n,b as s,d as p,e as l}from"./app.94cd83f3.js";const i={},u=n("h1",{id:"trietree-\u524D\u7F00\u6811-\u5B57\u5178\u6811",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#trietree-\u524D\u7F00\u6811-\u5B57\u5178\u6811","aria-hidden":"true"},"#"),s(" TrieTree \u524D\u7F00\u6811/\u5B57\u5178\u6811")],-1),k={href:"https://en.wikipedia.org/wiki/Trie",target:"_blank",rel:"noopener noreferrer"},r={href:"https://time.geekbang.org/column/article/72414",target:"_blank",rel:"noopener noreferrer"},d=l(`<p>TrieTree\u662F\u4E00\u79CD\u4E13\u95E8\u5904\u7406\u5B57\u7B26\u4E32\u5339\u914D\u7684\u6570\u636E\u7ED3\u6784\uFF0C\u7528\u6765\u89E3\u51B3\u5728\u4E00\u7EC4\u5B57\u7B26\u4E32\u7ED3\u5408\u4E2D\u5FEB\u901F\u67E5\u627E\u67D0\u4E2A\u5B57\u7B26\u4E32\u7684\u95EE\u9898\uFF0C</p><p>\u672C\u8D28\u662F\u5229\u7528\u5B57\u7B26\u4E32\u4E4B\u95F4\u7684\u516C\u5171\u524D\u7F00\uFF0C\u5C06\u91CD\u590D\u7684\u524D\u7F00\u5408\u5E76\u5728\u4E00\u8D77\u3002</p><p>\u6839\u8282\u70B9\u4E0D\u5305\u542B\u4EFB\u4F55\u4FE1\u606F\uFF0C\u6BCF\u4E2A\u8282\u70B9\u8868\u793A\u4E00\u4E2A \u5B57\u7B26\u4E32\u4E2D\u7684\u5B57\u7B26\uFF0C\u4ECE\u6839\u8282\u70B9\u5230\u7EA2\u8272\u8282\u70B9\u7684\u4E00\u6761\u8DEF\u5F84\u8868\u793A\u4E00\u4E2A\u5B57\u7B26\u4E32(\u7EA2\u8272\u8282\u70B9\u5E76\u4E0D\u90FD\u662F\u53F6\u5B50\u7ED3\u70B9)\uFF0C</p><p>\u5982\u4E0B\u56FE\u4EE3\u8868\u77406\u4E2A\u5B57\u7B26\u4E32:<code>hello,her,hi,how,see,so</code></p><p><img src="https://static001.geekbang.org/resource/image/28/32/280fbc0bfdef8380fcb632af39e84b32.jpg?wh=1142*573" alt=""></p><h2 id="\u6784\u5EFAtrietree" tabindex="-1"><a class="header-anchor" href="#\u6784\u5EFAtrietree" aria-hidden="true">#</a> \u6784\u5EFATrieTree</h2><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Trie</span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token class-name">TrieNode</span> root <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">TrieNode</span><span class="token punctuation">(</span><span class="token char">&#39;/&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">insert</span><span class="token punctuation">(</span><span class="token keyword">char</span><span class="token punctuation">[</span><span class="token punctuation">]</span> text<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">TrieNode</span> p <span class="token operator">=</span> root<span class="token punctuation">;</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> text<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">int</span> index <span class="token operator">=</span> text<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">-</span> <span class="token char">&#39;a&#39;</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>p<span class="token punctuation">.</span>children<span class="token punctuation">[</span>index<span class="token punctuation">]</span> <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token class-name">TrieNode</span> newNode <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">TrieNode</span><span class="token punctuation">(</span>text<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                p<span class="token punctuation">.</span>children<span class="token punctuation">[</span>index<span class="token punctuation">]</span> <span class="token operator">=</span> newNode<span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            p <span class="token operator">=</span> p<span class="token punctuation">.</span>children<span class="token punctuation">[</span>index<span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        p<span class="token punctuation">.</span>isEndingChar <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">find</span><span class="token punctuation">(</span><span class="token keyword">char</span><span class="token punctuation">[</span><span class="token punctuation">]</span> pattern<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">TrieNode</span> p <span class="token operator">=</span> root<span class="token punctuation">;</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> pattern<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">int</span> index <span class="token operator">=</span> pattern<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">-</span> <span class="token char">&#39;a&#39;</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>p<span class="token punctuation">.</span>children<span class="token punctuation">[</span>index<span class="token punctuation">]</span> <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            p <span class="token operator">=</span> p<span class="token punctuation">.</span>children<span class="token punctuation">[</span>index<span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>p<span class="token punctuation">.</span>isEndingChar <span class="token operator">==</span> <span class="token boolean">false</span><span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span> <span class="token comment">// \u4E0D\u80FD\u5B8C\u5168\u5339\u914D</span>
        <span class="token keyword">else</span> <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>


    <span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">TrieNode</span> <span class="token punctuation">{</span>

        <span class="token keyword">public</span> <span class="token keyword">char</span> data<span class="token punctuation">;</span>

        <span class="token keyword">public</span> <span class="token class-name">TrieNode</span><span class="token punctuation">[</span><span class="token punctuation">]</span> children <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">TrieNode</span><span class="token punctuation">[</span><span class="token number">26</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

        <span class="token keyword">public</span> <span class="token keyword">boolean</span> isEndingChar <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>

        <span class="token keyword">public</span> <span class="token class-name">TrieNode</span><span class="token punctuation">(</span><span class="token keyword">char</span> data<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>data <span class="token operator">=</span> data<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Trie</span> trie <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Trie</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> strs <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token string">&quot;hello&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;her&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;hi&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;how&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;see&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;so&quot;</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">String</span> str <span class="token operator">:</span> strs<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            trie<span class="token punctuation">.</span><span class="token function">insert</span><span class="token punctuation">(</span>str<span class="token punctuation">.</span><span class="token function">toCharArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">boolean</span> b1 <span class="token operator">=</span> trie<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token string">&quot;hello&quot;</span><span class="token punctuation">.</span><span class="token function">toCharArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">boolean</span> b2 <span class="token operator">=</span> trie<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token string">&quot;he&quot;</span><span class="token punctuation">.</span><span class="token function">toCharArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>b1<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// true</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>b2<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// false</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="\u5728\u4E1A\u52A1\u4E2D\u7684\u5E94\u7528" tabindex="-1"><a class="header-anchor" href="#\u5728\u4E1A\u52A1\u4E2D\u7684\u5E94\u7528" aria-hidden="true">#</a> \u5728\u4E1A\u52A1\u4E2D\u7684\u5E94\u7528</h2><p>\u4E1A\u52A1\u80CC\u666F: \u5728\u9875\u9762\u4E2D\u6709\u4E00\u4EFD\u8868\u5355(\u5305\u542B\u5355\u9009\u3001\u591A\u9009\u7B49\u7B49\u9898\u76EE)\uFF0C\u6839\u636E\u4E1A\u52A1\u573A\u666F\u62BD\u5411\u6210\u6A21\u677F\u3001\u8868\u5355\u3001\u6570\u636E\u5355\u5143\uFF0C\u5176\u4E2D\u6570\u636E\u5355\u5143\u4EE3\u8868\u4E00\u4E2A\u9898\u76EE(\u4F8B\u5982\u5355\u9009\u9898\u3001\u591A\u9009\u9898\u3001\u586B\u7A7A\u9898\u7B49)\uFF0C\u8868\u5355\u662F\u4E00\u7C7B\u591A\u4E2A\u6570\u636E\u5355\u5143\u7684\u96C6\u5408\uFF0C\u6A21\u677F\u662F\u4E00\u7C7B\u591A\u4E2A\u8868\u5355\u7684\u96C6\u5408\uFF0C\u518D\u5C06\u8FD9\u4E09\u4E2A\u5173\u952E\u5BF9\u8C61\u90FD\u7B80\u5316\u6210\u5982\u4E0B\u5BF9\u8C61(\u5B9E\u9645\u7684\u4E1A\u52A1\u5BF9\u8C61\u6BCF\u4E2A\u90FD\u4E0D\u540C\uFF0C\u4F46\u662F\u6709\u5171\u540C\u7684\u70B9)</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">FormNode</span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token class-name">String</span> path<span class="token punctuation">;</span>
    
    <span class="token keyword">private</span> <span class="token class-name">Object</span> data<span class="token punctuation">;</span>
    
    <span class="token keyword">private</span> <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">FormNode</span><span class="token punctuation">&gt;</span></span> children<span class="token punctuation">;</span>
  	<span class="token comment">// setter and getter</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u4E1A\u52A1\u9700\u6C42: \u4F20\u5165\u4E00\u4E2A\u8DEF\u5F84\uFF0C\u4F8B\u5982: <code>&quot;\u6A21\u677F\u4E00_\u8868\u5355A_\u6570\u636E\u5355\u5143a2&quot;</code>,\u548C\u5DF2\u6784\u5EFA\u597D\u7684\u6811\uFF0C\u8FD4\u56DE\u8DEF\u5F84\u5BF9\u5E94\u7684\u5BF9\u8C61</p><p>\u5B9E\u73B0:</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">FormNode</span> <span class="token function">find</span><span class="token punctuation">(</span><span class="token class-name">FormNode</span> template<span class="token punctuation">,</span> <span class="token class-name">String</span> path<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> indexes <span class="token operator">=</span> path<span class="token punctuation">.</span><span class="token function">split</span><span class="token punctuation">(</span><span class="token string">&quot;_&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">FormNode</span> p <span class="token operator">=</span> template<span class="token punctuation">;</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> indexes<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">String</span> index <span class="token operator">=</span> indexes<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">;</span>
            <span class="token class-name">Map</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">FormNode</span><span class="token punctuation">&gt;</span></span> childrenMap <span class="token operator">=</span> p<span class="token punctuation">.</span><span class="token function">getChildren</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">collect</span><span class="token punctuation">(</span><span class="token class-name">Collectors</span><span class="token punctuation">.</span><span class="token function">toMap</span><span class="token punctuation">(</span><span class="token class-name">FormNode</span><span class="token operator">::</span><span class="token function">getPath</span><span class="token punctuation">,</span> <span class="token class-name">Function</span><span class="token punctuation">.</span><span class="token function">identity</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>childrenMap<span class="token punctuation">.</span><span class="token function">containsKey</span><span class="token punctuation">(</span>index<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            p <span class="token operator">=</span> childrenMap<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>index<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> p<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// \u6784\u5EFA\u4E00\u4E2A\u7B80\u5355\u7684\u6811\u5BF9\u8C61</span>
        <span class="token class-name">FormNode</span> template <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">FormNode</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        template<span class="token punctuation">.</span><span class="token function">setPath</span><span class="token punctuation">(</span><span class="token string">&quot;\u6A21\u677F\u4E00&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">FormNode</span> form1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">FormNode</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        form1<span class="token punctuation">.</span><span class="token function">setPath</span><span class="token punctuation">(</span><span class="token string">&quot;\u6A21\u677FA&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">FormNode</span> data1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">FormNode</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        data1<span class="token punctuation">.</span><span class="token function">setPath</span><span class="token punctuation">(</span><span class="token string">&quot;\u6570\u636E\u5355\u5143a1&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">FormNode</span> data2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">FormNode</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        data2<span class="token punctuation">.</span><span class="token function">setData</span><span class="token punctuation">(</span><span class="token string">&quot;Hello&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        data2<span class="token punctuation">.</span><span class="token function">setPath</span><span class="token punctuation">(</span><span class="token string">&quot;\u6570\u636E\u5355\u5143a2&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        form1<span class="token punctuation">.</span><span class="token function">setChildren</span><span class="token punctuation">(</span><span class="token class-name">List</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span>data1<span class="token punctuation">,</span> data2<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">FormNode</span> form2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">FormNode</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        form2<span class="token punctuation">.</span><span class="token function">setPath</span><span class="token punctuation">(</span><span class="token string">&quot;\u8868\u5355B&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        template<span class="token punctuation">.</span><span class="token function">setChildren</span><span class="token punctuation">(</span><span class="token class-name">List</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span>form1<span class="token punctuation">,</span> form2<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">FormNode</span> result <span class="token operator">=</span> <span class="token function">find</span><span class="token punctuation">(</span>template<span class="token punctuation">,</span> <span class="token string">&quot;\u6A21\u677F\u4E00_\u6A21\u677FA_\u6570\u636E\u5355\u5143a2&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>result<span class="token punctuation">.</span><span class="token function">getData</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Hello</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,13);function v(m,b){const a=e("ExternalLinkIcon");return o(),c("div",null,[u,n("blockquote",null,[n("p",null,[n("a",k,[s("Wiki-Trie"),p(a)])]),n("p",null,[n("a",r,[s("35 | Trie\u6811\uFF1A\u5982\u4F55\u5B9E\u73B0\u641C\u7D22\u5F15\u64CE\u7684\u641C\u7D22\u5173\u952E\u8BCD\u63D0\u793A\u529F\u80FD\uFF1F"),p(a)])])]),d])}const f=t(i,[["render",v],["__file","trietree.html.vue"]]);export{f as default};
