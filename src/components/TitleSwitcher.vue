<template>
  <div class="title" @click="switchTitle">
    {{ currentModeName }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import { Mode } from "./utils/region/TitleGenerator/Mode";

export default defineComponent({
  emits: {
    onTitleModeChanged: (mode: Mode) => {
      return mode;
    },
  },
  data() {
    return {
      modes: Object.values(Mode) as Mode[],
      currentMode: Mode.MINUTES,
    };
  },
  methods: {
    switchTitle() {
      this.currentMode =
        this.modes[
          (this.modes.indexOf(this.currentMode) + 1) % this.modes.length
        ];
      this.$emit("onTitleModeChanged", this.currentMode);
    },
  },
  computed: {
    currentModeName(): string {
      const mode = "message.titles_mode_" + this.currentMode;
      return this.$t(mode);
    },
  },
});
</script>

<style scoped>
.title {
  text-align: center;
  bottom: 10px;
  left: 115px;
  position: absolute;
  cursor: pointer;
  color: var(--secondary-color);
  border: solid 1px var(--secondary-color);
  padding: 3px 10px;
  margin: 2px;
  border-radius: 5px;
}
</style>
