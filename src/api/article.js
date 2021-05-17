import request from '@/utils/request'

/***
 * 请求文章数据列表
 * @param params
 * @return {*}
 */
export function getArticleList (params) {
  return request({
    url: '/app/v1_1/articles',
    method: 'GET',
    params
  })
}
