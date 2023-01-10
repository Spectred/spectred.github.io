> http://easyyapi.com/
接口文档

## 读取csv写入到mongo（属性简单）
```
import csv

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


if __name__ == '__main__':
    file_path = '/path/to/csv'
    mongo_url = 'mongodb://ip:port/'
    mongo_db_name = 'test'
    mongo_coll_name = 'coll'
    entities = read_csv(file_path)
    insert_many(mongo_url, mongo_db_name, mongo_coll_name, entities)

```
