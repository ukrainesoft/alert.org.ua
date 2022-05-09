<template>
  <svg viewBox="0 0 1000 670" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g id="map">
      <RegionComponent
        v-for="region in svgRegions"
        :key="region.id"
        :region="region"
        :cssClass="getClass(region)"
        @click="$emit('region-click', region)"
      />
    </g>
  </svg>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { SvgRegionRepository } from "@/repository/SvgRegionRepository";
import RegionComponent from "./RegionComponent.vue";
import { SvgRegion } from "@/types/SvgRegion";
import { Status } from "@/types/Status";
import { RegionStatus } from "@/types/RegionStatus";
import { RegionId } from "@/types/Region";

const REGION_CLASS_ALERT = "alert";
const REGION_CLASS_OK = "ok";
export default defineComponent({
  emits: ["region-click"],
  components: { RegionComponent },
  props: {
    regionStatuses: {
      type: Array as PropType<RegionStatus[]>,
      required: true,
    },
    regionTitles: {
      type: Object as PropType<Record<RegionId, string>>,
      required: false,
      default: () => ({}),
    },
  },
  computed: {
    svgRegions() {
      return new SvgRegionRepository().getAll().map((region) => {
        region.title = this.getTitle(region);
        return region;
      });
    },
  },
  methods: {
    getClass(svgRegion: SvgRegion): string {
      const regionStatus = this.getRegionStatus(svgRegion.id);
      if (regionStatus?.status === Status.ALERT) {
        return REGION_CLASS_ALERT;
      }
      return REGION_CLASS_OK;
    },
    getRegionStatus(id: RegionId): RegionStatus | undefined {
      return this.regionStatuses.find(
        (regionStatus) => regionStatus.regionId === id
      );
    },
    getTitle(svgRegion: SvgRegion): string {
      return Object.values(this.regionTitles).length > 0
        ? this.regionTitles[svgRegion.id] || ""
        : svgRegion.title || "";
    },
  },
});
</script>
