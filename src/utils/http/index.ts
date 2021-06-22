import type { AxiosResponse } from "axios";
import type { CreateAxiosOptions, RequestOptions, Result } from "./types";
import { AxiosTransform } from "./transform";
import { RequestEnum, ContentTypeEnum, ResultEnum } from "@/enums/http";
import { VAxios } from "./axios";
import { errorResult, tokenFakeTimeout } from "./const";
import { isString } from "../is";
import { deepMerge } from "../index";
import { getCookie } from "@/utils/cookies";
/**
 * @description: 数据处理，方便区分多种处理方式
 */
const transform: AxiosTransform = {
  /**
   * @description: 处理请求数据
   */
  transformRequestData: (
    res: AxiosResponse<Result>,
    options: RequestOptions
  ) => {
    // 请求出错，错误提示，直接返回errorResult
    // 请求成功，直接返回data
    // ...
    if (!res.data) {
      return errorResult;
    }
    if (res.data?.code === "40101") {
      return tokenFakeTimeout;
    }
    const { status, data, message } = res.data;
    const hasSuccess =
      data &&
      ((Reflect.has(res.data, "status") && status === ResultEnum.SUCCESS) ||
        res.status === ResultEnum.SUCCESS);

    if (!hasSuccess) {
      if (message) {
        console.log(`message`, message);
      }

      Promise.reject(new Error(message));
      return errorResult;
    }

    if (status === ResultEnum.SUCCESS || hasSuccess) {
      return data;
    }
    return errorResult;
  },

  // 请求之前处理config
  beforeRequestHook: (config, options) => {
    if (config.method === RequestEnum.GET) {
      // const now = new Date().getTime();
      // if (!isString(config.params)) {
      //   config.data = {
      //     // 给 get 请求加上时间戳参数，避免从缓存中拿数据。
      //     params: Object.assign(config.params || {}, {
      //       _t: now,
      //     }),
      //   };
      // } else {
      //   // 兼容restful风格
      //   config.url = config.url + config.params + `?_t=${now}`;
      //   config.params = undefined;
      // }
    } else {
      if (!isString(config.params)) {
        config.data = config.params;
        config.params = undefined;
      } else {
        // 兼容restful风格
        config.url = config.url + config.params;
        config.params = undefined;
      }
    }
    return config;
  },

  /**
   * @description: 请求拦截器处理
   */
  requestInterceptors: config => {
    // 请求之前处理config,如在header中添加token
    if (getCookie("token")) {
      config.headers.Authorization = getCookie("token");
    }
    return config;
  },

  /**
   * @description: 响应错误处理
   */
  responseInterceptorsCatch: (error: any) => {
    // ...
    return Promise.reject(error);
  },
};

function createAxios(opt?: Partial<CreateAxiosOptions>) {
  return new VAxios(
    deepMerge(
      {
        timeout: 10 * 1000,
        headers: { "Content-Type": ContentTypeEnum.JSON },
        // 数据处理方式
        transform,
        // ...
      },
      opt || {}
    )
  );
}
export const defHttp = createAxios();
