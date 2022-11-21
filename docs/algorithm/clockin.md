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

## ✅ 2022-11-04 V (字符串包含)
判断两个字符串是否包含，例如"abc"包含"ab"
```java
    private static boolean contains(String str, String a) {
        char[] as = a.toCharArray();
        char[] chars = str.toCharArray();
        if (chars.length < a.length()) return false;
        char[] cs = new char[as.length];
        for (int i = 0; i < chars.length; i++) {
            int length = Math.min(i + as.length, chars.length);
            for (int k = i; k < length; k++)
                cs[k - i] = chars[k];
            if (eq(cs, as)) return true;
        }
        return false;
    }

    private static boolean eq(char[] a, char[] b) {
        if (a.length != b.length) return false;
        for (int i = 0; i < a.length; i++)
            if (a[i] != b[i]) return false;
        return true;
    }
```

## ✅ 2022-11-05 ([141. 环形链表](https://leetcode.cn/problems/linked-list-cycle/))
```java
    public boolean hasCycle(ListNode head) {
        if (head == null || head.next == null) return false;
        ListNode slow = head, fast = head.next;
        while (slow != fast) {
            if (fast == null || fast.next == null) return false;
            slow = slow.next;
            fast = fast.next.next;
        }
        return true;
    }

```

## ✅ 2022-11-06 ([160. 相交链表](https://leetcode.cn/problems/intersection-of-two-linked-lists/))
```java
    public ListNode getIntersectionNode(ListNode headA, ListNode headB) {
        Set<ListNode> set = new HashSet<>();

        while (headA != null) {
            set.add(headA);
            headA = headA.next;
        }

        while (headB != null) {
            if (set.contains(headB)) return headB;
            headB = headB.next;
        }
        return null;
    }

```

## ❌ 2022-11-07


## ✅ 2022-11-08 ([5. 最长回文子串](https://leetcode.cn/problems/longest-palindromic-substring/))
```java
    public String longestPalindrome(String s) {
        String res = "";
        for(int i=0,size=s.length();i<size;i++){
            String s1 = palindrome(s,i,i);
            String s2 = palindrome(s,i,i+1);
            res = res.length() > s1.length() ? res : s1;
            res = res.length() > s2.length() ? res : s2;
        }
        return res;
    }

    private String palindrome(String s,int l,int r){
        while(l>=0 && r<s.length() && s.charAt(l) == s.charAt(r)){
            l--;
            r++;
        }
        return s.substring(l+1,r);
    }
```

## ✅ 2022-11-09 ([102. 二叉树的层序遍历](https://leetcode.cn/problems/binary-tree-level-order-traversal/))
```java
    public List<List<Integer>> levelOrder(TreeNode root) {
        List<List<Integer>> res = new LinkedList<>();
        if(root == null) return res;

        Queue<TreeNode> q = new LinkedList<>();
        q.offer(root);

        while(!q.isEmpty()){
            List<Integer> list = new LinkedList<>();
            int size = q.size();
            for(int i = 0;i < size ;i++){
                TreeNode curr = q.poll();
                list.add(curr.val); 
                if(curr.left != null)  q.offer(curr.left);
                if(curr.right != null) q.offer(curr.right);
            }
            res.add(list);
        }
        return res;
    }
```

## ✅ 2022-11-10 ([70. 爬楼梯](https://leetcode.cn/problems/climbing-stairs/))
```java
    public int climbStairs(int n) {
        int p=0,q=0,r=1;
        for(int i=1;i<=n;i++){
            p=q;
            q=r;
            r=p+q;
        }
        return r;
    }
```

## ✅ 2022-11-11 ([牛客网-华为-HJ12 字符串反转]())
```java
    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        // 注意 hasNext 和 hasNextLine 的区别
        while(in.hasNext()){
            String str = in.nextLine();
            char[] cs = str.toCharArray();
            for(int i = cs.length-1;i>=0;i--){
                System.out.print(cs[i]);
            }
        }
    }
```


## ✅ 2022-11-12 ([148. 排序链表](https://leetcode.cn/problems/sort-list/))
```java
    public ListNode sortList(ListNode head) {
        if(head == null){
            return head;
        }
        ListNode curr = head;
        List<ListNode> list = new ArrayList<>();
        while (curr != null) {
            list.add(curr);
            curr = curr.next;
        }
        list.sort(Comparator.comparingInt(x -> x.val));
        for (int i = 0; i < list.size(); i++) {
            ListNode node = null;
            if (i+1<list.size()){
                node = list.get(i+1);
            }
            list.get(i).next = node;
        }
        return list.get(0);
    }
```

