# MongoDB - [索引](https://www.mongodb.com/docs/v4.2/indexes/)

索引是一种单独的、物理的对数据库表中一列或多列的值进行排序的一种存储结构，它是某个表中一列或若干列值的集合和响应的指向表中物理标识这些值的数据页的逻辑指针清单。索引可以根据目录中的页码快速找到所需的内容，目标是提供数据库的查询效率，没有索引时进行全表扫描，数据量大时严重降低查询效率。默认MongoDB在一个集合创建时，自动地对集合的_id创建了唯一索引

## 1. 索引类型

### 1.1 [单键索引](https://www.mongodb.com/docs/v4.2/core/index-single/)

支持所有数据类型中的单个字段索引，并且可以在文档的任何字段上定义

对于单个字段索引，因为可以在任意方向读取索引，所以索引键的顺序不重要

**单个列上创建索引**

`db.coll.createIndex({"字段名":排序方式});`

eg. `db.coll.createIndex({"name":1});`

**查看有哪些索引**

```sh
> db.coll.getIndexes()
[
        {
                "v" : 2,
                "key" : {
                        "_id" : 1
                },
                "name" : "_id_",
                "ns" : "test.coll"
        },
        {
                "v" : 2,
                "key" : {
                        "name" : 1
                },
                "name" : "name_1",
                "ns" : "test.coll"
        }
]
```

**过期索引**

过期索引是特殊的单键索引，可以支持文档在一定时间之后自动过期删除，目前TTL索引只能在单字段建立，且字段类型必须是日期类型

例如 在10秒后删除有"birth"字段的数据

```sh
db.coll.createIndex({"birth":1},{expireAfterSeconds: 10})
```

### 1.2 [复合索引](https://www.mongodb.com/docs/v4.2/core/index-compound/)

复合索引支持基于多个字段的索引，包括字段顺序和索引方向

`db.coll.createIndex({"字段1": 排序方式，"字段2": 排序方式})`

### 1.3 [多键索引](https://www.mongodb.com/docs/v4.2/core/index-multikey/)

针对属性包含数组数据的情况，Mongo支持针对数组中的每一个元素创建索引，多键索引支持strings,numbers,nested documents

### 1.4 地理空间索引

[2dsphere索引](https://www.mongodb.com/docs/v4.2/core/2dsphere/)，用于存储和查找**球面**上的点

[2d索引](https://www.mongodb.com/docs/v4.2/core/2d/)，用于存个和查找**平面**上的点

### 1.5 [哈希索引](https://www.mongodb.com/docs/v4.2/core/index-hashed/)

仅支持等值查询，不支持范围查询

`db.collection.createIndex( { _id: "hashed" } )`

## 2. 索引管理

### 2.1 创建索引并在后台运行

`db.coll.createIndex({"字段": 排序方式},{background: true})`

### 2.2 获取针对某个集合的索引

`db.coll.getIndexes()`

### 2.3 索引的大小

`db.coll.totalIndexSize()`

### 2.4 索引的重建

`db.coll.reIndex()`

### 2.5 索引的删除

`db.coll.dropIndex("索引名称")`

`db.coll.dropIndexes()`

## 3. explain分析

插入100w条示例数据

```js
for(var i=0;i<1000000;i++){
    db.coll.insertOne({id:i,name: "test-"+i,salary: Math.random().toFixed(2)});
}
```

`explain()`接收不同的参数，通过设置不同参数可以查看更详细的查询计划

- `queryPlanner` 默认参数，具体执行计划信息参考下面的表格
- `executionStats` 会返回执行计划的一些统计信息(有些版本中和allPlansExecution等同)
- `allPlansExecution` 用来获取所有执行计划，结果参数基本与上文相同。

### 3.1 `queryPlanner`默认参数



