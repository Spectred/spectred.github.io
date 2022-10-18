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

