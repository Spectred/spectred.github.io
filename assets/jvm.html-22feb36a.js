const e=JSON.parse('{"key":"v-375ccf42","path":"/interview/jvm.html","title":"JVM","lang":"en-US","frontmatter":{"sidebar":"auto","headerDepth":1,"description":"参考 1. Java Garbage Collection Basics (https://www.oracle.com/webfolder/technetwork/tutorials/obe/java/gc01/index.html) 2. 深入理解Java虚拟机 (https://book.douban.com/subject/34907497/)...","head":[["meta",{"property":"og:url","content":"https://spectred.github.io/interview/jvm.html"}],["meta",{"property":"og:title","content":"JVM"}],["meta",{"property":"og:description","content":"参考 1. Java Garbage Collection Basics (https://www.oracle.com/webfolder/technetwork/tutorials/obe/java/gc01/index.html) 2. 深入理解Java虚拟机 (https://book.douban.com/subject/34907497/)..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"en-US"}],["meta",{"property":"og:updated_time","content":"2023-02-05T15:52:06.000Z"}],["meta",{"property":"article:modified_time","content":"2023-02-05T15:52:06.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"JVM\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-02-05T15:52:06.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"1. JVM通过可达性分析算法来判断对象是否存活，那么可做为GC Roots的对象有哪些?","slug":"_1-jvm通过可达性分析算法来判断对象是否存活-那么可做为gc-roots的对象有哪些","link":"#_1-jvm通过可达性分析算法来判断对象是否存活-那么可做为gc-roots的对象有哪些","children":[]},{"level":2,"title":"2. Java中有哪些引用类型?","slug":"_2-java中有哪些引用类型","link":"#_2-java中有哪些引用类型","children":[]},{"level":2,"title":"3. 有哪些垃圾收集算法","slug":"_3-有哪些垃圾收集算法","link":"#_3-有哪些垃圾收集算法","children":[{"level":3,"title":"3.1 标记-清除算法 (Mark-Sweep)","slug":"_3-1-标记-清除算法-mark-sweep","link":"#_3-1-标记-清除算法-mark-sweep","children":[]},{"level":3,"title":"3.2 标记-复制算法 （Mark-Copying）","slug":"_3-2-标记-复制算法-mark-copying","link":"#_3-2-标记-复制算法-mark-copying","children":[]},{"level":3,"title":"3.3 标记-整理算法 （Mark-Compact）","slug":"_3-3-标记-整理算法-mark-compact","link":"#_3-3-标记-整理算法-mark-compact","children":[]}]},{"level":2,"title":"4. HotSpot的算法细节实现","slug":"_4-hotspot的算法细节实现","link":"#_4-hotspot的算法细节实现","children":[]},{"level":2,"title":"5. 有哪些垃圾收集器","slug":"_5-有哪些垃圾收集器","link":"#_5-有哪些垃圾收集器","children":[]},{"level":2,"title":"6. 运行时数据区域","slug":"_6-运行时数据区域","link":"#_6-运行时数据区域","children":[{"level":3,"title":"6.1 程序计数器 (Program Counter Register)","slug":"_6-1-程序计数器-program-counter-register","link":"#_6-1-程序计数器-program-counter-register","children":[]},{"level":3,"title":"6.2 Java虚拟机栈 (Java Virtual Machine Stack)","slug":"_6-2-java虚拟机栈-java-virtual-machine-stack","link":"#_6-2-java虚拟机栈-java-virtual-machine-stack","children":[]},{"level":3,"title":"6.3 本地方法栈 (Native Method Stacks)","slug":"_6-3-本地方法栈-native-method-stacks","link":"#_6-3-本地方法栈-native-method-stacks","children":[]},{"level":3,"title":"6.4 Java堆 (Java Heap)","slug":"_6-4-java堆-java-heap","link":"#_6-4-java堆-java-heap","children":[]},{"level":3,"title":"6.6 直接内存 (Direct Memory)","slug":"_6-6-直接内存-direct-memory","link":"#_6-6-直接内存-direct-memory","children":[]}]},{"level":2,"title":"7. 内存分配策略","slug":"_7-内存分配策略","link":"#_7-内存分配策略","children":[]},{"level":2,"title":"8. 对象的创建和内存布局","slug":"_8-对象的创建和内存布局","link":"#_8-对象的创建和内存布局","children":[{"level":3,"title":"8.1 对象的创建","slug":"_8-1-对象的创建","link":"#_8-1-对象的创建","children":[]},{"level":3,"title":"8.2 对象的内存布局","slug":"_8-2-对象的内存布局","link":"#_8-2-对象的内存布局","children":[]}]},{"level":2,"title":"9. OOM有哪些情况，频繁Full GC有哪些可能的原因，如何解决","slug":"_9-oom有哪些情况-频繁full-gc有哪些可能的原因-如何解决","link":"#_9-oom有哪些情况-频繁full-gc有哪些可能的原因-如何解决","children":[{"level":3,"title":"9.1 OOM有哪些情况","slug":"_9-1-oom有哪些情况","link":"#_9-1-oom有哪些情况","children":[]},{"level":3,"title":"9.2 频繁Full GC有哪些可能的原因，如何解决","slug":"_9-2-频繁full-gc有哪些可能的原因-如何解决","link":"#_9-2-频繁full-gc有哪些可能的原因-如何解决","children":[]}]},{"level":2,"title":"10. JVM有哪些工具，常用的VM参数有哪些","slug":"_10-jvm有哪些工具-常用的vm参数有哪些","link":"#_10-jvm有哪些工具-常用的vm参数有哪些","children":[{"level":3,"title":"10.1 基础故障处理工具","slug":"_10-1-基础故障处理工具","link":"#_10-1-基础故障处理工具","children":[]},{"level":3,"title":"10.2 可视化故障处理工具","slug":"_10-2-可视化故障处理工具","link":"#_10-2-可视化故障处理工具","children":[]},{"level":3,"title":"10.3 常用的VM参数","slug":"_10-3-常用的vm参数","link":"#_10-3-常用的vm参数","children":[]}]},{"level":2,"title":"11. 类加载过程，类加载器有哪些，如何打破双亲委派机制","slug":"_11-类加载过程-类加载器有哪些-如何打破双亲委派机制","link":"#_11-类加载过程-类加载器有哪些-如何打破双亲委派机制","children":[{"level":3,"title":"11.1 类加载的过程","slug":"_11-1-类加载的过程","link":"#_11-1-类加载的过程","children":[]},{"level":3,"title":"11.2 类加载器有哪些","slug":"_11-2-类加载器有哪些","link":"#_11-2-类加载器有哪些","children":[]},{"level":3,"title":"11.3 双亲委派机制是什么，如何打破","slug":"_11-3-双亲委派机制是什么-如何打破","link":"#_11-3-双亲委派机制是什么-如何打破","children":[]}]},{"level":2,"title":"12. 记录一次JVM问题的排查过程","slug":"_12-记录一次jvm问题的排查过程","link":"#_12-记录一次jvm问题的排查过程","children":[]}],"git":{"createdTime":1675612326000,"updatedTime":1675612326000,"contributors":[{"name":"spectred","email":"1505073336@qq.com","commits":1}]},"readingTime":{"minutes":22.29,"words":6686},"filePathRelative":"interview/jvm.md","localizedDate":"February 5, 2023","autoDesc":true}');export{e as data};
