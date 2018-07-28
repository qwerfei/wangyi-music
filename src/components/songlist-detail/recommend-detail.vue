<template>
  <transition name="slide">
    <music-list :title="title"
                :titleDefault="titleDefault"
                :bg-image="bgImage"
                :songs="songs">
    </music-list>
  </transition>
</template>

<script>
import MusicList from './music-list/music-list'
import {getRecommendDetail} from 'api/recommend'
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
      return this.recommend.dissname
    },
    titleDefault() {
      return '歌单'
    },
    bgImage() {
      return this.recommend.imgurl
    },
    ...mapGetters([
      'recommend'
    ])
  },
  mounted() {
    this._getRecommendDetail()
  },
  methods: {
    _getRecommendDetail() {
      if (!this.recommend.dissid) {
        //当前页面刷新时回退到歌手页面
        this.$router.push('/findmusic/recommend')
        return
      }
      getRecommendDetail(this.recommend.dissid).then((res) => {
        if (res.code === ERR_OK) {
          this.songs = this._normalizeSongs(res.cdlist[0].songlist)
          console.log(this.songs)
        }
      })
    },
    //处理歌曲详情数据
    _normalizeSongs(list) {
      let ret = []
      list.forEach((musicData) => {
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