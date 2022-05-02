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
import { Region } from "@/types/Region";
import { Status } from "@/types/Status";
import { RegionStatus } from "@/types/RegionStatus";

// TODO Move to the config file
const META_OG_CONFIG = {
  "og:site_name": "Alert.Org.Ua",
  "og:type": "website",
  "og:url": "https://alert.org.ua/",
  "og:image": "https://alert.org.ua/ukraine.svg",
};

const getInDangerTitle = (regionStatuses: RegionStatus[]) =>
  regionStatuses.length > 0
    ? `❗${
        regionStatuses.length === 1
          ? regionStatuses[0].region.id
          : regionStatuses.length + " regionStatuses are"
      }   in danger right now`
    : `💛 💙 Looks like all regionStatuses are safe`;

const getInDangerDescription = (regionStatuses: RegionStatus[]) => {
  let regionsList = regionStatuses
    .map((regionStatus: RegionStatus) => regionStatus.region.id)
    .join(", ");
  return regionStatuses.length > 0
    ? `❗❗ ${regionsList} are in a danger right now`
    : `💛 💙  Looks like all regionStatuses are safe`;
};

const loadRegionsStatuses = async () => {
  const statusService = new TelegramRegionStatusService();
  let regionStatuses: RegionStatus[] = [];
  for (let region of new RegionRepository().getAll()) {
    try {
      regionStatuses.push(await statusService.getRegionStatus(region.id));
    } catch (e) {
      console.log(region.id, " is absent in the Telegram feed");
      regionStatuses.push(new RegionStatus(region, Status.OK));
    }
  }
  return regionStatuses;
};

// TODO Move titles to the i18n level
const getOgImage = (regionStatuses: RegionStatus[]) =>
  META_OG_CONFIG["og:image"] +
  "?" +
  regionStatuses
    .map((regionStatus: RegionStatus) => regionStatus.region.id)
    .join(",");

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
  metaInfo() {
    const regionsInADanger = this.regionStatuses.filter(
      (regionStatus: RegionStatus) => regionStatus.status === Status.ALERT
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
