<template>
  <g class="region" :id="region.id">
    <path
      :d="region.d"
      :fill="region.fill"
      :stroke="region.stroke || '#ffffff'"
      :stroke-width="region.strokeWidth || 1"
      :stroke-linecap="region.strokeLinecap || 'round'"
      :stroke-linejoin="region.strokeLinejoin || 'round'"
    />
    <text
      :fill="region.textFill || 'ffffff'"
      :stroke="region.textStroke || '#ffffff'"
      stroke-width="0.1"
      xml:space="preserve"
      style="white-space: pre"
      :font-family="region.fontFamily || 'Roboto Slab'"
      :font-size="region.fontSize || 20"
      :letter-spacing="region.letterSpacing || 0"
    >
      <tspan
        v-if="region.title && region.titleX && region.titleY"
        :x="region.titleX"
        :y="region.titleY"
      >
        {{ region.title }}
      </tspan>
    </text>
  </g>
</template>

<script lang="ts">
import { SvgRegion } from "@/types/SvgRegion";
import { PropType } from "vue";

export default {
  props: {
    region: { type: Object as PropType<SvgRegion>, required: true },
  },
};
</script>

<style scoped>
.region path {
  transition: 0.3s fill ease;
}
</style>
