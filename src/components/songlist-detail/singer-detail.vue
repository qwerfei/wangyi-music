<template>
  <transition name="slide">
    <music-list :title="title"
                :titleDefault="titleDefault"
                :bgImage="bgImage"
                :songs="songs">
    </music-list>
  </transition>
</template>

<script>
import MusicList from './music-list/music-list'
import {getSingerDetail} from 'api/singer'
import {ERR_OK} from 'common/js/api'
import {mapGetters} from 'vuex'
import {createSong} from 'common/js/song'

export default {
  components: {
    MusicList
  },
  data() {
    return {
      songs: [], //存放ajax数据
    }
  },
  computed: {
    title() {
      return this.singer.name
    },
    titleDefault() {
      return '歌手'
    },
    bgImage() {
      return this.singer.avatar
    },
    ...mapGetters([
      'singer'
    ])
  },
  mounted() {
    // console.log(this.singer)
    this._getSingerDetail()
  },
  methods: {
    _getSingerDetail() {
      if (!this.singer.id) {
        //当前页面刷新时回退到歌手页面
        this.$router.push('/findmusic/singer')
        return
      }
      getSingerDetail(this.singer.id).then((res) => {
        if (res.code === ERR_OK) {
          this.songs = this._normalizeSongs(res.data.list)
          // console.log(res.data.list)
          console.log(this.songs)
        }
      })
    },
    //处理歌曲详情数据
    _normalizeSongs(list) {
      let ret = []
      list.forEach((item) => {
        //对象解构赋值
        let {musicData} = item
        if (musicData.albummid) {
          ret.push(createSong(musicData))
        }
      })
      return ret
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)

</style>