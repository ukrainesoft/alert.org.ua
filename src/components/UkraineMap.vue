<template>
  <svg
    width="1000"
    height="670"
    viewBox="0 0 1000 670"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g id="map">
      <g id="Regions">
        <Region
          v-for="region in regions"
          :key="region.id"
          :title="region.title"
          :titleX="region.titleX"
          :titleY="region.titleY"
          :fontSize="region.fontSize"
          :d="region.d"
        />
      </g>
    </g>
  </svg>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Region from "./Region.vue";
import regions from "../data/regions.json";

export default defineComponent({
  components: { Region },
  name: "UkraineMap",
  data() {
    return {
      regions,
    };
  },
});
</script>
