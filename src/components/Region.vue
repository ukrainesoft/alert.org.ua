<template>
  <path
    :d="d"
    :fill="fill"
    :stroke="stroke"
    :stroke-width="strokeWidth"
    :stroke-linecap="strokeLinecap"
    :stroke-linejoin="strokeLinejoin"
  />
  <text
    :fill="textFill"
    :stroke="textStroke"
    xml:space="preserve"
    style="white-space: pre"
    :font-family="fontFamily"
    :font-size="fontSize"
    :letter-spacing="letterSpacing"
  >
    <tspan v-if="title && titleX && titleY" :x="titleX" :y="titleY">
      {{ title }}
    </tspan>
  </text>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "BaseRegion",
  props: {
    d: { type: String }, // D property of the path in the svg
    title: { type: String, default: "" },
    titleX: { type: Number },
    titleY: { type: Number },
    fill: { type: String, default: "#777777" },
    textFill: { type: String, default: "#ffffff" },
    stroke: { type: String, default: "white" },
    textStroke: { type: String, default: "#ffffff" },
    strokeWidth: { type: String, default: "2" },
    strokeLinecap: { type: String, default: "round" },
    strokeLinejoin: { type: String, default: "round" },
    fontFamily: { type: String, default: "Roboto Slab" },
    fontSize: { type: Number, default: 22 },
    letterSpacing: { type: Number, default: 0 },
  },
});
</script>
