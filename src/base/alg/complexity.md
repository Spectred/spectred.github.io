# 复杂度分析

![](https://s2.loli.net/2023/02/01/5DiFez4OwdsEBuN.png)

---

[[toc]]

---

## 1. 大O复杂度表示法

`T(n) = O(f(n))`

- 只关注循环执行次数最多的一段代码

  ```java
   // O(n)
   int cal(int n) {
     int sum = 0;
     int i = 1;
     for (; i <= n; ++i) {
       sum = sum + i;
     }
     return sum;
   }
  ```

- 加法法则: 总复杂度等于两级最大的那段代码的复杂度

  > 如果 T1(n)=O(f(n))，T2(n)=O(g(n))；那么 T(n)=T1(n)+T2(n)=max(O(f(n)), O(g(n))) =O(max(f(n), g(n)))

  ```java
  // O(n²)
  int cal(int n) {
     int sum_1 = 0;
     int p = 1;
     for (; p < 100; ++p) {
       // O(1)
       sum_1 = sum_1 + p;
     }
  
     int sum_2 = 0;
     int q = 1;
     for (; q < n; ++q) {
       // O(n)
       sum_2 = sum_2 + q;
     }
   
     int sum_3 = 0;
     int i = 1;
     int j = 1;
     for (; i <= n; ++i) {
       j = 1; 
       for (; j <= n; ++j) {
         // O(n²)
         sum_3 = sum_3 +  i * j;
       }
     }
   
     return sum_1 + sum_2 + sum_3;
   }
  ```

- 乘法法则： 嵌套代码的复杂度等于嵌套内外代码复杂度的乘积

  > 如果 T1(n)=O(f(n))，T2(n)=O(g(n))；那么 T(n)=T1(n)*T2(n)=O(f(n))*O(g(n))=O(f(n)*g(n))

  ```java
  // T(n) = T1(n) * T2(n) = O(n*n) = O(n2)
  int cal(int n) {
     int ret = 0; 
     int i = 1;
     for (; i < n; ++i) {
       ret = ret + f(i);
     } 
   } 
   
   int f(int n) {
    int sum = 0;
    int i = 1;
    for (; i < n; ++i) {
      sum = sum + i;
    } 
    return sum;
   }
  ```

  ## 2. 复杂度量级

  - 常量阶 `O(1)`
  - 对数阶 `O(㏒n)`
  - 线性阶 `O(n)`
  - 线性对数阶 `O(n㏒n)`
  - 平方阶 `O(n²)` 、立方阶 `O(n³)` ... K次方阶 `O(n^k)`
  - 指数阶 `O(2^n)`
  - 阶乘阶 `O(n!)`

> 可以粗略地分为两类，多项式量级和非多项式量级。其中，非多项式量级只有两个：O(2n) 和 O(n!)
> 把时间复杂度为非多项式量级的算法问题叫作 NP（Non-Deterministic Polynomial，非确定多项式）问题

### 2.1  `O(1)`

只要代码的执行时间不随 n 的增大而增长，这样代码的时间复杂度我们都记作 O(1)
或者说，一般情况下，只要算法中不存在循环语句、递归语句，即使有成千上万行的代码，其时间复杂度也是Ο(1)

```
 // 是O(1) 而不是O(3)
 int i = 8;
 int j = 6;
 int sum = i + j;
```

### 2.2  `O(㏒n)` 、 `O(n㏒n)`

> O(nlogn) 是一种非常常见的算法时间复杂度。比如，归并排序、快速排序的时间复杂度都是 O(nlogn)。

```java
 // O(㏒n) 
 i=1;
 while (i <= n)  {
   i = i * 2; // 2^0 2^1 2^2 ... 2^x = n 则O(㏒2n)
 }
```

### 2.3 O(m+n)、O(m*n)

> 代码的复杂度由两个数据的规模来决定

```java
// 我们无法事先评估 m 和 n 谁的量级大，所以我们在表示复杂度的时候，就不能简单地利用加法法则，省略掉其中一个。所以，上面代码的时间复杂度就是 O(m+n)
int cal(int m, int n) {
  int sum_1 = 0;
  int i = 1;
  for (; i < m; ++i) {
    sum_1 = sum_1 + i;
  }

  int sum_2 = 0;
  int j = 1;
  for (; j < n; ++j) {
    sum_2 = sum_2 + j;
  }

  return sum_1 + sum_2;
}
```

> 空间复杂度
> 空间复杂度全称渐进空间复杂度（asymptotic space complexity），表示算法的存储空间与数据规模之间的增长关系

![](https://s2.loli.net/2023/02/01/HDa489XbTvGgox2.png)

> 最好情况时间复杂度: 在最理想的情况下，执行这段代码的时间复杂度(线性表中第一个元素即所求)
>
> 最坏情况时间复杂度: 最糟糕的情况下，执行这段代码的时间复杂度(线性表中没有所求元素)
>
> 平均情况时间复杂度
>
> 均摊时间复杂度