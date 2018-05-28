<template>
  <div class="music-list">
    <div class="back" @click="$router.back()">
      <i class="icon-back"></i>
    </div>
    <h1 class="title" v-html="title"></h1>
    <div class="image-banner" :style="bgStyle">
      <div class="filter"></div>
    </div>
    <div class="bg-image" :style="bgStyle" ref="bgImage">
      <div class="play-wrapper">
        <div ref="playBtn" v-show="songs.length>0" class="play" @click="random">
          <i class="icon-play"></i>
          <span class="text">随机播放全部</span>
        </div>
      </div>
      <div class="filter" ref="filter"></div>
    </div>
    <div class="bg-layer" ref="layer"></div>
    <scroll :data="songs" @scroll="scroll" :listen-scroll="listenScroll" :probe-type="probeType" class="list" ref="list">
      <div class="song-list-wrapper">
        <song-list :songs="songs" :rank="rank" @select="selectItem"></song-list>
      </div>
      <div v-show="!songs.length" class="loading-container">
        <loading></loading>
      </div>
    </scroll>
  </div>
</template>

<script>
import scroll from 'base/scroll'
import songList from 'base/song-list'
import loading from 'base/loading'
const RESERVE_HEIGHT = 40
export default {
  props: {
    bgImage: {
      type: String,
      default: ''
    },
    songs: {
      type: Array,
      default() { return [] }
    },
    title: {
      type: String,
      default: ''
    },
    rank: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      scrollY: 0
    }
  },
  created() {
    this.probeType = 3
    this.listenScroll = true
  },
  mounted() {
    this.imageHeight = this.$refs.bgImage.clientHeight
    this.$refs.list.$el.style.top = `${this.imageHeight}px`
    this.titleHeight = this.imageHeight - RESERVE_HEIGHT
  },
  computed: {
    bgStyle() {
      return `background-image:url(${this.bgImage})`
    }
  },
  methods: {
    random() {

    },
    scroll(e) {
      this.scrollY = e.y
    }
  },
  components: {
    scroll, songList, loading
  },
  watch: {
    scrollY(newY) {
      if (this.titleHeight + newY >= 0) {
        this.$refs.layer.style.transform = `translate3d(0,${newY}px,0)`
      } else {
        this.$refs.layer.style.transform = `translate3d(0,${-this.titleHeight}px,0)`
      }
      let scale = 1
      const percent = Math.abs(newY / this.imageHeight)
      if (newY > 0) {
        scale = 1 + percent
        this.$refs.layer.style.zIndex = 0
        this.$refs.list.$el.style.zIndex = 0
      } else {
        this.$refs.layer.style.zIndex = 27
        this.$refs.list.$el.style.zIndex = 28
      }
      this.$refs.bgImage.style.transform = `scale(${scale})`
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable'
@import '~common/stylus/mixin'

.music-list
  position: fixed
  z-index: 100
  top: 0
  left: 0
  bottom: 0
  right: 0
  background: $color-background
  .back
    position: absolute
    top: 0
    left: 0
    z-index: 50
    .icon-back
      display: block
      padding: 10px
      font-size: $font-size-large-x
      color: $color-theme
  .title
    position: absolute
    top: 0
    left: 10%
    z-index: 40
    width: 80%
    no-wrap()
    text-align: center
    line-height: 40px
    font-size: $font-size-large
    color: $color-text
  .image-banner
    position: absolute
    top: 0
    z-index: 30
    width: 100%
    height: 40px
    background-size: cover
  .bg-image
    position: relative
    width: 100%
    height: 0
    z-index: 25
    padding-top: 70%
    transform-origin: top
    background-size: cover
    .play-wrapper
      position: absolute
      bottom: 20px
      z-index: 50
      width: 100%
      .play
        box-sizing: border-box
        width: 135px
        padding: 7px 0
        margin: 0 auto
        text-align: center
        border: 1px solid $color-theme
        color: $color-theme
        border-radius: 100px
        font-size: 0
        .icon-play
          display: inline-block
          vertical-align: middle
          margin-right: 6px
          font-size: $font-size-medium-x
        .text
          display: inline-block
          vertical-align: middle
          font-size: $font-size-small
  .image-banner, .bg-image
    .filter
      position: absolute
      top: 0
      left: 0
      width: 100%
      height: 100%
      z-index: 35
      background: rgba(7, 17, 27, 0.4)
  .bg-layer
    position: relative
    height: 100%
    background: $color-background
    z-index: 27
  .list
    position: fixed
    bottom: 0
    width: 100%
    background: $color-background
    z-index: 28
    .song-list-wrapper
      padding: 20px 30px
    .loading-container
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>
