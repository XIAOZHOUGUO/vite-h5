import { ActionContext, AppState } from "./types";
import { getCookie } from "@/utils/cookies";

const state: AppState = {
  token: getCookie("token") || undefined,
  project: getCookie("project") || "mFmq2Zzp",
};

const mutations = {
  SET_TOKEN: (state: AppState, token: string) => {
    state.token = token;
  },
  SET_PROJECT: (state: AppState, token: string) => {
    state.project = token;
  },
};

const actions = {
  clearAppState({ commit }: ActionContext<AppState, AppState>): void {
    commit("SET_TOKEN", undefined);
    commit("SET_PROJECT", undefined);
  },
};
export default {
  state,
  mutations,
  actions,
};
