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

## 3. `git`
3.1 比较分支中的提交差异
```bash 
# 查看dev有 而master没有
git log dev ^master 
# 查看dev比master多提交的
git log master..dev
# 查看两个分支的不同
git log master...dev
# 额外显示每个提交在哪个分支上
git log --left-right dev...master
```