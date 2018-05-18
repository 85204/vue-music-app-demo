<template>
  <div id="app">
    <MHeader/>
    <router-view/>
  </div>
</template>

<script>
import MHeader from 'components/m-header'
export default {
  components: {
    MHeader
  }
}
</script>

<style lang="stylus">
@import './common/stylus/variable.styl'

#app
  color: $color-theme
</style>
