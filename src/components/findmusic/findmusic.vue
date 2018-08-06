<template>
  <div class="findmusic">
    <div class="tab">
        <router-link class="menu-list" tag="div" to="/findmusic/recommend">
          <span class="menu-list-div">个性推荐</span>
        </router-link>
        <router-link class="menu-list" tag="div" to="/findmusic/singer">
          <span class="menu-list-div">歌手</span>
        </router-link>
        <router-link class="menu-list" tag="div" to="/findmusic/rank">
          <span class="menu-list-div">排行</span>
        </router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus" scoped>
@import "~assets/stylus/variable"
.findmusic
    position: fixed
    width: 100%
    top: 50px
    bottom: 0
    .tab
      display:flex
      width:100%
      height:45px
      line-height:45px
      background:$color-theme
      .menu-list
        flex: 1
        color:$color-text-lm
        text-align:center
        cursor:pointer
        font-size:$font-size-medium
        &.router-link-active
          span 
            font-weight: bold;
            color: $color-text-l;
            padding-bottom : 5px
            border-bottom: 2px solid $color-text-l
</style>