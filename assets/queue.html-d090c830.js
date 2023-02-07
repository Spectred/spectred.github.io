import{_ as r,V as l,W as s,Z as e,a3 as t,Y as o,F as a}from"./framework-36369a6e.js";const c={},u=e("h1",{id:"队列",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#队列","aria-hidden":"true"},"#"),t(" 队列")],-1),_=e("p",null,[t("先进先出，入队"),e("code",null,"enqueue()"),t("放一个数据到队列尾部；出队"),e("code",null,"dequeue()"),t("从队列头部取一个元素")],-1),d={href:"https://github.com/Spectred/alg/blob/java/src/struct/ArrayQueue.java",target:"_blank",rel:"noopener noreferrer"},h=e("p",null,"用链表实现的队列叫做链式队列",-1),i={href:"https://github.com/Spectred/alg/blob/java/src/struct/CircularQueue.java",target:"_blank",rel:"noopener noreferrer"},p=e("strong",null,"循环队列",-1),f=e("p",null,[e("strong",null,"阻塞队列")],-1),m=e("p",null,"在队列基础上增加了阻塞操作，在队列为空时，从队头取数据会被阻塞，直到队列中有数据才能返回；如果队列已经满了，那么插入数据的操作会被阻塞，直到队列中有空闲位置后再插入数据，然后再返回",-1),b=e("p",null,[e("strong",null,"并发队列")],-1),g=e("p",null,"线程安全的队列",-1);function v(x,k){const n=a("ExternalLinkIcon");return l(),s("div",null,[u,_,e("p",null,[t("用数组实现的队列叫做"),e("a",d,[t("顺序队列"),o(n)])]),h,e("p",null,[e("a",i,[p,o(n)])]),f,m,b,g])}const q=r(c,[["render",v],["__file","queue.html.vue"]]);export{q as default};