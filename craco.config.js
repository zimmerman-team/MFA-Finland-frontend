// const reactHotReloadPlugin = require('craco-plugin-react-hot-reload');
const BabelRcPlugin = require("@jackwilsdon/craco-use-babelrc");
const { WebpackPluginRamdisk } = require("webpack-plugin-ramdisk");

const { ESLINT_MODES } = require("@craco/craco");

module.exports = {
  eslint: {
    enable: false,
    // mode: ESLINT_MODES.file,
  },

  webpack: {
    alias: {
      // 'react-dom': '@hot-loader/react-dom',
    },
    plugins: [
      // new StyleLintPlugin({
      //   configBasedir: __dirname,
      //   context: path.resolve(__dirname, 'src'),
      //   files: ['**/*.tsx', '**/*.ts'],
      // }),
      // new WebpackPluginRamdisk(),
    ],
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
      // plugin: reactHotReloadPlugin,
      plugin: BabelRcPlugin,
    },
  ],
};