<template>
  <div id="app">
    <MHeader/>
    <tab/>
    <keep-alive>
      <router-view/>
    </keep-alive>
    <player/>
  </div>
</template>

<script>
import MHeader from 'components/m-header'
import Tab from 'components/tab'
import Player from 'components/player'
export default {
  components: {
    MHeader, Tab, Player
  }
}
</script>

<style lang="stylus">
@import './common/stylus/variable.styl'

#app
  color: $color-theme
</style>
