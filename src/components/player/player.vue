<template>
  <div class="player" v-show="playlist.length>0">
    <div class="normal-player" v-show="fullScreen">
      <div class="background">
        <img width="100%" height="100%" :src="currentSong.image">
      </div>
      <div class="detailcontent">
        <div class="content-header">
          <i class="back icon-back" @click="back"></i>
          <div class="header-text">
            <p class="name">{{currentSong.name}}</p>
            <p class="singer">{{currentSong.singer}}</p>
          </div>
          <i class="share icon-share"></i>
        </div>
        <div class="content-wapper">
          <div class="cd">
            <div class="cd-play">
              <div class="trigger pause"></div>
            </div>
            <div class="cd-content">
              <div class="cd-wrapper">
                <div class="cd-bg"></div>
                <img class="img" :src="currentSong.image">
              </div>
            </div>
          </div>
          <div class="musicDo">
            <i class="icon icon-like"></i>
            <i class="icon icon-download"></i>
            <i class="icon icon-msg"></i>
            <i class="icon icon-list-circle-small"></i>
          </div>
        </div>
        <div class="content-footer">
          <div class="progress-wrapper">
            <span class="time time-l"></span>
            <div class="progress-bar-wrapper">
              <progress-bar></progress-bar>
            </div>
            <span class="time time-r"></span>
          </div>
          <div class="operators">
            <div class="icon">
              <i class="playmode icon-music-shunxu"></i>
            </div>
            <div class="icon">
              <i class="prev icon-prevdetail"></i>
            </div>
            <div class="icon">
              <i class="playPause icon-play"></i>
            </div>
            <div class="icon">
              <i class="next icon-nextdetail"></i>
            </div>
            <div class="icon">
              <i class="menu icon-list-music"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mini-player" v-show="!fullScreen" @click="open">
      <div class="icon">
        <img :src="currentSong.image">
      </div>
      <div class="text">
        <h2 class="name">{{currentSong.name}}</h2>
        <p class="desc">{{currentSong.singer}}</p>
      </div>
      <div class="control">
          <i class="icon-play"></i>
      </div>
      <div class="control">
        <i class="icon-list-music"></i>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapMutations, mapActions} from 'vuex'
import ProgressBar from 'common/progress-bar/progress-bar'
export default {
  components: {
    ProgressBar
  },
  computed: {
    ...mapGetters([
      'fullScreen',
      'playlist',
      'currentSong'
    ])
  },
  methods: {
    back() {
      this.setFullScreen(false)
    },
    open() {
      this.setFullScreen(true)
    },
    ...mapMutations({
      setFullScreen: 'SET_FULL_SCREEN'
    })
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~assets/stylus/variable"
  @import "~assets/stylus/mixin"

  .player
    .normal-player
      position: fixed
      left: 0
      right: 0
      top: 0
      bottom: 0
      z-index: 150
      background: #aaa
      // transform: translateZ(0)
      .background
        position: fixed
        left: 0
        top: 0
        width: 100%
        height: 100%
        z-index: -1
        opacity: 0.6
        filter: blur(20px)
      .detailcontent
        position:fixed
        height:100%
        width:100%
        top:0
        left:0
        bottom:0
        right:0
        z-index:17
        background:rgba(0,0,0,0.15)
        .content-header
          position:absolute
          top:0
          left:0
          right:0
          display:flex
          height:10vh
          padding-top:1vh
          box-sizing:border-box
          align-items:center
          .back,.share
            width:50px
            flex:0 0 50px
            color:$color-text-l
            font-size:20px 
            text-align:center
          .share
            font-size:30px
          .header-text
            flex:1 1 auto
            display:flex
            flex-direction:column
            justify-content:center
            color:$color-text-l
            width:calc(100% - 100px)
            .singer,.name
              margin:0
              color:$color-text-l
              font-size:$font-size-medium
              padding:4px 0
              no-wrap()
            .name
              font-size:$font-size-large
              font-weight:600
        .content-wapper
          position:absolute
          top:10vh
          left:0
          bottom:20vh
          right:0
          overflow:hidden
          .cd
            .cd-play
              width:80%
              height:1px 
              background-image:-webkit-linear-gradient(to left, rgba(255,255,255,0),rgba(255,255,255,0.6),rgba(255,255,255,0)); 
              background-image:linear-gradient(to left, rgba(255,255,255,0),rgba(255,255,255,0.6),rgba(255,255,255,0));
              margin:0 auto
              .trigger
                position:absolute
                top:-14px
                left:50%
                transform: translate3d(-16px,0,0)
                width:90px
                height:140px
                background-image:url('./../../assets/image/swith.png')
                background-size:cover
                transform-origin:14px 16px
                transition:all 0.3s
                z-index:5
            .cd-content
              width:44vh
              height:44vh
              position:relative
              margin: 0 auto
              margin-top:70px
              .cd-wrapper
                width:44vh
                height:44vh
                position:relative
                margin: 0 auto
                margin-top:70px
                .cd-bg
                  width:44vh
                  height:44vh
                  position:absolute
                  top:0
                  left:50%
                  transform:translate3d(-50%,0,0)
                  background:url('./../../assets/image/cd-mine.png')
                  background-size:100%
                  z-index:2
                .img
                  position:absolute
                  display:block
                  width:28vh
                  height:28vh
                  top:8vh
                  transition:all 0.3s
                  left:50%
                  transform:translate3d(-50%,0,0)
                  z-index:1
          .musicDo
              width:80vw
              position:absolute
              height:40px
              left:50%
              bottom:0
              transform:translate3d(-50%,0,0)
              display:flex
              align-items:center
              justify-content:space-around
              i
                display:inline-block
                width:40px
                width:40px
                line-height:40px
                text-align:center
                color:rgba(255,255,255,0.8)
                font-size:22px
        .content-footer
          position:absolute
          bottom:0
          left:0
          right:0
          height:18vh
          color:$color-theme-l
          .progress-wrapper
            display: flex
            align-items: center
            width: 88%
            margin: 0px auto
            padding: 10px 0
            .time
              color: $color-text
              font-size: $font-size-small
              flex: 0 0 30px
              line-height: 30px
              width: 30px
              &.time-l
                text-align: left
              &.time-r
                text-align: right
            .progress-bar-wrapper
              flex: 1
          .operators
            display: flex
            align-items: center
            .icon
              flex: 1
              color: $color-theme-l
              text-align: center
              i
                font-size: 30px
              .playmode,.menu
                font-size: 20px
              .playPause
                font-size: 34px
    .mini-player
      display: flex
      align-items: center
      position: fixed
      left: 0
      bottom: 0
      z-index: 180
      width: 100%
      height: 60px
      background: #ddd
      .icon
        flex: 0 0 40px
        width: 40px
        padding: 0 5px
        img
          width: 40px
          height: 40px
      .text
        display: flex
        flex-direction: column
        justify-content: center
        flex: 1
        line-height: 20px
        overflow: hidden
        .name
          margin-bottom: 2px
          no-wrap()
          font-size: $font-size-medium
          font-weight: 600 
          color: $color-text
        .desc
          no-wrap()
          font-size: $font-size-small
          color: $color-text-d
      .control
        flex: 0 0 30px
        width: 30px
        font-size: 28px
        padding: 0 10px
</style>

