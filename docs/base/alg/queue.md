# 队列

先进先出，入队`enqueue()`放一个数据到队列尾部；出队`dequeue()`从队列头部取一个元素

用数组实现的队列叫做[顺序队列](https://github.com/Spectred/alg/blob/java/src/struct/ArrayQueue.java)

用链表实现的队列叫做链式队列

[**循环队列**](https://github.com/Spectred/alg/blob/java/src/struct/CircularQueue.java)

**阻塞队列**

在队列基础上增加了阻塞操作，在队列为空时，从队头取数据会被阻塞，直到队列中有数据才能返回；如果队列已经满了，那么插入数据的操作会被阻塞，直到队列中有空闲位置后再插入数据，然后再返回

**并发队列**

线程安全的队列