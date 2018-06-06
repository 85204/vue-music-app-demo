<template>
  <transition>
    <music-list :title="title" :bg-image="bgImage" :songs="songs" />
  </transition>
</template>
<script>
import { mapGetters } from 'vuex'
import MusicList from 'components/music-list'
import { getSongList } from 'api/recommend'
import { ERR_OK } from 'api/config'
import { createSong } from 'common/js/song'

export default {
  data() {
    return {
      songs: []
    }
  },
  computed: {
    title() {
      return this.disc.title
    },
    bgImage() {
      return this.disc.cover
    },
    ...mapGetters([
      'disc'
    ])
  },
  created() {
    this._getSongList()
  },
  methods: {
    _getSongList() {
      if (!this.disc.content_id) {
        this.$router.replace('/recommend')
        return
      }
      getSongList(this.disc.content_id).then((v) => {
        if (v.code === ERR_OK) {
          this.songs = this._normalizeSongs(v.cdlist[0].songlist)
        }
      })
    },
    _normalizeSongs(songs) {
      let ret = []
      songs.forEach((item) => {
        if (item.songid && item.albumid) {
          ret.push(createSong(item))
        }
      })
      return ret
    }
  },
  components: {
    MusicList
  }
}
</script>
