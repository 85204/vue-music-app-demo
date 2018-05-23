import jsonp from 'common/js/jsonp'
import { commonParams, option } from './config'
// import axios from 'axios'

export function getRecommend() {
  const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
  const data = {
    ...commonParams,
    platform: 'h5',
    needNewCode: 1,
    uin: 0,
  }
  return jsonp(url, data, option)
}

export function getDiscList() {
  const url = 'http://u.y.qq.com/cgi-bin/musicu.fcg'

  const data = {
    ...commonParams,
    platform: 'yqq',
    hostUin: 0,
    needNewCode: 0,
    data: '{"recomPlaylist":{"method":"get_hot_recommend","param":{"async":1,"cmd":2},"module":"playlist.HotRecommendServer"}}'
  }

  // return axios.get(url, {
  //   params: data
  // }).then((res) => {
  //   return Promise.resolve(res.data)
  // })
  return jsonp(url, data, {
    param: 'callback'
  })
}

export function getSongList(disstid) {
  const url = 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg'

  const data = Object.assign({}, commonParams, {
    disstid,
    type: 1,
    json: 1,
    utf8: 1,
    onlysong: 0,
    platform: 'yqq',
    hostUin: 0,
    needNewCode: 0
  })

  return jsonp(url, data, option)
}
