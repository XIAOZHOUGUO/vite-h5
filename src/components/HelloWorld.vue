<template>
  <h1>{{ msg }}</h1>

  <p>
    Recommended IDE setup:
    <a href="https://code.visualstudio.com/" target="_blank">VSCode</a>
    +
    <a
      href="https://marketplace.visualstudio.com/items?itemName=octref.vetur"
      target="_blank"
    >
      Vetur
    </a>
    or
    <a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
    (if using
    <code>&lt;script setup&gt;</code>)
  </p>

  <p>See <code>README.md</code> for more information.</p>

  <p>
    <a href="https://vitejs.dev/guide/features.html" target="_blank">
      Vite Docs
    </a>
    |
    <a href="https://v3.vuejs.org/" target="_blank">Vue 3 Docs</a>
  </p>

  <button type="button" @click="count++">count is: {{ count }}</button>
  <p>
    Edit
    <code>components/HelloWorld.vue</code> to test hot module replacement.
  </p>
  <van-button type="primary" round block>测试</van-button>
  <van-cell title="选择单个日期" :value="date" @click="show = true" />
  <van-calendar v-model:show="show" @confirm="onConfirm" />
</template>

<script lang="ts">
import { Toast } from "vant";
import { ref, defineComponent } from "vue";
import { encryptWithMD5 } from "@/utils/encrypt";
// import { Button } from "vant";
export default defineComponent({
  name: "HelloWorld",
  props: {
    msg: {
      type: String,
      required: true,
    },
  },
  components: {
    // [Button.name]: Button,
  },
  setup: () => {
    const count = ref(0);
    Toast("测试");
    const date = ref("");
    const show = ref(false);

    const formatDate = (date: Date) =>
      `${date.getMonth() + 1}/${date.getDate()}`;
    const onConfirm = (value: Date) => {
      show.value = false;
      date.value = formatDate(value);
    };
    console.log(`encrypt`, encryptWithMD5("&?goZv?%"));
    return { count, date, show, onConfirm };
  },
});
</script>

<style scoped>
a {
  color: #42b983;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
</style>
