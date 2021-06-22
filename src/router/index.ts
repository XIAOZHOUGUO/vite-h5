import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import type { App } from "vue";
import { createGuard } from "./createGuard";
import { staticRoutes } from "./staticRoutes";

const router = createRouter({
  history: createWebHashHistory(),
  routes: staticRoutes as RouteRecordRaw[],
  strict: true,
});

export function setupRoute(app: App<Element>) {
  app.use(router);
  createGuard(router);
}

// 重置路由
export function resetRouter() {
  const resetWhiteNameList = ["login"];
  router.getRoutes().forEach(route => {
    const { name } = route;
    if (name && !resetWhiteNameList.includes(name as string)) {
      router.hasRoute(name) && router.removeRoute(name);
    }
  });
}
export default router;
