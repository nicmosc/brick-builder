const path = require('path');
const webpack = require('webpack');

const webpackBaseConfig = require('./webpack.base.config.js');


module.exports = Object.assign({}, webpackBaseConfig, {
  devtool: 'inline-source-map',
  entry: Object.keys(webpackBaseConfig.entry).reduce((result, k) => {
    result[k] = [
      // 'react-hot-loader/patch',
      // 'webpack/hot/only-dev-server',
      ...webpackBaseConfig.entry[k],
    ];
    return result;
  }, {}),
  output: Object.assign({}, webpackBaseConfig.output, {
    publicPath: '/',
  }),
  plugins: [
    ...webpackBaseConfig.plugins,
    // new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify('development') }
    }),
  ],
   devServer: {
    host: '0.0.0.0',
    port: '4000',
    // inline: true,
    // hot: true,
    stats: {
      assets: true,
      colors: true,
      version: false,
      hash: false,
      timings: false,
      chunks: false,
      chunkModules: false,
    },
    historyApiFallback: true,
    contentBase: 'server',
    publicPath: '/',
    quiet: false,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': 'false'
    },
  },
});
