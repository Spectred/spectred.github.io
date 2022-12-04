# MyBatis - 快速开始

> [参考文档](https://mybatis.org/mybatis-3/zh/index.html)

## 1. 添加依赖

```xml
		<dependencies>

        <dependency>
            <groupId>org.mybatis</groupId>
            <artifactId>mybatis</artifactId>
        </dependency>

        <dependency>
            <groupId>com.github.pagehelper</groupId>
            <artifactId>pagehelper</artifactId>
        </dependency>

        <dependency>
            <groupId>tk.mybatis</groupId>
            <artifactId>mapper</artifactId>
        </dependency>

        <dependency>
            <groupId>org.mybatis.caches</groupId>
            <artifactId>mybatis-redis</artifactId>
        </dependency>

        <dependency>
            <groupId>mysql</groupId>
            <artifactId>mysql-connector-java</artifactId>
            <scope>runtime</scope>
        </dependency>

        <dependency>
            <groupId>org.junit.jupiter</groupId>
            <artifactId>junit-jupiter-api</artifactId>
            <scope>test</scope>
        </dependency>

        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <scope>provided</scope>
        </dependency>

    </dependencies>
```

## 2. 配置文件

> [XML配置](https://mybatis.org/mybatis-3/zh/configuration.html)

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE configuration PUBLIC "-//mybatis.org//DTD Config 3.0//EN" "http://mybatis.org/dtd/mybatis-3-config.dtd">

<configuration>
    <!--
        1.属性
        https://mybatis.org/mybatis-3/zh/configuration.html#properties
    -->
    <properties resource="jdbc.properties"/>

    <!--
        2.设置
        https://mybatis.org/mybatis-3/zh/configuration.html#settings
    -->
    <settings>
        <!-- 开启二级缓存 -->
        <setting name="cacheEnabled" value="true"/>
    </settings>

    <!--
        3.类型别名
        https://mybatis.org/mybatis-3/zh/configuration.html#typeAliases
    -->
    <typeAliases>
        <typeAlias type="com.spectred.demo.mybatis.entity.User" alias="user"/>
    </typeAliases>


    <!--
        4.类型处理器
        https://mybatis.org/mybatis-3/zh/configuration.html#typeHandlers
    -->
    <typeHandlers>

    </typeHandlers>

    <!--
        5.对象工厂
        https://mybatis.org/mybatis-3/zh/configuration.html#objectFactory

    <objectFactory type="">
    </objectFactory>
    -->

    <!--
       5.插件
       https://mybatis.org/mybatis-3/zh/configuration.html#objectFactory
    -->
    <plugins>
        <!-- 分页插件 -->
        <plugin interceptor="com.github.pagehelper.PageInterceptor">
            <property name="dialect" value="com.github.pagehelper.dialect.helper.MySqlDialect"/>
        </plugin>
    </plugins>

    <!--
       6.环境配置
       https://mybatis.org/mybatis-3/zh/configuration.html#environments
    -->
    <environments default="development">
        <environment id="development">
            <transactionManager type="JDBC"></transactionManager>
            <dataSource type="POOLED">
                <property name="driver" value="${jdbc.driver}"/>
                <property name="url" value="${jdbc.url}"/>
                <property name="username" value="${jdbc.username}"/>
                <property name="password" value="${jdbc.password}"/>
            </dataSource>
        </environment>
    </environments>

    <!--
       7.数据库厂商标识
       https://mybatis.org/mybatis-3/zh/configuration.html#databaseIdProvider
    -->
    <databaseIdProvider type="DB_VENDOR"></databaseIdProvider>

    <!--
       8.映射器
       https://mybatis.org/mybatis-3/zh/configuration.html#mappers
    -->
    <mappers>
        <!-- 使用相对于类路径的资源引用 -->
        <mapper resource="com/spectred/mappers/UserMapper.xml"/>
    </mappers>
</configuration>
```

## 3. 数据库脚本，实体类，DAO接口，MapperXML文件

```sql
create table user
(
    id       int         not null primary key,
    username varchar(32) null
)
    comment '用户表';
```

```java
import lombok.Data;

@Data
public class User {

    private Integer id;

    private String username;
}
```

```java
import java.util.List;

public interface IUserMapper {

    User selectById(Integer id);

    List<User> selectAll();

    int insert(User user);

    int updateById(User user);
}
```

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.spectred.demo.mybatis.mappers.IUserMapper">
    <select id="selectById" parameterType="int" resultType="user">
        SELECT *
        FROM user
        WHERE id = #{id}
    </select>

    <select id="selectAll" resultType="com.spectred.demo.mybatis.entity.User">
        SELECT *
        FROM user
    </select>

    <insert id="insert" parameterType="user">
        INSERT INTO user (id, username)
        VALUES (#{id}, #{username})
    </insert>

    <update id="updateById" parameterType="user">
        UPDATE user
        SET username = #{username}
        WHERE id = #{id}
    </update>
</mapper>
```

## 4. 基于XML的增删改查

```java
import com.spectred.demo.mybatis.entity.User;
import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.io.InputStream;
import java.util.List;

public class CrudByXMLTest {

    private SqlSession sqlSession;

    @BeforeEach
    public void before() throws Exception {
        InputStream inputStream = Resources.getResourceAsStream("mybatis-config.xml");
        SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);
        sqlSession = sqlSessionFactory.openSession();
    }

    @Test
    public void test_select() {
        User user = sqlSession.selectOne("com.spectred.demo.mybatis.mappers.IUserMapper.selectById", 2);

        Assertions.assertSame(2, user.getId());
    }


    @Test
    public void test_selectAll() {
        List<User> usersList = sqlSession.selectList("com.spectred.demo.mybatis.mappers.IUserMapper.selectAll");

        Assertions.assertNotEquals(0, usersList.size());
    }

    @Test
    public void test_insert() {
        User user = new User();
        user.setId(5);
        user.setUsername("Jack");
        int row = sqlSession.insert("com.spectred.demo.mybatis.mappers.IUserMapper.insert", user);
        sqlSession.commit();

        Assertions.assertSame(1, row);
    }

    @Test
    public void test_update() {
        User user = new User();
        user.setId(1);
        user.setUsername("Java");

        int row = sqlSession.update("com.spectred.demo.mybatis.mappers.IUserMapper.updateById", user);
        sqlSession.commit();

        Assertions.assertSame(1, row);
    }

    @AfterEach
    public void after() {
        System.out.println("---- 执行结果 ----");
        List<User> usersList = sqlSession.selectList("com.spectred.demo.mybatis.mappers.IUserMapper.selectAll");
        usersList.forEach(System.out::println);

        sqlSession.close();
    }
}
```

## 5. 基于Mapper的增删改查

```java
import com.spectred.demo.mybatis.entity.User;
import com.spectred.demo.mybatis.mappers.IUserMapper;
import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.io.InputStream;
import java.util.List;

/**
 * @author spectred
 */
public class CrudByMapperTest {

    private SqlSession sqlSession;

    @BeforeEach
    public void before() throws Exception {
        InputStream inputStream = Resources.getResourceAsStream("mybatis-config.xml");
        SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);
        sqlSession = sqlSessionFactory.openSession();
    }

    @Test
    public void test_select() {
        IUserMapper userMapper = sqlSession.getMapper(IUserMapper.class);
        User user = userMapper.selectById(1);

        Assertions.assertSame(1, user.getId());
    }

    @Test
    public void test_selectAll() {
        IUserMapper userMapper = sqlSession.getMapper(IUserMapper.class);
        List<User> usersList = userMapper.selectAll();

        Assertions.assertNotEquals(0, usersList.size());
    }

    @Test
    public void test_insert() {
        User user = new User();
        user.setId(5);
        user.setUsername("Jack");

        IUserMapper userMapper = sqlSession.getMapper(IUserMapper.class);
        int row = userMapper.insert(user);
        sqlSession.commit();

        Assertions.assertSame(1, row);
    }

    @Test
    public void test_update() {
        User user = new User();
        user.setId(1);
        user.setUsername("Java");
        
        IUserMapper userMapper = sqlSession.getMapper(IUserMapper.class);
        int row = userMapper.updateById(user);

        sqlSession.commit();

        Assertions.assertSame(1, row);
    }


    @AfterEach
    public void after() {
        sqlSession.close();
    }
}
```

## 6. 基于注解的增删改查

```java
    @Select("SELECT * FROM user WHERE username = #{username}")
    List<User> selectByName(@Param("username") String username);

    @Insert("INSERT INTO user (id,username) VALUES (#{id},#{username})")
    int insertV2 (User user);

    @Delete("DELETE FROM user WHERE id = #{id}")
    int deleteById(@Param("id") Integer id);
```

```java
import com.spectred.demo.mybatis.entity.User;
import com.spectred.demo.mybatis.mappers.IUserMapper;
import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.io.InputStream;
import java.util.List;

public class CrudByAnnotationTest {


    private SqlSession sqlSession;

    private IUserMapper userMapper;

    @BeforeEach
    public void before() throws Exception {
        InputStream inputStream = Resources.getResourceAsStream("mybatis-config.xml");
        SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);
        sqlSession = sqlSessionFactory.openSession();
        userMapper = sqlSession.getMapper(IUserMapper.class);
    }

    @Test
    public void test_selectByName() {
        List<User> users = userMapper.selectByName("Jack");

        users.forEach(System.out::println);

        Assertions.assertNotEquals(0, users.size());
    }

    @Test
    public void test_insertV2() {
        User user = new User();
        user.setId(7);
        user.setUsername("Tom");

        int row = userMapper.insertV2(user);
        sqlSession.commit();

        Assertions.assertEquals(1, row);
    }

    @Test
    public void test_deleteById() {

        int row = userMapper.deleteById(7);
        sqlSession.commit();

        Assertions.assertEquals(1, row);
    }


    @AfterEach
    public void after() {
        sqlSession.close();
    }
}
```

