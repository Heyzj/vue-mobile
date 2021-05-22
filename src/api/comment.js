import request from '@/utils/request'

/***
 * 获取评论列表
 * @param params
 * @return {Object}
 */
export function getComment (params) {
  return request({
    url: '/app/v1_0/comments',
    method: 'GET',
    params
  })
}

/***
 * 对评论点赞
 * @param target
 * @return {Object}
 */
export function commentLike (target) {
  return request({
    url: '/app/v1_0/comment/likings',
    method: 'POST',
    data: {
      target
    }
  })
}

/***
 * 取消对评论的点赞
 * @param id
 * @return {String}
 */
export function cancelCommentLike (id) {
  return request({
    url: `/app/v1_0/comment/likings/${id}`,
    method: 'DELETE'
  })
}

/***
 * 写评论
 * @param data
 * @return {Object}
 */
export function addComment (data) {
  return request({
    url: '/app/v1_0/comments',
    method: 'POST',
    data
  })
}
