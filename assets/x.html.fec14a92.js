import{_ as n,o as e,c as i,e as s}from"./app.94cd83f3.js";const l={},d=s(`<blockquote><p>http://easyyapi.com/ \u63A5\u53E3\u6587\u6863</p></blockquote><p>mac \u4E2D\u4F7F\u7528realpath (\u8F93\u51FA\u6307\u5B9A\u6587\u4EF6\u7684\u7EDD\u5BF9\u8DEF\u5F84) <code>brew install coreutils</code><code>realpath a.txt</code></p><h2 id="\u8BFB\u53D6csv\u5199\u5165\u5230mongo-\u5C5E\u6027\u7B80\u5355" tabindex="-1"><a class="header-anchor" href="#\u8BFB\u53D6csv\u5199\u5165\u5230mongo-\u5C5E\u6027\u7B80\u5355" aria-hidden="true">#</a> \u8BFB\u53D6csv\u5199\u5165\u5230mongo\uFF08\u5C5E\u6027\u7B80\u5355\uFF09</h2><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>import csv

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

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,4),a=[d];function c(v,r){return e(),i("div",null,a)}const o=n(l,[["render",c],["__file","x.html.vue"]]);export{o as default};
