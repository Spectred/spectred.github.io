# RPC

## 自定义RPC

RPC架构需要包含四个核心组件，分别是Client，ClientStub，Server，ServerStub，核心模块是通讯和序列化

- Client 客户端，服务的调用方
- Client Stub 客户端存根，存放服务端的地址消息，再将客户端的请求参数打包成网络消息，然后通过网络远程发送给服务方
- Server 服务端，真正的服务提供者
- Server Stub 服务端存根，接收客户端发送过来的消息，将消息解包，并调用本地方法