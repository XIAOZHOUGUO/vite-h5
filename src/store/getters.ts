import { AppState } from "./types";

const getters = {
  token: (state: AppState) => state.token,
  project: (state: AppState) => state.project,
};

export default getters;
