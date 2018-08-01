import {mapGetters, mapMutations} from 'vuex'
import {playMode} from 'common/js/config'
import {shuffle} from 'common/js/util'

//播放模式切换功能封装
export const playerMixin = {
  computed: {
    iconMode() {
      if (this.mode === playMode.sequence) {
        return 'icon-music-shunxu'
      } else if (this.mode === playMode.loop) {
        return 'icon-music-danqu1'
      } else {
        return 'icon-music-random'
      }
    },
    ...mapGetters([
      'sequenceList',
      'currentSong',
      'playlist',
      'mode'
    ])
  },
  methods: {
    changeMode () {
      const mode = (this.mode + 1) % 3
      this.setPlayMode(mode)
      let list = null
      if (mode === playMode.random) {
        list = shuffle(this.sequenceList)
      } else {
        list = this.sequenceList
      }
      this._resetCurrentIndex(list)
      this.setPlaylist(list)
    },
    //调整歌曲索引确保随机播放歌曲与索引一致
    _resetCurrentIndex (list) {
      let index = list.findIndex((item) => {
        return item.id === this.currentSong.id
      })
      this.setCurrentIndex(index)
    },
    ...mapMutations({
      setCurrentIndex: 'SET_CURRENT_INDEX',
      setPlayMode: 'SET_PLAY_MODE',
      setPlaylist: 'SET_PLAYLIST',
      setPlayingState: 'SET_PLAYING_STATE',
    })
  }
}