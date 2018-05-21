import jsonp from 'common/js/jsonp'
import { commonParams, option } from './config'
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
