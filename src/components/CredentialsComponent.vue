<template>
  <div class="creds">
    <small v-html="credentials"></small>
  </div>
</template>

<script>
export default {
  data() {
    return {
      credentials: process.env.VUE_APP_CREDENTIALS,
    };
  },
};
</script>

<style scoped>
.creds {
  bottom: 0px;
  right: 0px;
  position: absolute;
  text-align: right;
  line-height: 14px;
}
</style>
