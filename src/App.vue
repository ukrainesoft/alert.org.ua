<template>
  <UkraineMap />
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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #fdf0f0;
  align-items: center;
  display: flex;
  justify-content: center;
  max-height: 100vh;
  padding: 20px;
}
</style>
