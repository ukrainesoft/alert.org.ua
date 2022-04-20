<template>
  <SvgUkraineMap :regions="regions" />
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import SvgUkraineMap from "./svg/UkraineMap.vue";
import { RegionRepository } from "../repository/RegionRepository";
import { TelegramRegionStatusService } from "../api/telegram/TelegramRegionStatusService";
import { Region } from "@/types/Region";
import { Status } from "@/types/Status";

const inDangerTitle = (count: number) =>
  count > 0
    ? `❗${count} regions are in danger right now`
    : `💛 💙 Looks like all regions are safe`;
const inDangerDescription = (count: number) =>
  count > 0
    ? `❗❗ ${count} are in danger right now`
    : `Looks like all regions are safe`;

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
  metaInfo() {
    const regionsInADanger = this.regions.filter(
      (region: Region) => region.status !== Status.OK
    );
    const title = inDangerTitle(regionsInADanger.length);
    const description = inDangerDescription(
      regionsInADanger.map((region: Region) => region.title).join(", ")
    );

    return {
      title,
      meta: [
        // TODO Move to config
        { property: "og:title", content: title },
        { property: "og:site_name", content: "Alert.Org.Ua" },
        { property: "og:type", content: "website" },
        { property: "og:url", content: "https://alert.org.ua/" },
        { property: "og:description", content: description },
      ],
    };
  },
});
</script>
