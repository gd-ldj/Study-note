1. git branch 用法##
> git branch   //列出所有的分支
git branch <branch> //创建名为<branch>的分支，但是不会切换过去
git branch -d <branch>  //删除指定分支，这是一个“安全”操作，git会阻止你删除包含未合并更改的分支。
git branch -D <branch>  //强制删除分支
git branch -m <branch> //重新命名当前分支
2. 解决冲突
> 如果两个分支对同一个文件的同一部分均有修改时，git将无法判断应该使用哪个，这时候合并提交会停止，需要你手动解决这些冲突。你可以使用git status来查看哪里存在冲突，很多时候我都会在目录下执行grep -rn HEAD来查看哪些文件里有这个标记，有这个标记的地方都是有冲突的。
