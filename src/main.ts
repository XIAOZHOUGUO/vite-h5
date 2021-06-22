import { createApp } from "vue";
import App from "./App.vue";
import { setupVant } from "@/plugin/vant";
import router, { setupRoute } from "@/router/index";
import { setupStore } from "@/store/index";
const app = createApp(App);
setupRoute(app);
setupStore(app);
setupVant(app);
router.isReady().then(() => {
  app.mount("#app");
});
