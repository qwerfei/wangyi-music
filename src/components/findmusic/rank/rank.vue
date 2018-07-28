<template>
  <div class="rank">
    <div class="toplist" ref="toplist">
      <ul>
        <li class="item" 
            v-for="item in topList" 
            :key="item.id"
            @click="selectRank(item)">
          <div class="icon">
            <img v-lazy="item.picUrl"/>
          </div>
          <ul class="songlist">
            <li class="song" v-for="(song,index) in item.songList" :key="index">
              <span>{{index + 1}}</span>
              <span>{{song.songname}}-{{song.singername}}</span>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import Bscroll from 'better-scroll'
import {getTopList} from 'api/rank'
import {ERR_OK} from 'common/js/api'
import {mapMutations} from 'vuex'
export default {
  data() {
    return {
      topList: [] //存放ajax数据
    }
  },
  mounted() {
    this.scroll = new Bscroll(this.$refs.toplist, {click: true})
    this._getTopList()
  },
  methods: {
    _getTopList() {
      getTopList().then((res) => {
        if (res.code === ERR_OK) {
          this.topList = res.data.topList
          console.log(this.topList)
        }
      })
    },
    //排行榜歌曲详情跳转
    selectRank(item) {
      this.$router.push({
        path: `./rank/${item.id}`
      })
      this.setRank(item)
    },
    ...mapMutations({
      setRank: 'SET_RANK'
    })
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~assets/stylus/variable"
  @import "~assets/stylus/mixin"

  .rank
    position: fixed
    top: 95px
    bottom: 0
    width: 100%
    .toplist
      width: 100%
      height: 100%
      overflow: hidden
      .item
        display: flex
        margin: 0 20px
        padding-top: 20px
        height: 100px
        &:last-child
          padding-bottom: 20px
        .icon
          flex: 0 0 100px
          width: 100px
          height: 100px
          img
            width: 100%
        .songlist
          flex: 1
          display: flex
          flex-direction: column
          justify-content: center
          padding: 0 20px
          height: 100px
          overflow: hidden
          background: $color-dialog-background
          color: $color-text-d
          font-size: $font-size-small
          .song
            no-wrap()
            line-height: 26px
</style>