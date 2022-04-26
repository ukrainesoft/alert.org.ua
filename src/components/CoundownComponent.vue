<template>
  <div class="timer" @click="onClickHandler">↻ {{ sec }}</div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";

const RERENDER_INTERVAL_SEC = 1;
const REFRESH_INTERVAL_SEC = 30;
let timer: any = null;

enum Emits {
  CLICK = "click",
  TIME_OVER = "timeOver",
}

export default defineComponent({
  emits: Object.values(Emits),
  props: {
    seconds: {
      type: Number,
      required: true,
      default: REFRESH_INTERVAL_SEC,
    },
    rerenderInterval: {
      type: Number,
      required: false,
      default: RERENDER_INTERVAL_SEC,
    },
  },
  methods: {
    onClickHandler() {
      this.$emit(Emits.CLICK);
      this.sec = REFRESH_INTERVAL_SEC;
    },
  },
  async mounted() {
    timer = setInterval(async () => {
      this.sec -= RERENDER_INTERVAL_SEC;
      if (this.sec < 1) {
        this.$emit(Emits.TIME_OVER);
        this.sec = REFRESH_INTERVAL_SEC;
      }
    }, this.rerenderInterval * 1000);
  },
  beforeUnmount() {
    clearInterval(timer);
  },
  data() {
    return {
      sec: this.seconds,
    };
  },
});
</script>

<style scoped>
.timer {
  bottom: 10px;
  left: 15px;
  position: absolute;
  cursor: pointer;
}
</style>
