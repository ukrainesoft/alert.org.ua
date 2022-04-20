<template>
  <Transition appear mode="out-in">
    <SvgUkraineMap :regions="regions" />
  </Transition>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import SvgUkraineMap from "./svg/UkraineMap.vue";
import { RegionRepository } from "../repository/RegionRepository";
import { TelegramRegionStatusService } from "../api/telegram/TelegramRegionStatusService";
import { Region } from "@/types/Region";
import { Status } from "@/types/Status";

// TODO Move to the config file
const META_OG_CONFIG = {
  "og:site_name": "Alert.Org.Ua",
  "og:type": "website",
  "og:url": "https://alert.org.ua/",
  "og:image": "https://alert.org.ua/ukraine.svg",
};

const getInDangerTitle = (regions: Region[]) =>
  regions.length > 0
    ? `❗${
        regions.length === 1
          ? regions[0].title
          : regions.length + " regions are"
      }   in danger right now`
    : `💛 💙 Looks like all regions are safe`;

const getInDangerDescription = (regions: Region[]) => {
  let regionsList = regions.map((region: Region) => region.title).join(", ");
  return regions.length > 0
    ? `❗❗ ${regionsList} are in a danger right now`
    : `💛 💙  Looks like all regions are safe`;
};

const getOgImage = (regions: Region[]) =>
  META_OG_CONFIG["og:image"] +
  "?" +
  regions.map((region: Region) => region.title).join(",");

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
    const title = getInDangerTitle(regionsInADanger);

    return {
      title,
      meta: [
        { property: "og:title", content: title },
        {
          property: "og:image",
          content: getOgImage(regionsInADanger),
        },
        {
          property: "og:description",
          content: getInDangerDescription(regionsInADanger),
        },
      ],
    };
  },
});
</script>
