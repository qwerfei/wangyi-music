//将创建的歌曲对象进行封装
export default class Song {
  constructor({id, mid, singer, name, album, duration, image}) {
    this.id = id
    this.mid = mid
    this.singer = singer
    this.name = name
    this.album = album
    this.duration = duration
    this.image = image
  }
}

export function createSong(musicData) {
    return new Song({
      id: musicData.songid,
      mid: musicData.songmid,
      singer: filterSinger(musicData.singer),
      name: musicData.songname,
      album: musicData.albumname,
      duration: musicData.interval,
      image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
    })
  }
  
  function filterSinger(singer) {
    let ret = []
    if (!singer) {
      return ''
    }
    singer.forEach((item) => {
      ret.push(item.name)
    })
    return ret.join('/')
  }