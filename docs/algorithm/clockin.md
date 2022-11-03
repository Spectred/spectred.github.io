---
sidebar: 'auto'
---

# 每日打卡

## ✅ 2022-11-01 ([206. 翻转链表](https://leetcode.cn/problems/reverse-linked-list/))

```java
    // 迭代
		public ListNode reverseList(ListNode head) {
        if (head == null || head.next == null) return head;

        ListNode last = reverseList(head.next);
        head.next.next = head;
        head.next = null;
        return last;
    }
		// 递归
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

## ✅ 2022-11-02 ([3. 无重复字符的最长子串](https://leetcode.cn/problems/longest-substring-without-repeating-characters/))

```java
    public int lengthOfLongestSubstring(String s) {
        Map<Character, Integer> window = new HashMap<>(16);
        int res = 0, left = 0, right = 0;

        while (right < s.length()) {
            char c = s.charAt(right++);
            window.put(c, window.getOrDefault(c, 0) + 1);
            while (window.get(c) > 1) {
                char d = s.charAt(left++);
                window.put(d, window.getOrDefault(d, 0) - 1);
            }
            res = Math.max(res, right - left);
        }
        return res;
    }
```

## ✅ 2022-11-03 ([94. 二叉树的中序遍历](https://leetcode.cn/problems/binary-tree-inorder-traversal/))

```java
    List<Integer> res = new ArrayList<>();
    public List<Integer> inorderTraversal(TreeNode root) {
        if(root == null) return new ArrayList<>();
        inorderTraversal(root.left);
        res.add(root.val);
        inorderTraversal(root.right);
        return res;
    }
```

