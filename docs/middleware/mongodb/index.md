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

## 3. [explain](https://www.mongodb.com/docs/v4.2/reference/command/explain/index.html)

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

### 3.1 queryPlanner

```js
db.coll.find({name:"test-1001"}).explain()
```

```json
[
  {
    "ok": 1,
    "queryPlanner": {
      "plannerVersion": 1,
      "namespace": "test.coll",
      "indexFilterSet": false,
      "parsedQuery": {
        "name": {
          "$eq": "test-1001"
        }
      },
      "queryHash": "01AEE5EC",
      "planCacheKey": "4C5AEA2C",
      "winningPlan": {
        "stage": "FETCH",
        "inputStage": {
          "stage": "IXSCAN",
          "keyPattern": {
            "name": 1
          },
          "indexName": "name_1",
          "isMultiKey": false,
          "multiKeyPaths": {
            "name": []
          },
          "isUnique": false,
          "isSparse": false,
          "isPartial": false,
          "indexVersion": 2,
          "direction": "forward",
          "indexBounds": {
            "name": ["[\"test-1001\", \"test-1001\"]"]
          }
        }
      },
      "rejectedPlans": []
    },
    "serverInfo": {
      "host": "VM-24-3-centos",
      "port": 27017,
      "version": "4.2.23",
      "gitVersion": "f4e6602d3a4c5b22e9d8bcf0722d0afd0ec01ea2"
    }
  }
]
```
### 3.2 executionStats

`db.coll.find({name:"test-1001"}).explain("executionStats")`

```json
[
  {
    "executionStats": {
      "executionSuccess": true,
      "nReturned": 1,
      "executionTimeMillis": 1,
      "totalKeysExamined": 1,
      "totalDocsExamined": 1,
      "executionStages": {
        "stage": "FETCH",
        "nReturned": 1,
        "executionTimeMillisEstimate": 0,
        "works": 2,
        "advanced": 1,
        "needTime": 0,
        "needYield": 0,
        "saveState": 0,
        "restoreState": 0,
        "isEOF": 1,
        "docsExamined": 1,
        "alreadyHasObj": 0,
        "inputStage": {
          "stage": "IXSCAN",
          "nReturned": 1,
          "executionTimeMillisEstimate": 0,
          "works": 2,
          "advanced": 1,
          "needTime": 0,
          "needYield": 0,
          "saveState": 0,
          "restoreState": 0,
          "isEOF": 1,
          "keyPattern": {
            "name": 1
          },
          "indexName": "name_1",
          "isMultiKey": false,
          "multiKeyPaths": {
            "name": []
          },
          "isUnique": false,
          "isSparse": false,
          "isPartial": false,
          "indexVersion": 2,
          "direction": "forward",
          "indexBounds": {
            "name": ["[\"test-1001\", \"test-1001\"]"]
          },
          "keysExamined": 1,
          "seeks": 1,
          "dupsTested": 0,
          "dupsDropped": 0
        }
      }
    },
    "ok": 1,
    "queryPlanner": {
      "plannerVersion": 1,
      "namespace": "test.coll",
      "indexFilterSet": false,
      "parsedQuery": {
        "name": {
          "$eq": "test-1001"
        }
      },
      "winningPlan": {
        "stage": "FETCH",
        "inputStage": {
          "stage": "IXSCAN",
          "keyPattern": {
            "name": 1
          },
          "indexName": "name_1",
          "isMultiKey": false,
          "multiKeyPaths": {
            "name": []
          },
          "isUnique": false,
          "isSparse": false,
          "isPartial": false,
          "indexVersion": 2,
          "direction": "forward",
          "indexBounds": {
            "name": ["[\"test-1001\", \"test-1001\"]"]
          }
        }
      },
      "rejectedPlans": []
    },
    "serverInfo": {
      "host": "VM-24-3-centos",
      "port": 27017,
      "version": "4.2.23",
      "gitVersion": "f4e6602d3a4c5b22e9d8bcf0722d0afd0ec01ea2"
    }
  }
]
```

### 3.3 allPlansExecution

`db.coll.find({name:"test-1001"}).explain("allPlansExecution")`

