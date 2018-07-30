<template>
  <div class="player" v-show="playlist.length>0">
    <transition name="normal">
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
          <transition name="fade">
            <div class="content-wapper"  v-show="currentShow === 'cd'" @click="changeMiddle">
              <div class="cd">
                <div class="cd-play">
                  <div class="trigger" :class="triggerCls"></div>
                </div>
                <div class="cd-content">
                  <div class="cd-wrapper" :class="cdCls">
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
          </transition>
          <transition name="fade">
            <div class="lyriclist" ref="lyriclist" v-show="currentShow === 'lyric'" @click="changeMiddle">
              <div class="lyric-wrapper" ref="lrc">
                <div v-if="currentLyric">
                  <p ref="lyricLine"
                     class="text"
                     :class="{'current': currentLineNum ===index}"
                     v-for="(line,index) in currentLyric.lines"
                     :key="index">
                     {{line.txt}}
                  </p>
                </div>
              </div>
            </div>
				</transition>
          <div class="content-footer">
            <div class="progress-wrapper">
              <span class="time time-l">{{format(currentTime)}}</span>
              <div class="progress-bar-wrapper">
                <progress-bar :percent="percent" @percentChange="progressBarChange"></progress-bar>
              </div>
              <span class="time time-r">{{format(currentSong.duration)}}</span>
            </div>
            <div class="operators">
              <div class="icon" @click="changeMode">
                <i class="playmode" :class="iconMode"></i>
              </div>
              <div class="icon">
                <i class="prev icon-prevdetail" @click="prev"></i>
              </div>
              <div class="icon">
                <i class="playPause"
                   @click="togglePlaying"
                   :class="playIcon"></i>
              </div>
              <div class="icon">
                <i class="next icon-nextdetail" @click="next"></i>
              </div>
              <div class="icon">
                <i class="menu icon-list-music"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <transition name="mini">
      <div class="mini-player" v-show="!fullScreen" @click="open">
        <div class="icon">
          <img :src="currentSong.image">
        </div>
        <div class="text">
          <h2 class="name">{{currentSong.name}}</h2>
          <p class="desc">{{currentSong.singer}}</p>
        </div>
        <div class="control" @click.stop="togglePlaying">
          <progress-circle :percent="percent">
            <i class="icon-mini" :class="playIcon"></i>
          </progress-circle>
        </div>
        <div class="control">
          <i class="icon-list-music"></i>
        </div>
      </div>
    </transition>
    <audio ref="audio"
           autoplay
           @canplay="ready"
           @ended="end"
           @error="error"
           @timeupdate="updateTime">
    </audio>
  </div>
</template>

<script>
import Bscroll from 'better-scroll'
import {getSong} from 'api/song'
import {mapGetters, mapMutations, mapActions} from 'vuex'
import ProgressBar from 'common/progress-bar/progress-bar'
import ProgressCircle from 'common/progress-circle/progress-circle'
import {playMode} from 'common/js/config'
import {shuffle} from 'common/js/util'
import Lyric from 'lyric-parser'

