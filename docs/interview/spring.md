---
sidebar: 'auto'
sidebarDepth: 1
---

# Spring

> ![](https://spring.io/images/spring-logo-2022-dark-2f10e8055653ec50e693eb444291d742.svg)[spring.io](https://spring.io/)

## 1. Spring全家桶中有哪些项目?

> [spring projects](https://spring.io/projects)

`Spring Framework` (一般`Spring Framework`简称为`spring`)、`Spring Boot`、`Spring Cloud`、`Spring Data`、`Spring Security`、`Spring Batch`、`Spring Session`等

## 2. Spring有哪些模块组成

`core`、`context`、`beans`、`AOP` 、`ORM`、`WebMVC`

## 3. Spring中用到了哪些设计模式

工厂模式(`BeanFactory`)，单例/原型模式(bean的作用域)，代理模式(AOP),适配器模式，装饰器模式，观察者模式(事件监听)，策略模式(实例化对象)，模板模式(JdbcTemplate)，组合模式

## 4. IoC容器是什么，如何实现简单的IoC容器，在Spring中的实现方式是什么，和DI有什么区别

IoC,控制反转，将对象实例化和管理的权利交给了容器，可以通过反射+工厂模式实现简单的IoC容器;

在Spring中有`DI`(依赖注入)和`DL`（依赖查找）两种实现方式，`DI`可以通过xml配置文件、注解驱动(`@Value`/`@Autowired`/`@Inject`/`@Resource`)、借助`Aware`系列接口等方式实现，而`DL`指的是如`getBean(),ofType(),withAnnotation`等方式从IoC容器中获取bean;

IoC和DI区别在于角度的不同，在**对象的角度**，IoC将对象实例化和管理的权利交给了容器，在**容器的角度**,容器将对象依赖的其他对象注入

## 5. `BeanFactory`、`ApplicationContext`、`FactoryBean`的区别

`BeanFactory`是一个Spring框架自己使用的提供了抽象的配置和对象的管理机制的接口;

`ApplicationContext`是`BeanFactory`的子接口(准确的说是`BeanFactory`子接口`ListableBeanFactory`和`HierarchicalBeanFactory`的子接口)，扩展了许多功能如: 生命周期的管理，事件机制和消息与国际化等等，具体的，类`GenericApplicationContext`实现了`ApplicationContext`,也采用组合模式使用了`DefaultListableBeanFactory`;

`FactoryBean`则是创建对象的工厂Bean，可以使用它来创建一些初始化流程复杂的对象

## 6. Bean的生命周期

1. 从XML配置或者注解配置中获取`BeanDefinition`,描述了bean的元信息，包括累信息、属性、行为和依赖关系等
2. 实例化Bean，并设置属性
3. 调用`Aware`方法(如果实现了`BeanNameAware`,`BeanFactoryAware`,`ApplicationContextAware`等接口)
4. 后置处理器的预处理方法 （`BeanPostProcessor.postPreocessBeforeInitialization`）
5. 初始化Bean (包含两步: 实现`InitializingBean.afterPropertiesSet`和自定义的初始化方法)
6. 后置处理器的后处理方法 （`BeanPostProcessor.postPreocessAfterInitialization`）
7. bean使用后的销毁方法 (包含两步: `DisposableBean.destroy`和自定义的销毁方法)

## 7. Spring 的作用域，依赖注入方式，自动装配方式

### 7.1 作用域Scope

单例，原型，`Request`,`Session`,`Global Session`

### 7.2 依赖注入方式

构造注入，setter注入，静态工厂注入(`factory-method`)，实例工厂注入(`factory-bean`)

### 7.3 自动装配方式

no,`byName`,`byType`,`constructor`,`auto`（auto下先constructor后byType）

## 8. Spring如何解决循环依赖

循环依赖指的是两个bean中存在相互依赖引用，如A.b=B,B.a=A，可以分为构造器的循环依赖和Field属性的循环依赖(setter注入)

构造器注入的循环依赖无法解决，只能抛出异常，

对于属性注入的循环依赖，Spring采用三级缓存提前暴露对象的方法解决，在IoC容器中有所谓的"三级缓存"，分别是

一级: `ConcurrentHashMap singletonObjects`,二级: `HashMap earlySingletonObjects`,三级: `HashMap singletonFactries`，

1. A在实例化后将自己放入三级缓存
2. B创建过程中发现依赖A,按照一级>二级>三级缓存的顺序在三级缓存中找到A，并将A从三级移动到二级缓存
3. B创建完成，将B移动到一级缓存
4. A按照一级>二级>三级缓存的顺序在一级缓存中找到B，完成了A和B两个bean的创建

在实际中，也可以通过`@Lazy`延迟注入的方式解决循环依赖，但是最好不要有循环依赖

- 为什么构造注入不行？

  因为需要先实例化放入三级缓存，如果循环依赖在构造注入中则完不成实例化

- 为什么需要三级缓存，二级是否能满足要求?

  二级缓存可以满足解决循环依赖的要求，增加到三级缓存时为了三级升二级缓存时可以扩展，主要应用在AOP代理上

## 9. 什么是AOP,Spring中AOP有哪些通知类型,大概怎么使用,有哪些使用场景,有哪些失效场景,底层原理是怎样的？

### 9.1 AOP概述

AOP是在不修改代码的前提下，使用运行时动态代理对代码增强

### 9.2 Spring中AOP有哪些通知类型

前置通知，后置通知，返回后通知，异常通知，环绕通知

### 9.3 大概怎么使用

引入依赖，定义切面类(通过`@Aspect`或者.aj文件)，指定切点，编写通知方法，通过切点获取相应信息处理逻辑

### 9.4 有哪些使用场景

事务控制`@Transcational`，权限校验，日志切面，数据缓存等

### 9.5 有哪些失效场景/`@Transactional`有哪些失效场景

- 作为AOP，是要生成动态代理，如果采用`private`修饰，或者作用在接口上但是使用`CGLib`动态代理，或者调用自身另一个有事务控制的方法都会失效
- 作为注解内容本身，要对异常捕获后才能处理事务回滚，默认捕获`RuntimeException`,如果没有指定异常类型或者指定的异常不包含(如抛出Exception)，或者捕获异常后没有再抛出 ，都会导致`Transactional`失效

### 9.6 底层原理是怎样(简述)？

借助后置处理器，在bean初始化的过程中，将目标对象包装为代理对象。代理对象构造后，执行方法进入到代理类中依次执行织入通知

Spring中可以选择JDK中的`Proxy`或者`CGLib`进行动态代理，两者的区别：JDK代理至少需要实现一个接口，创建快执行慢，`CGLib`属于字节码增强，创建慢执行快

> 有哪些字节码增强的方式: `ASM`,`Javaassist`,`Byte-Buddy`

## 10. Spring事务的传播行为有哪些

> `org.springframework.transaction.TransactionDefinition`

- `PROPAGATION_REQUIRED` 当前没事务则开启新事务；当前有事务则运行在当前事务中
- `PROPAGATION_SUPPORTS` 当前没事务则不创建事务；当前有事务则运行在当前事务中
- `PROPAGATION_MANDATORY` 当前必须运行在事务中，没有则抛出异常
- `PROPAGATION_REQUIRES_NEW` 当前没事务则开启新事物；当前有事务则将原事务暂停，重新开启新事务，新事务完毕后再将原事务释放
- `PROPAGATION_NOT_SUPPORTED` 当前没事务则不在事务中运行；当前有事务则将事务暂停
- `PROPAGATION_NEVER` 不允许运行在事务中，有事务则抛出异常
- `PROPAGATION_NESTED` 当前没事务则开启新事务；当前有事务则记录一个保存点，并继续运行在当前事务，如果子事务出现异常则是回滚到上一个保存点

## 11. 简述Spring MVC的工作流程，拦截器、过滤器有什么区别

### 11.1 Spring MVC的工作流程

请求发送到`DispatcherServlet`,通过`HandlerMapping`返回处理器执行链`HandlerExecutionChain`,通过`HandlerAdapter`执行`Handler`返回`ModelAndView`,`DispatcherServlet`再通过视图解析器得到视图，响应给调用方

#### 11.2 拦截器和过滤器的区别

两者都是AOP从编程思想的体现，都能实现权限检查、日志记录等，不同的是:

- 使用范围不同，过滤器是`Servlet`规范规定的，只用于web程序；而拦截器也可以用在应用程序中
- 规范不同，过滤器是`Servlet`容器支持的，而拦截器是在Spring容器内的
- 使用的资源不同,拦截器是Spring的组件可以使用Spring的资源，而过滤器不能
- 作用范围不同: 过滤器只在`Servlet`前后起作用，而拦截器可以在方法前后、异常抛出前后。优先使用拦截器

## 12. Spring Boot比SpringMVC好在哪(为什么使用SpringBoot)？

Starter依赖整合，自动配置，内嵌web容器可独立运行，可监控，趋向微服务，可容器化

## 13. Spring Boot如何实现自动配置

个人认为重点在`@Import`和`SPI`机制

通过启动类中的main方法的`SpringApplication.run(Xx.class, args);`调用后，会获取到启动类上的组合注解`@SpringBootApplication`,

其中`@EnableAutoConfiguration`向下可追溯到`@Import({AutoConfigurationImportSelector.class})`,

在对应的类中通过`SPI`(`SpringFactoriesLoader.loadXxx`)机制，加载`META-INF/spring.factories`中的类，

通过`@Conditional`来过滤需要的配置类，

然后调用Spring的`ConfigurableApplicationContext#refresh`方法将bean装配的容器

## 14. Spring Boot如何自定义starter

引入`spring-boot-autoconfigure`依赖，编写对应的Bean(`EnableConfigurationProperties`,`ConfigurationProperties`),编写配置类`Configuration`,编写

` resources/META-INF/spring.factories`如

```properties
org.springframework.boot.autoconfigure.EnableAutoConfiguration=\
  com.spectred.config.MyAutoConfiguration
```

使用时引入对应的starter,注入对应的bean

## 15. Spring Cloud有哪些组件

> 目前有Spring Cloud Netlix，Spring Cloud Alibaba ,Spring Cloud Tencent，当前主流的是Spring Cloud Alibaba

**服务注册中心**: Eureka , **Nacos**

**客户端负载均衡**: Ribbon , DubboLB, **Spring Cloud Loadbalancer**

API**网关**: Zuul , **Spring Cloud Gateway**

**熔断器**: Hystrix , **Sentinel**

**配置中心**: Spring Cloud Config , **Nacos**

**服务调用**: Feign , **Dubbo**

**消息驱动**: **Spring Cloud Stream**

**链路追踪**: **Spring Cloud Sleuth/Zipkin**

**分布式事务**: **Seata**