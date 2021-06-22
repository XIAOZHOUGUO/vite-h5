import type { Router } from "vue-router";
import * as NProgress from "nprogress";
import "nprogress/nprogress.css";
import store from "@/store/index";
import { setCookie, getCookie } from "@/utils/cookies";
export function createGuard(router: Router) {
  router.beforeEach(async (to, from, next) => {
    NProgress.start();
    // 从门户单点到此系统
    if (to.path === "/portal") {
      if (to.query.token && to.query.project) {
        store.commit("SET_TOKEN", to.query.token as string);
        setCookie("token", to.query.token);
        store.commit("SET_PROJECT", to.query.project as string);
        setCookie("project", to.query.project);
      }
    }
    const hasToken = getCookie("token");
    if (hasToken) {
      next();
    } else {
      if (to.matched.some(r => r.meta.requiredAuth)) {
        next({ path: "/login", replace: true });
      } else {
        next();
      }
    }
  });
  router.afterEach(to => {
    NProgress.done();
    if (to.path === "/login") {
      store.dispatch("clearAppState");
    }
  });
}
