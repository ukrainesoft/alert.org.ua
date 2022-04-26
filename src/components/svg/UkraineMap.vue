<template>
  <svg viewBox="0 0 1000 670" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g id="map">
      <RegionComponent
        v-for="region in svgRegions"
        :key="region.id"
        :region="region"
        :cssClass="getClass(region)"
      />
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

const REGION_CLASS_ALERT = "alert";
const REGION_CLASS_OK = "ok";
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
      svgRegions: new SvgRegionRepository().getAll(),
    };
  },
  methods: {
    getClass(svgRegion: SvgRegion): string {
      const regionStatus = this.regions.find(
        (region) => svgRegion.id === region.id
      );
      if (regionStatus?.status === Status.ALERT) {
        return REGION_CLASS_ALERT;
      }
      return REGION_CLASS_OK;
    },
  },
});
</script>
