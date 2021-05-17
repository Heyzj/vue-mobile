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

export function getUserInfo () {
  return request({
    url: '/app/v1_0/user',
    method: 'GET'
  })
}
