<template>
  <div class="base-timer" @click="onClickHandler">
    <svg
      class="base-timer__svg"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g class="base-timer__circle">
        <circle
          class="base-timer__path-elapsed"
          cx="50"
          cy="50"
          r="45"
        ></circle>
        <path
          id="base-timer-path-remaining"
          :stroke-dasharray="(REFRESH_INTERVAL_SEC - sec) * 9 + ' 360'"
          class="base-timer__path-remaining"
          d="
          M 50, 50
          m -45, 0
          a 45,45 0 1,0 90,0
          a 45,45 0 1,0 -90,0
        "
        ></path>
      </g>
    </svg>
    <span id="base-timer-label" class="base-timer__label">{{ sec }}</span>
  </div>
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
      default: REFRESH_INTERVAL_SEC,
    },
    rerenderInterval: {
      type: Number,
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
      REFRESH_INTERVAL_SEC,
    };
  },
});
</script>

<style scoped>
.base-timer {
  width: 30px;
  height: 30px;
  bottom: 10px;
  left: 15px;
  position: absolute;
  cursor: pointer;
}
.base-timer__svg {
  transform: scaleX(-1);
}
.base-timer__circle {
  fill: none;
  stroke: none;
}
.base-timer__path-elapsed {
  stroke-width: 7px;
  stroke: var(--secondary-color);
}
.base-timer__path-remaining {
  stroke-width: 7px;
  stroke-linecap: round;
  transform: rotate(90deg);
  transform-origin: center;
  transition: 1s linear all;
  fill-rule: nonzero;
  stroke: var(--primary-color);
}
.base-timer__label {
  position: absolute;
  width: 30px;
  height: 30px;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  color: var(--primary-color);
}
</style>
