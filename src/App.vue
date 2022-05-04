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

  --primary-dark-color: #b14e45;
  --secondary-dark-color: #8a8a8a;
  --background-dark-color: #21262e;
}
html,
body {
  height: 100%;
  margin: 0;
  background-color: var(--background-color);
  color: #2c3e50;
  font-family: Roboto Slab;
}
body.dark {
  background-color: var(--background-dark-color);
  color: var(--background-color);
  a {
    color: var(--primary-dark-color);
  }
  .region path {
    fill: var(--secondary-dark-color);
    stroke: var(--background-dark-color);
  }
  .region.alert path {
    fill: var(--primary-dark-color);
  }
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
  padding: 5px;
}
.region path {
  fill: var(--secondary-color);
  stroke-width: 1;
  stroke: var(--background-color);
  stroke-linecap: round;
  stroke-linejoin: round;
}

.region.alert path {
  fill: var(--primary-color);
}
.region text {
  fill: var(--primary-color);
  stroke: var(--background-color);
  stroke-width: 0.1;
  font-size: 20;
  letter-spacing: 0;
}
</style>
