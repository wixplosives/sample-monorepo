// @ts-check

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const rootWebpackConfig = require('../../webpack.config.cjs');

/** @type import('webpack').Configuration */
module.exports = {
  ...rootWebpackConfig,
  entry: {
    main: require.resolve('./dist/client-main.js'),
  },
  output: {
    path: path.join(__dirname, 'dist/umd'),
    libraryTarget: 'umd',
  },
  plugins: [...rootWebpackConfig.plugins, new HtmlWebpackPlugin({ title: 'Sample Monorepo App' })],
};
