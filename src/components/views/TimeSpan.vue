<template>
  <span v-if="dateDiff.d">
    {{ $t("message.region_info_days", dateDiff.d) }}
  </span>
  <span v-if="dateDiff.h">
    {{ $t("message.region_info_hours", dateDiff.h) }}
  </span>

  <span v-if="dateDiff.m">
    {{ $t("message.region_info_minutes", dateDiff.m) }}
  </span>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import { getDatesDiff } from "../utils/date";

export default defineComponent({
  name: "TimeSpan",
  props: {
    date: {
      type: Date,
      required: true,
    },
  },
  computed: {
    dateDiff() {
      return getDatesDiff(this.date || new Date(), new Date());
    },
  },
});
</script>

<style>
span {
  margin-right: 5px;
}
</style>
