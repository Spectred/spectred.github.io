# gRPC

[protobuf](https://protobuf.dev/)

[官网](https://grpc.io/)

[gRPC 官方文档中文版V1.0](http://doc.oschina.net/grpc)

[grpc-spring-boot-starter](https://yidongnan.github.io/grpc-spring-boot-starter/)

## 简单示例(Java)

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>pers.swd</groupId>
    <artifactId>grpc-demo</artifactId>
    <version>1.0-SNAPSHOT</version>


    <properties>
        <maven.compiler.source>8</maven.compiler.source>
        <maven.compiler.target>8</maven.compiler.target>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
        <grpc.version>1.34.1</grpc.version><!-- CURRENT_GRPC_VERSION -->
        <protobuf.version>3.12.0</protobuf.version>
        <protoc.version>3.12.0</protoc.version>
    </properties>

    <dependencyManagement>
        <dependencies>
            <dependency>
                <groupId>io.grpc</groupId>
                <artifactId>grpc-bom</artifactId>
                <version>${grpc.version}</version>
                <type>pom</type>
                <scope>import</scope>
            </dependency>
        </dependencies>
    </dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>io.grpc</groupId>
            <artifactId>grpc-netty-shaded</artifactId>
            <scope>runtime</scope>
        </dependency>
        <dependency>
            <groupId>io.grpc</groupId>
            <artifactId>grpc-protobuf</artifactId>
        </dependency>
        <dependency>
            <groupId>io.grpc</groupId>
            <artifactId>grpc-stub</artifactId>
        </dependency>
        <dependency>
            <groupId>com.google.protobuf</groupId>
            <artifactId>protobuf-java-util</artifactId>
            <version>${protobuf.version}</version>
        </dependency>
    </dependencies>
    <build>
        <extensions>
            <extension>
                <groupId>kr.motd.maven</groupId>
                <artifactId>os-maven-plugin</artifactId>
                <version>1.6.2</version>
            </extension>
        </extensions>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
                <configuration>
                    <excludes>
                        <exclude>
                            <groupId>org.projectlombok</groupId>
                            <artifactId>lombok</artifactId>
                        </exclude>
                    </excludes>
                </configuration>
            </plugin>
            <plugin>
                <groupId>org.xolstice.maven.plugins</groupId>
                <artifactId>protobuf-maven-plugin</artifactId>
                <version>0.6.1</version>
                <configuration>
                    <protocArtifact>com.google.protobuf:protoc:${protoc.version}:exe:${os.detected.classifier}</protocArtifact>
                    <pluginId>grpc-java</pluginId>
                    <pluginArtifact>io.grpc:protoc-gen-grpc-java:${grpc.version}:exe:${os.detected.classifier}</pluginArtifact>
                    <protoSourceRoot>src/main/proto</protoSourceRoot>
                </configuration>
                <executions>
                    <execution>
                        <goals>
                            <goal>compile</goal>
                            <goal>compile-custom</goal>
                        </goals>
                    </execution>
                </executions>
            </plugin>

            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-compiler-plugin</artifactId>
                <configuration>
                    <source>1.8</source>
                    <target>1.8</target>
                </configuration>
            </plugin>
        </plugins>
    </build>

</project>

```

添加.proto
src/main/proto/add.proto
```
syntax = "proto3";

package grpc;

option java_package = "pers.swd";
option java_outer_classname = "AddServiceProto";
option java_multiple_files = true;

service AddService {
  rpc Add (AddRequest) returns (AddResponse) {}
}

message AddRequest{
  int32 a = 1;
  int32 b = 2;
}

message AddResponse{
  int32 result = 1;
}
```

Server
```java
import io.grpc.Server;
import io.grpc.ServerBuilder;
import pers.swd.grpc.server.service.AddServiceImpl;

import java.io.IOException;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

public class DemoServer {

    public static void main(String[] args) throws IOException {
        // 创建Server实例,添加服务接口
        Server server = ServerBuilder.forPort(9999)
                .addService(new AddServiceImpl())
                .build();
        // 启动Server
        server.start();

        ScheduledExecutorService executor = Executors.newSingleThreadScheduledExecutor();
        executor.scheduleAtFixedRate(() -> System.out.println("Server is running..."), 0, 3, TimeUnit.SECONDS);
    }
}
```
服务接口(pers.swd.grpc.server.service.AddServiceImpl)
```java
import io.grpc.stub.StreamObserver;
import pers.swd.AddRequest;
import pers.swd.AddResponse;
import pers.swd.AddServiceGrpc;

public class AddServiceImpl extends AddServiceGrpc.AddServiceImplBase {

    @Override
    public void add(AddRequest request, StreamObserver<AddResponse> responseObserver) {
        int a = request.getA();
        int b = request.getB();
        responseObserver.onNext(AddResponse.newBuilder().setResult(a + b).build());
        responseObserver.onCompleted();
    }
}
```

Client
pers.swd.grpc.client.DemoClient
```java
import io.grpc.ManagedChannel;
import io.grpc.ManagedChannelBuilder;
import pers.swd.AddRequest;
import pers.swd.AddResponse;
import pers.swd.AddServiceGrpc;

public class DemoClient {


    /**
     * 声明Channel
     */
    ManagedChannel managedChannel;
    /**
     * 声明Stub 存根
     */
    AddServiceGrpc.AddServiceBlockingStub stub;


    public DemoClient() {
        // 使用ManagedChannelBuilder创建Channel
        managedChannel = ManagedChannelBuilder.forAddress("localhost", 9999).usePlaintext().build();
        // 通过Channel获取存根对象
        stub = AddServiceGrpc.newBlockingStub(managedChannel);
    }

    public static void main(String[] args) {
        // 准备参数
        int a = 1, b = 2;
        // 创建客户端
        DemoClient client = new DemoClient();
        // 构造请求
        AddRequest addRequest = AddRequest.newBuilder().setA(a).setB(b).build();
        // 调用服务
        AddResponse addResponse = client.stub.add(addRequest);
        // 打印响应 (3)
        System.out.println(addResponse.getResult());
    }
}

```
