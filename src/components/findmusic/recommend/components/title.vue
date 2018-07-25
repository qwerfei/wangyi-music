<template>
	<div class="title">
		<span class="name">推荐歌单</span>
		<i class="icon icon-right"></i>
	</div>
</template>

<script>
export default {
  name: 'RecommendTitle',
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import "~assets/stylus/variable"
	.title
		box-sizing:border-box
		height:40px
		line-height:40px
		position:relative
		.name
			display:inline-block
			vertical-align:center
			height:18px
			line-height:18px
			position:relative
			color:$color-text
			padding-left:15px
			&:before
				content:''
				position:absolute
				top:0
				left:4px
				height:100%
				width:4px
				background:$color-theme
		.icon
			display:inline-block
			vertical-align:center
</style>