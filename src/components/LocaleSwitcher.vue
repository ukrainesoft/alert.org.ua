<template>
  <div class="locale" @click="changeLang">
    {{ $i18n.locale }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  methods: {
    changeLang() {
      let locale = this.$i18n.locale;
      let locales = Object.values(this.$i18n.availableLocales);
      this.$i18n.locale =
        locales[(locales.indexOf(locale) + 1) % locales.length];
    },
  },
});
</script>

<style scoped>
.locale {
  width: 30px;
  text-align: center;
  bottom: 10px;
  left: 60px;
  position: absolute;
  cursor: pointer;
  color: var(--secondary-color);
  border: solid 1px var(--secondary-color);
  padding: 3px;
  margin: 2px;
  border-radius: 5px;
}
</style>
