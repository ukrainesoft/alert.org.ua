<template>
  <label>
    <input class="toggle-checkbox" type="checkbox" @change="toggleTheme" />
    <div class="toggle-slot">
      <div class="sun-icon-wrapper">
        <Icon icon="feather-sun" class="sun-icon" />
      </div>
      <div class="toggle-button"></div>
      <div class="moon-icon-wrapper">
        <Icon icon="feather-moon" class="moon-icon" />
      </div>
    </div>
  </label>
</template>

<script lang="ts">
import { defineComponent, PropType } from "@vue/runtime-core";
import { Icon } from "@iconify/vue";

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
  components: { Icon },
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
label {
  position: absolute;
  top: 10px;
  right: 10px;
}
.toggle-checkbox {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}
.toggle-slot {
  position: relative;
  height: 16px;
  width: 36px;
  border: 1px solid #e4e7ec;
  border-radius: 10px;
  transition: background-color 250ms;
  padding: 2px;
}
.toggle-checkbox:checked ~ .toggle-slot {
  background-color: #374151;
}
.toggle-button {
  transform: translate(20px, 0);
  position: absolute;
  height: 16px;
  width: 16px;
  border-radius: 50%;
  background-color: #ffeccf;
  box-shadow: inset 0px 0px 0px 0.75px #ffbb52;
  transition: background-color 250ms, border-color 250ms,
    transform 500ms cubic-bezier(0.26, 2, 0.46, 0.71);
}
.toggle-checkbox:checked ~ .toggle-slot .toggle-button {
  background-color: #485367;
  box-shadow: inset 0px 0px 0px 0.75px white;
  transform: translate(0, 0);
}
.sun-icon {
  position: absolute;
  height: 16px;
  width: 16px;
  color: #ffbb52;
}
.sun-icon-wrapper {
  position: absolute;
  height: 20px;
  width: 20px;
  opacity: 1;
  transform: translate(0px, 0px) rotate(15deg);
  transform-origin: 50% 50%;
  transition: opacity 150ms, transform 500ms cubic-bezier(0.26, 2, 0.46, 0.71);
}
.toggle-checkbox:checked ~ .toggle-slot .sun-icon-wrapper {
  opacity: 0;
  transform: translate(0px, 0px) rotate(0deg);
}
.moon-icon {
  position: absolute;
  height: 16px;
  width: 16px;
  color: white;
}
.moon-icon-wrapper {
  position: absolute;
  height: 20px;
  width: 20px;
  opacity: 0;
  transform: translate(20px, 0px) rotate(0deg);
  transform-origin: 50% 50%;
  transition: opacity 150ms, transform 500ms cubic-bezier(0.26, 2.5, 0.46, 0.71);
}
.toggle-checkbox:checked ~ .toggle-slot .moon-icon-wrapper {
  opacity: 1;
  transform: translate(20px, 0);
}
</style>
