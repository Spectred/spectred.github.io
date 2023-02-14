---
home: true
icon: home
title: 学习笔记
heroImage: /open-book.png
heroText: 学习笔记
tagline: 纸上得来终觉浅，绝知此事要躬行
actions:
  - text: 开始学习⛵
    link: /java/concurrent
    type: primary
  - text: 学习地图
    link: https://www.processon.com/view/link/63da89548363e12bdd644930
    type: secondary

features:
- title: 数据结构与算法
  details: 学习《数据结构与算法之美》，从复杂度开始，到各种数据结构，到经典算法分析，再到力扣刷题~
  link: /base/alg
  icon: structure
- title: Flink
  details: 分布式计算处理引擎
  link: /middleware/flink
  icon: 
- title: Java并发编程
  details: 学习《Java并发编程实战》有感~
  icon: 
  link: /java/concurrent

footer: MIT Licensed | Copyright © 2022-present
---

```mermaid
graph TB;
O(学习笔记)-->Java; 
Java-->魔法;
Java-->并发;
click Java "https://spectred.github.io/java/" "This is a link"
click 魔法 "https://spectred.github.io/java/magic/" "This is a link"
click 并发 "https://spectred.github.io/java/concurrent/" "This is a link"

O(学习笔记)-->四次元口袋; 
四次元口袋-->任意门;
click 任意门 "https://spectred.github.io/doraemon/tools.html" "This is a link"
```
