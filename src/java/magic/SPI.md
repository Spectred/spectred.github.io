# SPI

SPI Service Provider Interface 

用于让不同模块之间的松散耦合，实现插件式的架构。在Java SPI机制中，服务的提供者通过提供实现了特定接口的类，而服务的使用者则可以通过Java SPI机制动态地获取并使用这些服务提供者的实现。在Spring 、Dubbo中都有其体现。

## 1. 定义SPI

### 1.1 定义接口和实现类

```java
public interface IShout {
    void shout();
}

public class Cat implements IShout{
    @Override
    public void shout() {
        System.out.println("miao");
    }
}

public class Dog implements IShout{
    @Override
    public void shout() {
        System.out.println("wang");
    }
}
```

### 1.2 增加配置文件

在`src/main/resources/META-INF/services`中新建以接口命名的文件(xx.xx.IShout),内容是实现类的全路径

```
xx.xx.Cat
xx.xx.Dog
```

### 1.3 使用`ServiceLoader`来加载配置文件中指定的实现

```java
    public static void main(String[] args) {
        ServiceLoader<IShout> serviceLoader = ServiceLoader.load(IShout.class);
        for (IShout iShout : serviceLoader) {
            iShout.shout();
        }
    }
```

## 2. 实现原理

Java SPI的原理是基于Java的类加载机制和反射机制

```java
    public static <S> ServiceLoader<S> load(Class<S> service) {
        ClassLoader cl = Thread.currentThread().getContextClassLoader();
        return new ServiceLoader<>(Reflection.getCallerClass(), service, cl);
    }
```

## 3. SPI优缺点

优点: 

- 实现了接口是实现类的解耦
- 可以动态加载扩展组件，提供框架的灵活性和可扩展性

缺点:

- 一次性加载所有实现类，可能会浪费资源和影响性能
- 无法对扩展点排序，无法控制加载顺序
- 没有IOC和AOP机制

## 4. 应用场景

Java SPI有很多应用场景，比如：

- JDBC，不同的数据库厂商可以提供不同的驱动实现类，通过META-INF/services/java.sql.Driver文件来暴露驱动提供者
- COMMON-LOGGING，不同的日志框架可以提供不同的日志实现类，通过`META-INF/services/org.apache.commons.logging.LogFactory`文件来暴露日志工厂类
- Dubbo，可以通过SPI机制来扩展和替换Dubbo框架中的各种组件，如协议、序列化、负载均衡等

Spring中也使用了SPI机制，主要有以下几种方式：

- 使用SpringFactoriesLoader类来加载META-INF/spring.factories文件中的配置，这个文件可以指定不同的key和value，比如org.springframework.boot.autoconfigure.EnableAutoConfiguration和被标记为@Configuration的类
- 使用ServletContainerInitializer接口来实现对servlet3.0规范的支持，这个接口可以在容器启动时执行一些初始化操作，比如注册servlet、过滤器等
- 使用Converter SPI和Formatter SPI来实现自动类型转换，这些SPI可以通过ConversionServiceFactoryBean或FormattingConversionServiceFactoryBean来注册到Spring容器中

