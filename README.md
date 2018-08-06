# wangyi-music

> 本项目是采用vue编写的仿网易云音乐移动端页面

### 项目地址
项目演示地址：[wangyi-music](http://47.106.246.136)，PC端建议使用chrome浏览器手机调试模式

二维码访问地址
![项目二维码.png](https://github.com/qwerfei/wangyi-music/tree/master/static/png/1533564598.png)

### 项目技术架构
***
*  vue-cli
*  vue
*  axios
*  vue-router
*  vue-lazyload
*  vuex
*  stylus
*  webpack

### 项目介绍

本人前端小白一枚,自学Vue,这个播放器有什么不足之处，敬请谅解

本项目是基于vue编写的移动端音乐播放器项目，共有播放器页面、播放列表、推荐页面、歌手页面、排行榜页面、歌单详情、歌手详情、排行榜详情、搜索页面、个人收藏与播放页面、侧边栏等等

api数据从QQ音乐抓取，所有测试数据未注释均打印到控制台方便查看

实现功能
*  播放器顺序播放，单曲循环，随机播放
*  播放歌词高亮，进度条与缩放进度环与歌曲同步
*  弹出播放列表歌曲收藏，删除与切换
*  推荐页面轮播图
*  歌手页面右侧索引导航与歌手列表联动及字母高亮
*  歌曲及歌手搜索，保存搜索历史，搜索结果上拉刷新
*  收藏及播放历史本地存储
*  图片懒加载

部分bug
*  移动端播放器歌词页面点击切换回cd页面无效，可点击顶部返回在进入播放器页面即可切换回cd页面
*  推荐页面，歌曲页面better-scroll滚动至页面底部距离有问题
*  侧边栏弹出卡顿及列表滚动失效
*  部分浏览器可能有歌曲无法自动播放问题

### 目录结构
***
<pre>
├── build                               // 构建服务和webpack配置
├── config                              // 项目配置文件
├── src                                 // 生产目录
│   ├── api                         //api请求文件
│   ├── assets                      // 图片字体等初始化静态资源
│   ├── common                          // 项目公用组件
│   │      ├──confirm          //弹窗组件
│   │      ├──js               //js封装
│   │      ├──loading          //加载样式组件
│   │      ├──no-result        //无结果样式组件
│   │      ├──progress-bar     //播放进度条组件
│   │      ├──progress-circle  //播放进度环组件
│   │      ├──search-box       //搜索框组件
│   │      ├──search-list      //搜索列表组件
│   │      ├──song-list        //歌曲列表组件
│   │      ├──typelist         //侧边栏列表样式组件
│   ├── components                  // 项目组件
│   │      ├──community        // 社区页面(未开发)
│   │      ├──findmusic
│   │      │       ├──rank     // 排行榜页面
│   │      │       ├──recommend// 个人推荐页面
│   │      │       ├──singer   // 歌手页面
│   │      ├──m-header         // 头部导航栏
│   │      ├──mymusic          // 个人音乐页面
│   │      ├──player           // 播放器页面
│   │      ├──playlist         // 播放器弹出列表页面
│   │      ├──search           // 搜索页面
│   │      ├──sidebar          // 侧边栏页面
│   │      ├──songlist-detail  // 歌曲列表页面
│   │      ├──suggest          // 搜索显示页面
│   │      ├──user             // 个人收藏与播放页面
│   ├── router                      // 路由配置文件 
│   ├── store                       // vuex状态管理文件
│   ├── App.vue                     // 项目根组件
│   └── main.js                     // 项目主配置文件
├── static                              // 静态资源文件
├── .babelrc                            // 语法解析器
├── .gitignore                          // git配置文件
├── .postcssrc.js                       // postcss配置项
├── index.html                          // 项目入口文件
├── package-lock.json                   // 项目依赖包详细说明文件
├── package.json                        // 项目依赖包配置文件
├── README.md                           // 项目说明文件
</pre>

## 感谢
- 感谢 [ustbhuangyi](https://github.com/ustbhuangyi) 老师的 [Vue 实战教程](http://coding.imooc.com/class/107.html) ，让我学习到很多 vue 的知识。

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