## ❌ 2022-11-13

## ❌ 2022-11-14


## ✅ 2022-11-15 ([HJ6 质数因子](https://www.nowcoder.com/practice/196534628ca6490ebce2e336b47b3607?tpId=37&tqId=21229&rp=1&ru=/exam/oj/ta&qru=/exam/oj/ta&sourceUrl=%2Fexam%2Foj%2Fta%3FjudgeStatus%3D3%26page%3D1%26pageSize%3D50%26search%3D%26tpId%3D37%26type%3D37&difficulty=undefined&judgeStatus=3&tags=&title=))
```java
    public static void main(String[] args) {
        int a = 180;
        for (int i = 2; i <= Math.sqrt(a); i++) {
            while (a % i == 0) {
                a = a / i;
                System.out.print(i + " ");
            }
        }
        if (a > 1) {
            System.out.print(a + " ");
        }
    }
```

## ❌ 2022-11-16

## ❌ 2022-11-17

## ❌ 2022-11-18

## ❌ 2022-11-19


## ✅ 2022-11-20 ([146. LRU 缓存](https://leetcode.cn/problems/lru-cache/))
```java
class LRUCache {

    Map<Integer,Node> map;

    DoubleList cache;

    int cap;

    public LRUCache(int capacity) {
        cap = capacity;
        map = new HashMap<>();
        cache = new DoubleList();
    }
    
    public int get(int key) {
        if(!map.containsKey(key)) return -1;
        Node node = map.get(key);
        cache.remove(node);
        cache.addList(node);
        return node.val;
    }
    
    public void put(int key, int val) {
        Node oldNode = map.get(key);
        Node newNode = new Node(key,val);

        if(oldNode != null){
            cache.remove(oldNode);
            cache.addList(newNode);
            map.put(key,newNode);
            return;
        }

        if(cache.size == cap){
            Node firstNode = cache.removeFirst();
            map.remove(firstNode.key);
        }
        
        cache.addList(newNode);
        map.put(key,newNode);
    }

    class Node{
        int key,val;
        Node prev,next;
        
        public Node(int key,int val){
            this.key = key;
            this.val = val;
        }
    }

    class DoubleList{
        Node head,tail;

        int size;

        public DoubleList(){
            size = 0;
            head = new Node(0,0);
            tail = new Node(0,0);
            head.next = tail;
            tail.prev = head;
        }

        public void addList(Node x){
            x.prev = tail.prev;
            x.next = tail;
            tail.prev.next = x;
            tail.prev = x;
            size++;
        }

        public void remove(Node x){
            x.prev.next = x.next;
            x.next.prev = x.prev;
            size--;
        }

        public Node removeFirst(){
            if(head.next == null) return null;
            Node first = head.next;
            remove(first);
            return first;
        }
    }
    
}

```

```java
class LRUCache extends LinkedHashMap{
    private int capacity;

    public LRUCache(int capacity) {
        super(capacity,0.75f,true);
        this.capacity = capacity;
    }
    
    public int get(int key) {
        Integer value = (Integer)super.get(key);
        return value == null ? -1 : value;
    }
    
    public void put(int key, int value) {
        super.put(key,value);
    }


    @Override
    protected boolean removeEldestEntry(Map.Entry eldest) {
        return size() > this.capacity; 
    }
}
```

## ✅ 2022-11-21 ([300. 最长递增子序列](https://leetcode.cn/problems/longest-increasing-subsequence/))

```java
    public int lengthOfLIS(int[] nums) {
        int[] dp = new int[nums.length];
        Arrays.fill(dp, 1);

        for (int i = 0; i < nums.length; i++) {
            for (int j = 0; j < i; j++) {
                if (nums[i] > nums[j])
                    dp[i] = Math.max(dp[i], dp[j] + 1);
            }
        }
        return Arrays.stream(dp).max().getAsInt();
    }
```

## ✅ 2022-11-21 II ([1190. 反转每对括号间的子串](https://leetcode.cn/problems/reverse-substrings-between-each-pair-of-parentheses/))
```java
   public String reverseParentheses(String s) {
        Deque<String> stack = new LinkedList<>();
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < s.length(); i++) {
            char ch = s.charAt(i);
            if (ch == '(') {
                stack.push(sb.toString());
                sb.setLength(0);
            } else if (ch == ')') {
                sb.reverse();
                sb.insert(0, stack.pop());
            } else {
                sb.append(ch);
            }
        }
        return sb.toString();
    }
```
