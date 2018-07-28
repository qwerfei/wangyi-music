<template>
  <div class="recommend" ref="warpper">
    <div class="recommend-content">
      <div class="decorate"></div>
      <recommend-swiper></recommend-swiper>
      <recommend-icon></recommend-icon>
      <recommend-title></recommend-title>
      <recommend-list></recommend-list>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import Bscroll from 'better-scroll'
import RecommendSwiper from './components/swiper.vue'
import RecommendIcon from './components/icon.vue'
import RecommendTitle from './components/title.vue'
import RecommendList from './components/list.vue'

export default {
  name: 'Recommend',
  components: {
    RecommendSwiper,
    RecommendIcon,
    RecommendTitle,
    RecommendList
  },
  mounted() {
    this.scroll = new Bscroll(this.$refs.warpper, {click: true})
  },
  methods: {
    
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~assets/stylus/variable"
 .recommend 
  width: 100%
  height: 100%
  overflow: hidden
  .recommend-content
    .decorate 
      position: absolute
      top: -30vh
      z-index: -10
      background: $color-theme
      width: 100%
      height : 48vh
</style>
