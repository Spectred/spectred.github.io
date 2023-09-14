import{_ as n,V as i,W as o,Z as e,$ as t,Y as s,a4 as r,F as c}from"./framework-eedf5ae1.js";const a={},l=e("h1",{id:"字符串",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#字符串","aria-hidden":"true"},"#"),t(" 字符串")],-1),h=e("h2",{id:"string简介",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#string简介","aria-hidden":"true"},"#"),t(" String简介")],-1),_={href:"https://redis.io/docs/data-types/strings",target:"_blank",rel:"noopener noreferrer"},b=e("h2",{id:"有哪些命令",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#有哪些命令","aria-hidden":"true"},"#"),t(" 有哪些命令")],-1),u={href:"https://redis.io/commands/?group=string",target:"_blank",rel:"noopener noreferrer"},p={href:"https://github.com/Spectred/redis/blob/spectred_6.2/src/t_string.c",target:"_blank",rel:"noopener noreferrer"},g=e("h2",{id:"数据结构",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#数据结构","aria-hidden":"true"},"#"),t(" 数据结构")],-1),S=e("ul",null,[e("li",null,"如果value是64位有符号整数，Redis保存为8字节的Long类型整数(int编码方式)"),e("li",null,"如果value中包含字符串，Redis使用SDS(Simple Dynamic String)结构体保存")],-1),m=e("h3",{id:"数据结构-1",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#数据结构-1","aria-hidden":"true"},"#"),t(" 数据结构")],-1),f={href:"https://github.com/Spectred/redis/blob/spectred_6.2/src/sds.h",target:"_blank",rel:"noopener noreferrer"},v={href:"https://github.com/Spectred/redis/blob/spectred_6.2/src/sds.c",target:"_blank",rel:"noopener noreferrer"},D=r(`<p>源码中定义如下结构体(包括sdshdr5,sdshdr8,sdshdr16,sdshdr32,sdshdr64)</p><div class="language-C line-numbers-mode" data-ext="C"><pre class="language-C"><code>struct __attribute__ ((__packed__)) sdshdr8 {
    uint8_t len;            /* buf的已用长度,占1个字节 */
    uint8_t alloc;          /* buf的实际分配长度,占1个字节, 排除了header和null终止符 */
    unsigned char flags;    /* SDS类型,和SDS_TYPE_MASK计算出是sdshdr5/8/16/32/64 */
    char buf[];             /* 实际数据 */
};
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其中<code>__attribute__ ((__packed__))</code>表示 告诉编译器在对结构体进行内存对齐时不要进行字节对齐填充，采用紧凑的方式分配内存。默认如果变量5个字节，不够8字节也会分配8字节，使用后只有5个字节。</p><h3 id="redisobject" tabindex="-1"><a class="header-anchor" href="#redisobject" aria-hidden="true">#</a> RedisObject</h3>`,4),k=e("img",{src:"https://static001.geekbang.org/resource/image/34/57/3409948e9d3e8aa5cd7cafb9b66c2857.jpg",alt:"https://time.geekbang.org/column/article/279649",tabindex:"0",loading:"lazy"},null,-1),y={href:"https://time.geekbang.org/column/article/279649",target:"_blank",rel:"noopener noreferrer"},N=e("img",{src:"https://static001.geekbang.org/resource/image/ce/e3/ce83d1346c9642fdbbf5ffbe701bfbe3.jpg",alt:"https://time.geekbang.org/column/article/279649",tabindex:"0",loading:"lazy"},null,-1),O={href:"https://time.geekbang.org/column/article/279649",target:"_blank",rel:"noopener noreferrer"},x=e("h3",{id:"sds关键函数",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#sds关键函数","aria-hidden":"true"},"#"),t(" SDS关键函数")],-1),C={href:"https://github.com/Spectred/redis/blob/spectred_6.2/src/sds.c",target:"_blank",rel:"noopener noreferrer"},R={href:"http://redisbook.com/preview/sds/api.html",target:"_blank",rel:"noopener noreferrer"},j=r('<table><thead><tr><th>函数</th><th>作用</th><th>时间复杂度</th></tr></thead><tbody><tr><td><code>sdsnew</code></td><td>创建一个包含给定 C 字符串的 SDS 。</td><td>O(N) ， <code>N</code> 为给定 C 字符串的长度。</td></tr><tr><td><code>sdsempty</code></td><td>创建一个不包含任何内容的空 SDS 。</td><td>O(1)</td></tr><tr><td><code>sdsfree</code></td><td>释放给定的 SDS 。</td><td>O(1)</td></tr><tr><td><code>sdslen</code></td><td>返回 SDS 的已使用空间字节数。</td><td>这个值可以通过读取 SDS 的 <code>len</code> 属性来直接获得， 复杂度为 O(1) 。</td></tr><tr><td><code>sdsavail</code></td><td>返回 SDS 的未使用空间字节数。</td><td>这个值可以通过读取 SDS 的 <code>free</code> 属性来直接获得， 复杂度为 O(1) 。</td></tr><tr><td><code>sdsdup</code></td><td>创建一个给定 SDS 的副本（copy）。</td><td>O(N) ， <code>N</code> 为给定 SDS 的长度。</td></tr><tr><td><code>sdsclear</code></td><td>清空 SDS 保存的字符串内容。</td><td>因为惰性空间释放策略，复杂度为 O(1) 。</td></tr><tr><td><code>sdscat</code></td><td>将给定 C 字符串拼接到 SDS 字符串的末尾。</td><td>O(N) ， <code>N</code> 为被拼接 C 字符串的长度。</td></tr><tr><td><code>sdscatsds</code></td><td>将给定 SDS 字符串拼接到另一个 SDS 字符串的末尾。</td><td>O(N) ， <code>N</code> 为被拼接 SDS 字符串的长度。</td></tr><tr><td><code>sdscpy</code></td><td>将给定的 C 字符串复制到 SDS 里面， 覆盖 SDS 原有的字符串。</td><td>O(N) ， <code>N</code> 为被复制 C 字符串的长度。</td></tr><tr><td><code>sdsgrowzero</code></td><td>用空字符将 SDS 扩展至给定长度。</td><td>O(N) ， <code>N</code> 为扩展新增的字节数。</td></tr><tr><td><code>sdsrange</code></td><td>保留 SDS 给定区间内的数据， 不在区间内的数据会被覆盖或清除。</td><td>O(N) ， <code>N</code> 为被保留数据的字节数。</td></tr><tr><td><code>sdstrim</code></td><td>接受一个 SDS 和一个 C 字符串作为参数， 从 SDS 左右两端分别移除所有在 C 字符串中出现过的字符。</td><td>O(M*N) ， <code>M</code> 为 SDS 的长度， <code>N</code> 为给定 C 字符串的长度。</td></tr><tr><td><code>sdscmp</code></td><td>对比两个 SDS 字符串是否相同。</td><td>O(N) ， <code>N</code> 为两个 SDS 中较短的那个 SDS 的长度。</td></tr></tbody></table><div class="hint-container info"><p class="hint-container-title">Redis为什么使用SDS，而不是char*</p><p>背景：C语言中使用char<em>字符数组来实现字符串，char</em>指针指向字符数组起始位置，\\0表示字符串的结尾</p><p>为什么不用char*字符数组（因/0带来的问题）：</p><ol><li>不能存储任意格式数据（例如二进制）</li><li>操作字符串获取长度需要遍历到\\0，效率不高 O(N)</li></ol><p>为什么使用SDS(SDS的优势)（需要掌握SDS结构）：</p><ol><li>len + buf 1.1 由于使用len属性表示长度，可以规避\\0的问题，即能存储二进制（buf[])，获取长度直接使用属性值，O（1） 1.2 拼接字符串会检查空间大小是否满足，避免缓冲区溢出</li><li>flags + alloc +len 2.1 有多种类型的SDS(flags表示类型，len alloc区分长度)，存储长度不同的字符串 2.2 <strong>attribute</strong> ((<strong>packed</strong>))编译优化，采用紧凑方式分配内存 2.3 字符串内部编码优化，有int raw embstr三种</li></ol><p>个人理解：从“降本增效”的角度来看（降低内存使用，增加操作效率）</p><ol><li>降本：多种结构头存储不同大小字符串，紧凑型分配内存，内部编码优化</li><li>增效：使用len提升效率,避免遍历到\\0，基于长度的操作（如复制、追加）提升效率</li><li>功能上可以存储二进制数据</li></ol><p>引用《Redis设计与实现》中的图: <img src="https://s2.loli.net/2023/09/13/PUng9ikxzwZIRJ1.jpg" alt="http://redisbook.com/" loading="lazy"></p></div>',2),z={class:"hint-container info"},w=e("p",{class:"hint-container-title"},"Redis的String占用内存高的问题",-1),B={href:"https://time.geekbang.org/column/article/279649",target:"_blank",rel:"noopener noreferrer"},H=e("br",null,null,-1),L=e("p",null,"可以使用压缩列表(ziplist)数据结构节省内存（用一系列连续的 entry 保存数据），基于ziplist的实现数据类型有:Hash,List,SortedSet。",-1),V=e("p",null,"如果使用Hash则可以采用二级编码的方式(将前一部分key做为key,后一部分key作为field), 需要注意,Redis中的Hash的两种底层结构是压缩列表和哈希表，需要将key的长度控制在压缩列表结构上(例如将1101000060中的前7位1101000作为Hash的key,060作为field)",-1),E=e("p",null,"Hash阈值配置项: hash-max-ziplist-entries：用压缩列表保存时哈希集合中的最大元素个数 hash-max-ziplist-value：用压缩列表保存时哈希集合中单个元素的最大长度",-1),I=r(`<div class="hint-container info"><p class="hint-container-title">为什么SDS判断是否使用嵌入式字符串(embstr)的条件是44字节</p><p>embstr将RedisObject对象头和SDS对象连续存一起，使用一次<code>malloc</code>分配。raw需要两次<code>malloc</code>分配，两个对象头在内存地址上一般不连续。 内存分配子jmalloc最少分配32字节空间(只会分配2的幂)，当字符串再长一点就会分配64字节。如果超过64字节，将使用raw形式存储。</p><p>条件是44字节的原因是<code>redisObject</code>和<code>sdshdr</code>结构体元数据和字符数组结束符占了20个字节(64-20=44)</p><div class="language-C line-numbers-mode" data-ext="C"><pre class="language-C"><code>typedef struct redisObject {
    unsigned type:4;        // 4 bits
    unsigned encoding:4;    // 4 bits
    unsigned lru:LRU_BITS;  // 24 bits
    int refcount;           // 4 bytes
    void *ptr;              // 8 bytes
} robj;

