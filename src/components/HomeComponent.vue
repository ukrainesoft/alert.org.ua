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
  <TitleSwitcher @onTitleModeChanged="onTitlesModeChanged" />
</template>

<script lang="ts">
// TODO: Selected region move to the HOC
// TODO: Move regions to the HOC
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
import { useMeta } from "vue-meta";
import { useI18n } from "vue-i18n";
import TitleSwitcher from "./TitleSwitcher.vue";
import { Mode as TitleMode } from "./utils/region/TitleGenerator/Mode";
import { TitleGeneratorFactory } from "./utils/region/TitleGenerator/TitleGeneratorFactory";

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
    TitleSwitcher,
  },
  async mounted() {
    this.regionStatuses = await loadRegionsStatuses();
    useMeta(getTranslatedMetaInfo(this.regionStatuses));
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
    onTitlesModeChanged(mode: TitleMode) {
      this.titleMode = mode;
    },
  },
  data() {
    return {
      regionStatuses: [] as RegionStatus[],
      selectedRegionInfo: undefined as RegionInfo | undefined,
      titleMode: Object.values(TitleMode)[0],
    };
  },
  computed: {
    regionTitles(): Record<RegionId, string> {
      const i18n = useI18n();
      const titleGenerator = new TitleGeneratorFactory(i18n.t).create(
        this.titleMode
      );

      let titles: Record<RegionId, string> = {};
      this.regionStatuses.map((regionStatus) => {
        titles[regionStatus.regionId] = titleGenerator.generate(regionStatus);
      });
      return titles;
    },
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
