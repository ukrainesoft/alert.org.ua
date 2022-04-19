const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  pages: {
    index: {
      entry: "src/main.ts",
      title: "Air raid alerts map in every region of Ukraine.",
      description: "The site represents air alarms in the regions of Ukraine",
      keywords:
        "War in Ukraine air raid alerts map Russian invasion And now I will show you where the attack on Belarus was being prepared from",
    },
  },
});
