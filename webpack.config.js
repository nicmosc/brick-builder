const path = require('path');
const webpack = require('webpack');
const webpackBaseConfig = require('./webpack.base.config.js');


module.exports = Object.assign({}, webpackBaseConfig, {
  devtool: 'source-map',
  output: Object.assign({}, webpackBaseConfig.output, {
    path: path.resolve(__dirname, 'docs', 'bundle'),
    publicPath: '/bundle',
    sourceMapFilename: "[name].bundle.min.js.map",
    filename: '[name].bundle.min.js',
  }),
  plugins: [
    ...webpackBaseConfig.plugins,
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify('production') }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      output: {
        comments: false,
      },
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
    }),
  ],
});
