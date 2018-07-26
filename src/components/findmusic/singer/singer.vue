<template>
  <div class="singer">
    <singer-list :singers="singers" :letter="letter"></singer-list>
    <list-shortcut :singers="singers" @change="handleShortcutListClick"></list-shortcut>
  </div>
</template>

<script>
import SingerList from './components/list'
import ListShortcut from './components/shortcut'
import {getSingerList} from 'api/singer'
import {ERR_OK} from 'common/api'

const HOT_SINGER_LEN = 10
const HOT_NAME = '热门'

export default {
  components: {
    SingerList,
    ListShortcut
  },
  data() {
    return {
      singers: [], //存放ajax数据
      letter: ''   //存放右侧列表字母
    }
  },
  mounted() {
    this._getSingerList()
  },
  methods: {
    handleShortcutListClick (letter) {
      this.letter = letter
    },
    _getSingerList() {
      getSingerList().then((res) => {
        if (res.code === ERR_OK) {
          this.singers = this._normalizeSinger(res.data.list)
          // this.singers = res.data.list
          console.log(this.singers)
        }
      })
    },
    //处理歌手数据
    _normalizeSinger(list) {
      let map = {
        hot: {
          title: HOT_NAME,
          singerlist: []
        }
      }
      list.forEach((item, index) => {
        if (index < HOT_SINGER_LEN) {
          map.hot.singerlist.push({
            name: item.Fsinger_name,
            id: item.Fsinger_mid,
            avatar: `https://y.gtimg.cn/music/photo_new/T001R300x300M000${item.Fsinger_mid}.jpg?max_age=2592000`
          })
        }
        const key = item.Findex
        if (!map[key]) {
          map[key] = {
            title: key,
            singerlist: []
          }
        }
        map[key].singerlist.push({
          name: item.Fsinger_name,
          id: item.Fsinger_mid,
          avatar: `https://y.gtimg.cn/music/photo_new/T001R300x300M000${item.Fsinger_mid}.jpg?max_age=2592000`
        })
      })
      console.log(map)
      // 将map对象处理为一个数组
      let ret = []
      let hot = []
      for (let key in map) {
        let val = map[key]
        if (val.title.match(/[a-zA-Z]/)) {
          ret.push(val)
        } else if (val.title === HOT_NAME) {
          hot.push(val)
        }
      }
      ret.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0)
      })
      return hot.concat(ret)
    },
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .singer
    position: fixed
    top: 95px
    bottom: 0
    width: 100%
</style>