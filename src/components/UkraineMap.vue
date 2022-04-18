<template>
  <SvgUkraineMap :regions="regions" />
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import SvgUkraineMap from "./svg/UkraineMap.vue";
import { RegionRepository } from "../repository/RegionRepository";
import { TelegramRegionStatusService } from "../api/telegram/TelegramRegionStatusService";
import { Region } from "@/types/Region";

export default defineComponent({
  components: { SvgUkraineMap },
  async mounted() {
    let statusService = new TelegramRegionStatusService();
    let regions: Region[] = [];
    for (let region of new RegionRepository().getAll()) {
      region.status = await statusService.getStatus(region);
      regions.push(region);
    }
    this.regions = regions;
  },
  data() {
    return {
      regions: [] as Region[],
    };
  },
});
</script>
