<template>
  <div>
    <TwitterButton btnText="" />
    <FacebookButton btnText="" />
    <ViberButton btnText="" />
    <WhatsAppButton btnText="" />
    <TelegramButton btnText="" />
  </div>
</template>

<script lang="ts">
import TwitterButton from "vue-share-buttons/src/components/TwitterButton.vue";
import FacebookButton from "vue-share-buttons/src/components/FacebookButton.vue";
import TelegramButton from "vue-share-buttons/src/components/TelegramButton.vue";
import ViberButton from "vue-share-buttons/src/components/ViberButton.vue";
import WhatsAppButton from "vue-share-buttons/src/components/WhatsAppButton.vue";

export default {
  components: {
    TwitterButton,
    FacebookButton,
    TelegramButton,
    ViberButton,
    WhatsAppButton,
  },
};
</script>

<style scoped>
div {
  position: absolute;
  top: 50px;
  right: 0px;
  text-align: right;
  line-height: 14px;
  display: flex;
  flex-direction: column;
}
</style>
