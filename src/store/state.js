import {playMode} from 'common/js/config'

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
  // 播放器弹出框顺序列表
  sequenceList: [],
  // 播放模式
  mode: playMode.sequence,
  // 当前播放索引
  currentIndex: -1,
}
  
export default state