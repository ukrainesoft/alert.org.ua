<template>
  <div class="theme" @click="toggleTheme">🌓</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "@vue/runtime-core";

export enum Theme {
  LIGHT = "light",
  DARK = "dark",
}

function getOSTheme() {
  return window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
    ? Theme.DARK
    : Theme.LIGHT;
}

export default defineComponent({
  props: {
    theme: {
      type: String as PropType<Theme>,
      default: getOSTheme(),
    },
  },
  methods: {
    toggleTheme() {
      this.currentTheme =
        this.currentTheme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT;
      this.setTheme(this.currentTheme);
    },
    setTheme(theme: string) {
      const bodyClassesList =
        document.getElementsByTagName("body")[0].classList;
      bodyClassesList.remove(Theme.DARK);
      bodyClassesList.add(theme);
    },
  },
  data() {
    return {
      currentTheme: this.theme,
    };
  },
  mounted() {
    this.setTheme(getOSTheme());
  },
});
</script>

<style scoped>
.theme {
  top: 10px;
  right: 10px;
  position: absolute;
  text-align: right;
  line-height: 14px;
  cursor: pointer;
}
</style>
