<template>
  <div class="music-list">
    <div class="header" ref="header">
      <div class="back" @click="back">
        <i class="icon-back"></i>
      </div>
      <div class="text">
        <h1 class="title">{{headerTitle}}</h1>
      </div>
    </div>
    <div class="list"
         ref="list">
      <div class="music-list-wrapper">
        <div class="bg-image" :style="bgStyle" ref="bgImage">
          <div class="filter"></div>
        </div>
        <div class="songlist-warpper">
          <div class="play" ref="play">
            <i class="icon icon-play"></i>
            <span class="text">随机播放全部</span>
            <span class="count">(共{{songs.length}}首)</span>
          </div>
          <song-list :songs="songs"></song-list>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import SongList from 'common/song-list/song-list'
  import Bscroll from 'better-scroll'

  const RESERVED_HEIGHT = 50

  export default {
    components: {
      SongList
    },
    props: {
      bgImage: {
        type: String,
        default: ''
      },
      songs: {
        type: Array,
        default: []
      },
      title: {
        type: String,
        default: ''
      },
      titleDefault: {
        type: String,
        default: ''
      }
    },
    data () {
      return {
        scrollY: 0,
        headerTitle: this.titleDefault
      }
    },
    computed: {
      bgStyle() {
        return `background-image:url(${this.bgImage})`
      }
    },
    mounted() {
      this._initScroll()
      this.imageHeight = this.$refs.bgImage.clientHeight
    },
    methods: {
      back() {
        this.$router.back()
      },
      _initScroll() {
        this.scroll = new Bscroll(this.$refs.list, {
          probeType: 3,
          click: true
        })
        //监听scroll事件
        this.scroll.on('scroll', (pos) => {
          this.scrollY = pos.y
          // console.log(this.scrollY)
        })
      },
    },
    watch: {
      //根据scrollY值改变标题名称和颜色
      scrollY (newY) {
        const percent = Math.abs(newY / (this.imageHeight - RESERVED_HEIGHT -20))
        // console.log(percent)
        if (newY < (-this.imageHeight + RESERVED_HEIGHT +20)) {
          this.headerTitle = this.title
        } else {
          this.headerTitle = this.titleDefault
        }
        if (newY < 0) {
          this.$refs.header.style.background = `rgba(212, 68, 57, ${percent})`
        } else {
          this.$refs.header.style.background = `rgba(212, 68, 57, 0)`
        }
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~assets/stylus/variable"
  @import "~assets/stylus/mixin"

  .music-list
    position: fixed
    z-index: 50
    top: 0
    left: 0
    bottom: 0
    right: 0
    background: $color-background
    .header
      position: absolute
      top: 0
      z-index: 100
      width: 100%
      height: 50px
      display : flex
      align-items : center
      .back
        padding: 0 20px 0 10px
        .icon-back
          font-size: $font-size-large-x
          color: $color-theme-l
      .text
        no-wrap()
        font-size: $font-size-large
        color: $color-theme-l
    .list
      width: 100%
      height: 100%
      overflow: hidden
      .music-list-wrapper
        .bg-image
          position: relative
          width: 100%
          height: 0
          padding-top: 75%
          background-size: cover
          .filter
            position: absolute
            top: 0
            left: 0
            width: 100%
            height: 100%
            background: black
            opacity: 0.3
        .songlist-warpper
          padding: 41px 0 20px 0
          border-radius: 10px
          position: relative
          top:-20px
          background: $color-background
          .play
            position: absolute
            top: 0px
            display: flex
            align-items: center
            width: 100%
            height: 40px
            padding-left: 16px
            border-bottom: 1px solid rgb(228, 228, 228)
            .icon-play
              font-size: $font-size-medium-x
              color: $color-text
              padding-right: 14px
            .text 
              font-size: $font-size-medium-x
            .count
              font-size: $font-size-medium
              color: $color-text-g
</style>