<template>
  <transition name="move">
    <div class="singer-detail" @click="$router.back()">
      <router-view class="router" />
    </div>
  </transition>
</template>
<script>
// import listview from 'base/listview'
export default {
  methods: {
  }
}
</script>
<style lang="stylus">
.singer-detail
  position: fixed
  top: 0
  left: 0
  height: 100%
  width: 100%
  background: #000
  z-index: 100
  transform: translate3d(0, 0, 0)
  &.move-enter-active, &.move-leave-active
    transition: all 0.2s
  &.move-enter, &.move-leave-to
    transform: translate3d(100%, 0, 0)
</style>
