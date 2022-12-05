# MongoDB - 命令

## 1. 基本操作

- 查看数据库

  ```sh
  > show dbs
  admin   0.000GB
  config  0.000GB
  local   0.000GB
  ```

- 切换数据库，如果没有对象的数据库则创建

  ```sh
  > use test
  switched to db test
  ```
  
- 创建集合

  ```sh
  > db.createCollection("coll1")
  { "ok" : 1 }
  ```
  
- 查看集合

  ```sh
  > show collections
  coll1
  ```

- 删除集合

  ```sh
  > db.coll1.drop()
  true
  ```

- 删除当前数据库

  ```sh
  > db.dropDatabase()
  { "dropped" : "test", "ok" : 1 }
  ```

## 2. 集合数据操作-CRUD

### 2.1 数据添加

- 插入单条数据 - `db.coll.insert({})`

  ```
  > db.coll.insert({"name":"a"})
  WriteResult({ "nInserted" : 1 }
  ```

- 插入多条数据 - `db.coll.insert([{},{}])`

  ```
  > db.coll.insert([{"age":1},{"age":2}])
  BulkWriteResult({
          "writeErrors" : [ ],
          "writeConcernErrors" : [ ],
          "nInserted" : 2,
          "nUpserted" : 0,
          "nMatched" : 0,
          "nModified" : 0,
          "nRemoved" : 0,
          "upserted" : [ ]
  })
  ```

### 2.2 数据查询

- 查询所有 - `db.coll.find()`

  ```sh
  > db.coll.find()
  { "_id" : ObjectId("638e01311b684188d59dd0c0"), "name" : "a" }
  { "_id" : ObjectId("638e01941b684188d59dd0c1"), "age" : 1 }
  { "_id" : ObjectId("638e01941b684188d59dd0c2"), "age" : 2 }
  ```

- 条件查询 - `db.coll.find(条件)`

  - 等值查询

    ```sh
    > db.coll.find({age:1})
    { "_id" : ObjectId("638e01941b684188d59dd0c1"), "age" : 1 }
    ```

  - 大于

    ```sh
    > db.coll.find({age:{$gt:1}})
    { "_id" : ObjectId("638e01941b684188d59dd0c2"), "age" : 2 }
    ```

  - 小于

    ```sh
    > db.coll.find({age:{$gt:1}})
    { "_id" : ObjectId("638e01941b684188d59dd0c2"), "age" : 2 }
    ```

  - 大于等于

    ```sh
    > db.coll.find({age:{$gte:1}})
    { "_id" : ObjectId("638e01941b684188d59dd0c1"), "age" : 1 }
    { "_id" : ObjectId("638e01941b684188d59dd0c2"), "age" : 2 }
    ```

  - 小于等于

    ```sh
    > db.coll.find({age:{$lte:2}})
    { "_id" : ObjectId("638e01941b684188d59dd0c1"), "age" : 1 }
    { "_id" : ObjectId("638e01941b684188d59dd0c2"), "age" : 2 }
    ```

  - 不等于

    ```sh
    > db.coll.find({age:{$ne:1}})
    { "_id" : ObjectId("638e01311b684188d59dd0c0"), "name" : "a" }
    { "_id" : ObjectId("638e01941b684188d59dd0c2"), "age" : 2 }
    ```

- 逻辑条件查询 （与 或 非）

  - and

    ```sh
    > db.coll.find({age:1,name:"a"})
    ```

  - or

    ```sh
    > db.coll.find({$or:[{age:1},{age:2}]})
    { "_id" : ObjectId("638e01941b684188d59dd0c1"), "age" : 1 }
    { "_id" : ObjectId("638e01941b684188d59dd0c2"), "age" : 2 }
    ```

  - not

    ```sh
    > db.coll.find({age:{$not:{$lt:1}}})
    { "_id" : ObjectId("638e01311b684188d59dd0c0"), "name" : "a" }
    { "_id" : ObjectId("638e01941b684188d59dd0c1"), "age" : 1 }
    { "_id" : ObjectId("638e01941b684188d59dd0c2"), "age" : 2 }
    ```

- 分页查询 - `db.coll.find().sort({排序字段:排序方式}).skip(跳过的行数).limit(一页显示多少数据)`

  ```
  > db.coll.find().skip(1).limit(1)
  { "_id" : ObjectId("638e01941b684188d59dd0c1"), "age" : 1 }
  ```

  

### 2.3 数据更新

`db.coll.update({条件},{$set:{字段名:值}},{multi:true})`

```sh
> db.coll.update({age:1},{$set:{age:10}},{multi:true})
WriteResult({ "nMatched" : 1, "nUpserted" : 0, "nModified" : 1 })
```

- `$set` 设置字段值
- `$unset` 删除指定字段
- `$inc` 对修改的值进行自增

- `upsert` 可选 如果不存在update的记录 是否插入objnew true是插入 默认false
- `multi` 可选 默认false只更新找到的第一条记录,如果是true就把按条件查询出来多条记录全部更新
- `writeConcern` 可选 用来指定mongod对写操作的回执为比如写的行为需要确认

### 2.4 数据删除

```sh
> db.coll.remove({name:"a"},{justOne: 1})
WriteResult({ "nRemoved" : 1 })
```

> ```sh
> db.collection.remove(
>    <query>,
>    {
>      justOne: <boolean>,
>      writeConcern: <document>
>      } )
> ```
>
> 参数说明:
>  query :(可选)删除的文档的条件。
>  justOne : (可选)如果设为 true 或 1，则只删除一个文档，如果不设置该参数，或使用默认值 false，则删除 所有匹配条件的文档。
>  writeConcern :(可选)用来指定mongod对写操作的回执行为。

## 3. 聚合操作

