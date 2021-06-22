import type { RouteRecordRaw } from "vue-router";

interface RouteMeta {
  title?: string;
  icon?: string;
  requiredAuth?: boolean;
  auth?: string;
  name?: string;
}

export interface AppRouteRecordRaw extends Omit<RouteRecordRaw, "meta"> {
  meta?: RouteMeta;
}

export type IndexMenu = {
  path: string;
  name: string;
};
