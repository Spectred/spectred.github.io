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

