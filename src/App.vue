<template>
  <div id="app"  @touchmove.prevent>
    <m-header></m-header>
    <player></player> 
  </div>
</template>

<script>
import MHeader from 'components/m-header/m-header.vue'
import Player from 'components/player/player.vue'

export default {
  name: 'App',
  components: {
    MHeader,
    Player
  },
}
</script>

<style>
</style>
