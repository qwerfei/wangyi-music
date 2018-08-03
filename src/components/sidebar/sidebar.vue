<template>
  <div class="sidebar" >
		<transition name="fade">
			<div class="menu-mask" v-show="showFlag" @click="hide"></div>
		</transition>	
    <transition name="side">
			<div class="menu-content" v-show="showFlag">
				<div class="menu-detail">
					<div class="menu-userInfo">
						<img class="avatar" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1533297571154&di=06ed11a9fdb7f93e68da3783316b0255&imgtype=0&src=http%3A%2F%2Fa.hiphotos.baidu.com%2Fzhidao%2Fwh%253D680%252C800%2Fsign%3D31821732da1373f0f56a67999c3f67c3%2Fdc54564e9258d109531f26fbda58ccbf6d814dff.jpg">
						<div class="user-detail">
							<span class="name">野原新之助</span>
              <span class="progress">Lv.7</span>
						</div>
						<span class="sign"><i class="icon-coin"></i>签到</span>
					</div>
				</div>
				<div class="content">
          <type-list name="我的消息" height="40" iconinfo="icon-message"></type-list>
          <type-list name="我的会员" height="40" iconinfo="icon-vip"></type-list>
          <type-list name="商城" height="40" iconinfo="icon-market"></type-list>
          <span class="split"></span>
          <type-list name="我的好友" height="40" iconinfo="icon-friend"></type-list>
          <type-list name="附近的人" height="40" iconinfo="icon-place"></type-list>
          <type-list name="个性换肤" height="40" iconinfo="icon-theme" des="官方红"></type-list>
          <span class="split"></span>
          <type-list name="定时播放" height="40" iconinfo="icon-set-time"></type-list>
          <type-list name="音乐闹钟" height="40" iconinfo="icon-lock"></type-list>
          <type-list name="驾驶模式" height="40" iconinfo="icon-car"></type-list>
          <type-list name="音乐云盘" height="40" iconinfo="icon-cloud"></type-list>
				</div>
				<div class="footer border-top">
					<div class="nightmode">
						<i class="icon-night"></i>
						<span>夜间模式</span>
					</div>
					<div class="setting">
						<i class="icon-setting"></i>
						<span>设置</span>
					</div>
					<div class="exit">
						<i class="icon-exit"></i>
						<span>退出</span>
					</div>
				</div>
			</div>
		</transition>
  </div>
</template>

<script>
import typeList from 'common/typelist/typelist'
export default {
  components: {
    typeList
  },
  data() {
    return {
      showFlag: false,
    }
  },
  methods: {
    show() {
      this.showFlag = true
    },
    hide() {
      this.showFlag = false
    },
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~assets/stylus/variable"
  @import "~assets/stylus/mixin"
  .border-top
    &:before
      border-color: $border_1px

  .sidebar
    .menu-mask
      position:fixed
      top:0
      left:0
      bottom:0
      right:0
      opacity: 1
      z-index:10
      background-color: $color-background-d
      transfrom:translateZ(0)
      &.fade-enter-to, &.fade-leave-to
        transition: opacity 0.3s
      &.fade-enter, &.fade-leave-to
        opacity: 0
    .menu-content
      position:fixed
      width:286px
      height:100%	
      top:0
      left:0
      bottom:0
      z-index:11
      // overflow-y:auto
      background:#fff
      // -webkit-overflow-scrolling:touch				
      &.side-enter-to, &.side-leave-to
        transition: transform 0.3s
      &.side-enter, &.side-leave-to
        transform:translate3d(-286px,0,0)
      .menu-userInfo
        box-sizing:border-box
        width:100%
        height:168px
        background-image: url('https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1533298291030&di=e8b84c623180027430270ff9d639c74a&imgtype=0&src=http%3A%2F%2Fpic.xiudodo.com%2Ffigure%2F00%2F00%2F33%2F16%2F73%2F1655bda6abbcd26.jpg')
        background-size: cover	
        position:relative
        padding:50px 15px 15px 15px
        .avatar
          position:absolute
          bottom:50px
          left:15px
          width: 56px
          height: 56px
          border-radius:50%
        .user-detail
          position:absolute
          bottom:20px
          left:15px
          font-size:0
          .name
            display:inline-block
            font-size:16px
            font-weight:500
            color:#fff
            vertical-align:middle
            max-width:130px
            no-wrap()
          .progress
            font-size:8px
            padding:1px 4px 
            border-radius:8px
            color:#fff
            font-weight:400
            border:1px solid #fff
            margin-left:6px
            vertical-align:middle
        .sign
          display:inline-block
          height:14px
          line-height:14px
          position:absolute
          bottom:15px
          font-size:12px
          right:15px
          padding:4px 8px
          border:1px solid #e1e1e1
          border-radius:12px
          color:#fff
          i
            margin-right:5px	
      .content
        .split
          display:block
          width:100%
          height: 5px
          background:#ccc
          border:none
      .footer
        position: absolute
        bottom: 0
        width: 100%
        height: 40px
        display: flex
        align-items: center
        justify-content: space-around
        div
          width: 33%
          text-align:center
</style>

