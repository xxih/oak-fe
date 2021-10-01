# 开发指南
## 开始
### 安装git
b站随便找个视频跟着装，要学会基本的使用。
git 安装在默认地址，不要改。否则VSCode识别会出现问题。
### 搭建node.js环境
http://nodejs.cn/download/
安装最新版即可。
### 克隆
先找谢畅要权限，注册gitee，拉成员。
```shell
git clone git@gitee.com:always-make-trouble/oak-fe.git
```
### 开发
拉取仓库后，检查是否在dev分支。

从dev分支中新建一个本地开发分支，进行开发。

push前先fetch，保证dev分支处于最新状态。然后checkout到dev，merge本地开发分支，若发生冲突需要先解决冲突，后push。
### 目录结构
```
.
|-- README.md
|-- package-lock.json     //锁定版本
|-- package.json          //锁定版本
|-- public                //不用碰这个文件夹
|   `-- index.html        
`-- src
    |-- App.js            //根组件
    |-- index.css         //全局样式
    |-- index.js          //入口文件
    `-- views             //主要在这里面写
```
### 其他
需要的依赖都安装好了，路由也建好了。不太懂可以参考我写的页面做，虽然我也是新手= =。

先做页面样式，后添加交互，网络请求等。所以就先画页面吧。

## 引入的库
**运行时依赖**
antd 组件库
axios 用于发送网络请求
**开发时依赖**
sass 可以嵌套写样式