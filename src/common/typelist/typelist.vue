<template>
	<div class="typelist border-bottom" :style="{height: `${height}px`}">	
		<i class="icons" :class="iconInfo" :style="{color: color}"></i>
    <span class="name">{{name}}</span>
    <span class="count" v-show="showflag">({{count}})</span>
    <span class="des">{{des}}</span>
	</div>
</template>
<script>
	export default {
		props: {
      height: {
				type: String,
				default: ''
      },
      color: {
				type: String,
				default: ''
      },
			name: {
				type: String,
				default: ''
      },
      count: {
        type: Number,
        default: 0
      },
      des: {
        type: String,
        default: ''
			},
			iconinfo: {
				type: String
      },
      showflag: {
        type: Boolean,
        default: false
      }
    },
    data () {
			return {
				iconInfo: ''
			}
    },
		created () {
			this.iconInfo = this.iconinfo
		}
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~assets/stylus/variable"
  .border-bottom
    &:before
      border-color: $border_1px
  
	.typelist
    display : flex
    align-items: center
    width: 100%
    .icons
      font-size:$font-size-large-x
      padding:0 15px
    .name
      font-size:$font-size-large
      color: $color-text
    .count
      color:$color-text-g
      font-size: $font-size-medium-x
    .des
      position: absolute
      right: 0
      padding-right: 20px
</style>
