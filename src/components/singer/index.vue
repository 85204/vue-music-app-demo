<template>
  <div class="singer" ref="singer">
    <listview :data="singerList" @select="selectSinger" />
    <router-view/>
  </div>
</template>
<script>
import { getSingerList } from 'api/singer'
import { ERR_OK } from 'api/config'
import Singer from 'common/js/singer'
import listview from 'base/listview'
import { mapMutations } from 'vuex'
import { playListMixin } from 'common/js/mixin'

const HOT_NAME = '热门'
const HOT_SINGER_LENGTH = 10
export default {
  data() {
    return {
      singerList: []
    }
  },
  components: {
    listview
  },
  created() {
    this._getSingerList()
  },
  methods: {
    selectSinger(item) {
      this.$router.push({
        path: `/singer/${item.id}`
      })
      this.setSinger(item)
    },
    handlePlaylist(list) {
      const bottom = list.length > 0 ? '60px' : ''
      this.$refs.singer.style.bottom = bottom
      // this.$refs.listview.refresh()
    },
    _getSingerList() {
      getSingerList().then((res) => {
        if (res.code === ERR_OK) {
          this.singerList = this._normalizeSinger(res.data.list)
        }
      })
    },
    _normalizeSinger(list) {
      let map = []
      let hot = []
      list.forEach((item, index) => {
        if (index < HOT_SINGER_LENGTH) {
          hot.push(new Singer({
            id: item.Fsinger_mid,
            name: item.Fsinger_name
          }))
        }

        let key = map.findIndex(v => v.title === item.Findex)
        if (key < 0) {
          map.push({
            title: item.Findex,
            items: []
          })
          key = map.length - 1
        }
        map[key].items.push(new Singer({
          id: item.Fsinger_mid,
          name: item.Fsinger_name
        }))
      })

      map.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0)
      })

      map.unshift({
        title: HOT_NAME,
        items: hot
      })
      return map
    },
    ...mapMutations({
      setSinger: 'SET_SINGER'
    })
  },
  mixins: [playListMixin]
}
</script>
<style lang="stylus">
.singer
  position: fixed
  top: 88px
  bottom: 0
  width: 100%
</style>
