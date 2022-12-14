# 链表



链表不需要连续的内存空间，通过"指针"将一组零散的内存块串联起来，把内存块称为链表的"结点"，

**单链表**

为了将所有的结点串起来，每个链表的结点除了存储数据之外，还需要记录链上的下一个结点的地址，称为后继指针next

第一个节点称为头结点，记录链表的基地址，可以遍历整条链表，而尾节点指针指向空地址NULL,最后一个节点

链表的插入和删除，只需要考虑临结点的指针改变，时间复杂度是O(1); 随机访问需要根据指针节点遍历，时间复杂度是O(n)

**循环链表**

循环链表是一种特殊的单链表，尾结点指针指向链表的头结点

优点是从链尾到链头比较方便，比如约瑟夫问题

**双向链表**

每个节点不止有一个后继指针next指向后边的结点，还有一个前驱指针prev指向前面的结点。双向链表比单链表占用更多的内存空间，支持双向遍历。

双向链表可以支持O(1)时间复杂度的情况下找到前驱结点。LinkedHashMap采用了双向链表，空间换时间

**链表和数组的时间复杂度**

数组: 插入删除O(n)，随机访问O(1) ; 链表: 插入删除O(1),随机访问O(n)

数组的大小固定，动态扩容时需要申请更大的内存空间，将原数组拷贝进去，而链表本身没有大小的限制

**如何继续链表实现LRU缓存淘汰算法**

维护一个有序单链表，越靠近链表尾部的结点是越早之前访问的，当有一个新的数据被访问时，从链表头开始顺序遍历链表，

- 如果此数据之前已经被缓存在链表中，便利得到这个数据对应的结点，并将其原来的位置删除，然后再插入到链表的头部

- 如果此数据没在缓存链表中，则
  - 如果缓存未满，则将此节点直接插入到链表的头部
  - 如果缓存已满，则链表尾节点删除，将新的数据节点插入链表的头部

引入散列表来记录每个数据的位置

[146. LRU 缓存](https://github.com/Spectred/alg/blob/java/src/common/LRUCache_146.java)

[234. 回文链表](https://github.com/Spectred/alg/blob/java/src/listnode/IsPalindrome_234.java)

