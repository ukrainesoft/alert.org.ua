<template>
  <div class="ukraine-map">
    <SvgUkraineMap :regionStatuses="regionStatuses" />
  </div>
  <CoundownComponent @click="refreshRegions" @timeOver="refreshRegions" />
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import SvgUkraineMap from "./svg/UkraineMap.vue";
import { RegionRepository } from "../repository/RegionRepository";
import CoundownComponent from "./CoundownComponent.vue";
import { TelegramRegionStatusService } from "../api/telegram/TelegramRegionStatusService";
import { Status } from "@/types/Status";
import { RegionStatus } from "@/types/RegionStatus";
import { getTranslatedMetaInfo } from "./utils/metaInfo";

const loadRegionsStatuses = async () => {
  const statusService = new TelegramRegionStatusService();
  let regionStatuses: RegionStatus[] = [];
  for (let region of new RegionRepository().getAll()) {
    try {
      regionStatuses.push(await statusService.getRegionStatus(region.id));
    } catch (e) {
      console.debug(region.id, " is absent in the Telegram feed");
      regionStatuses.push(new RegionStatus(region, Status.OK));
    }
  }
  return regionStatuses;
};

export default defineComponent({
  components: { SvgUkraineMap, CoundownComponent },
  async mounted() {
    this.regionStatuses = await loadRegionsStatuses();
  },
  methods: {
    async refreshRegions() {
      this.regionStatuses = await loadRegionsStatuses();
    },
  },
  data() {
    return {
      regionStatuses: [] as RegionStatus[],
    };
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
