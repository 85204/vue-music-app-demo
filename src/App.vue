<template>
  <div id="app">
    <MHeader/>
    <tab/>
    <keep-alive>
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
import MHeader from 'components/m-header'
import Tab from 'components/tab'
export default {
  components: {
    MHeader, Tab
  }
}
</script>

<style lang="stylus">
@import './common/stylus/variable.styl'

#app
  color: $color-theme
</style>
