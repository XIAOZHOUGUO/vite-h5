import { CustomizeStore } from "./index";
export interface ActionContext<S, R> {
  dispatch: CustomizeStore["dispatch"]; // 全局的 dispatch, 有 ts 提示支持
  commit: CustomizeStore["commit"]; // 全局的 commit, 有 ts 提示支持
  state: S; // module 内部的 state
  getters: any; // module 内部的 getters
  rootState: R; // 全局的 state, 有 ts 提示支持
  rootGetters: CustomizeStore["getters"]; // 全局的 getters, 有 ts 提示支持
}
export interface AppState {
  token: string | undefined;
  project: string | undefined;
}
export interface State {
  app: AppState;
}
