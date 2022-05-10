<template>
  <div
    class="legend"
    v-if="
      sortedRegionStatusesInAlert.length === 0 &&
      sortedRegionStatusesInSafe.length > 0
    "
  >
    {{ $t("message.country_info_safe_title") }}
    <TimeSpan :date="sortedRegionStatusesInSafe[0].date" />
  </div>
</template>

<script lang="ts">
import { RegionStatus } from "@/types/RegionStatus";
import { Status } from "@/types/Status";
import { defineComponent, PropType } from "@vue/runtime-core";
import TimeSpan from "./views/TimeSpan.vue";

export default defineComponent({
  components: { TimeSpan },
  props: {
    regionStatuses: {
      type: Array as PropType<RegionStatus[]>,
      required: true,
    },
  },
  computed: {
    sortedRegionStatusesInAlert(): RegionStatus[] {
      return getSortedListByStatus(this.regionStatuses, Status.ALERT);
    },
    sortedRegionStatusesInSafe(): RegionStatus[] {
      return getSortedListByStatus(this.regionStatuses, Status.OK);
    },
  },
});

function getSortedListByStatus(
  regionStatuses: RegionStatus[],
  status: Status
): RegionStatus[] {
  return regionStatuses
    .filter((regionStatus) => regionStatus.status === status)
    .sort((a, b) => Number(b.date || 0) - Number(a.date || 0));
}
</script>

<style scoped>
div.legend {
  border-radius: 5px;
  align-items: center;
  text-align: center;
  justify-content: space-between;
  font-size: 24px;
  bottom: 10px;
  position: absolute;
  padding: 2vh 2vw;
  margin: 0 10% 0px auto;
  color: var(--primary-color);
}
@media screen and (max-width: 650px) {
  div.legend {
    bottom: 10vh;
  }
}
</style>
