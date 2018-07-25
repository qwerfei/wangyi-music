<template>
  <div class="header">
    <div class="header-wrapper">
      <i class="icons icon-menu"></i>
      <div class="centermenu">
        <router-link tag="i" to="/mymusic">
          <i class="music icon-music"></i>
        </router-link>
        <router-link tag="i" to="/findmusic">
          <i class="find icon-wangyi"></i>
        </router-link>
        <router-link tag="i" to="/community">
          <i class="community icon-community"></i>
        </router-link>
      </div>
      <i class="icons icon-search music"></i>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~assets/stylus/variable.styl"
  .header
    position:relative
    top:0
    left:0
    right:0
    height :50px
    .header-wrapper
      display : flex
      justify-content:space-between
      align-items: center
      height: 50px
      line-height : 50px
      width: 100%
      background: $color-theme
      .icons
        color:$color-text-l
        font-size:$font-size-large-x
        padding:0 15px
      .centermenu
        font-size:$font-size-large-x
        color:$color-text-ggg
        // width : 30%
        // display : flex
        // justify-content:space-between
        i
          margin:0 5px
          &.router-link-active
            i
              color:$color-text-l
          &.music
            font-size:$font-size-large-l
</style>
