<template>
  <div class="list" ref="warpper">
    <div>
      <ul>
        <li class="item"
            v-for="item in discList"
            :key="item.dissid"
            @click="selectRecommend(item)">
          <div class="icon">
            <span class="icon-top">
              <i class="icon icon-erji"></i>
              {{Math.floor(item.listennum / 10000) }}万
            </span>
            <img v-lazy="item.imgurl">
          </div>
          <div class="text">
            <p class="desc">{{ item.dissname }}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {getRecommendList} from 'api/recommend'
import {ERR_OK} from 'common/js/api'
import {mapMutations} from 'vuex'
export default {
  name: 'RecommendList',
  data() {
    return {
      discList: []
    }
  },
  created() {
    this._getRecommendList()
  },
  methods: {
    _getRecommendList() {
      getRecommendList().then((res) => {
        if (res.code === ERR_OK) {
          this.discList = res.data.list
          console.log(res.data.list)
        }
      })
    },
    //推荐歌单歌曲详情跳转
    selectRecommend(item) {
      this.$router.push({
        path: `./recommend/${item.dissid}`
      })
      this.setRecommend(item)
    },
    ...mapMutations({
      setRecommend: 'SET_RECOMMEND'
    })
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import "~assets/stylus/variable"
  ul
    li
      display: inline-block
      box-sizing: border-box
      width: 33%
      padding: 0 1%
      .icon
        position: relative
        // width: 100%
        margin-bottom: 5px
        .icon-top
          display: block
          position: absolute
          top: 0
          left: 0
          right: 0
          height: 18px
          line-height: 18px
          color: $color-theme-l
          font-size: $font-size-small
          text-align: right
          padding: 0 4px
        img
          width: 100%
          height: 100%
          border-radius: 3px
      .text
        float: left
        text-align: left
        height: 40px
        line-height: 16px
        overflow: hidden
        margin-bottom: 10px
        font-size: $font-size-small
</style>