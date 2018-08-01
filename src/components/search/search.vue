<template>
  <transition name="search">
    <div class="search" ref="searchWrapper">
      <div class="search-box-wrapper">
        <i class="icon-back" @click="back"></i>
        <search-box ref="searchBox" @query="onQueryChange"></search-box>
      </div>
      <div ref="shortcutWrapper" class="shortcut-wrapper" v-show="!query">
        <div ref="shortcut" class="shortcut">
          <div class="hot-key">
            <h1 class="title">热门搜索</h1>
              <span class="item border"
                  @click="addQuery(item.k)"
                  v-for="item in hotKey" 
                  :key="item.n">
                {{item.k}}
              </span>
          </div>
          <div class="search-history" v-show="searchHistory.length">
            <h1 class="title">
              <span class="text">搜索历史</span>
              <span class="clear" @click="showConfirm">
                <i class="icon-delete"></i>
              </span>
            </h1>
            <search-list :searches="searchHistory"
                         @select="addQuery"
                         @delete="deleteSearchHistory">
            </search-list>
          </div>
        </div>
      </div>
      <div class="search-result" v-show="query">
        <suggest :query="query" @select="saveSearch"></suggest>
      </div>
      <confirm ref="confirm" 
               @confirm="clearSearchHistory"
               text="是否清空搜索历史">
      </confirm>
      <router-view></router-view>
    </div>
  </transition>
</template>

<script>
import {getHotKey} from 'api/search'
import SearchBox from 'common/search-box/search-box'
import SearchList from 'common/search-list/search-list'
import Suggest from 'components/suggest/suggest'
import Confirm from 'common/confirm/confirm'
import {ERR_OK} from 'common/js/api'
import {mapActions, mapGetters } from 'vuex'

export default {
  components: {
    SearchBox,
    Suggest,
    SearchList,
    Confirm
  },
  data() {
    return {
      hotKey: [],
      query: ''
    }
  },
  mounted() {
    this._getHotKey()
  },
  computed: {
    ...mapGetters([
      'searchHistory'
    ])
  },
  methods: {
    back() {
      this.$router.push('/')
    },
    addQuery (query) {
      this.$refs.searchBox.setQuery(query)
    },
    onQueryChange (query) {
      this.query = query
    },
    saveSearch () {
      this.saveSearchHistory(this.query)
    },
    showConfirm() {
      this.$refs.confirm.show()
    },
    _getHotKey() {
      getHotKey().then((res) => {
        if (res.code === ERR_OK) {
          this.hotKey = res.data.hotkey.slice(0, 10)
          console.log(this.hotKey)
        }
      })
    },
    ...mapActions([
      'saveSearchHistory',
      'deleteSearchHistory',
      'clearSearchHistory'
    ])
  }
}
</script>

<style lang="stylus" scoped>
  @import "~assets/stylus/variable"
  @import "~assets/stylus/mixin"

  .search-enter-active, .search-leave-active
    transition: all 0.3s

  .search-enter, .search-leave-to
    transform: translate3d(50%, 0, 0)
    opacity: 0

  .border
    &:before
      border-color: $border_1px-g
      border-radius: 10px

  .search 
    position: fixed
    z-index: 100
    width: 100%
    top: 0
    left:0
    right:0
    bottom: 0
    background: $color-background
    .search-box-wrapper 
      display: flex
      align-items: center
      padding: 10px 20px
      background: $color-theme
      i
        flex: 0 0 30px
        font-size: 16px
        color: $color-theme-l
    .shortcut-wrapper
      position: fixed
      top: 55px
      bottom: 0
      width: 100%
      .shortcut
        height: 100%
        overflow: hidden
        .hot-key
          margin: 0 20px 20px 20px
          .title
            margin-bottom: 20px
            font-size: $font-size-medium
            color: $color-text-g
          .item
            display: inline-block
            padding: 5px 10px
            margin: 0 20px 10px 0
            font-size: $font-size-medium
            color: $color-text
        .search-history
          position: relative
          margin: 0 20px
          .title
            display: flex
            align-items: center
            font-size: $font-size-medium
            color: $color-text-g
            .text
              flex: 1
            .clear
              extend-click()
              .icon-delete
                font-size: $font-size-large
                color: $color-text
    .search-result
      position: fixed
      width: 100%
      top: 45px
      bottom: 0
</style>


