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
    stroke-width="0.1"
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
export default {
  props: {
    d: { type: String }, // D property of the path in the svg
    title: { type: String, default: "" },
    titleX: { type: Number },
    titleY: { type: Number },
    fill: { type: String, default: "#777777" },
    textFill: { type: String, default: "#ffffff" },
    stroke: { type: String, default: "white" },
    textStroke: { type: String, default: "#ffffff" },
    strokeWidth: { type: String, default: "1" },
    strokeLinecap: { type: String, default: "round" },
    strokeLinejoin: { type: String, default: "round" },
    fontFamily: { type: String, default: "Roboto Slab" },
    fontSize: { type: Number, default: 22 },
    letterSpacing: { type: Number, default: 0 },
  },
};
</script>
