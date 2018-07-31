<template>
  <div class="search-box border-bottom">
    <input ref="query" v-model="query" class="box" :placeholder="placeholder"/>
    <i @click="clear" v-show="query" class="icon-edit"></i>
  </div>
</template>

<script>
  export default {
    props: {
      placeholder: {
        type: String,
        default: '搜索歌曲、歌手'
      }
    },
    data() {
      return {
        query: '',
        timer: null
      }
    },
    methods: {
      clear() {
        this.query = ''
      },
      setQuery(query) {
        this.query = query
      },
    },
    created() {
      //搜索框搜索函数节流
      this.$watch('query', (newQuery) => {
        if (this.timer) {
          clearTimeout(this.timer)
        }
        this.timer = setTimeout(() => {
          this.$emit('query', newQuery)
        }, 200) 
      })
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~assets/stylus/variable"
  .border-bottom
    &:before
      border-color: $border_1px
  .search-box
    display: flex
    align-items: center
    box-sizing: border-box
    width: 100%
    height: 25px
    .box
      flex: 1
      line-height: 25px
      background: $color-theme
      color: $color-text-l
      font-size: $font-size-medium
      border: none
      outline: medium
      &::placeholder
        color: rgba(255, 255, 255, 0.6)
    .icon-edit
      position: absolute
      right: 0
      font-size: 14px
      color: rgba(255, 255, 255, 0.8)
      border: none
</style>