import{_ as n,V as d,W as i,a3 as a,Z as e}from"./framework-d0eb6f2b.js";const o={},s=a(`<h2 id="备份和恢复" tabindex="-1"><a class="header-anchor" href="#备份和恢复" aria-hidden="true">#</a> 备份和恢复</h2><blockquote><p>任意时间点备份恢复=全量备份(mongodump/复制数据库文件/文件系统快照) + oplog</p></blockquote><h4 id="mongodump" tabindex="-1"><a class="header-anchor" href="#mongodump" aria-hidden="true">#</a> <code>mongodump</code></h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>mongodump -h HOST -d DB_NAME -o 备份的数据存放位置
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="mongorestore" tabindex="-1"><a class="header-anchor" href="#mongorestore" aria-hidden="true">#</a> <code>mongorestore</code></h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>mongorestore -h HOST:PORT -d DB_NAME PATH
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="备份和恢复的重要选项" tabindex="-1"><a class="header-anchor" href="#备份和恢复的重要选项" aria-hidden="true">#</a> 备份和恢复的重要选项</h4><p><code>mongodump</code>：</p><ul><li><p>--oplog 只对全库导出有效，不能指定-d</p><p>幂等性，已存在的数据，重做oplog不会重复；不存在的数据重做oplog就可以进入数据库</p></li></ul><p><code>mongoresotre</code>:</p><ul><li>--oplogReplay: 可以重放oplog.bson中的操作内容</li><li>--oplogLimit: 回放的时间节点，此时间之前的数据可恢复</li></ul><p>通过oplog查询误操作的最后时间</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>bsondump oplog.rs.bson | grep &quot;&quot;op&quot;:&quot;d&quot;&quot; |head
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>或</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>db.oplog.rs.find({&quot;op&quot;:&quot;d&quot;}).sort({&quot;ts&quot;:=1})
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="全量加增量备份和恢复案例" tabindex="-1"><a class="header-anchor" href="#全量加增量备份和恢复案例" aria-hidden="true">#</a> 全量加增量备份和恢复案例</h4>`,16),l=e("blockquote",null,[e("p",null,"删除复制集中原来的数据文件目录 重新建立数据目录"),e("p",null,"重新启动复制集中的实例 进行复制集的配置"),e("p",null,'var cfg ={"_id":"cluster_id",'),e("p",null,'"protocolVersion" : 1,'),e("p",null,'"members":['),e("p",null,'{"_id":1,"host":"ip:37017","priority":10},'),e("p",null,'{"_id":2,"host":"ip:37018"},'),e("p",{"_id:3,host:ip:37019":""}),e("p",null,"]"),e("p",null,"}"),e("p",null,"rs.initiate(cfg)")],-1),r=a(`<h5 id="全量备份" tabindex="-1"><a class="header-anchor" href="#全量备份" aria-hidden="true">#</a> 全量备份</h5><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>./bin/mongodump --host=HOST --port=PORT--out=/root/fullbackup
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h5 id="增量备份" tabindex="-1"><a class="header-anchor" href="#增量备份" aria-hidden="true">#</a> 增量备份</h5><p>模拟插入数据和更新后</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>/bin/mongodump --host=HOST --port=PORT -d local -c oplog.rs -o=/root/oplog_bak
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h5 id="恢复全量数据" tabindex="-1"><a class="header-anchor" href="#恢复全量数据" aria-hidden="true">#</a> 恢复全量数据</h5><p>先删除所有数据</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>/bin/mongorestore --host=HOST --port=PORT --dir=/root/fullbackup
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h5 id="恢复数据到指定的时间点" tabindex="-1"><a class="header-anchor" href="#恢复数据到指定的时间点" aria-hidden="true">#</a> 恢复数据到指定的时间点</h5><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>改变oplog.rs.bson 为 oplog.bson 删除oplog.rs.metadata.bson
mv /root/oplog_bak/local/oplog.rs.bson /root/oplog_bak/local/oplog.bson
rm /root/oplog_bak/local/oplog.rs.metadata.json -rf

找出第一次更新的时间
use local
db.oplog.rs.find({&quot;op&quot; : &quot;u&quot;}).sort({&quot;ts&quot;:1})
恢复到指定的时间点的数据
./bin/mongorestore --host=HOST --port=PORT --oplogReplay --oplogLimit &quot;实际查询出来的时间&quot; /root/oplog_bak/local
1606651336

./bin/mongorestore --host=HOST --port=PORT --oplogReplay --oplogLimit &quot;1606651336:4&quot; /root/oplog_bak/local
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="恢复所有的增量数据" tabindex="-1"><a class="header-anchor" href="#恢复所有的增量数据" aria-hidden="true">#</a> 恢复所有的增量数据</h5><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>./bin/mongorestore --host=HOST --port=PORT --oplogReplay /root/oplog_bak/local
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="定时备份" tabindex="-1"><a class="header-anchor" href="#定时备份" aria-hidden="true">#</a> 定时备份</h4><h5 id="编写备份脚本-root-backup-mongobk-sh" tabindex="-1"><a class="header-anchor" href="#编写备份脚本-root-backup-mongobk-sh" aria-hidden="true">#</a> 编写备份脚本 <code>/root/backup/mongobk.sh</code></h5><p><code>chmod +x /root/backup/mongobk.sh</code></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>#!/bin/sh
# dump 命令执行路径，根据mongodb安装路径而定
DUMP=/root/mongodb/bin/mongodump
# 临时备份路径
OUT_DIR=/root/backup/mongod_bak/mongod_bak_now
# 压缩后的备份存放路径
TAR_DIR=/root/backup/mongod_bak/mongod_bak_list
# 当前系统时间
DATE=\`date +%Y_%m_%d%H%M%S\`
# 数据库账号
#DB_USER=user
# 数据库密码
#DB_PASS=password
# 代表删除7天前的备份，即只保留近 7 天的备份
DAYS=7
# 最终保存的数据库备份文件
TAR_BAK=&quot;mongod_bak_$DATE.tar.gz&quot;
cd $OUT_DIR
rm -rf $OUT_DIR/*
mkdir -p $OUT_DIR/$DATE
$DUMP -h 127.0.0.1 --port 37017 -o $OUT_DIR/$DATE
# 压缩格式为 .tar.gz 格式
tar -zPcvf $TAR_DIR/$TAR_BAK $OUT_DIR/$DATE
# 删除 7 天前的备份文件
find $TAR_DIR/ -mtime +$DAYS -delete
exit
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="编辑crontab" tabindex="-1"><a class="header-anchor" href="#编辑crontab" aria-hidden="true">#</a> 编辑crontab</h5><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>crontab -e

# 每天凌晨2点30分执行备份
30 2 * * * /root/backup/mongobk.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="查看crontab的状态" tabindex="-1"><a class="header-anchor" href="#查看crontab的状态" aria-hidden="true">#</a> 查看crontab的状态</h5><p><code>service crond status</code></p><h5 id="启动定时任务和加入开机自启动" tabindex="-1"><a class="header-anchor" href="#启动定时任务和加入开机自启动" aria-hidden="true">#</a> 启动定时任务和加入开机自启动</h5><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># 启动定时任务
service crond start
# 加入开机自动启动
chkconfig --level 35 crond on
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="查看定时任务和删除定时任务" tabindex="-1"><a class="header-anchor" href="#查看定时任务和删除定时任务" aria-hidden="true">#</a> 查看定时任务和删除定时任务</h5><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>crontab -l
crontab -r 
crontab -e
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,24),t=[s,l,r];function c(u,v){return d(),i("div",null,t)}const m=n(o,[["render",c],["__file","backups.html.vue"]]);export{m as default};
