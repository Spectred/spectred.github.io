import { navbar } from "vuepress-theme-hope";

export const zhNavbar = navbar([
  { text: '首页', link: '/', },
  { text: '😈面试', link: '/interview', },
  {
      text: '☕️Java', children:[
          {text: '🪄魔法',link: '/java/magic'},
          {text: '🦋并发',link: '/java/concurrent'},
      ]
  },
  {
      text: '框架', children: [
          {text: 'gRPC',link: '/frame/gRPC'},
          {text: 'Dubbo',link: '/frame/dubbo'},
          {text: 'MyBatis',link: '/frame/mybatis'},
          {text: 'Netty',link: '/frame/netty'},               
          {text: 'RPC',link: '/frame/rpc'},  
          {text: 'Spring',link: '/frame/spring'},
      ]
  },
  {
      text: '中间件', children: [
          { text: 'Flink', link: '/middleware/flink' },
          { text: 'Kafka', link: '/middleware/kafka' },
          { text: 'MongoDB', link: '/middleware/mongodb/README.md' },
          { text: 'MySQL', link: '/middleware/mysql' },
          { text: 'Pulsar', link: '/middleware/pulsar' },
          { text: 'Redis', link: '/middleware/redis' },
          { text: 'ZooKeeper', link: '/middleware/zookeeper' },  
      ]
  },
  {
      text: '云原生', link: '/cloud_native',
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
      text: '架构', link: '/architecture',

      // children: [
      //     {
      //         text: '',
      //         link: '/architecture/microservices'
      //     },
      // ]
  },
  {
      text: '基础', link: '/base',
      children: [
          { text: '操作系统',link: '/base/os' },
          { text: '计算机网络',link: '/base/network' },
          { text: '编译原理',link: '/base/compiler' },
          { text: '数据结构和算法',link: '/base/alg' },
      ]
  },
  {
      text: '百宝箱',
      link: '/doraemon',
  },
  { text: 'GitHub', link: 'https://github.com/Spectred/spectred.github.io', },

]);
