<template>
  <div class="recommend-icon">
  	<div class="div-icon">
  		<i class="icon-type icon-fm"></i>
  		<p class="title">私人FM</p>
  	</div>
  	<div class="div-icon">
  		<i class="icon-type icon-date"></i>
  		<p class="title">每日听歌推荐</p>
  	</div>
  	<div class="div-icon">
  		<i class="icon-type icon-rank-list"></i>
  		<p class="title">云音乐热歌榜</p>
  	</div>
  </div>
</template>

<script>
export default {
  name: 'RecommendIcon',

}
</script>

<style lang="stylus" scoped>
@import "~assets/stylus/variable"
.recommend-icon
  width:100%
  height:100px
  display:flex
  align-items:center
  .div-icon
    flex:1
    height:100%
    display:flex
    flex-direction: column
    justify-content: center
    align-items: center
    .icon-type
      color:$color-text-l
      background :$color-theme
      font-size:30px
      width:50px
      height:50px
      line-height:50px
      text-align:center
      border:1px solid $color-theme
      border-radius:50%
    .title
      margin-top:5px
</style>