---
tag: [魔法]
---

# 反射

Java反射（Java Reflection）是指在运行时检查和操作Java类、对象、方法、属性等信息的能力。通过反射，可以在运行时获取类的完整结构信息（包括类名、方法、属性、构造函数等），并对其进行操作

## 1. 快速使用

```java
import java.lang.reflect.Constructor;
import java.lang.reflect.Field;
import java.lang.reflect.Method;

public class ReflectDemo {
    public static void main(String[] args) throws Exception {
        //1. 获取类对象
        Class<?> clazz = Class.forName("java.util.ArrayList");

        //2. 获取构造函数并创建对象
        Constructor<?> constructor = clazz.getConstructor();
        Object list = constructor.newInstance();

        //3. 调用方法
        Method addMethod = clazz.getMethod("add", Object.class);
        addMethod.invoke(list, "Hello");
        addMethod.invoke(list, "World");

        //4. 访问属性
        Field elementDataField = clazz.getDeclaredField("elementData");
        elementDataField.setAccessible(true);
        Object[] elementData = (Object[]) elementDataField.get(list);
        System.out.println(elementData[0]); // "Hello"
        System.out.println(elementData[1]); // "World"
    }
}
```

## 2. Class的常用方法

### 2.1 获取 Class 对象

可以使用以下三种方式之一来获取一个 Class 对象：

- 调用类的 `class` 属性：`Class<?> clazz = MyClass.class;`
- 调用对象的 `getClass()` 方法：`Class<?> clazz = myObject.getClass();`
- 使用 Class 的 `forName()` 方法：`Class<?> clazz = Class.forName("com.example.MyClass");`

### 2.2 获取类信息

- 获取类名：`String className = clazz.getName();`
- 获取包名：`String packageName = clazz.getPackage().getName();`
- 获取父类：`Class<?> superClass = clazz.getSuperclass();`
- 获取实现的接口：`Class<?>[] interfaces = clazz.getInterfaces();`

### 2.3 获取类成员

- 获取所有字段：`Field[] fields = clazz.getDeclaredFields();`
- 获取指定名称的字段：`Field field = clazz.getDeclaredField("fieldName");`
- 获取所有方法：`Method[] methods = clazz.getDeclaredMethods();`
- 获取指定名称和参数类型的方法：`Method method = clazz.getDeclaredMethod("methodName", parameterTypes);`
- 获取所有构造方法：`Constructor<?>[] constructors = clazz.getDeclaredConstructors();`
- 获取指定参数类型的构造方法：`Constructor<?> constructor = clazz.getDeclaredConstructor(parameterTypes);`

### 2.4 实例化对象

- 使用默认构造方法创建新实例：`Object obj = clazz.newInstance();`
- 使用指定构造方法和参数创建新实例：`Object obj = constructor.newInstance(args);`

### 2.5 修改字段值

- 设置可访问性：`field.setAccessible(true);`
- 设置字段值：`field.set(obj, value);`

### 2.6 调用方法

- 设置可访问性：`method.setAccessible(true);`
- 调用方法：`Object result = method.invoke(obj, args);`

### 2.7 其他方法

- 判断是否为数组类型：`boolean isArray = clazz.isArray();`
- 判断是否为接口：`boolean isInterface = clazz.isInterface();`
- 判断是否为枚举类型：`boolean isEnum = clazz.isEnum();`
- 判断是否为注解类型：`boolean isAnnotation = clazz.isAnnotation();`
- 判断是否为基本类型：`boolean isPrimitive = clazz.isPrimitive();`

## 3. 应用

### 3.1 在类库中的应用

在Spring框架中使用反射来创建bean。例如

```java
Class<?> clazz = Class.forName("com.example.User");
Object bean = clazz.newInstance();
```

Hibernate ORM 框架使用反射来实现对象和数据库之间的映射关系。例如
```java
SessionFactory sessionFactory = new Configuration().configure().buildSessionFactory();
ClassMetadata metadata = sessionFactory.getClassMetadata(User.class);
```

JUnit 测试框架使用反射来运行测试方法，并且支持在测试方法中访问私有字段和方法。例如
```java
Class<?> clazz = Class.forName("com.example.UserServiceTest");
Object testObj = clazz.newInstance();
Method testMethod = clazz.getMethod("testSave");
testMethod.invoke(testObj);
```

Gson 序列化和反序列化库使用反射来处理 Java 对象的字段和方法。例如

```java
Gson gson = new Gson();
User user = gson.fromJson(json, User.class);
```

### 3.2 基于反射的工具类

- Spring 中的`ReflectionUtils`
- Apache Commons BeanUtils 中的 `BeanUtils`
- Guava 中的 `TypeToken`、`ClassPath`、`Reflection`、`Invoker`
- Hutool 中的 `BeanUtil`、`ReflectUtil`

