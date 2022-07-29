import { createApp } from "vue";
import App from "./App.vue";
import { createMetaManager, plugin as vueMetaPlugin } from "vue-meta";
import VueGtag from "vue-gtag";
import { i18n } from "./i18n/i18n";

createApp(App)
  .use(vueMetaPlugin)
  .use(createMetaManager())
  .use(i18n)
  .use(VueGtag, {
    config: { id: process.env.VUE_APP_GA_MEASUREMENT_ID },
  })
  .mount("#app");
