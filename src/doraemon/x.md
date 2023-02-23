> http://easyyapi.com/
接口文档


GIT 查看分支的不同
git log dev ^master  -- 查看dev有 而master没有的
git log master..dev  -- 查看dev比master多提交的
git log master...dev  -- 查看两个分支的不同
git log --left-right dev...master -- 额外显示每个提交在哪个分支上

mac 中使用realpath (输出指定文件的绝对路径)
`brew install coreutils`
`realpath a.txt`

