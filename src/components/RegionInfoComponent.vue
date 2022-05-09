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
      <TimeSpan :date="regionInfo.regionStatus.date" />
    </div>
    <div class="close" @click="$emit('close')">&times;</div>
  </div>
</template>

<script lang="ts">
import { RegionInfo } from "@/types/RegionInfo";
import { defineComponent } from "@vue/runtime-core";
import { getDatesDiff } from "@/components/utils/date";
import TimeSpan from "./views/TimeSpan.vue";

export default defineComponent({
  components: { TimeSpan },
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
      return getDatesDiff(this.regionInfo?.regionStatus.date, new Date());
    },
  },
});
</script>

<style scoped>
.popup {
  margin: 40vh auto;
  padding: 20px;
  background: var(--background-color);
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
.dark .popup {
  background: var(--background-dark-color);
}
.popup .close {
  font-size: 30px;
  font-weight: bold;
  text-decoration: none;
  cursor: pointer;
}
.popup .content {
  width: 100%;
  text-align: center;
}
@media screen and (max-width: 700px) {
  .popup {
    width: 70%;
  }
}
</style>
