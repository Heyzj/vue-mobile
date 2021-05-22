/****
 * 存储token字符串
 * @param key
 * @param value
 */
export function setItem (key, value) {
  // value = value instanceof Object ? JSON.stringify(value) : value
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(key, value)
}

/***
 * 获取localStorage中的token
 * @param key
 * @return {string|any}
 */
export function getItem (key) {
  const data = window.localStorage.getItem(key)
  try {
    return JSON.parse(data)
  } catch (err) {
    return data
  }
}

/***
 * 删除token
 * @param key
 */
export function removeItem (key) {
  window.localStorage.removeItem(key)
}
