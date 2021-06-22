import type { AxiosRequestConfig } from "axios";

import { AxiosTransform } from "./transform";

export interface RequestOptions {
  requiredAuth?: boolean;
  [propName: string]: any;
}

export interface CreateAxiosOptions extends AxiosRequestConfig {
  transform?: AxiosTransform;
  requestOptions?: RequestOptions;
}

export interface Result<T = any> {
  status: number;
  rel: boolean;
  type?: "success" | "error" | "warning";
  message?: string;
  data?: T;
  code?: string;
  msg?: string;
}
