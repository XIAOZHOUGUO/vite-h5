// cookie 相关处理

import Cookies from "js-cookie";

/**
 * 获取指定cookie
 * @export
 * @param {string} key
 * @return {*}
 */
export function getCookie(key: string) {
  return Cookies.get(key);
}

/**
 * 设置指定cookie
 * @export
 * @param {string} key
 * @param {any} value
 * @param {number} [expires=1 / 6] 过期时间4小时
 * @return {*}
 */
export function setCookie(key: string, value: any, expires = 1 / 6) {
  return Cookies.set(key, value, { expires });
}

/**
 * 删除指定cookie
 * @export
 * @param {string} key
 * @return {*}
 */
export function removeCookie(key: string) {
  return Cookies.remove(key);
}
