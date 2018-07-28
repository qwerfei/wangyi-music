<template>
  <div class="wrapper">
    <swiper :options="swiperOption" v-if="showSwiper">
      <swiper-slide v-for="item in swiperList" :key="item.id">
        <img class="swiper-img" :src="item.picUrl" />
      </swiper-slide>
      <div class="swiper-pagination"  slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
import {getSwiper} from 'api/recommend'
import {ERR_OK} from 'common/js/api'
export default {
  name: 'RecommendSwiper',
  data () {
    return {
      swiperOption: {
        pagination: '.swiper-pagination',
        autoplay: 3000,
        autoplayDisableOnInteraction: false,
        loop: true 
      },
      swiperList:[]
    }
  },
  mounted() {
    this._getSwiper()
  },
  methods: {
    _getSwiper() {
      getSwiper().then((res) => {
        if (res.code === ERR_OK) {
          this.swiperList = res.data.slider
          console.log(this.swiperList)
        }
      })
    }
  },
  computed: {
    // 轮播显示初始图
    showSwiper () {
      return this.swiperList.length
    }
  }
}
</script>

<style lang="stylus" scoped>
@import "~assets/stylus/variable"
  /*轮播标注页码样式穿透*/
  .wrapper >>> .swiper-pagination-bullet-active
    width:14px
    border-radius: 4px
    background:$primarycolor
  /*图片宽高自适应防抖动*/
  .wrapper
    overflow: hidden
    width: 96%;
    height: 0
    /*height: 40vm*/
    padding-bottom: 40%
    margin: 0 auto
    border-radius: 5px
    .swiper-img
      width: 100%
</style>
