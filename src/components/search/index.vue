<template>
  <div class="search">
    <div class="search-box-wrapper">
      <search-box ref="searchBox" @query="onQueryChange"></search-box>
    </div>
    <div ref="shortcutWrapper" class="shortcut-wrapper" v-show="!query">
      <scroll :refreshDelay="refreshDelay" ref="shortcut" class="shortcut" :data="shortcut">
        <div>
          <div class="hot-key">
            <h1 class="title">热门搜索</h1>
            <ul>
              <li class="item" v-for="item in hotKey" @click="addQuery(item.k)" :key="item.k">
                <span>{{item.k}}</span>
              </li>
            </ul>
          </div>
          <!-- <div class="search-history" v-show="searchHistory.length">
            <h1 class="title">
              <span class="text">搜索历史</span>
              <span @click="showConfirm" class="clear">
                <i class="icon-clear"></i>
              </span>
            </h1>
            <search-list @delete="deleteSearchHistory" @select="addQuery" :searches="searchHistory"></search-list>
          </div> -->
        </div>
      </scroll>
    </div>
    <div class="search-result" v-show="query" ref="searchResult">
      <suggest ref="suggest" :query="query" @listScroll="blurInput" @select="saveSearch"></suggest>
    </div>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
import SearchBox from 'base/search-box'
import Scroll from 'base/scroll'
import suggest from 'components/suggest'
import { getHotKey } from 'api/search'
import { playListMixin } from 'common/js/mixin'
import { mapActions } from 'vuex'
import { ERR_OK } from 'api/config'

export default {
  mixins: [playListMixin],
  data() {
    return {
      hotKey: [],
      query: ''
    }
  },
  computed: {
    shortcut() {
      return this.hotKey.concat(this.searchHistory)
    }
  },
  created() {
    this._getHotKey()
  },
  methods: {
    // handlePlaylist(playlist) {
    //   const bottom = playlist.length > 0 ? '60px' : ''

    //   this.$refs.searchResult.style.bottom = bottom
    //   this.$refs.suggest.refresh()

    //   this.$refs.shortcutWrapper.style.bottom = bottom
    //   this.$refs.shortcut.refresh()
    // },
    // showConfirm() {
    //   this.$refs.confirm.show()
    // },
    saveSearch() {
      this.saveSearchHistory(this.query)
    },
    blurInput() {
      this.$refs.searchBox.blur()
    },
    addQuery(k) {
      this.query = k
      this.$refs.searchBox.setQuery(k)
    },
    onQueryChange(newQuery) {
      this.query = newQuery
    },
    _getHotKey() {
      getHotKey().then((res) => {
        if (res.code === ERR_OK) {
          this.hotKey = res.data.hotkey.slice(0, 10)
        }
      })
    },
    ...mapActions([
      'clearSearchHistory',
      'saveSearchHistory'
    ])
  },
  watch: {
    query(newQuery) {
      if (!newQuery) {
        setTimeout(() => {
          this.$refs.shortcut.refresh()
        }, 20)
        // search()
      }
    }
  },
  components: {
    SearchBox,
    Scroll,
    suggest
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable'
@import '~common/stylus/mixin'

.search
  .search-box-wrapper
    margin: 20px
  .shortcut-wrapper
    position: fixed
    top: 178px
    bottom: 0
    width: 100%
    .shortcut
      height: 100%
      overflow: hidden
      .hot-key
        margin: 0 20px 20px 20px
        .title
          margin-bottom: 20px
          font-size: $font-size-medium
          color: $color-text-l
        .item
          display: inline-block
          padding: 5px 10px
          margin: 0 20px 10px 0
          border-radius: 6px
          background: $color-highlight-background
          font-size: $font-size-medium
          color: $color-text-d
      .search-history
        position: relative
        margin: 0 20px
        .title
          display: flex
          align-items: center
          height: 40px
          font-size: $font-size-medium
          color: $color-text-l
          .text
            flex: 1
          .clear
            extend-click()
            .icon-clear
              font-size: $font-size-medium
              color: $color-text-d
  .search-result
    position: fixed
    width: 100%
    top: 178px
    bottom: 0
</style>
