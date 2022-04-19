<template>
  <UkraineMap class="ukraine-map" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import UkraineMap from "./components/UkraineMap.vue";
import "vue-cesium/dist/index.css";

export default defineComponent({
  name: "App",
  components: {
    UkraineMap,
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
  align-items: center;
  display: flex;
  justify-content: center;
}
.ukraine-map {
  max-height: 90vh;
  margin: 5vh;
}
</style>
