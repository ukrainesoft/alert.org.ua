<template>
  <div class="ukraine-map">
    <SvgUkraineMap
      :regionStatuses="regionStatuses"
      :regionTitles="regionTitles"
      @region-click="getRegionInfo"
    />
    <CountryInfoComponent :regionStatuses="regionStatuses" />
  </div>
  <RegionInfoComponent
    :regionInfo="selectedRegionInfo"
    @close="selectedRegionInfo = undefined"
    v-if="selectedRegionInfo"
  />
  <CoundownComponent @click="refreshRegions" @timeOver="refreshRegions" />
  <LocaleSwitcher />
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import SvgUkraineMap from "./svg/UkraineMap.vue";
import { RegionRepository } from "../repository/RegionRepository";
import CoundownComponent from "./CoundownComponent.vue";
import RegionInfoComponent from "./RegionInfoComponent.vue";
import { TelegramRegionStatusService } from "../api/telegram/TelegramRegionStatusService";
import { Status } from "@/types/Status";
import { RegionStatus } from "@/types/RegionStatus";
import { getTranslatedMetaInfo } from "./utils/metaInfo";
import { SvgRegion } from "@/types/SvgRegion";
import { RegionInfo } from "@/types/RegionInfo";
import CountryInfoComponent from "./CountryInfoComponent.vue";
import LocaleSwitcher from "./LocaleSwitcher.vue";
import { RegionId } from "@/types/Region";
import { getDatesDiff } from "./utils/date";

const loadRegionsStatuses = async () => {
  const statusService = new TelegramRegionStatusService();
  let regionStatuses: RegionStatus[] = [];
  for (let regionId of new RegionRepository().getAll()) {
    try {
      regionStatuses.push(await statusService.getRegionStatus(regionId));
    } catch (e) {
      regionStatuses.push(new RegionStatus(regionId, Status.OK));
    }
  }
  return regionStatuses;
};

export default defineComponent({
  components: {
    SvgUkraineMap,
    CoundownComponent,
    RegionInfoComponent,
    CountryInfoComponent,
    LocaleSwitcher,
  },
  async mounted() {
    this.regionStatuses = await loadRegionsStatuses();
  },
  methods: {
    async refreshRegions() {
      this.regionStatuses = await loadRegionsStatuses();
    },
    getRegionInfo(svgRegion?: SvgRegion) {
      const regionStatus = this.regionStatuses.find(
        (regionStatus) => regionStatus.regionId === svgRegion?.id
      );
      if (regionStatus) {
        this.selectedRegionInfo = new RegionInfo(
          regionStatus.regionId,
          regionStatus
        );
      } else {
        this.selectedRegionInfo = undefined;
      }
    },
  },
  data() {
    return {
      regionStatuses: [] as RegionStatus[],
      selectedRegionInfo: undefined as RegionInfo | undefined,
    };
  },
  computed: {
    // The region title is time from the last alert or an empty string
    regionTitles(): Record<RegionId, string> {
      let titles: Record<RegionId, string> = {};
      this.regionStatuses.map((regionStatus) => {
        if (!regionStatus?.date || regionStatus.status === Status.OK) {
          titles[regionStatus.regionId] = "";
          return;
        }

        let dateDiff = getDatesDiff(regionStatus.date, new Date());
        dateDiff.h = dateDiff.d * 24 + dateDiff.h;

        titles[regionStatus.regionId] =
          this.$t("message.region_info_hours_short", dateDiff.h) +
          " " +
          this.$t("message.region_info_minutes_short", dateDiff.m);
      });

      return titles;
    },
  },
  // Used by vue-meta plugin
  metaInfo() {
    return getTranslatedMetaInfo(this.regionStatuses);
  },
});
</script>

<style scoped>
.ukraine-map {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
.ukraine-map svg {
  width: 100%;
  height: 100%;
  max-width: 100vw;
  max-height: 90vh;
}
</style>
