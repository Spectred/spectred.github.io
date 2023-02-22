import{_ as s,V as l,W as d,Z as e,$ as n,X as a,a4 as r,F as c}from"./framework-b6120433.js";const v={},o={href:"http://easyyapi.com/",target:"_blank",rel:"noopener noreferrer"},t=r(`<p>GIT 查看分支的不同 git log dev ^master -- 查看dev有 而master没有的 git log master..dev -- 查看dev比master多提交的 git log master...dev -- 查看两个分支的不同 git log --left-right dev...master -- 额外显示每个提交在哪个分支上</p><p>mac 中使用realpath (输出指定文件的绝对路径) <code>brew install coreutils</code><code>realpath a.txt</code></p><h2 id="读取csv写入到mongo-属性简单" tabindex="-1"><a class="header-anchor" href="#读取csv写入到mongo-属性简单" aria-hidden="true">#</a> 读取csv写入到mongo（属性简单）</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>import csv

import pymongo


def insert_many(url, db_name, coll_name, docs):
    client = pymongo.MongoClient(url)
    db = client[db_name]
    coll = db[coll_name]
    coll.insert_many(docs)


def read_csv(path):
    lines = []
    with open(path) as f:
        f_csv = csv.reader(f)

        headers = next(f_csv)
        size = len(headers)

        for row in f_csv:
            e = {}
            for i in range(size):
                e[headers[i]] = row[i]
            lines.append(e)

    return lines


if __name__ == &#39;__main__&#39;:
    file_path = &#39;/path/to/csv&#39;
    mongo_url = &#39;mongodb://ip:port/&#39;
    mongo_db_name = &#39;test&#39;
    mongo_coll_name = &#39;coll&#39;
    entities = read_csv(file_path)
    insert_many(mongo_url, mongo_db_name, mongo_coll_name, entities)

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,4);function m(u,_){const i=c("ExternalLinkIcon");return l(),d("div",null,[e("blockquote",null,[e("p",null,[e("a",o,[n("http://easyyapi.com/"),a(i)]),n(" 接口文档")])]),t])}const p=s(v,[["render",m],["__file","x.html.vue"]]);export{p as default};
