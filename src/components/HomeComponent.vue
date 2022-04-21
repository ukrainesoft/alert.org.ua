<template>
  <div class="ukraine-map">
    <SvgUkraineMap :regions="regions" />
  </div>
  <div class="creds">
    <small v-html="credentials"></small>
  </div>
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
const RERENDER_INTERVAL_SEC = 1;
const REFRESH_INTERVAL_SEC = 30;

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

const loadRegions = async () => {
  const statusService = new TelegramRegionStatusService();
  let regions: Region[] = [];
  for (let region of new RegionRepository().getAll()) {
    region.status = await statusService.getStatus(region);
    regions.push(region);
  }
  return regions;
};

const getOgImage = (regions: Region[]) =>
  META_OG_CONFIG["og:image"] +
  "?" +
  regions.map((region: Region) => region.title).join(",");

export default defineComponent({
  components: { SvgUkraineMap },
  async mounted() {
    this.regions = await loadRegions();
    this.timer = setInterval(async () => {
      this.secondsBeforeNextUpdate -= RERENDER_INTERVAL_SEC;
      if (this.secondsBeforeNextUpdate < 1) {
        this.regions = await loadRegions();
        this.secondsBeforeNextUpdate = REFRESH_INTERVAL_SEC;
      }
    }, RERENDER_INTERVAL_SEC * 1000);
  },
  data() {
    return {
      regions: [] as Region[],
      interval: REFRESH_INTERVAL_SEC,
      secondsBeforeNextUpdate: REFRESH_INTERVAL_SEC,
      lastUpdate: 10000,
      timer: null as any,
      credentials: process.env.VUE_APP_CREDENTIALS,
    };
  },
  metaInfo() {
    const regionsInADanger = this.regions.filter(
      (region: Region) => region.status === Status.ALERT
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
  beforeUnmount() {
    clearInterval(this.timer);
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
.creds {
  bottom: 1vh;
  right: 5vh;
  position: absolute;
}
</style>
