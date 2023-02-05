# MongoDB - 使用

## 1. 使用场景

- 网站数据：适合实时插入更新与查询，并具备网站实时数据存储所需的复制和高度伸缩性
- 缓存：适合作为信息基础设施的缓存层
- 大尺寸低价值的数据
- 高伸缩
- 用于对象和JSON数据的存储
- 游戏场景：存储游戏用户信息等
- 物流信息：存储订单
- 社交场景：存储用户信息，朋友圈，地理位置等
- 物联网： 日志等
- 直播： 用户信息、礼物信息

### 1.1 是有使用MongoDB

- 不需要事务和复杂的JOIN (必须满足，另外满足如下至少一条，推荐Mongo)
- 新应用、需求变化快、数据模型无法确定 
- 需要2000-3000以上的读写QPS
- 需要TB甚至PB级别的数据
- 应用发展迅速，需要快速水平扩展
- 应用要求存储的数据不丢失，需要99.999%高可用
- 需要大量地理位置查询、文本查询

## 2. Java访问Mongo

> [mongo-java-example](https://github.com/Spectred/spectred-examples/tree/main/mongo/mongo-java-example)

### 2.1 引入依赖

```xml
        <dependency>
            <groupId>org.mongodb</groupId>
            <artifactId>mongo-java-driver</artifactId>
            <version>3.12.11</version>
        </dependency>
```

### 2.2 插入一条数据

```java
    private static void insert() {
        MongoClient mongoClient = new MongoClient("tx", 27017);
        MongoDatabase database = mongoClient.getDatabase("test");
        MongoCollection<Document> collection = database.getCollection("coll");
        Document doc = Document.parse("{name:'Java',birth: new ISODate('1995-01-01'),title:'Java语言'}");
        collection.insertOne(doc);
        mongoClient.close();
    }
```

### 2.2 文档查询

```java
    private static void find() {
        MongoClient mongoClient = new MongoClient("tx", 27017);
        MongoDatabase database = mongoClient.getDatabase("test");
        MongoCollection<Document> collection = database.getCollection("coll");

        Document doc = new Document();
        doc.append("name", 1);

        FindIterable<Document> iterable = collection.find().sort(doc);
        for (Document document : iterable) {
            System.out.println(document);
        }
        mongoClient.close();
    }
```

### 2.3 文档查询过滤

```java
    private static void findFilter() {
        MongoClient mongoClient = new MongoClient("tx", 27017);
        MongoDatabase database = mongoClient.getDatabase("test");
        MongoCollection<Document> collection = database.getCollection("coll");

        Document doc = new Document();
        doc.append("name", 1);
				// 添加条件
        FindIterable<Document> iterable = collection.find(Filters.eq("name","Java")).sort(doc);
        for (Document document : iterable) {
            System.out.println(document);
        }
        mongoClient.close();
    }
```

## 3. Spring访问Mongo

> [mongo-spring-example](https://github.com/Spectred/spectred-examples/tree/main/mongo/mongo-spring-example)

### 3.1 引入依赖

```xml
        <dependency>
            <groupId>org.springframework.data</groupId>
            <artifactId>spring-data-mongodb</artifactId>
            <version>2.0.9.RELEASE</version>
        </dependency>
```

### 3.2 编写spring配置文件

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xmlns:mongo="http://www.springframework.org/schema/data/mongo"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
                           http://www.springframework.org/schema/beans/spring-beans.xsd
                           http://www.springframework.org/schema/context
                           http://www.springframework.org/schema/context/spring-context.xsd
                           http://www.springframework.org/schema/data/mongo
                           http://www.springframework.org/schema/data/mongo/spring-mongo.xsd">

    <!-- 开启组件扫描-->
    <context:component-scan base-package="pers.spectred.example"/>
    <!-- 构建MongoDB工厂对象 -->
    <mongo:db-factory id="mongoDbFactory" client-uri="mongodb://tx:27017/test"/>
    <!-- 构建MongoTemplate -->
    <bean id="mongoTemplate" class="org.springframework.data.mongodb.core.MongoTemplate">
        <constructor-arg index="0" ref="mongoDbFactory" />
    </bean>

</beans>
```

### 3.3 编写实体类

```java
public class Coll {

    private String id;

    private String name;

    private String age;

    private Date birth;
    
    // ignore setter and getter
}
```

### 3.4 编写DAO接口

```java
public interface CollDao {

    void insertColl(Coll coll);
}
```

```java
@Repository("collDao")
public class CollDaoImpl implements CollDao {

    @Autowired
    private MongoTemplate mongoTemplate;

    @Override
    public void insertColl(Coll coll) {
        // 如果不指定collectionName,模式是实体对象类的类名称
        mongoTemplate.insert(coll,"coll");
    }
}
```

### 3.5 启动Spring容器测试

```java
    public static void main(String[] args) {
        Coll coll = new Coll();
        coll.setName("Mary");
        coll.setAge("10");
        coll.setBirth(new Date());

        ApplicationContext context = new ClassPathXmlApplicationContext("application-context.xml");
        CollDao dao = context.getBean("collDao", CollDao.class);
        dao.insertColl(coll);
    }
```

### 3.6 查询

```java
 Coll findByName(String name);
```

```java
    @Override
    public Coll findByName(String name) {
        Query query = new Query();
        query.addCriteria(Criteria.where("name").is(name));
        List<Coll> colls = mongoTemplate.find(query, Coll.class);
        return CollectionUtils.isEmpty(colls) ? null : colls.get(0);
    }
```

```java
 List<Coll> findList(String name,double salary);
```

```java
    @Override
    public List<Coll> findList(String name, double salary) {
        Query query = new Query();
        query.addCriteria(Criteria.where("name").is(name)
                .andOperator(Criteria.where("salary").is(salary))
        );
        return mongoTemplate.find(query, Coll.class, "coll");
    }
```

## 4. Spring Boot访问Mongo

> [官方文档 JPA Query Methods](https://docs.spring.io/spring-data/jpa/docs/current/reference/html/#jpa.query-methods)
>
> [mongo spring boot example ](https://github.com/Spectred/spectred-examples/tree/main/mongo/mongo-spring-boot-example)

> MongoTemplate方式和Spring方式基本相同，依赖和配置稍有不同，主要使用MongoRepository方式

### 4.1 引入依赖

```xml
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-mongodb</artifactId>
        </dependency>
```

### 4.2 配置文件

application.yml

```yaml
spring:
  data:
    mongodb:
      host: tx
      port: 27017
      database: coll
```

### 4.3 实体类

`@Document(collection = "coll")`

```java
@Document(collection = "coll")
public class Coll {

    private String id;

    private String name;

    private String age;

    private Date birth;
    // ignore setter and getter
}
```

### 4.4 Repository接口

```java
@Repository("collRepository")
public interface CollRepository extends MongoRepository<Coll,String> {

		// 自定义的接口
    @Query(value = "{name: {$gt: ?0}}")
    List<Coll> findCollCus(double salary);
}
```

### 4.5 测试接口

```java
@SpringBootApplication
public class MongoSpringBootExampleApplication {


    public static void main(String[] args) {
        ConfigurableApplicationContext ctx = SpringApplication.run(MongoSpringBootExampleApplication.class, args);

        Coll coll = new Coll();
        coll.setName("TTTT");
        coll.setAge("23");
        coll.setBirth(new Date());

        CollRepository collRepository = ctx.getBean("collRepository", CollRepository.class);
        collRepository.insert(coll);

        List<Coll> all = collRepository.findAll();
        System.out.println(all.size());

        List<Coll> collCus = collRepository.findCollCus(0.5);
        System.out.println(collCus.size());
    }
}
```

