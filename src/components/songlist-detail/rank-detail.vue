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
import {getRankDetail} from 'api/rank'
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
      return this.rank.topTitle
    },
    titleDefault() {
      return '排行'
    },
    bgImage() {
      if (this.songs.length) {
        return this.songs[0].image
      }
      return ''
    },
    ...mapGetters([
      'rank'
    ])
  },
  mounted() {
    this._getRankDetail()
  },
  methods: {
    _getRankDetail() {
      if (!this.rank.id) {
        //当前页面刷新时回退到排行榜页面
        this.$router.push('/findmusic/rank')
        return
      }
      getRankDetail(this.rank.id).then((res) => {
        if (res.code === ERR_OK) {
          this.songs = this._normalizeSongs(res.songlist)
          console.log(this.songs)
        }
      })
    },
    _normalizeSongs(list) {
      let ret = []
      list.forEach((item) => {
        const musicData = item.data
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