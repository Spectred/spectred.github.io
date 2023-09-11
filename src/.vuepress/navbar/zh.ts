import { navbar } from "vuepress-theme-hope";

export const zhNavbar = navbar([
  { text: '首页', link: '/', icon: "home" },
  { text: '面试', link: '/interview', icon: "emoji" },
  {
      text: 'Java',icon: "java", children:[
          {text: '☕️JVM',link: '/java/jvm'},
          {text: '🪄魔法',link: '/java/magic'},
          {text: '🛫并发',link: '/java/concurrent'},
      ]
  },
  {
      text: '框架', icon: "frame",children: [
          {text: 'gRPC',link: '/frame/gRPC',icon: ""},
          {text: 'Dubbo',link: '/frame/dubbo'},
          {text: 'MyBatis',link: '/frame/mybatis'},
          {text: 'Netty',link: '/frame/netty'},               
          {text: 'RPC',link: '/frame/rpc'},  
          {text: 'Spring',link: '/frame/spring'},
      ]
  },
  {
      text: '中间件',icon: "any", children: [
          { text: 'Flink', link: '/middleware/flink' ,icon: ""},
          { text: 'Kafka', link: '/middleware/kafka',icon: ""},
          { text: 'MongoDB', link: '/middleware/mongodb/README.md', icon: "✅" },
          { text: 'MySQL', link: '/middleware/mysql',icon: "" },
          { text: 'Pulsar', link: '/middleware/pulsar',icon: "" },
          { text: 'Redis', link: '/middleware/redis',icon: "😈" },
          { text: 'ZooKeeper', link: '/middleware/zookeeper',icon: "" },  
      ]
  },
  {
      text: '云原生', icon: "mesh",
      children: [
          {
              text: '微服务',
              link: '/cloud_native/microservices'
          },
          {
              text: 'CI/CD',
              link: 'https://github.com'
          },
          {
              text: 'DevOps',
              link: 'https://github.com'
          },
          {
              text: '容器',
              link: 'https://github.com'
          },
      ]
  },
  {
      text: '基础', icon: "stack",
      children: [
          { text: '操作系统',link: '/base/os' },
          { text: '计算机网络',link: '/base/network' },
          { text: '编译原理',link: '/base/compiler' },
          { text: '数据结构和算法',link: '/base/alg' },
      ]
  },
  {
    text: 'AI', icon: "customize",
    children: [
        { text: '提示词',link: '/ai/prompt' },
    ]
  },
  {
      text: '四次元口袋', icon: "tool",
      children: [
        { text: '任意门', link: '/doraemon/tools.md' },
        { text: '脚本集',link: '/doraemon/scripts'},
      ]
  },


]);
