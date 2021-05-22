import request from '@/utils/request'

/****
 *请求登录
 * @param data
 * @return {Object}
 */
export function login (data) {
  return request({
    url: '/app/v1_0/authorizations',
    method: 'POST',
    data
  })
}

/***
 * 获取短息验证码
 * @param code
 * @return {Object}
 */
export function sendCode (code) {
  return request({
    url: '/app/v1_0/sms/codes/' + code,
    method: 'GET'
  })
}

/***
 * 获取用户登录后信息
 * @return {Object}
 */
export function getUserInfo () {
  return request({
    url: '/app/v1_0/user',
    method: 'GET'
  })
}

/***
 * 关注用户
 * @param id
 * @return {Object}
 */
export function followUser (id) {
  return request({
    url: '/app/v1_0/user/followings',
    method: 'POST',
    data: {
      target: id
    }
  })
}

/***
 * 取消管关注用户
 * @param target
 * @return {Object}
 */
export function cancelFollowUser (target) {
  return request({
    url: `/app/v1_0/user/followings/${target}`,
    method: 'DELETE'
  })
}

/***
 * 获取当前登录用户的个人资料
 * @return {Object}
 */
export function getUserProfile () {
  return request({
    url: '/app/v1_0/user/profile',
    method: 'GET'
  })
}

/***
 * 修改用户基本资料，需要修改什么数据就传什么属性
 * @param data
 * @return {Object}
 */
export function updateUserProfile (data) {
  return request({
    url: '/app/v1_0/user/profile',
    method: 'PATCH',
    data
  })
}

/***
 * 更新用户头像
 * @param data
 * @return {Object}
 */
export function updateUserPhoto (data) {
  return request({
    url: '/app/v1_0/user/photo',
    method: 'PATCH',
    data
  })
}
