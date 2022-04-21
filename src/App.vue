<template>
  <metainfo />
  <HomeComponent />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HomeComponent from "./components/HomeComponent.vue";

export default defineComponent({
  name: "App",
  components: {
    HomeComponent,
  },
});
</script>

<style>
html,
body {
  height: 100%;
  background-color: #fff6f6;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
}
</style>