struct __attribute__ ((__packed__)) sdshdr8 {
    uint8_t len;            // 1 byte
    uint8_t alloc;          // 1 byte
    unsigned char flags;    // 1 byte
    char buf[];             // 44 bytes + 1 byte(结尾\\0)
};
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div><div class="hint-container info"><p class="hint-container-title">Redis中String的扩容策略</p></div>`,2);function M(T,P){const d=c("ExternalLinkIcon");return i(),o("div",null,[l,h,e("p",null,[e("a",_,[t("数据类型: string"),s(d)])]),b,e("p",null,[e("a",u,[t("命令: string"),s(d)]),e("a",p,[t("命令源码 t_string.c"),s(d)])]),g,S,m,e("p",null,[e("a",f,[t("sds.h"),s(d)]),e("a",v,[t("sds.c"),s(d)])]),D,e("figure",null,[k,e("figcaption",null,[e("a",y,[t("https://time.geekbang.org/column/article/279649"),s(d)])])]),e("figure",null,[N,e("figcaption",null,[e("a",O,[t("https://time.geekbang.org/column/article/279649"),s(d)])])]),x,e("p",null,[t("相关源码实现: "),e("a",C,[t("sds.c"),s(d)])]),e("p",null,[e("a",R,[t("Redis设计与实现 表2-2"),s(d)])]),j,e("div",z,[w,e("p",null,[e("a",B,[t("极客时间:Redis核心技术与实战:11 | “万金油”的String，为什么不好用了？"),s(d)]),H,t(" 由于RedisObject，和SDS中属性的元数据存储，在存储较长数据时会有更多的额外内存空间开销 ，内存增大会导致因为生成RDB而变慢。")]),L,V,E]),I])}const Y=n(a,[["render",M],["__file","string.html.vue"]]);export{Y as default};
