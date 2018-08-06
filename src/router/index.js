import Vue from 'vue'
import Router from 'vue-router'
// import MyMusic from 'components/mymusic/mymusic'
// import FindMusic from 'components/findmusic/findmusic'
// import Community from 'components/community/community'
// import Search from 'components/search/search'
// import Recommend from 'components/findmusic/recommend/recommend'
// import Singer from 'components/findmusic/singer/singer'
// import Rank from 'components/findmusic/rank/rank'
// import RecommendDetail from 'components/songlist-detail/recommend-detail'
// import SingerDetail from 'components/songlist-detail/singer-detail'
// import RankDetail from 'components/songlist-detail/rank-detail'
// import Like from 'components/user/myfavorite'
// import History from 'components/user/playhistory'

Vue.use(Router)

const MyMusic = (resolve) => {
  import('components/mymusic/mymusic').then((module) => {
    resolve(module)
  })
}
const FindMusic = (resolve) => {
  import('components/findmusic/findmusic').then((module) => {
    resolve(module)
  })
}

const Community = (resolve) => {
  import('components/community/community').then((module) => {
    resolve(module)
  })
}

const Search = (resolve) => {
  import('components/search/search').then((module) => {
    resolve(module)
  })
}

const Recommend = (resolve) => {
  import('components/findmusic/recommend/recommend').then((module) => {
    resolve(module)
  })
}

const Singer = (resolve) => {
  import('components/findmusic/singer/singer').then((module) => {
    resolve(module)
  })
}

const Rank = (resolve) => {
  import('components/findmusic/rank/rank').then((module) => {
    resolve(module)
  })
}

const RecommendDetail = (resolve) => {
  import('components/songlist-detail/recommend-detail').then((module) => {
    resolve(module)
  })
}

const SingerDetail = (resolve) => {
  import('components/songlist-detail/singer-detail').then((module) => {
    resolve(module)
  })
}

const RankDetail = (resolve) => {
  import('components/songlist-detail/rank-detail').then((module) => {
    resolve(module)
  })
}

const Like = (resolve) => {
  import('components/user/myfavorite').then((module) => {
    resolve(module)
  })
}

const History = (resolve) => {
  import('components/user/playhistory').then((module) => {
    resolve(module)
  })
}

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
      component: MyMusic,
      children: [
        {
          //我的收藏
          path: '/like',
          component: Like
        },
        {
          //播放历史
          path: '/history',
          component: History
        }
      ]
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
        children: [
          {
            path: ':id',
            component: RecommendDetail
          }
        ]
      },
      {
        // findmusic歌手
        path: '/findmusic/singer',
        component: Singer,
        children: [
          {
            path: ':id',
            component: SingerDetail
          }
        ]
      },
      {
        // findmusic排行
        path: '/findmusic/rank',
        component: Rank,
        children: [
          {
            path: ':id',
            component: RankDetail
          }
        ]
      }]
    },
    {
      // 顶部三个的第三页
      path: '/community',
      component: Community
    },
    {
      path: '/search',
      component: Search,
      children: [
        {
          path: ':id',
          component: SingerDetail
        }
      ]
    },
  ]
})
