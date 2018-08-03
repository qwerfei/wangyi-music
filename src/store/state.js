import {playMode} from 'common/js/config'
import {loadSearch, loadPlay, loadFavorite} from 'common/js/cache'

const state = {
  // 歌单歌曲数据
  recommend: {},
  // 歌手歌曲数据
  singer: {},
  // 排行榜歌曲数据
  rank: {},
  // 播放器开始暂停状态
  playing: false,
  // 播放器展开缩小状态
  fullScreen: false,
  // 播放列表
  playlist: [],
  // 歌曲默认顺序列表
  sequenceList: [],
  // 播放模式
  mode: playMode.sequence,
  // 当前播放索引
  currentIndex: -1,
  // 搜索历史列表
  searchHistory: loadSearch(),
  //播放历史列表
  playHistory: loadPlay(),
  //我的收藏列表
  favoriteList: loadFavorite()
}
  
export default state