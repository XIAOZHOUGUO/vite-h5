import { defineConfig, loadEnv, ConfigEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import styleImport from "vite-plugin-style-import";
import { resolve } from "path";
// https://vitejs.dev/config/
export default ({ mode }: ConfigEnv) => {
  // eg: import.meta.env.VITE_BASE_URL -> process.env.VITE_BASE_URL
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  process.env;
  return defineConfig({
    resolve: {
      alias: [
        // 路径别名
        {
          find: "@",
          replacement: resolve(__dirname, "src"),
        },
      ],
    },
    plugins: [
      vue(),
      styleImport({
        libs: [
          {
            libraryName: "vant",
            esModule: true,
            resolveStyle: name => `vant/es/${name}/style`,
          },
        ],
      }),
    ],
    server: {
      cors: true,
      proxy: {
        "/api": {
          target: process.env.VITE_API_URL,
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, "/api"),
        },
      },
    },
  });
};
