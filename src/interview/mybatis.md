# MyBatis

## 1. MyBatis的一二级缓存

MyBatis中有一级缓存和二级缓存，默认一级缓存是开启且不能关闭的。

**一级缓存**是SqlSession级别的缓存，当在同一个SqlSession中进行相同的SQL语句查询时，第二次以后的查询不会从数据库查询，而是直接从缓存中读取，一级缓存最多为1024条SQL，如果在同一个SqlSession中再次查询相同的SQL就成缓存中取出数据，如果两次中间出现了commit操作，本SqlSession中一级缓存清空；

**二级缓存**是指可以跨SqlSession的缓存，是mapper级别的缓存，对于mapper级别的缓存不同的sqlsession是共享的。MyBatis的二级缓存通过CacheExecutor实现，CacheExecutor是Executor的代理对象

使用二级缓存时需要配置：全局配置中启用二级缓存配置，对应Mapper.xml中配置cache节点，对应的select查询节点中添加userCache=true

## 2. MyBatis的工作原理

1. 读取mybatis-config.xml全局配置文件，配置运行环境信息，如数据库连接、别名、插件等
2. 加载mapper.xml映射文件
3. 构建SqlSessionFactory
4. 创建SqlSession对象，包含了执行sql语句的所有方法
5. Executor执行器接口操作数据库，根据SqlSession传递的参数动态地生成需要执行的sql语句，同时负责查询缓存的维护
6. MappedStatement对象，用于对映射信息的封装，用于存储要映射的SQL语句的id、参数等信息
7. PreparedStatement对象进行输入参数映射，如Map List或或者简单对象类型
8. 数据结果的映射ResultSet

## 3. MyBatis的动态SQL和执行原理

使用OGNL从SQL参数对象中计算表达式的值，根据表达式的值动态拼接SQL

## 4. MyBatis如何分页，分页插件原理是什么

MyBatis使用RowBounds对象进行分页，针对ResultSet结果集进行内存分页

分页插件是使用MyBatis提供的插件接口，实现自定义插件，在插件的拦截方法内拦截待执行的SQL，然后重写SQL，根据不同的方言在SQL语句上增加分页参数

## 5. MyBatis的插件运行原理，以及如何编写一个插件

MyBatis可以编写针对ParameterHandler、ResultSetHandler、StatementHandler、 Executor四个接口的插件，使用JDK的自动代理为需要拦截的接口生成代理对象以实现接口方法拦截功能，通过InvocationHandler的invoke()

编写MyBatis的Interceptor接口并覆盖intercep()方法，然后在给插件编写注解，指定要拦截哪一个接口的方法，并在配置文件中配置插件