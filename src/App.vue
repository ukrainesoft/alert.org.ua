<template>
  <metainfo />
  <HomeComponent />
  <CredentialsComponent />
  <ThemeSwitcher />
  <ShareButtons />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CredentialsComponent from "./components/CredentialsComponent.vue";
import ThemeSwitcher from "./components/ThemeSwitcher.vue";
import HomeComponent from "./components/HomeComponent.vue";
import ShareButtons from "./components/ShareButtons.vue";

export default defineComponent({
  name: "App",
  components: {
    HomeComponent,
    CredentialsComponent,
    ThemeSwitcher,
    ShareButtons,
  },
});
</script>

<style lang="scss">
:root {
  --primary-color: #b14e45;
  --secondary-color: #f3d2d1;
  --background-color: #fff6f6;
  --text-color: #b14e45;
  --text-color-light: #f3d2d1;
}
.dark {
  --primary-color: #7d201e;
  --secondary-color: #8a8a8a;
  --background-color: #21262e;
  --text-color: #fff6f6;
  --text-color-light: #fff6f6;
}
html,
body {
  height: 100%;
  margin: 0;
  background-color: var(--background-color);
  color: var(--text-color);
  font-family: Roboto Slab;
}
a {
  color: var(--text-color);
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
  padding: 5px;
}
</style>
