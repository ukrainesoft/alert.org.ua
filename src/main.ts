import { createApp } from "vue";
import App from "./App.vue";
import { createMetaManager, plugin as vueMetaPlugin } from "vue-meta";

createApp(App).use(createMetaManager()).use(vueMetaPlugin).mount("#app");
