const BabelRcPlugin = require("@jackwilsdon/craco-use-babelrc");
const { WebpackPluginRamdisk } = require("webpack-plugin-ramdisk");
const { ESLINT_MODES } = require("@craco/craco");

module.exports = {
  eslint: {
    enable: false,
  },

  webpack: {
    alias: {},
    plugins: [],
    configure: (config, { env, paths }) => {
      config.module.rules.push({
        test: /react-spring/,
        sideEffects: true,
      });
      return config;
    },
  },

  plugins: [
    {
      plugin: BabelRcPlugin,
    },
  ],
};
