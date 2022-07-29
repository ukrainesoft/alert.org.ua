<template>
  <div>
    <Icon
      v-for="socialNetworkIcon of socialNetworkIconsData"
      :key="socialNetworkIcon.icon"
      :icon="socialNetworkIcon.icon"
      @click="navigate(socialNetworkIcon.url, socialNetworkIcon.params)"
    />
  </div>
</template>

<script lang="ts">
import { Icon } from "@iconify/vue";

export default {
  components: { Icon },
  data() {
    const socialNetworkIconsData: SocialNetworkIconData[] =
      getSocialNetworkIconsData();
    return {
      socialNetworkIconsData,
    };
  },
  methods: {
    navigate(socialUrl: string, paramsObject: Record<string, string>) {
      const params = new URLSearchParams(paramsObject).toString();
      const url = new URL(socialUrl);
      url.search = params;

      window.open(url.toString(), "_blank");
    },
  },
};

type SocialNetworkIconData = {
  icon: string;
  url: string;
  params: Record<string, string>;
};

function getSocialNetworkIconsData(): SocialNetworkIconData[] {
  return [
    {
      icon: "cib:twitter",
      url: "https://twitter.com/share",
      params: {
        url: document.location.href,
        text: document.title,
      },
    },
    {
      icon: "cib:facebook-f",
      url: "https://www.facebook.com/sharer/sharer.php",
      params: {
        u: document.location.href,
      },
    },
    {
      icon: "cib:whatsapp",
      url: "https://api.whatsapp.com/send",
      params: {
        text: document.location.href,
      },
    },
    {
      icon: "cib:viber",
      url: "viber://forward",
      params: {
        text: document.location.href,
      },
    },
    {
      icon: "cib:telegram-plane",
      url: "https://telegram.me/share/url",
      params: {
        url: document.location.href,
      },
    },
  ];
}
</script>

<style scoped>
div {
  position: absolute;
  top: 48px;
  right: 20px;
  width: 18px;
}
svg {
  color: var(--secondary-color);
  border: solid 1px var(--secondary-color);
  padding: 3px;
  margin: 2px;
  border-radius: 5px;
  width: 100%;
  height: 100%;
}
</style>
