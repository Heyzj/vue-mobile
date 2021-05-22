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

/***
 * 获取新闻文章详情数据列表
 * @param id
 * @return {Object}
 */
export function getArticleDetail (id) {
  return request({
    url: `/app/v1_0/articles/${id}`,
    method: 'GET'
  })
}

/***
 * 收藏文章
 * @param id
 * @return {Object}
 */
export function collect (id) {
  return request({
    url: '/app/v1_0/article/collections',
    method: 'POST',
    data: {
      target: id
    }
  })
}

/***
 * 取消收藏文章
 * @param target
 * @return {Object}
 */
export function cancelCollect (target) {
  return request({
    url: `/app/v1_0/article/collections/${target}`,
    method: 'DELETE'
  })
}

/***
 * 对文章点赞
 * @param id
 * @return {Object}
 */
export function goodLike (id) {
  return request({
    url: '/app/v1_0/article/likings',
    method: 'POST',
    data: { target: id }
  })
}

/***
 * 取消对文章的点赞
 * @param id
 * @return {Object}
 */
export function cancelGoodLike (id) {
  return request({
    url: `/app/v1_0/article/likings/${id}`,
    method: 'DELETE'
  })
}
