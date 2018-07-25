import Vue from 'vue'
import Router from 'vue-router'
import MyMusic from 'components/mymusic/mymusic'
import FindMusic from 'components/findmusic/findmusic'
import Community from 'components/community/community'
import Recommend from 'components/findmusic/recommend/recommend'
import Singer from 'components/findmusic/singer/singer'
import Rank from 'components/findmusic/rank/rank'

Vue.use(Router)

export default new Router({
  routes: [
    {
      // 默认页面
      path: '/',
      redirect: '/findmusic/recommend'
    },
    {
      // 顶部三个的第一页 
      path: '/mymusic',
      component: MyMusic
    },
    {
      // findmusic 顶部三个的第二页
      path: '/findmusic',
      component: FindMusic,
      //  菜单的router
      children: [
      {
        // 默认
        path: '',
        redirect: '/findmusic/recommend'
      },
      {
        // findmusic推荐
        path: '/findmusic/recommend',
        component: Recommend,
      },
      {
        // findmusic歌手
        path: '/findmusic/singer',
        component: Singer,
      },
      {
        // findmusic排行
        path: '/findmusic/rank',
        component: Rank
      }]
    },
    {
      // 顶部三个的第三页
      path: '/community',
      component: Community
    }
  ]
})
