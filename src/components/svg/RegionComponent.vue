<template>
  <g :class="[cssClass, { region: true }]" :id="region.id">
    <path :d="region.d" />
    <text :font-size="region.fontSize" v-if="region.title">
      <tspan :x="region.titleX || 0" :y="region.titleY || 0">
        {{ region.title }}
      </tspan>
    </text>
  </g>
</template>

<script lang="ts">
import { SvgRegion } from "@/types/SvgRegion";
import { defineComponent, PropType } from "vue";

export default defineComponent({
  props: {
    region: { type: Object as PropType<SvgRegion>, required: true },
    cssClass: { type: String, required: false },
  },
});
</script>

<style scoped>
.region path {
  transition: 0.5s fill ease;
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
  fill: var(--text-color-light);
  stroke: var(--secondary-color);
  stroke-width: 0.7;
  font-size: 26px;
  letter-spacing: 0;
}
</style>
