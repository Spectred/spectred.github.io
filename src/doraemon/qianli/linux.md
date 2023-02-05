### 1. 向文件中追加内容(`tee`)
```bash
$ cat a.txt 
Hello World
--- 
$ tee -a a.txt <<-'EOF'
hello
world
EOF
---
$ cat a.txt 
Hello World
hello
world
```

### 2. 时间格式化(`date`)

```bash
$ echo `date '+%Y-%m-%d %H:%M:%S'`
1970-01-01 00:00:00
```

### 3. 免密登录
```
$  cat /etc/hosts
192.168.249.101  node1
192.168.249.102  node2
192.168.249.103  node3

# 分别在三个节点中执行，如node1
$ ssh-keygen
$ ssh-copy-id node2
$ ssh-copy-id node3
```
