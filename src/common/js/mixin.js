import { mapGetters } from 'vuex'
export const playListMixin = {
  computed: {
    ...mapGetters([
      'playlist'
    ])
  },
  mounted() {
    this.handlePlaylist(this.playlist)
  },
  activited() {

  },
  watch: {
    playlist(newval) {
      this.handlePlaylist(newval)
    }
  },
  methods: {
    handlePlaylist() {
      throw new Error('component must implement handlePlaylist method')
    }
  }
}
