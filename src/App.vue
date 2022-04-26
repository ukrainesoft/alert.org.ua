<template>
  <metainfo />
  <HomeComponent />
  <CredentialsComponent />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CredentialsComponent from "./components/CredentialsComponent.vue";
import HomeComponent from "./components/HomeComponent.vue";

export default defineComponent({
  name: "App",
  components: {
    HomeComponent,
    CredentialsComponent,
  },
});
</script>

<style>
html,
body {
  height: 100%;
  margin: 0;
  background-color: #fff6f6;
}
#app {
  font-family: Roboto Slab;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
  padding: 5px;
}
.region path {
  fill: #f3d2d1;
  stroke-width: 1;
  stroke: #ffffff;
  stroke-linecap: round;
  stroke-linejoin: round;
}
.region.alert path {
  fill: #b14e45;
}
.region text {
  fill: #b14e45;
  stroke: #ffffff;
  stroke-width: 0.1;
  font-family: Roboto Slab;
  font-size: 20;
  letter-spacing: 0;
}
</style>
