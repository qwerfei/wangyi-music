import jsonp from 'common/js/jsonp'
import {commonParams, options} from 'common/js/api'
import axios from 'axios'

//获取轮播图数据
export function getSwiper() {
  const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'

  const data = Object.assign({}, commonParams, {
    platform: 'h5',
    uin: 0,
    needNewCode: 1,
    format: 'jsonp'
  })

  return jsonp(url, data, options)
}

//获取推荐歌单列表数据
export function getRecommendList() {
  const url = '/api/getRecommendList'

  const data = Object.assign({}, commonParams, {
    platform: 'yqq',
    picmid: 1,
    hostUin: 0,
    sin: 0,
    ein: 29,
    sortId: 5,
    needNewCode: 0,
    categoryId: 10000000,
    rnd: Math.random(),
    format: 'json'
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 获取歌单歌曲详情列表数据
export function getRecommendDetail(disstid) {
  const url = '/api/getRecommendDetail'

  const data = Object.assign({}, commonParams, {
    disstid,
    type: 1,
    json: 1,
    utf8: 1,
    onlysong: 0,
    platform: 'yqq',
    hostUin: 0,
    needNewCode: 0,
    format: 'json'
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}