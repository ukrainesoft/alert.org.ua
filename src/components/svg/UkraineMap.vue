<template>
  <svg viewBox="0 0 1000 670" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g id="map">
      <g id="Regions">
        <RegionComponent
          v-for="region in svgRegions"
          :key="region.id"
          :region="region"
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
const svgRegions: SvgRegion[] = new SvgRegionRepository().getAll();

export default defineComponent({
  name: "UkraineSvgMap",
  components: { RegionComponent },
  props: {
    regions: {
      type: Array as PropType<Region[]>,
      required: true,
    },
  },
  computed: {
    svgRegions() {
      svgRegions.forEach((svgRegion) => {
        const region = this.regions.find(
          (region) => region.id === svgRegion.id
        );
        if (region) {
          svgRegion.title = region.title;
          svgRegion.fill =
            region.status === Status.ALERT
              ? COLOR_FILL_ALERT
              : COLOR_FILL_DEFAULT;
          svgRegion.textFill =
            region.status === Status.ALERT
              ? COLOR_FILL_DEFAULT
              : COLOR_FILL_ALERT;
          svgRegion.title = region.title;
        }
      });

      // A crutch to render a new state (new pointers)
      return JSON.parse(JSON.stringify(svgRegions));
    },
  },
});
</script>
