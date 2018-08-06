<template>
  <transition name="list-fade">
    <div class="playlist" v-show="showFlag" @click="hide">
      <div class="list-wrapper" @click.stop>
        <div class="list-header">
          <h1 class="title">
            <i class="icon" :class="iconMode" @click="changeMode"></i>
            <span class="text">{{modeText}}</span>
            <span class="clear" @click="showConfirm">
              <i class="icon-delete"></i>
            </span>
          </h1>
        </div>
        <div ref="listContent" class="list-content">
          <transition-group ref="list" name="list" tag="ul">
            <li class="item"
                 v-for="(item,index) in sequenceList"
                 :key="item.id"
                 @click="selectItem(item,index)"
                 ref="listItem">
              <i class="current" :class="getCurrentIcon(item)"></i>
              <span class="text">{{item.name}}</span>
              <span class="like" @click.stop="toggleFavorite(item)">
                <i class="icon-like" :style="getFavoriteIcon(item)"></i>
              </span>
              <span class="delete" @click.stop="deleteOne(item)">
                <i class="icon-edit"></i>
              </span>
            </li>
          </transition-group>
        </div>
      </div>
      <confirm ref="confirm" 
               @confirm="confirmClear"
               text="是否清空播放列表"></confirm>
    </div>
  </transition>
</template>

<script>
  import Bscroll from 'better-scroll'
  import {mapGetters, mapMutations, mapActions} from 'vuex'
  import {playMode} from 'common/js/config'
  import Confirm from 'common/confirm/confirm'
  import {playerMixin} from 'common/js/mixin'

  export default {
    mixins: [playerMixin],
    components: {
      Confirm
    },
    data() {
      return {
        showFlag: false,
      }
    },
    mounted() {
      this.scroll = new Bscroll(this.$refs.listContent, {click: true})
    },
    computed: {
      modeText() {
        return this.mode === playMode.sequence ? '列表循环' : this.mode === playMode.random ? '随机播放' : '单曲循环'
      },
      // ...mapGetters([
      //   'sequenceList',
      //   'currentSong',
      //   'playlist',
      //   'mode'
      // ])
    },
    methods: {
      show() {
        this.showFlag = true
        setTimeout(() => {
          this.scroll.refresh()
          // this.scrollToCurrent(this.currentSong)
        }, 20)
      },
      hide() {
        this.showFlag = false
      },
      showConfirm() {
        this.$refs.confirm.show()
      },
      getCurrentIcon(item) {
        if (this.currentSong.id === item.id) {
          return 'icon-volume-medium'
        }
        return ''
      },
      selectItem(item, index) {
        if (this.mode === playMode.random) {
          index = this.playlist.findIndex((song) => {
            return song.id === item.id
          })
        }
        this.setCurrentIndex(index)
        this.setPlayingState(true)
      },
      //播放列表点击歌曲滚动至顶部
      scrollToCurrent(current) {
        const index = this.sequenceList.findIndex((song) => {
          return current.id === song.id
        })
        this.scroll.scrollToElement(this.$refs.listItem[index], 300)
      },
      deleteOne(item) {
        this.deleteSong(item)
        if (!this.playlist.length) {
          this.hide()
          this.$emit('stopMusic')
        }
      },
      //清空列表
      confirmClear() {
        this.clearSongList()
        this.hide()
        this.$emit('stopMusic')
      },
      // ...mapMutations({
      //   setPlayingState: 'SET_PLAYING_STATE',
      //   setCurrentIndex: 'SET_CURRENT_INDEX',
      // }),
      ...mapActions([
        'deleteSong',
        'clearSongList'
      ])
    },
    watch: {
      currentSong(newSong, oldSong) {
        if (!this.showFlag || newSong.id === oldSong.id) {
          return
        }
        this.scrollToCurrent(newSong)
      }
    },
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~assets/stylus/variable"
  @import "~assets/stylus/mixin"

  .playlist
    position: fixed
    left: 0
    right: 0
    top: 0
    bottom: 0
    z-index: 200
    background-color: $color-background-d
    &.list-fade-enter-active, &.list-fade-leave-active
      transition: opacity 0.3s
      .list-wrapper
        transition: all 0.3s
    &.list-fade-enter, &.list-fade-leave-to
      opacity: 0
      .list-wrapper
        transform: translate3d(0, 100%, 0)
    &.list-fade-enter
    .list-wrapper
      position: absolute
      left: 0
      bottom: 0
      width: 100%
      background-color: $color-background
      .list-header
        position: relative
        padding: 10px 30px 10px 20px
        border-radius: 50px
        .title
          display: flex
          align-items: center
          .icon
            margin-right: 10px
            font-size: 22px
            color: $color-theme-d
          .text
            flex: 1
            font-size: $font-size-medium
            color: $color-text
          .clear
            extend-click()
            .icon-delete
              font-size: $font-size-large
              color: $color-text-d
      .list-content
        max-height: 280px
        overflow: hidden
        .item
          display: flex
          align-items: center
          height: 40px
          padding: 0 30px 0 20px
          overflow: hidden
          cursor:pointer
          &.list-enter-active, &.list-leave-active
            transition: all 0.1s
          &.list-enter, &.list-leave-to
            height: 0
          .current
            flex: 0 0 20px
            width: 20px
            font-size: $font-size-medium
            color: $color-theme
          .text
            flex: 1
            no-wrap()
            font-size: $font-size-medium
            color: $color-text
          .like
            extend-click()
            margin-right: 15px
            font-size: $font-size-medium
            color: $color-text-d
            .icon-favorite
              color: $color-sub-theme
          .delete
            extend-click()
            font-size: $font-size-medium
            color: $color-theme
</style>