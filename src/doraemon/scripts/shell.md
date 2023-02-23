# Shell脚本

## 1. 设置免密登录
```bash
$  cat /etc/hosts
aa.aa.aa.aa  node1
bb.bb.bb.bb  node2
cc.cc.cc.cc  node3

# 分别在三个节点中执行，如node1
$ ssh-keygen
$ ssh-copy-id node2
$ ssh-copy-id node3
```