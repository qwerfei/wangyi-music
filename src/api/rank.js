import jsonp from 'common/jsonp'
import {commonParams, options} from 'common/api'
import axios from 'axios'

export function getTopList() {
    const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg'
  
    const data = Object.assign({}, commonParams, {
      uin: 0,
      needNewCode: 1,
      platform: 'h5'
    })
  
    return jsonp(url, data, options)
  }