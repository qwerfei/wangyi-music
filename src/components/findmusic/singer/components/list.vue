<template>
  <div  class="singerlist"
        ref="singerlist">
    <ul>
      <li class="list-group"
          v-for="(group, key) in singers"
          :key="key"
          :ref="group.title.substr(0, 1)">
        <h2 class="list-group-title">{{group.title}}</h2>
        <ul>
          <li class="list-group-item border-bottom"
              v-for="item in group.singerlist"
              :key="item.id"
              @click="selectSinger(item)">
            <img class="avatar" v-lazy="item.avatar">
            <span class="name">{{item.name}}</span>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
import Bscroll from 'better-scroll'
import {mapMutations} from 'vuex'
export default {
  props: {
    singers: {
      type: Array,
      default: []
    },
    letter: {
      type: String
    }
  },
  mounted() {
    this.scroll = new Bscroll(this.$refs.singerlist, {click: true})
  },
  methods: {
    //歌手歌曲详情列表跳转
    selectSinger(singer) {
      this.$router.push({
        path: `./singer/${singer.id}`
      })
      this.setSinger(singer)
    },
    ...mapMutations({
      setSinger: 'SET_SINGER'
    })
  },
  watch: {
    letter () {
      if (this.letter) {
        // console.log(this.letter)
        const element = this.$refs[this.letter][0]
        // console.log(element)
        this.scroll.scrollToElement(element)
        //点击后自动触发touchmove事件执行懒加载效果
        const event = document.createEvent('Events')
        event.initEvent('touchmove', true)
        this.$refs.singerlist.dispatchEvent(event)
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import "~assets/stylus/variable"
  .border-bottom
    &:before
      border-color: $border_1px
  .singerlist
    width: 100%
    height: 100%
    overflow: hidden
    background: $color-background
    .list-group
      .list-group-title
        height: 30px
        line-height: 30px
        padding-left: 12px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-background-d
      .list-group-item
        display: flex
        align-items: center
        padding: 5px 0
        margin: 0 5px
        .avatar
          width: 50px
          height: 50px
          border-radius: 3px
        .name
          margin-left: 20px
          color: $color-text
          font-size: $font-size-medium
</style>