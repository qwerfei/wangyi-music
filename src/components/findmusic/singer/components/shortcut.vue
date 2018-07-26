<template>
  <div class="list-shortcut">
    <ul>
      <li class="item"
          :class="{active: index === checkindex}"
          v-for="(item, index) in shortcutList"
          :key="item"
          @click="handleShortcutListClick($event, index)"
          @touchstart.prevent="handleTouchStart"
          @touchmove="handleTouchMove"
          @touchuend="handleTouchEnd"
          :ref="item" >
      {{item}}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    singers: {
      type: Array,
      default: []
    }
  },
  data () {
    return {
      touchStatus: false, // 定义标识位
      startY: 0,
      timer: null,
      checkindex: 0
    }
  },
  // updated存储初始化值，避免执行handleTouchMove时重新获取
  updated () {
    this.startY = this.$refs['热'][0].offsetTop
  },
  computed: {
    shortcutList() {
      return this.singers.map((group) => {
        return group.title.substr(0, 1)
      })
    }
  },
  methods: {
    handleShortcutListClick (event, index) {
      // console.log(event.target.innerText)
      this.$emit('change', event.target.innerText)
      this.toggle(index)
    },
    //颜色切换
    toggle (index) {
      this.checkindex = index
    },
    handleTouchStart () {
      this.touchStatus = true
    },
    handleTouchMove (event) {
      if (this.touchStatus) {
        if (this.timer) {
          clearTimeout(this.timer)
        }
        this.timer = setTimeout(() => {
          const touchY = event.touches[0].clientY - 160
          const index = Math.floor((touchY - this.startY) / 20)
          if (index >= 0 && index < this.shortcutList.length) {
            this.$emit('change', this.shortcutList[index])
            this.toggle(index)
          }
        }, 16)
      }
    },
    handleTouchEnd () {
      this.touchStatus = false
    }
  }, 
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import "~assets/stylus/variable"
  .list-shortcut
    position: absolute
    right: 0
    top: 70px
    display: flex
    flex-direction: column
    justify-content: center
    width: 20px
    padding: 20px 0
    border-radius: 10px
    background: $color-background-d
    font-family: Helvetica
    .item
      line-height: 20px
      text-align: center
      color: $color-text-l
      font-size: $font-size-medium
      &.active
        color: $color-theme
</style>

