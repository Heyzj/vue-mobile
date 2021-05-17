import request from '@/utils/request'

/***
 * 获取联想建议
 * @return {Object}
 */
export function getSuggestion (data) {
  return request({
    url: '/app/v1_0/suggestion',
    method: 'GET',
    params: {
      q: data
    }
  })
}

/***
 * 获取搜索的结果
 * @param data
 * @return {Object}
 */
export function getSearchResult (data) {
  return request({
    url: '/app/v1_0/search',
    method: 'GET',
    params: data
  })
}
