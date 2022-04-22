import { createApp } from "vue";
import App from "./App.vue";
import { createMetaManager, plugin as vueMetaPlugin } from "vue-meta";
import VueGtag from "vue-gtag";

createApp(App)
  .use(createMetaManager())
  .use(vueMetaPlugin)
  .use(VueGtag, {
    config: { id: process.env.VUE_APP_GA_MEASUREMENT_ID },
  })
  .mount("#app");
