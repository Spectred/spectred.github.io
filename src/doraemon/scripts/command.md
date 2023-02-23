---
icon: command
---
# 命令

## 1. `tee`
1.1向文件中追加内容
```bash
$ tee -a a.txt <<-'EOF'
hello
world
EOF
```

## 2. `date`
格式化时间
```bash
$ echo `date '+%Y-%m-%d %H:%M:%S'`
1970-01-01 00:00:00
```