# Vue 3 + Typescript + Vite

This template should help get you started developing with Vue 3 and Typescript in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Vetur](https://marketplace.visualstudio.com/items?itemName=octref.vetur). Make sure to enable `vetur.experimental.templateInterpolationService` in settings!

### If Using `<script setup>`

[`<script setup>`](https://github.com/vuejs/rfcs/pull/227) is a feature that is currently in RFC stage. To get proper IDE support for the syntax, use [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar) instead of Vetur (and disable Vetur).

## Type Support For `.vue` Imports in TS

Since TypeScript cannot handle type information for `.vue` imports, they are shimmed to be a generic Vue component type by default. In most cases this is fine if you don't really care about component prop types outside of templates. However, if you wish to get actual prop types in `.vue` imports (for example to get props validation when using manual `h(...)` calls), you can use the following:

### If Using Volar

Run `Volar: Switch TS Plugin on/off` from VSCode command palette.

### If Using Vetur

1. Install and add `@vuedx/typescript-plugin-vue` to the [plugins section](https://www.typescriptlang.org/tsconfig#plugins) in `tsconfig.json`
2. Delete `src/shims-vue.d.ts` as it is no longer needed to provide module info to Typescript
3. Open `src/main.ts` in VSCode
4. Open the VSCode command palette
5. Search and run "Select TypeScript version" -> "Use workspace version"

### 注意事项

1. `GIT` 提交规范
    `feat`：新增功能
    `fix`：修复bug
    `style`：代码格式（不影响功能，例如空格、分号等格式修正）
    `refactor`：代码重构
    `perf`：优化性能
    `docs`：文档变更
    `build`：变更项目构建或外部依赖（如 webpack、npm等）
    `test`：测试
    `revert`：代码回退
    `ci`：持续集成的配置修改
    如：`git commit -m 'feat(login)：添加登录页面及功能'`, 不强制使用此方式，最好能够一致吧。

2. `vant` 使用方式
   [vant使用文档](https://vant-contrib.gitee.io/vant/v3/#/zh-CN/button)
   `vant` 按需引入已经配置过了，详见 `vite.config.ts` , 为了不每次使用组件时都要 `import { x } from 'vant'` , 并且在 `components` 中注册，需要使用新的组件时请参照 `src/plugin/vant.ts` 中的配置新增相关内容。以后可以直接在 `template` 中使用 `vant` 组件。

3. `Viewport` 布局
   [配置参考](https://vant-contrib.gitee.io/vant/v3/#/zh-CN/advanced-usage#viewport-bu-ju)
   `Vant` 默认使用 px 作为样式单位，如果需要使用 viewport 单位 (vw, vh, vmin, vmax)，推荐使用 postcss-px-to-viewport 进行转换。postcss-px-to-viewport 是一款 PostCSS 插件，用于将 px 单位转化为 vw/vh 单位。在本项目中可以放心使用 `px` 单位，会自动转为 `vw`。相关配置在 `postcss.config.js`中。

4. 建议安装的插件
   vscode 用户请在插件市场中选择安装 `ESlint` `Prettier` `EditorConfig`等。建议先简单看看那些配置之后在开发。
