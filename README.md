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
### 启动项目
```shell
cd oak-fe        //进入项目目录
npm i            //安装依赖
npm start        //启动本地开发服务器
```
**tips**
为了模拟未登录的情况，我做了一个判断，如果本地没有缓存“token”，就无法进入主页面，只能看到Login页面。

想要进入主页面，需要在浏览器中 `f12` 打开开发者面板，在 console 控制台中输入指令`localStorage.setItem('token','xx')`，再刷新页面即可
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

# 规范
参考就行，不要求一定要。
## 文件夹/文件命名
参考当前项目已有的。
## commit规范

注意: 用英文字符，:号后面空一格

commit规范

```shell
<type>: <subject> #subject 必填，简单说明，不超过50个字
#空一行
[optional body] # body 选填，用于填写更详细的描述
```

type是提交的类型，必须为以下类型中一个

```
feat：增加一个新功能
fix：修复bug
docs：只修改了文档
style：做了不影响代码含义的修改，空格、格式化、缺少分号等等
refactor：代码重构，既不是修复bug，也不是新功能的修改
perf：改进性能的代码
test：增加测试或更新已有的测试
chore：构建或辅助工具或依赖库的更新
```

提交示例

```
feat: 新建xx页面

初步完成xx组件
```
**参考网址**
https://jelly.jd.com/article/5f51aa34da524a0147e9529d

# 参考资料
