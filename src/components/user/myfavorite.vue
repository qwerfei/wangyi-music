<template>
  <transition name="slide">
    <div class="user">
      <div class="header" @click="back">
        <i class="icon icon-back"></i>
        <span>我的收藏</span>
      </div>
      <div class="play-btn">
        <i class="icon icon-playdetail" @click="random"></i>
        <span class="text">随机播放全部</span>
        <span class="count">(共{{count}}首)</span>
        <span class="clear" @click.stop="showConfirm">
          <i class="icon-delete"></i>
        </span>
      </div>
      <div class="list-wrapper" ref="listWrapper">
        <div ref="favoriteList" class="list-scroll">
          <div class="list-inner">
            <song-list :songs="favoriteList" @select="selectSong"></song-list>
          </div>
        </div>
      </div>
      <confirm ref="confirm" 
          @confirm="clearFavoriteList"
          text="是否清空收藏列表">
      </confirm>
      <div class="no-result-wrapper" v-show="noResult">
        <no-result :title="noResultDesc"></no-result>
      </div>
    </div>
  </transition>
</template>

<script>
import Bscroll from 'better-scroll'
import {mapGetters, mapActions} from 'vuex'
import SongList from 'common/song-list/song-list'
import Song from 'common/js/song'
import Confirm from 'common/confirm/confirm'
import NoResult from 'common/no-result/no-result'

export default {
  components: {
    SongList,
    Confirm,
    NoResult
  },
  data () {
    return {
      noResultDesc: '去寻找属于你自己最爱的MUSIC吧~'
    }
  },
  computed: {
    count () {
      return this.favoriteList.length
    },
    noResult () {
      return !this.favoriteList.length
    },
    ...mapGetters([
      'favoriteList'
    ])
  },
  mounted() {
    this.scroll = new Bscroll(this.$refs.favoriteList, {click: true})
  },
  methods: {
    back () {
      this.$router.back()
    },
    showConfirm() {
      this.$refs.confirm.show()
    },
    selectSong(song) {
      this.insertSong(new Song(song))
    },
    random() {
      let list = this.favoriteList
      if (list.length === 0) {
        return
      }
      list = list.map((song) => {
        return new Song(song)
      })
      this.randomPlay({
        list
      })
    },
    ...mapActions([
      'insertSong',
      'randomPlay',
      'clearFavoriteList'
    ])
  }

}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~assets/stylus/variable"
  .user
    position: fixed
    z-index: 100
    width: 100%
    top: 0
    left:0
    right:0
    bottom: 0
    background: $color-background
    &.slide-enter-active, &.slide-leave-active
      transition: all 0.3s
    &.slide-enter, &.slide-leave-to
      transform: translate3d(100%, 0, 0)
    .header
      display: flex
      align-items: center
      height: 50px
      padding: 0 20px
      background: $color-theme
      color: $color-theme-l
      .icon-back
        flex: 0 0 30px
        font-size: 16px
    .play-btn
      display: flex
      align-items: center
      width: 100%
      height: 40px
      padding-left: 20px
      border-bottom: 1px solid rgb(228, 228, 228)
      .icon-playdetail
        font-size: 18px
        color: $color-text
        padding-right: 14px
      .text
        font-size: $font-size-medium-x
      .count
        font-size: $font-size-medium
        color: $color-text-g
      .clear
        position: absolute
        right: 0
        padding-right: 20px
        font-size: 20px
        extend-click()
    .list-wrapper
      position: absolute
      top: 90px
      bottom: 0
      width: 100%
      .list-scroll
        height: 100%
        overflow: hidden
    .no-result-wrapper
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)


</style>