```json
[
  {
    "executionStats": {
      "executionSuccess": true,
      "nReturned": 1,
      "executionTimeMillis": 0,
      "totalKeysExamined": 1,
      "totalDocsExamined": 1,
      "executionStages": {
        "stage": "FETCH",
        "nReturned": 1,
        "executionTimeMillisEstimate": 0,
        "works": 2,
        "advanced": 1,
        "needTime": 0,
        "needYield": 0,
        "saveState": 0,
        "restoreState": 0,
        "isEOF": 1,
        "docsExamined": 1,
        "alreadyHasObj": 0,
        "inputStage": {
          "stage": "IXSCAN",
          "nReturned": 1,
          "executionTimeMillisEstimate": 0,
          "works": 2,
          "advanced": 1,
          "needTime": 0,
          "needYield": 0,
          "saveState": 0,
          "restoreState": 0,
          "isEOF": 1,
          "keyPattern": {
            "name": 1
          },
          "indexName": "name_1",
          "isMultiKey": false,
          "multiKeyPaths": {
            "name": []
          },
          "isUnique": false,
          "isSparse": false,
          "isPartial": false,
          "indexVersion": 2,
          "direction": "forward",
          "indexBounds": {
            "name": ["[\"test-1001\", \"test-1001\"]"]
          },
          "keysExamined": 1,
          "seeks": 1,
          "dupsTested": 0,
          "dupsDropped": 0
        }
      },
      "allPlansExecution": []
    },
    "ok": 1,
    "queryPlanner": {
      "plannerVersion": 1,
      "namespace": "test.coll",
      "indexFilterSet": false,
      "parsedQuery": {
        "name": {
          "$eq": "test-1001"
        }
      },
      "winningPlan": {
        "stage": "FETCH",
        "inputStage": {
          "stage": "IXSCAN",
          "keyPattern": {
            "name": 1
          },
          "indexName": "name_1",
          "isMultiKey": false,
          "multiKeyPaths": {
            "name": []
          },
          "isUnique": false,
          "isSparse": false,
          "isPartial": false,
          "indexVersion": 2,
          "direction": "forward",
          "indexBounds": {
            "name": ["[\"test-1001\", \"test-1001\"]"]
          }
        }
      },
      "rejectedPlans": []
    },
    "serverInfo": {
      "host": "VM-24-3-centos",
      "port": 27017,
      "version": "4.2.23",
      "gitVersion": "f4e6602d3a4c5b22e9d8bcf0722d0afd0ec01ea2"
    }
  }
]
```

>executionStats返回逐层分析
>
>- 第一层，最为直观explain返回值是**executionTimeMillis**值，指的是这条语句的执行时间，这 个值当然是希望越少越好。
> 其中有3个executionTimeMillis，分别是:
>
> - executionStats.executionTimeMillis 该query的整体查询时间
> - executionStats.executionStages.executionTimeMillisEstimate 该查询检索document获得数据的时间
> - executionStats.executionStages.inputStage.executionTimeMillisEstimate 该查询扫描文档 index所用时间
>
>- 第二层，index与document扫描数与查询返回条目数 这个主要讨论3个返回项 **nReturned**、 **totalKeysExamined**、**totalDocsExamined**，分别代表**该条查询返回的条目**、**索引扫描条目**、**文档扫描条目**。 
>
> 这些 都是直观地影响到executionTimeMillis，我们需要扫描的越少速度越快。 对于一个查询，我们最理想的状态是: nReturned=totalKeysExamined=totalDocsExamined
>
>- 第三层，stage状态分析 那么又是什么影响到了totalKeysExamined和totalDocsExamined?是stage的类型。 类型列举如下:
>
> - COLLSCAN:全表扫描
> - IXSCAN:索引扫描
> - FETCH:根据索引去检索指定document 
> - SHARD_MERGE:将各个分片返回数据进行merge 
> - SORT:表明在内存中进行了排序
> - LIMIT:使用limit限制返回数
> - SKIP:使用skip进行跳过
> - IDHACK:针对_id进行查询 
> - SHARDING_FILTER:通过mongos对分片数据进行查询 
> - COUNT:利用db.coll.explain().count()之类进行count运算 
> - TEXT:使用全文索引进行查询时候的stage返回 
> - PROJECTION:限定返回字段时候stage的返回
>
> 对于普通查询，**希望**看到stage的组合(查询的时候尽可能用上索引): 
>
> - Fetch+IDHACK
>
> - Fetch+IXSCAN
>
> - Limit+(Fetch+IXSCAN)
>
> - PROJECTION+IXSCAN
>
> - SHARDING_FITER+IXSCAN
> 
> **不希望**希望看到包含如下的stage:
> 
> - COLLSCAN(全表扫描) 
> 
> - SORT(使用sort但是无index) 
> 
> - COUNT 不使用index进行count)
>

## 4. 慢查询

### 4.1 开启内置的查询分析器，记录读写操作效率

`db.setProfilingLevel(n,m)`

其中n:

- 0 不记录
- 1 记录慢操作，此时m必须赋值单位为ms,用于定义慢查询时间的阈值
- 2 记录所有的读写操作

### 4.2 查询监控结果

```js
// 查询最慢的三条
db.system.profile.find().sort({mills:-1}).limit(3)
```

### 4.3 分析慢查询

应用程序设计，数据模型是否正确，硬件配置，缺少索引

### 4.4 解析explain结果，确定是否缺少索引

## 5. 索引原理

MongoDB是文档型数据库，采用BSON格式保存数据，可以将一条数据和对应的数据都存入到一个BSON对象中。

MongoDB的索引使用**B-树**，所有节点都有Data域，只要找到指定索引就可以进行访问，单次查询从结构上看要快于MySQL

> B-树的特点：多叉树、每个节点即保存数据又保存索引、搜索时相当于二分查找