export default {
  components: {
    ProgressBar,
    ProgressCircle
  },
  data () {
    return {
      url: '',
      songReady: false,
      currentTime: 0,
      currentLyric: null,
      currentLineNum: 0,
      currentShow: 'cd',
    }
  },
  mounted() {
    this.scroll = new Bscroll(this.$refs.lyriclist)
  },
  computed: {
    //样式切换
    iconMode() {
      if (this.mode === playMode.sequence) {
        return 'icon-music-shunxu'
      } else if (this.mode === playMode.loop) {
        return 'icon-music-danqu1'
      } else {
        return 'icon-music-random'
      }
    },
    playIcon() {
      return this.playing ? 'icon-pause-detail' : 'icon-playdetail'
    },
    cdCls() {
      return this.playing ? 'play' : 'play pause'
    },
    triggerCls() {
      return this.playing ? '' : 'pause'
    },
    //进度条比例
    percent() {
      return this.currentTime / this.currentSong.duration
    },
    ...mapGetters([
      'fullScreen',
      'playlist',
      'currentSong',
      'playing',
      'currentIndex',
      'mode',
      'sequenceList',
    ])
  },
  methods: {
    //--------------------dom切换区------------
    back() {
      this.setFullScreen(false)
    },
    open() {
      this.setFullScreen(true)
    },
    changeMiddle () {
      if (this.currentShow === 'cd') {
        this.currentShow = 'lyric'
      } else {
        this.currentShow = 'cd'
      }
    },
    //------------------播放器函数区-----------
    ready() {
      this.songReady = true
    },
    end() {
      if (this.mode === playMode.loop) {
        this.loop()
      } else {
        this.next()
      }
    },
    error() {
      this.songReady = true
    },
    updateTime(e) {
      this.currentTime = e.target.currentTime
    },
    //将currentTime处理为播放时间格式
    format (interval) {
      interval = interval | 0
      let minute = interval / 60 | 0
      let second = interval % 60
      if (second < 10) {
        second = '0' + second
      }
      return minute + ':' + second
    },
    //-----------------底部播放功能函数区-----------
    next() {
      if (!this.songReady) {
        return
      }
      if (this.playlist.length === 1) {
        this.loop()
        return
      }else{
        let index = this.currentIndex + 1
        if (index === this.playlist.length) {
          index = 0
        }
        this.setCurrentIndex(index)
        if (!this.playing) {
          this.togglePlaying()
        }
      }
      this.songReady = false
    },
    prev() {
      if (!this.songReady) {
        return
      }
      if (this.playlist.length === 1) {
        this.loop()
        return
      } else {
        let index = this.currentIndex - 1
        if (index === -1) {
          index = this.playlist.length - 1
        }
        this.setCurrentIndex(index)
        if (!this.playing) {
          this.togglePlaying()
        }
      }
      this.songReady = false
    },
    loop () {
      this.$refs.audio.currentTime = 0
      this.$refs.audio.play()
      if (this.currentLyric) {
        this.currentLyric.seek()
      }
    },
    //播放暂停切换
    togglePlaying() {
      const audio = this.$refs.audio
      this.setPlayingState(!this.playing) 
      this.playing ? audio.play() : audio.pause()
      if (this.currentLyric) {
        this.currentLyric.togglePlay()
      }
    },
    changeMode () {
      const mode = (this.mode + 1) % 3
      this.setPlayMode(mode)
      let list = null
      if (mode === playMode.random) {
        list = shuffle(this.sequenceList)
      } else {
        list = this.sequenceList
      }
      this._resetCurrentIndex(list)
      this.setPlaylist(list)
    },
    //调整歌曲索引确保随机播放歌曲与索引一致
    _resetCurrentIndex (list) {
      let index = list.findIndex((item) => {
        return item.id === this.currentSong.id
      })
      this.setCurrentIndex(index)
    },
    //根据传递的进度条百分比改变歌曲时间
    progressBarChange(percent) {
      const currentTime = this.currentSong.duration * percent
      this.$refs.audio.currentTime = currentTime
      if (!this.playing) {
        this.togglePlaying()
      }
      if (this.currentLyric) {
        this.currentLyric.seek(currentTime * 1000)
      }
    },
    //--------------------数据处理区----------------------
    _getSong (mid) {
      getSong(mid).then((res) => {
        let mid = res.data.items[0].songmid
        let vkey = res.data.items[0].vkey
        this.url = `http://dl.stream.qqmusic.qq.com/C400${mid}.m4a?vkey=${vkey}&guid=3408634430&uin=0&fromtag=66`
        // console.log(this.url)
      })
    },
    _getLyric() {
      this.currentSong.getLyric().then((lyric) => {
        this.currentLyric = new Lyric(lyric, this.handleLyric)
        if (this.playing) {
          this.currentLyric.play()
        }
        console.log(this.currentLyric)
      })
    },
    handleLyric ({lineNum, txt}) {
      this.currentLineNum = lineNum
      if (lineNum > 5) {
        let lineEl = this.$refs.lyricLine[lineNum - 5]
        this.scroll.scrollToElement(lineEl, 1000)
      } else {
        this.scroll.scrollTo(0, 0, 1000)
      }
    },
    ...mapMutations({
      setFullScreen: 'SET_FULL_SCREEN',
      setPlayingState: 'SET_PLAYING_STATE',
      setCurrentIndex: 'SET_CURRENT_INDEX',
      setPlayMode: 'SET_PLAY_MODE',
      setPlaylist: 'SET_PLAYLIST'
    })
  },
  watch: {
    currentSong(newVal, oldVal) {
      if (!newVal.id) {
        return
      }
      if (newVal.id === oldVal.id) {
        return
      }
      if (this.currentLyric) {
        this.currentLyric.stop()
      }
      this._getSong(newVal.mid)
      this._getLyric()
    },
    url (newUrl) {
      this.$refs.audio.src = newUrl
      console.log(this.$refs.audio.src)
    }
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
          &.fade-enter-to, &.fade-leave-to
            transition: opacity 1s
          &.fade-enter, &.fade-leave-to
            opacity: 0
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
              .trigger.pause
                transform: translate3d(-16px,0,0) rotateZ(-30deg)
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
                &.play
                  animation: rotate 20s linear infinite
                &.pause
                  animation-play-state: paused
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
        .lyriclist
          position:absolute
          top:10vh
          left:0
          bottom:20vh
          right:0
          overflow: hidden
          &.fade-enter-to, &.fade-leave-to
            transition: opacity 0.3s
          &.fade-enter, &.fade-leave-to
            opacity: 0
          .lyric-wrapper
            width: 80%
            margin: 0 auto
            overflow: hidden
            text-align: center
            .text
              line-height: 32px
              color: $color-text
              font-size: $font-size-medium
              &.current
                color: $color-text-l
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
              color: $color-text-l
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
              .icon-music-shunxu,.menu
                font-size: 20px
              .icon-music-danqu1
                font-size: 18px
              .icon-music-random
                font-size: 22px
              .playPause
                font-size: 40px
      &.normal-enter-to,&.normal-leave-to
        transition: all 0.3s
      &.normal-enter
        transform:translate3d(0,100%,0)
        opacity: 0
      &.normal-leave-to
        transform:translate3d(100%,0,0)
        opacity: 0
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
        .icon-mini
          font-size: 32px
          position: absolute
          left: 0
          top: 0
  @keyframes rotate
    0%
      transform: rotate(0)
    100%
      transform: rotate(360deg)
</style>

