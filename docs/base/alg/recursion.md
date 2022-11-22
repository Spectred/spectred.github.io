# 递归

**递归需要满足的三个条件**

1. 一个问题的解可以分解为几个子问题的解
2. 问题与分解之后的问题，处理数据规模不同，求解思路完全一样
3. 存在递归终止条件

**如果编写递归代码**

写出递推公式，找到终止条件

**避免栈溢出**

**警惕重复计算**

通过一个数据结构（例如散列表）来保存已经求解过得k->f(k)