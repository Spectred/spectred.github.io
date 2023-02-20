import{_ as l,V as s,W as r,Z as e,$ as t,X as o,F as a}from"./framework-b6120433.js";const c={},_=e("h1",{id:"栈",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#栈","aria-hidden":"true"},"#"),t(" 栈")],-1),i=e("p",null,"先进后出，只允许在一端插入和删除数据的线性表",-1),d=e("p",null,"当某个数据集只涉及在一端插入和删除数据，并且满足后进先出，先进后出的特性，首选栈",-1),h=e("p",null,[e("strong",null,"如何实现一个栈")],-1),u={href:"https://github.com/Spectred/alg/blob/java/src/struct/ArrayStack.java",target:"_blank",rel:"noopener noreferrer"},p=e("li",null,"链式栈：用链表实现",-1),f=e("p",null,[e("strong",null,"栈在函数调用中的应用")],-1),g=e("p",null,"例如栈帧",-1),m=e("p",null,[e("strong",null,"栈在表达式求值中的应用")],-1),b=e("p",null,"通过两个栈来实现，一个保存操作数的栈，另一个保存运算符的栈。从左到右遍历表达式，当遇到数字直接压入操作数栈，遇到运算符就与运算符栈的栈顶元素比较，如果比运算符栈顶元素的优先级高，就将当前运算符入栈；如果比栈顶元素的优先级低或者相同，就从运算符栈中取栈顶运算符，从操作数栈的栈顶取两个操作数，然后进行计算，再把计算完的结果压入操作数栈。",-1),k=e("p",null,[e("strong",null,"栈中括号匹配中的应用")],-1),v=e("p",null,"当扫描到左括号时，则将其压入栈中；当扫描到右括号时，从栈顶取出一个左括号。如果能够匹配，则继续扫描剩下的字符串，如果扫描的过程中，遇到不能配对的右括号，或者栈中没有数据，则说明为非法格式。当所有的括号都扫描完成之后，如果栈为空，则字符串合法，否则非法",-1),x={href:"https://github.com/Spectred/alg/blob/java/src/string/IsValid_20.java",target:"_blank",rel:"noopener noreferrer"};function V(j,B){const n=a("ExternalLinkIcon");return s(),r("div",null,[_,i,d,h,e("ul",null,[e("li",null,[t("顺序栈： "),e("a",u,[t("数组实现栈"),o(n)])]),p]),f,g,m,b,k,v,e("p",null,[e("a",x,[t("20. 有效的括号"),o(n)])])])}const I=l(c,[["render",V],["__file","stack.html.vue"]]);export{I as default};