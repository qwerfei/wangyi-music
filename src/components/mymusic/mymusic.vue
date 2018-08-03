<template>
  <div class="mymusic">
    <type-list name="我的音乐"
               height="50"
               color="red"
               iconinfo="icon-music">
    </type-list>
		<type-list name="我的电台" 
               height="50"
               color="red"
               iconinfo="icon-diantai">
    </type-list>
    <router-link to="/history">
      <type-list name="最近播放" 
                 height="50"
                 color="red"
                 iconinfo="icon-zuijinplay"
                 :count="this.playHistory.length"
                 :showflag="true">
      </type-list>
    </router-link>
    <router-link to="/like">
		  <type-list name="我的收藏"
                 height="50"
                 color="red"
                 iconinfo="icon-collect"
                 :count="this.favoriteList.length"
                 :showflag="true">
      </type-list>
    </router-link>
    <router-view></router-view>
  </div>
</template>

<script>
import typeList from 'common/typelist/typelist'
import {mapGetters} from 'vuex'

export default {
  components: {
    typeList
  },
  computed: {
    ...mapGetters([
      'favoriteList',
      'playHistory'
    ])
  }

}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>