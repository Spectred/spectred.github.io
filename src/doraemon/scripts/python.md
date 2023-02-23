# Python脚本

## 1. 读取.csv文件
```python
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

if __name__ == '__main__':
    file_path = '/path/to/csv'
    entities = read_csv0(file_path)
```

## 2. 向Mongo中插入数据
```python
def insert_many(url, db_name, coll_name, docs):
    client = pymongo.MongoClient(url)
    db = client[db_name]
    coll = db[coll_name]
    coll.insert_many(docs)

if __name__ == '__main__':
    mongo_url = 'mongodb://xxxxx:27017/'
    mongo_db_name = 'dbname'
    mongo_coll_name = 'collname'
    entities = read_csv0(file_path)
    insert_many(mongo_url, mongo_db_name, mongo_coll_name, entities)

```