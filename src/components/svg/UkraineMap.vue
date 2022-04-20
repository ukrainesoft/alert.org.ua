<template>
  <svg viewBox="0 0 1000 670" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g id="map">
      <g id="Regions">
        <RegionComponent
          v-for="region in svgRegions"
          :key="region.id"
          :id="region.id"
          :title="region.title"
          :titleX="region.titleX"
          :titleY="region.titleY"
          :fontSize="region.fontSize"
          :d="region.d"
          :fill="getColor(region)"
          :textStroke="COLOR_FILL_DEFAULT"
        />
      </g>
    </g>
  </svg>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { SvgRegionRepository } from "@/repository/SvgRegionRepository";
import RegionComponent from "./RegionComponent.vue";
import { SvgRegion } from "@/types/SvgRegion";
import { Region } from "@/types/Region";
import { Status } from "@/types/Status";

// TODO use color schemas
const COLOR_FILL_DEFAULT = "#f3d2d1";
const COLOR_FILL_ALERT = "#b14e45";
const COLOR_FILL_WARNING = "#d27f75";

export default defineComponent({
  name: "UkraineSvgMap",
  components: { RegionComponent },
  props: {
    regions: {
      type: Array as PropType<Region[]>,
      required: true,
    },
  },
  data() {
    return {
      COLOR_FILL_DEFAULT,
      svgRegions: new SvgRegionRepository().getAll(),
    };
  },
  methods: {
    getColor(region: SvgRegion) {
      for (const statusRegion of this.regions) {
        if (statusRegion.id !== region.id) {
          continue;
        }
        if (statusRegion.status === Status.ALERT) {
          return COLOR_FILL_ALERT;
        }
        if (statusRegion.status === Status.WARNING) {
          return COLOR_FILL_WARNING;
        }
        return COLOR_FILL_DEFAULT;
      }
    },
  },
});
</script>
