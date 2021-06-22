import dayjs from "dayjs";
import { isObject } from "./is";
export function deepMerge<T = any>(src: any, target: any): T {
  let key: string;
  for (key in target) {
    src[key] = isObject(src[key])
      ? deepMerge(src[key], target[key])
      : (src[key] = target[key]);
  }
  return src;
}

/**
 * 隐藏部分敏感信息
 * @export
 * @param {string} str 完整字符串
 * @param {number} startLen 前面保留的长度
 * @param {number} endLen 后面保留的长度
 * @return {*}  {string} 包含*的字符串
 */
export function hiddenPartStr(
  str: string,
  startLen: number,
  endLen: number
): string {
  const hiddenLen = str.length - startLen - endLen;
  if (hiddenLen <= 0 || startLen >= str.length || endLen >= str.length) {
    return str;
  } else {
    let hiddenStr = "";
    for (let i = 0; i < hiddenLen; i++) {
      hiddenStr += "*";
    }
    return (
      str.substring(0, startLen) +
      hiddenStr +
      str.substring(str.length - endLen)
    );
  }
}

/**
 * 将给定日期转换为星期
 * @export
 * @param {string} date 形如 2020-04-08
 * @return {*}  {string}
 */
export function transformDateToWeek(date: string): string {
  const weeks = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
  return weeks[new Date(date).getDay()];
}

/**
 * Element-plus 日期组件默认返回的是 Date 对象，
 * 如2021-04-13T16:00:00.000Z，
 * 将其转化为 YYYY-MM-DD 格式
 * @export
 * @param {string | Date} date
 * @return {*}  {string}
 */
export function formateDateToString(date: string | Date): string {
  return date ? dayjs(date).format("YYYY-MM-DD") : "";
}
