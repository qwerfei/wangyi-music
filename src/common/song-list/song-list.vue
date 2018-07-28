<template>
  <div class="song-list">
    <ul>
      <li  class="item border-bottom"
            v-for="(song, index) in songs"
          :key="song.id">
        <span class="count">{{index + 1}}</span>
        <div class="content">
          <h2 class="name">{{song.name}}</h2>
          <p class="desc">{{`${song.singer} - ${song.album}`}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      songs: {
        type: Array,
        default: []
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~assets/stylus/variable"
  @import "~assets/stylus/mixin"
  .border-bottom
    &:before
      border-color: $border_1px
  .song-list
    ul
      .item
        // position: relative
        display: flex
        align-items: center
        box-sizing: border-box
        height: 60px
        .count
          width: 50px
          text-align: center
          color: $color-text-g
        .content
          flex: 1
          line-height: 20px
          overflow: hidden
          .name
            no-wrap()
            color: $color-text
            font-weight : 600
          .desc
            no-wrap()
            color: $color-text-g
            font-size: $font-size-small
</style>