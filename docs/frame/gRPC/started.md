# gRPC

[官网](https://grpc.io/)
[gRPC 官方文档中文版V1.0](http://doc.oschina.net/grpc)

## [Quick start](https://grpc.io/docs/languages/java/quickstart/)

环境: JDK1.7或者更高版本 

### 获取示例代码

`$ git clone -b v1.51.0 --depth 1 https://github.com/grpc/grpc-java ; cd grpc-java/examples`

### 运行示例

#### 1. 编译客户端和服务端

```sh
$ ./gradlew installDist
BUILD SUCCESSFUL in 3m 45s
18 actionable tasks: 18 executed
```

#### 2. 运行服务端

```sh
$ ./build/install/examples/bin/hello-world-server
11月 22, 2022 11:56:31 上午 io.grpc.examples.helloworld.HelloWorldServer start
信息: Server started, listening on 50051
```

#### 3. 在另外一个终端运行客户端

```sh
$ ./build/install/examples/bin/hello-world-client
11月 22, 2022 11:58:49 上午 io.grpc.examples.helloworld.HelloWorldClient greet
信息: Will try to greet world ...
11月 22, 2022 11:58:49 上午 io.grpc.examples.helloworld.HelloWorldClient greet
信息: Greeting: Hello world
```

### 4. 更新gRPC服务

`grpc-java/examples/src/main/proto/helloworld.proto`

原文件:

```protobuf
syntax = "proto3";

option java_multiple_files = true;
option java_package = "io.grpc.examples.helloworld";
option java_outer_classname = "HelloWorldProto";
option objc_class_prefix = "HLW";

package helloworld;

// The greeting service definition.
service Greeter {
  // Sends a greeting
  rpc SayHello (HelloRequest) returns (HelloReply) {}
}

// The request message containing the user's name.
message HelloRequest {
  string name = 1;
}

// The response message containing the greetings
message HelloReply {
  string message = 1;
}
```

增加新方法`SayHelloAgain()`

```protobuf
// The greeting service definition.
service Greeter {
  // Sends a greeting
  rpc SayHello (HelloRequest) returns (HelloReply) {}
  // Sends another greeting
  rpc SayHelloAgain (HelloRequest) returns (HelloReply) {}
}
```

服务端新增方法

`src/main/java/io/grpc/examples/helloworld/HelloWorldServer.java`

```java
    @Override
    public void sayHelloAgain(HelloRequest req, StreamObserver<HelloReply> responseObserver) {
      HelloReply reply = HelloReply.newBuilder().setMessage("Hello again" + req.getName()).build();
      responseObserver.onNext(reply);
      responseObserver.onCompleted();
    }
```

客户端修改方法

`src/main/java/io/grpc/examples/helloworld/HelloWorldClient.java`

```java
  public void greet(String name) {
    logger.info("Will try to greet " + name + " ...");
    HelloRequest request = HelloRequest.newBuilder().setName(name).build();
    HelloReply response;
    try {
      response = blockingStub.sayHello(request);
    } catch (StatusRuntimeException e) {
      logger.log(Level.WARNING, "RPC failed: {0}", e.getStatus());
      return;
    }
    logger.info("Greeting: " + response.getMessage());

    try {
      response = blockingStub.sayHelloAgain(request);
    } catch (StatusRuntimeException e) {
      logger.log(Level.WARNING, "RPC failed: {0}", e.getStatus());
      return;
    }
    logger.info("Greeting Again: " + response.getMessage());
  }
```

重新编译客户端和服务端

```java
 $ ./gradlew installDist
Starting a Gradle Daemon (subsequent builds will be faster)

BUILD SUCCESSFUL in 9s
18 actionable tasks: 16 executed, 2 up-to-date
```

启动服务端

```sh
$ ./build/install/examples/bin/hello-world-server
11月 22, 2022 7:48:13 下午 io.grpc.examples.helloworld.HelloWorldServer start
信息: Server started, listening on 50051
```

启动客户端

```sh
$ ./build/install/examples/bin/hello-world-client
11月 22, 2022 7:48:52 下午 io.grpc.examples.helloworld.HelloWorldClient greet
信息: Will try to greet world ...
11月 22, 2022 7:48:53 下午 io.grpc.examples.helloworld.HelloWorldClient greet
信息: Greeting: Hello world
11月 22, 2022 7:48:53 下午 io.grpc.examples.helloworld.HelloWorldClient greet
信息: Greeting Again: Hello againworld
```

