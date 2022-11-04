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

## ✅ 2022-11-04 I ([25. K 个一组翻转链表](https://leetcode.cn/problems/reverse-nodes-in-k-group/))
```java
    public ListNode reverseKGroup(ListNode head, int k) {
        if (head == null) return null;
        ListNode a = head, b = head;
        for (int i = 0; i < k; i++) {
            if (b == null) return head;
            b = b.next;
        }
        ListNode newHead = reverse(a, b);
        a.next = reverseKGroup(b, k);
        return newHead;
    }

    private ListNode reverse(ListNode a, ListNode b) {
        ListNode prev = null, curr = a;
        while (curr != b) {
            ListNode next = curr.next;
            curr.next = prev;
            prev = curr;
            curr = next;
        }
        return prev;
    }
```

## ✅ 2022-11-04 II ([53. 最大子数组和](https://leetcode.cn/problems/maximum-subarray/))
```java
    public int maxSubArray(int[] nums) {
        if (nums.length == 0) return 0;

        int dp0 = nums[0], res = nums[0];

        for (int i = 1; i < nums.length; i++) {
            dp0 = Math.max(nums[i], nums[i] + dp0);
            res = Math.max(res, dp0);
        }
        return res;
    }
```

## ✅ 2022-11-04 III ([236. 二叉树的最近公共祖先](https://leetcode.cn/problems/lowest-common-ancestor-of-a-binary-tree/))
```java
    public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
        if (root == null || root == p || root == q) return root;
        TreeNode left = lowestCommonAncestor(root.left, p, q);
        TreeNode right = lowestCommonAncestor(root.right, p, q);
        if (left != null && right != null) return root;
        if (left == null && right == null) return null;
        return left == null ? right : left;
    }

```

## ✅ 2022-11-04 IV ([46. 全排列](https://leetcode.cn/problems/permutations/))
```java
    List<List<Integer>> res = new LinkedList<>();
    LinkedList<Integer> track = new LinkedList<>();
    
    public List<List<Integer>> permute(int[] nums) {
        backtrack(track, nums);
        return res;
    }

    private void backtrack(LinkedList<Integer> track, int[] nums) {
        if (track.size() == nums.length) {
            res.add(new LinkedList<>(track));
            return;
        }
        for (int i = 0; i < nums.length; i++) {
            if (track.contains(nums[i])) continue;
            track.add(nums[i]);
            backtrack(track, nums);
            track.removeLast();
        }
    }
```