::: warning 反射存在的问题

- 性能问题：反射操作通常比直接调用 Java 方法或访问 Java 属性的性能要慢，因为它涉及到更多的计算和内部处理。在需要频繁访问和操作属性或方法时，建议尽可能使用直接访问方式。

- 安全问题：由于反射可以绕过 Java 访问控制机制，因此可能导致不安全的代码行为。如果使用反射来访问私有方法或字段，可能会破坏对象的不变性，从而导致程序出现错误或不可预测的行为。

- 可读性问题：使用反射可能使代码更难阅读和理解。由于它可以动态获取对象的属性和方法，因此可能会导致代码更加复杂和难以理解。在使用反射时，应该注重代码的可读性和可维护性。

- 调试问题：由于反射是动态的，因此可能会导致调试时出现一些问题。例如，如果程序在运行时使用反射创建对象或调用方法，可能会导致无法确定对象的实际类型或方法的实际参数。

:::

## 4. 内省

::: info 内省

内省机制是 Java 中一种用于操作 JavaBean 属性的机制，它允许程序在运行时通过反射来获取一个 JavaBean 对象的属性、方法等信息，并且可以动态地访问和修改这些属性。

通俗来讲，内省机制就是指在运行时通过反射获取一个 JavaBean 对象的属性信息，并动态地操作它们。JavaBean 是一种符合特定规范的 Java 对象，其中包含一些私有的属性（成员变量）以及与这些属性对应的 getter 和 setter 方法，JavaBean 规范要求这些方法必须按照一定的命名规则进行命名。通过内省机制，我们可以在运行时获取这些 getter 和 setter 方法的信息，从而实现对 JavaBean 属性的动态操作。

内省机制的优点是它比纯粹的反射机制更加安全和规范，可以避免一些潜在的类型不匹配等问题，并且可以方便地操作 JavaBean 的属性，适用于很多工具和框架中。但是内省机制相比反射机制也有一定的局限性，例如它只能访问公共属性和方法，而无法访问私有属性和方法等。

:::

### 4.1 内省机制的核心类

1. `Introspector`：主要是用于获取 BeanInfo 对象。
2. `BeanInfo`：描述一个 JavaBean 的信息，包括 Bean 的属性、方法等信息。
3. `PropertyDescriptor`：描述一个属性的信息，包括属性的 getter、setter 方法等信息。
4. `MethodDescriptor`：描述一个方法的信息，包括方法的参数类型、返回值类型等信息。

### 4.2 内省示例

```java
public class Person {
    private String name;
    private int age;

    // setter / getter
}
```

```java
import java.beans.IntrospectionException;
import java.beans.PropertyDescriptor;
import java.lang.reflect.InvocationTargetException;

public class IntrospectionDemo {
    public static void main(String[] args) throws IntrospectionException, InvocationTargetException, IllegalAccessException {
        Person person = new Person();
        person.setName("Tom");
        person.setAge(20);

        PropertyDescriptor nameDescriptor = new PropertyDescriptor("name", Person.class);
        PropertyDescriptor ageDescriptor = new PropertyDescriptor("age", Person.class);

        String name = (String) nameDescriptor.getReadMethod().invoke(person);
        int age = (int) ageDescriptor.getReadMethod().invoke(person);

        System.out.println("Name: " + name);
        System.out.println("Age: " + age);
    }
}
```

### 4.3 内省和反射的区别

内省和反射都是 Java 中用于操作 JavaBean 属性的机制，但它们有一些本质上的区别。

1. 操作对象不同：反射是操作类和对象的机制，通过反射可以获取一个类的方法、属性等信息，并对其进行操作；而内省是操作 JavaBean 对象的机制，它允许程序通过反射获取一个 JavaBean 对象的属性、方法等信息，并动态地操作它们。
2. 操作方式不同：反射是通过 Class 对象来实现的，它可以获取类中所有的方法、属性等信息，并可以通过反射操作这些信息；而内省是通过 BeanInfo 对象来实现的，它可以获取一个 JavaBean 对象中的属性信息，并可以通过内省机制对这些属性进行读写。
3. 安全性不同：反射机制可以访问类中的所有属性和方法，包括私有属性和方法，因此反射机制的安全性相对较低；而内省机制只能访问公共属性和方法，无法访问私有属性和方法，因此内省机制相对更加安全。
4. 执行效率不同：反射机制的执行效率较低，因为它需要进行大量的类信息查询和类型转换等操作，这些操作会降低程序的执行效率；而内省机制的执行效率较高，因为它只需要进行少量的类型查询和方法调用等操作，这些操作相对较快。



## 附. 反射相关类的java doc

[Class](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/lang/Class.html)

[Constructor](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/lang/reflect/Constructor.html)

[Method](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/lang/reflect/Method.html)

[Field](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/lang/reflect/Field.html)