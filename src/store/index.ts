import { createStore, Store, useStore as baseUseStore } from "vuex";
import rootGetters from "./getters";
import { AppState } from "./types";
import type { App } from "vue";

import app from "./app";

const store: Store<AppState> = createStore<AppState>({
  state: app.state,
  mutations: app.mutations,
  actions: app.actions,
  getters: rootGetters,
  strict: true,
});

export function setupStore(app: App<Element>) {
  app.use(store);
}

export default store;

/** 注意：使用此 `useStore` 组合式函数而不是 `vuex` 提供的 `useStore`，为了更好的 `ts` 体验。  */
export function useStore() {
  const store = baseUseStore<AppState>();
  const {
    state,
    getters,
    commit,
    dispatch,
  }: {
    state: AppState;
    getters: Getters;
    commit: Commit;
    dispatch: Dispatch;
  } = store;
  return {
    state,
    getters,
    commit,
    dispatch,
  };
}

type CommitFuncs = typeof app.mutations;
// 将 mutation 函数名及 payload 类型转换成 commit 函数的两个入参类型
interface Commit {
  <T extends keyof CommitFuncs>(
    type: T,
    payload?: Parameters<CommitFuncs[T]>[1],
    options?: { root: boolean }
  ): void;
}
// dispatch 处理步骤同 commit
type DispatchFuncs = typeof app.actions;

interface Dispatch {
  <T extends keyof DispatchFuncs>(
    type: T,
    payload?: Parameters<DispatchFuncs[T]>[1],
    options?: { root: boolean }
  ): Promise<any>;
}

// 将 getter 函数转换成 {getterName: getterFuncsReturnType} 的对象类型
type GetGetters = typeof rootGetters;
export type Getters = {
  [T in keyof GetGetters]: ReturnType<GetGetters[T]>;
};
// 其他 ts 文件解构导入时获得每个对象的改造后类型
export const { state } = store;
export const { getters }: { getters: Getters } = store;
export const { commit }: { commit: Commit } = store;
export const { dispatch }: { dispatch: Dispatch } = store;

export interface CustomizeStore {
  state: AppState;
  getters: Getters;
  commit: Commit;
  dispatch: Dispatch;
}
