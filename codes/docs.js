/*
工具
    翻译： https://fanyi.baidu.com/?aldtype=16047#auto/zh
    图片压缩：https://tinypng.com/
    ps: https://www.tuyitu.com/photoshop/
    ast: https://astexplorer.net/
    TS AST View: https://ts-ast-viewer.com/#
*/

/*
Git 常用命令

git checkout -b [branch_name]   新建分支
git branch -m [branch_name] [new_branch_name] 重命名分支
git branch -D  [branch_name]  删除本地分支
git push origin —delete [branch_name] 删除远程分支
git remote add origin git@gitlab.xxx 关联远程仓库

git remote rm origin  删除关联远程仓库

git push -u origin master -f   重新关联本地仓库时，强制更新master

git push --set-upstream origin TTJ-4768_web

git pull origin master --allow-unrelated-histories


git remote -v  查看关联的远程仓库
git remote add qunar[别名] git@git.xxx 新增关联仓库
git pull origin master 
*/

function sleep(num = 100) {
    return new Promise(reslove => {
        setTimeout(() => {
            reslove(true);
        }, num);
    })
}

async function test() {
    console.log(123)
    await sleep(1000)
    console.log(456)
}

test()