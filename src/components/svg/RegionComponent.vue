<template>
  <g :class="[cssClass, { region: true }]" :id="region.id">
    <path :d="region.d" />
    <text>
      <tspan
        v-if="region.title && region.titleX && region.titleY"
        :x="region.titleX"
        :y="region.titleY"
      >
        <!-- {{ region.title }} -->
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
}
</style>
