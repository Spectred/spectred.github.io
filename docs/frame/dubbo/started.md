# Dubbo

>[Apache Dubbo](https://dubbo.apache.org/zh/)
>
>**Apache Dubbo 是一款微服务框架，为大规模微服务实践提供高性能 RPC 通信、流量治理、可观测性等解决方案，**
>**涵盖 Java、Golang 等多种语言 SDK 实现**
>
>[用法示例](https://dubbo.apache.org/zh/docsv2.7/user/examples/)

 **Dubbo架构**

![](https://dubbo.apache.org/imgs/architecture.png)

 服务注册中心(`ZooKeeper`)

```bash
wget https://www.apache.org/dyn/closer.lua/zookeeper/zookeeper-3.8.0/apache-zookeeper-3.8.0-bin.tar.gz
tar -zcvf apache-zookeeper-3.8.0-bin.tar.gz
cp conf/zoo_sample.cfg  conf/zoo.cfg
编辑配置文件
data=$ZOOKEEPER_HOME/data

bin/zkServer.sh start

客户端: bin/zkCli.sh
```

## 1. 基于注解形式的使用

### 1.1 定义接口

[simple-api](https://github.com/Spectred/x-rpc/tree/main/simple-dubbo/simple-api)

```java
public interface HelloService {
    String hello(String name);
}
```

### 1.2 定义公共依赖

[simple-base](https://github.com/Spectred/x-rpc/tree/main/simple-dubbo/simple-base)

```xml
 <!--   <dubbo.version>2.7.5</dubbo.version> -->
<dependencyManagement>
   <dependencies>
     <dependency>
       <groupId>org.apache.dubbo</groupId>
       <artifactId>dubbo</artifactId>
       <version>${dubbo.version}</version>
     </dependency>
     <dependency>
       <groupId>org.apache.dubbo</groupId>
       <artifactId>dubbo-common</artifactId>
       <version>${dubbo.version}</version>
     </dependency>
     <dependency>
       <groupId>org.apache.dubbo</groupId>
       <artifactId>dubbo-registry-zookeeper</artifactId>
       <version>${dubbo.version}</version>
     </dependency>
     <dependency>
       <groupId>org.apache.dubbo</groupId>
       <artifactId>dubbo-registry-nacos</artifactId>
       <version>${dubbo.version}</version>
     </dependency>
     <dependency>
       <groupId>org.apache.dubbo</groupId>
       <artifactId>dubbo-rpc-dubbo</artifactId>
       <version>${dubbo.version}</version>
     </dependency>
     <dependency>
       <groupId>org.apache.dubbo</groupId>
       <artifactId>dubbo-remoting-netty4</artifactId>
       <version>${dubbo.version}</version>
     </dependency>
     <dependency>
       <groupId>org.apache.dubbo</groupId>
       <artifactId>dubbo-serialization-hessian2</artifactId>
       <version>${dubbo.version}</version>
     </dependency>
   </dependencies>
 </dependencyManagement>
```

### 1.3 服务提供者

[simple-provider](https://github.com/Spectred/x-rpc/tree/main/simple-dubbo/simple-provider)

1. pom.xml中引入dubbo相关依赖和要调用的接口

```xml
        <dependency>
            <groupId>pers.swd</groupId>
            <artifactId>simple-api</artifactId>
            <version>1.0-SNAPSHOT</version>
        </dependency>
```

2. 在`src/main/resources/dubbo-provider.properties`中添加属性

```properties
dubbo.application.name=simple-provider
dubbo.protocol.name=dubbo
duboo.protocol.port-20880
```

3. 实现接口

```java
import org.apache.dubbo.config.annotation.Service;

@Service
public class HelloServiceImpl implements HelloService {
    @Override
    public String hello(String name) {
        return "Hello," + name;
    }
}
```

4. 启动类

```java
public class DubboPureMain {
    public static void main(String[] args) throws IOException {
        AnnotationConfigApplicationContext context = new AnnotationConfigApplicationContext(ProviderConfiguration.class);
        context.start();
        System.in.read();
    }

    @EnableDubbo(scanBasePackages = "pers.swd.service.impl")
    @Configuration
    @PropertySource("classpath:/dubbo-provider.properties")
    static class ProviderConfiguration {

        @Bean
        public RegistryConfig registryConfig() {
            RegistryConfig config = new RegistryConfig();
            config.setAddress("zookeeper://127.0.0.1:2181");
            return config;
        }
    }
}
```

### 1.4 服务消费者

[simple-consumer](https://github.com/Spectred/x-rpc/tree/main/simple-dubbo/simple-consumer)

1. pom.xml中引入dubbo相关依赖和要调用的接口

```xml
        <dependency>
            <groupId>pers.swd</groupId>
            <artifactId>simple-api</artifactId>
            <version>1.0-SNAPSHOT</version>
        </dependency>
```

2. `src/main/resources/dubbo-consumer.properties`中添加属性

```properties
dubbo.application.name=service-consumer
dubbo.registry.address=zookeeper://127.0.0.1:2181
```

3. 增加类调用接口

```java
import org.apache.dubbo.config.annotation.Reference;
import org.springframework.stereotype.Component;

@Component
public class ConsumerComponent {

    @Reference
    private HelloService helloService;

    public String hello(String name){
        return helloService.hello(name);
    }
}
```

4. 启动类

```java
public class SimpleConsumerMain {
    public static void main(String[] args) throws IOException {
        AnnotationConfigApplicationContext context = new AnnotationConfigApplicationContext(ConsumerConfiguration.class);
        context.start();
        ConsumerComponent service = context.getBean(ConsumerComponent.class);
        while (true) {
            System.in.read();
            try {
                String hello = service.hello("world");
                System.out.println("result :" + hello);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    @Configuration
    @EnableDubbo(scanBasePackages = "pers.swd.service")
    @PropertySource("classpath:/dubbo-consumer.properties")
    @ComponentScan(value = {"pers.swd.service"})
    static class ConsumerConfiguration {
    }
}
```

## 2. 基于XML形式的使用

#### 2.1 服务提供者

[simple-xml-provider](https://github.com/Spectred/x-rpc/tree/main/simple-dubbo/simple-xml-provider)

1. pom.xml中额外加入依赖

```xml
<dependency>
    <groupId>org.apache.dubbo</groupId>
    <artifactId>dubbo-config-spring</artifactId>
</dependency>
```

2. 接口实现类

```java
public class HelloServiceImpl implements HelloService {
    @Override
    public String hello(String name) {
        return "Hello," + name;
    }
}
```

3. 配置文件

`src/main/resources/dubbo-provider.xml`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:dubbo="http://dubbo.apache.org/schema/dubbo"
       xmlns="http://www.springframework.org/schema/beans"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
                            http://www.springframework.org/schema/beans/spring-beans-4.3.xsd
                            http://dubbo.apache.org/schema/dubbo
                            http://dubbo.apache.org/schema/dubbo/dubbo.xsd">

    <dubbo:application name="simple-xml-provider"/>

    <dubbo:registry address="zookeeper://127.0.0.1:2181"/>

    <dubbo:protocol name="dubbo"/>

    <bean id="helloService" class="pers.swd.service.impl.HelloServiceImpl"/>

    <dubbo:service interface="pers.swd.api.HelloService" ref="helloService"/>

</beans>
```

4. 启动类

```java
public static void main(String[] args) throws IOException {
    ClassPathXmlApplicationContext context = new ClassPathXmlApplicationContext("dubbo-provider.xml");
    context.start();
    System.in.read();
}
```

#### 2.2 服务消费者

[simple-xml-consumer](https://github.com/Spectred/x-rpc/tree/main/simple-dubbo/simple-xml-consumer)

1. pom依赖

   同提供者

2. 配置文件

`src/main/resources/dubbo-consumer.xml`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:dubbo="http://dubbo.apache.org/schema/dubbo"
       xmlns="http://www.springframework.org/schema/beans"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
                            http://www.springframework.org/schema/beans/spring-beans-4.3.xsd
                            http://dubbo.apache.org/schema/dubbo
                            http://dubbo.apache.org/schema/dubbo/dubbo.xsd">

    <dubbo:application name="simple-xml-consumer"/>

    <dubbo:registry address="zookeeper://127.0.0.1:2181"/>

    <dubbo:reference id="helloService" interface="pers.swd.api.HelloService"/>

</beans>
```

3. 启动类

```java
    public static void main(String[] args) {
        ClassPathXmlApplicationContext context = new ClassPathXmlApplicationContext("dubbo-consumer.xml");
        context.start();

        HelloService helloService = context.getBean(HelloService.class);
        String result = helloService.hello("World");

        System.out.println(result);
    }
```

## 3. Dubbo管理控制台

[dubbo-admin](https://github.com/apache/dubbo-admin)

## 4. Dubbo配置项

[配置说明](https://dubbo.apache.org/zh/docsv2.7/user/configuration/)