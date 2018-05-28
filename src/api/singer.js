import jsonp from 'common/js/jsonp'
import { commonParams, option } from './config'

export function getSingerList() {
  // const url = 'http://u.y.qq.com/cgi-bin/musicu.fcg'

  // const data = {
  //   ...commonParams,
  //   platform: 'yqq',
  //   hostUin: 0,
  //   needNewCode: 0,
  //   data: '{"comm":{"ct":24,"cv":10000},"singerList":{"module":"Music.SingerListServer","method":"get_singer_list","param":{"area":-100,"sex":-100,"genre":-100,"index":-100,"sin":0,"cur_page":1}}}'
  // }

  // return jsonp(url, data, {
  //   param: 'callback'
  // })
  const url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg'

  const data = Object.assign({}, commonParams, {
    channel: 'singer',
    page: 'list',
    key: 'all_all_all',
    pagesize: 100,
    pagenum: 1,
    hostUin: 0,
    needNewCode: 0,
    platform: 'yqq'
  })

  return jsonp(url, data, option)
}

export function getSingerDetail(singerId) {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg'

  const data = {
    ...commonParams,
    hostUin: 0,
    needNewCode: 0,
    platform: 'yqq',
    g_tk: 5381,
    singermid: singerId,
    order: 'listen',
    begin: 0,
    num: 100,
    songstatus: 1
  }

  return jsonp(url, data, option)
}
