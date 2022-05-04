<template>
  <div class="popup">
    <div class="content">
      {{
        $t(
          "message.region_info_region_status_" + regionInfo.regionStatus.status,
          {
            region: $t("region." + regionInfo.id),
          }
        )
      }}
      <div v-if="regionInfo.regionStatus.date">
        <span v-if="formattedDate.d">
          {{ $t("message.region_info_days", formattedDate.d) }}
        </span>
        <span v-if="formattedDate.h">
          {{ $t("message.region_info_hours", formattedDate.h) }}
        </span>

        <span v-if="formattedDate.m">
          {{ $t("message.region_info_minutes", formattedDate.m) }}
        </span>
      </div>
    </div>
    <div class="close" @click="$emit('close')">&times;</div>
  </div>
</template>

<script lang="ts">
import { RegionInfo } from "@/types/RegionInfo";
import { defineComponent } from "@vue/runtime-core";
export default defineComponent({
  emits: ["close"],
  props: {
    regionInfo: {
      type: RegionInfo,
    },
  },
  computed: {
    formattedDate() {
      if (!this.regionInfo?.regionStatus.date) {
        return "";
      }
      let timeInSec =
        (+new Date() - +this.regionInfo?.regionStatus.date) / 1000;
      return {
        d: Math.floor(timeInSec / 86400),
        h: Math.floor((timeInSec % 86400) / 3600),
        m: Math.floor((timeInSec % 3600) / 60),
      };
    },
  },
});
</script>

<style scoped>
span {
  margin-right: 5px;
}

.popup {
  margin: 40vh auto;
  padding: 20px;
  background: #fff;
  border-radius: 5px;
  width: 30%;
  top: 0;
  left: 0;
  right: 0;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: all 0.5s ease-in-out;
  border: 1px solid #cbcbcb;
  font-size: 18px;
}

.popup .close {
  font-size: 30px;
  font-weight: bold;
  text-decoration: none;
  cursor: pointer;
}
@media screen and (max-width: 700px) {
  .popup {
    width: 70%;
  }
}
</style>
