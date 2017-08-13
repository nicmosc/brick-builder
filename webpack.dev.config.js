const path = require('path');
const webpack = require('webpack');
const webpackBaseConfig = require('./webpack.base.config.js');


module.exports = Object.assign({}, webpackBaseConfig, {
  devtool: 'source-map',
  output: Object.assign({}, webpackBaseConfig.output, {
    path: path.resolve(__dirname, 'docs', 'bundle'),
    publicPath: '/bundle',
    sourceMapFilename: "[name].bundle.js.map",
    filename: '[name].bundle.js',
  }),
  plugins: [
    ...webpackBaseConfig.plugins,
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify('development') }
    }),
    new webpack.LoaderOptionsPlugin({
      debug: true,
    })
  ],
});
