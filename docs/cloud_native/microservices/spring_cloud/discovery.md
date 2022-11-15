# 服务中心

## 1. 注册中心-eureka

```xml
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-netflix-eureka-server</artifactId>
        </dependency>
```

```yaml
server:
  port: 8761

spring:
  application:
    name: edu-eureka-boot
eureka:
  instance:
    hostname: localhost
  client:
    fetch-registry: false
    register-with-eureka: false
    service-url:
      defaultZone: http://${eureka.instance.hostname}:${server.port}/eureka/
```

```java
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.server.EnableEurekaServer;

@EnableEurekaServer
@SpringBootApplication
public class LagouEurekaApplication {

    public static void main(String[] args) {
        SpringApplication.run(LagouEurekaApplication.class, args);
    }
}
```

## 2. 配置中心

### 2.1 新建配置文件的git仓库

[lagou-edu-repo](https://gitee.com/spectred/lagou-edu-repo)

### 2.2 配置中心服务

```xml
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-config-server</artifactId>
        </dependency>
```

```yaml
server:
  port: 8090
spring:
  application:
    name: edu-config-boot
  cloud:
    config:
      server:
        git:
          uri: https://gitee.com/spectred/lagou-edu-repo.git
          username: // your username
          password: // your password
          default-label: master
```

```java
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.config.server.EnableConfigServer;

@EnableConfigServer
@SpringBootApplication
public class LagouConfigApplication {

    public static void main(String[] args) {
        SpringApplication.run(LagouConfigApplication.class, args);
    }
}
```

### 2.3 验证配置中心

```bash
$ curl http://localhost:8090/lagou-edu-ad-dev.yml
spring:
  driver-class-name: com.mysql.cj.jdbc.Driver
  jdbc-url: jdbc:mysql://tx:3306/edu_ad?useUnicode=true&characterEncoding=UTF-8&allowMultiQueries=true
  username: root
  password: mysql
```

## 3. 业务服务

### 3.1 广告模块

```sql
create database edu_ad;
-- ----------------------------
-- Table structure for promotion_space
-- ----------------------------
DROP TABLE IF EXISTS `promotion_space`;
CREATE TABLE `promotion_space` (
                                   `id` int(11) NOT NULL AUTO_INCREMENT,
                                   `name` varchar(255) DEFAULT NULL COMMENT '名称',
                                   `spaceKey` varchar(255) DEFAULT NULL COMMENT '广告位key',
                                   `createTime` datetime DEFAULT NULL,
                                   `updateTime` datetime DEFAULT NULL,
                                   `isDel` int(2) DEFAULT '0',
                                   PRIMARY KEY (`id`) USING BTREE,
                                   KEY `promotion_space_key_isDel` (`spaceKey`,`isDel`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=172 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

-- ----------------------------
-- Table structure for promotion_ad
-- ----------------------------
DROP TABLE IF EXISTS `promotion_ad`;
CREATE TABLE `promotion_ad` (
                                `id` int(11) NOT NULL AUTO_INCREMENT,
                                `name` varchar(255) DEFAULT NULL COMMENT '广告名',
                                `spaceId` int(11) DEFAULT NULL COMMENT '广告位id',
                                `keyword` varchar(255) DEFAULT NULL COMMENT '精确搜索关键词',
                                `htmlContent` text COMMENT '静态广告的内容',
                                `text` varchar(255) DEFAULT NULL COMMENT '文字',
                                `link` varchar(255) DEFAULT NULL COMMENT '链接',
                                `startTime` datetime DEFAULT NULL COMMENT '开始时间',
                                `endTime` datetime DEFAULT NULL COMMENT '结束时间',
                                `createTime` datetime DEFAULT NULL,
                                `updateTime` datetime DEFAULT NULL,
                                `status` int(2) NOT NULL DEFAULT '0',
                                `priority` int(4) DEFAULT '0' COMMENT '优先级',
                                `img` varchar(255) DEFAULT NULL,
                                PRIMARY KEY (`id`) USING BTREE,
                                KEY `promotion_ad_SEG` (`spaceId`,`startTime`,`endTime`,`status`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=1090 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;
```

```xml
    <groupId>com.lagou</groupId>
    <artifactId>edu-ad-boot</artifactId>
    <packaging>pom</packaging>
    <version>1.0-SNAPSHOT</version>
    <modules>
        <module>edu-ad-boot-api</module>
        <module>edu-ad-boot-impl</module>
    </modules>

    <parent>
        <groupId>com.lagou</groupId>
        <artifactId>edu-bom</artifactId>
        <version>1.0-SNAPSHOT</version>
    </parent>

    <dependencies>
        <dependency>
            <groupId>com.lagou</groupId>
            <artifactId>edu-common</artifactId>
        </dependency>
    </dependencies>
```

```xml
    <parent>
        <artifactId>edu-ad-boot</artifactId>
        <groupId>com.lagou</groupId>
        <version>1.0-SNAPSHOT</version>
    </parent>
    <modelVersion>4.0.0</modelVersion>

    <artifactId>edu-ad-boot-impl</artifactId>

    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-config</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-bootstrap</artifactId>
        </dependency>
        <dependency>
            <groupId>com.alibaba</groupId>
            <artifactId>druid</artifactId>
            <version>1.1.21</version>
        </dependency>
        <dependency>
            <groupId>mysql</groupId>
            <artifactId>mysql-connector-java</artifactId>
        </dependency>

        <dependency>
            <groupId>com.baomidou</groupId>
            <artifactId>mybatis-plus-boot-starter</artifactId>
            <version>3.3.2</version>
        </dependency>

        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
        </dependency>

        <dependency>
            <groupId>com.baomidou</groupId>
            <artifactId>mybatis-plus-generator</artifactId>
            <version>3.3.2</version>
        </dependency>

        <dependency>
            <groupId>org.freemarker</groupId>
            <artifactId>freemarker</artifactId>
        </dependency>

        <dependency>
            <groupId>com.lagou</groupId>
            <artifactId>edu-common</artifactId>
        </dependency>
    </dependencies>
```

```yaml
server:
  port: 8001

spring:
  application:
    name: edu-ad-boot
  cloud:
    config:
      uri: http://localhost:8090
      label: master
      name: lagou-edu-ad
      profile: dev


eureka:
  client:
    service-url:
      defaultZone: http://127.0.0.1:8761/eureka/

  instance:
    prefer-ip-address: true
    instance-id: ${spring.cloud.client.ip-address}:${spring.application.name}:${server.port}
```

```java
@MapperScan("com.lagou.ad.mapper")
@EnableDiscoveryClient
@SpringBootApplication
public class LagouAdApplication {

    public static void main(String[] args) {
        SpringApplication.run(LagouAdApplication.class,args);
    }
}
```

```java
@RestController
@RequestMapping("/ad/space")
public class PromotionSpaceController {

    @Autowired
    private IPromotionSpaceService promotionSpaceService;

    @GetMapping("/")
    public List<PromotionSpace> get() {
        return promotionSpaceService.list();
    }
}
```

```xml
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-openfeign</artifactId>
        </dependency>
        <dependency>
            <groupId>com.fasterxml.jackson.core</groupId>
            <artifactId>jackson-databind</artifactId>
        </dependency>
```

```java
@FeignClient(name = "edu-ad-boot",path = "/ad")
public interface AdRemoteService {

    @GetMapping("/space/")
    List<PromotionSpaceDTO> getAllSpaces();
}
```

