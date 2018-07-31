<template>
  <div ref="suggest" class="suggest">
    <ul class="suggest-list">
      <li class="suggest-item border-bottom"
          @click="selectItem(item)"
          v-for="(item, index) in result"
          :key="index">
        <div class="singer-suggest" v-show="item.type === 'singer'">
          <p class="title">最佳匹配</p>
          <div>
            <img :src="item.imgurl" width="50" height="50">
            <p class="singer">歌手:{{item.singername}}</p>
          </div>
        </div>
        <div class="name" >
          <p class="song" v-html="item.name"></p>
          <p class="singer" v-html="item.singer"></p>
        </div>
      </li>
      <loading v-show="hasMore" title=""></loading>
    </ul>
    <div v-show="!hasMore && !result.length" class="no-result-wrapper">
      抱歉，暂无搜索结果
    </div>
  </div>
</template>

<script>
import Bscroll from 'better-scroll'
import {search} from 'api/search'
import {ERR_OK} from 'common/js/api'
import {createSong} from 'common/js/song'
import Loading from 'common/loading/loading'
import {mapMutations, mapActions} from 'vuex'

export default {
  components: {
    Loading,
  },
  props: {
    showSinger: {
      type: Boolean,
      default: true
    },
    query: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      page: 1,
      result: [],
      hasMore: true
    }
  },
  mounted() {
    this._initScroll()
  },
  methods: {
    _initScroll() {
      this.scroll = new Bscroll(this.$refs.suggest)
      this.scroll.on('scrollEnd', () => {
        if (this.scroll.y <= (this.scroll.maxScrollY + 50)) {
          //滚动到底部重新发送请求实现下拉加载
          this.searchMore()
        }
      })
    },
    search() {
      this.page = 1
      this.hasMore = true
      search(this.query, this.page, this.showSinger,).then((res) => {
        if (res.code === ERR_OK) {
          this.result = this._genResult(res.data)
          this._checkMore(res.data)
          // this.result = res.data
          console.log(this.result)
        }
      })
    },
    searchMore() {
      if (!this.hasMore) {
        return
      }
      this.page++
      search(this.query, this.page, this.showSinger).then((res) => {
        if (res.code === ERR_OK) {
          this.result = this.result.concat(this._normalizeSongs(res.data.song.list))
          this._checkMore(res.data)
          console.log(this.result)
        }
      })
    },
    _checkMore(data) {
      const song = data.song
      if (!song.list.length || (song.curnum + song.curpage * 20) > song.totalnum) {
        this.hasMore = false
      }
    },
    //若搜索结果能直达歌手则数组第一项为歌手
    _genResult(data) {
      let ret = []
      if (data.zhida && data.zhida.singerid) {
        ret.push({...data.zhida, 
                  ...{type: 'singer'},
                  ...{imgurl: `https://y.gtimg.cn/music/photo_new/T001R68x68M000${data.zhida.singermid}.jpg?max_age=2592000`}
                  })
      }
      if (data.song) {
        ret = ret.concat(this._normalizeSongs(data.song.list))
      }
      return ret
    },
    _normalizeSongs(list) {
      let ret = []
      list.forEach((musicData) => {
        if (musicData.albummid) {
          ret.push(createSong(musicData))
        }
      })
      return ret
    },
    selectItem(item) {
      if (item.type === 'singer') {
        const singer = {
          id: item.singermid,
          name: item.singername,
          avatar: `https://y.gtimg.cn/music/photo_new/T001R300x300M000${item.singermid}.jpg?max_age=2592000`
        }
        this.$router.push({
          path: `/search/${singer.id}`
        })
        this.setSinger(singer)
      }else {
        this.insertSong(item)
      }
      this.$emit('select', item)
    },
    ...mapMutations({
      setSinger: 'SET_SINGER'
    }),
    ...mapActions([
      'insertSong'
    ])
  },
  watch: {
    query(newQuery) {
      this.search(newQuery)
    }
  },
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~assets/stylus/variable"
  @import "~assets/stylus/mixin"
  .border-bottom
    &:before
      border-color: $border_1px
  
  .suggest
    height: 100%
    overflow: hidden
    .suggest-list
      .suggest-item
        display: flex
        align-items: center
        padding: 10px 0 10px 30px
      .singer-suggest
        flex: 1
        overflow: hidden
        .title
          padding-bottom: 10px
          color: $color-theme
          no-wrap()
        div
          display: flex
          align-items: center
          .singer
            font-size: $font-size-medium-x
            font-weight: 600
            padding-left: 10px
            no-wrap()
      .name
        flex: 1
        color: $color-text-d
        overflow: hidden
        .song
          font-size: $font-size-medium-x
          font-weight: 600
          no-wrap()
        .singer
          font-size: $font-size-small
          padding-top: 3px
          no-wrap()
    .no-result-wrapper
      position: fixed
      overflow: hidden
      left: 50%
      top: 40vh
      transform: translatex(-50%)
</style>