# 项目简介
> 项目内容来源于[拉勾的训练营](https://kaiwu.lagou.com/)

## 1. 前端

前端代码: [私有仓库](https://gitee.com/spectred/lagou-edu-front.git)

```bash
$ npm config get registry
https://registry.npmjs.org

$ npm config set registry https://registry.npm.taobao.org

$ cd edu-course-fed
$ npm install --legacy-peer-deps

$ npm install -g nrm
$ nrm ls 
$ nrm use taobao
```

## 2. 后端

### 2.0 工具包 edu-common

### 2.1 edu-bom

`pom.xml`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>com.lagou</groupId>
    <artifactId>edu-bom</artifactId>
    <version>1.0-SNAPSHOT</version>

    <packaging>pom</packaging>

    <properties>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    </properties>


    <dependencyManagement>
        <dependencies>
            <dependency>
                <groupId>io.jsonwebtoken</groupId>
                <artifactId>jjwt</artifactId>
                <version>0.9.1</version>
            </dependency>
            <dependency>
                <groupId>org.springframework.security.oauth</groupId>
                <artifactId>spring-security-oauth2</artifactId>
                <version>2.3.8.RELEASE</version>
            </dependency>
            <!--lombok工具-->
            <dependency>
                <groupId>org.projectlombok</groupId>
                <artifactId>lombok</artifactId>
                <version>1.18.12</version>
                <scope>provided</scope>
            </dependency>

            <!-- hutool -->
            <dependency>
                <groupId>cn.hutool</groupId>
                <artifactId>hutool-all</artifactId>
                <version>5.3.2</version>
            </dependency>

            <!-- https://mvnrepository.com/artifact/org.apache.commons/commons-collections4 -->
            <dependency>
                <groupId>org.apache.commons</groupId>
                <artifactId>commons-collections4</artifactId>
                <version>4.4</version>
            </dependency>

            <!-- mybatis-spring -->
            <dependency>
                <groupId>org.mybatis</groupId>
                <artifactId>mybatis-spring</artifactId>
                <version>2.0.3</version>
            </dependency>

            <!-- mybatis -->
            <dependency>
                <groupId>org.mybatis.spring.boot</groupId>
                <artifactId>mybatis-spring-boot-starter</artifactId>
                <version>2.1.1</version>
            </dependency>

            <!-- fastjson -->
            <dependency>
                <groupId>com.alibaba</groupId>
                <artifactId>fastjson</artifactId>
                <version>1.2.68</version>
            </dependency>

            <!-- druid -->
            <dependency>
                <groupId>com.alibaba</groupId>
                <artifactId>druid</artifactId>
                <version>1.1.21</version>
            </dependency>

            <!-- mysql -->
            <dependency>
                <groupId>mysql</groupId>
                <artifactId>mysql-connector-java</artifactId>
                <version>5.1.47</version>
            </dependency>

           <!-- spring cloud -->
            <dependency>
                <groupId>org.springframework.cloud</groupId>
                <artifactId>spring-cloud-dependencies</artifactId>
                <version>2021.0.5</version>
                <type>pom</type>
                <scope>import</scope>
            </dependency>
            <!-- spring boot -->
            <dependency>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-starter-parent</artifactId>
                <version>2.7.5</version>
                <type>pom</type>
                <scope>import</scope>
            </dependency>

            <dependency>
                <groupId>com.lagou</groupId>
                <artifactId>edu-common</artifactId>
                <version>1.0-SNAPSHOT</version>
            </dependency>
        </dependencies>
    </dependencyManagement>

</project>
```

