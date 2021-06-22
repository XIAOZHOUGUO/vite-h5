import type { AxiosRequestConfig, Canceler } from "axios";
import axios from "axios";

import { isFunction } from "../is";

let pendingMap = new Map<string, Canceler>(); // 声明一个 map 用于存储每个请求的标识 和 取消函数

export const getPendingUrl = (config: AxiosRequestConfig) =>
  [config.method, config.url].join("&");

export class AxiosCanceler {
  /**
   * 添加请求
   * @param {AxiosRequestConfig} config
   * @memberof AxiosCanceler
   */
  addPending(config: AxiosRequestConfig) {
    this.removePending(config);
    const url = getPendingUrl(config);
    config.cancelToken =
      config.cancelToken ||
      new axios.CancelToken(cancel => {
        // 如果 pending 中不存在当前请求，则添加进去
        if (!pendingMap.has(url)) {
          pendingMap.set(url, cancel);
        }
      });
  }

  /**
   * 清空所有请求
   * @memberof AxiosCanceler
   */
  removeAllPending() {
    pendingMap.forEach(cancel => {
      cancel && isFunction(cancel) && cancel();
    });
    pendingMap.clear();
  }

  /**
   * 移除请求
   * @param {AxiosRequestConfig} config
   * @memberof AxiosCanceler
   */
  removePending(config: AxiosRequestConfig) {
    // 如果在 pending 中存在当前请求标识，需要取消当前请求，并且移除
    const url = getPendingUrl(config);
    if (pendingMap.has(url)) {
      const cancel = pendingMap.get(url);
      cancel && cancel();
      pendingMap.delete(url);
    }
  }

  /**
   * 重置
   * @memberof AxiosCanceler
   */
  reset(): void {
    pendingMap = new Map<string, Canceler>();
  }
}
