---
sidebar: 'auto'
---

# 每日打卡

## ✅ 2022-11-01 ([206. 翻转链表](https://leetcode.cn/problems/reverse-linked-list/))



迭代:

```java
    public ListNode reverseList(ListNode head) {
        if (head == null || head.next == null) return head;

        ListNode last = reverseList(head.next);
        head.next.next = head;
        head.next = null;
        return last;
    }
```

递归:

```java
    public ListNode reverseList(ListNode head) {
        if (head == null || head.next == null) return head;

        ListNode curr = head, prev = null;
        while (curr != null) {
            ListNode next = curr.next;
            curr.next = prev;
            prev = curr;
            curr = next;
        }
        return prev;
    }
```

