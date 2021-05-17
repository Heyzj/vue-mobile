import request from '@/utils/request'

/***
 * 获取分类数据列表
 * @return {Object}
 */
export function getChannelList () {
  return request({
    url: '/app/v1_0/user/channels',
    method: 'GET'
  })
}

/***
 * 获取全部频道列表
 * @return {Object}
 */
export function getAllChannelList () {
  return request({
    url: '/app/v1_0/channels',
    method: 'GET'
  })
}

/***
 * 登录状态，修改用户频道
 * @param res
 * @return {Object}
 */
export function updateChannel (res) {
  return request({
    url: '/app/v1_0/user/channels',
    method: 'PATCH',
    data: {
      channels: [res]
    }
  })
}

export function deleteChannel (target) {
  return request({
    url: `/app/v1_0/user/channels/${target}`,
    method: 'DELETE'
  })
}
