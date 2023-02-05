## Socket

### 基础流程

#### 服务端

1. 创建`Server Socket`,绑定`Socket`和端口号
2. 监听端口，接收客户端的连接请求
3. 从`Socket`中读取内容并处理
4. 关闭`Scoket`

#### 客户端

1. 创建`Socket`，连接指定的服务端(`ip`和`port`)
2. 向`Socket`中写入信息

### 代码实现

服务端

```java
public class Server {

    public static void main(String[] args) throws IOException {
        // 1. 创建线程池，有客户端连接成功就创建一个线程
        ExecutorService executorService = Executors.newCachedThreadPool();
        // 2. 创建Server Socket
        ServerSocket serverSocket = new ServerSocket(9999);
        System.out.println("服务端已启动");
        while (true) {
            // 3. 监听客户端
            final Socket socket = serverSocket.accept();
            // 4. 处理消息
            executorService.execute(() -> handle(socket));
        }
    }

    private static void handle(Socket socket) {
        try {
            System.out.println(Thread.currentThread().getId() + ":" + Thread.currentThread().getName());
            // 接收消息: 从连接中取出输入流
            InputStream is = socket.getInputStream();
            byte[] b = new byte[1 << 10];
            int read = is.read(b);
            System.out.println("客户端:" + new String(b, 0, read));

            // 响应消息: 取出输出流
            OutputStream os = socket.getOutputStream();
            os.write("World".getBytes());
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            try {
                socket.close();
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }
    }
}
```

客户端

```java
public class Client {

    public static void main(String[] args) throws IOException {
        while (true) {
            // 1. 创建Socket
            Socket socket = new Socket("127.0.0.1", 9999);
            // 2. 连接中取出输出流并发送消息
            OutputStream os = socket.getOutputStream();
            String msg = scan();
            os.write(msg.getBytes());
            // 3. 连接中取出输入流并接收消息
            InputStream is = socket.getInputStream();
            byte[] b = new byte[1 << 10];
            int read = is.read(b);
            System.out.println("服务端:" + new String(b, 0, read));
            // 4. 关闭socket
            socket.close();
        }
    }

    private static String scan() {
        System.out.println("输入:");
        Scanner scanner = new Scanner(System.in);
        return scanner.nextLine();
    }
}
```

