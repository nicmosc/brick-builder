const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');


const jsDirs = [
  path.resolve(__dirname, 'src/app'),
  path.resolve(__dirname, 'src/engine'),
];


module.exports = {
  resolve: {
    extensions: ['.js', '.jsx', '.less'],
    modules: [...jsDirs, 'node_modules'],
  },
  entry: {
    builder: [ './src/main.js' ],
  },
  externals: {
    jquery: 'jQuery',
  },
  output: {
    path: path.resolve(__dirname, 'docs'),
    publicPath: '',
    filename: '[name].bundle.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Lego Builder',
      template: path.resolve(__dirname, 'index.html'),
    }),
    new ExtractTextPlugin('styles.css'),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: jsDirs,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [ 'react', ['latest', { 'es2015': { 'modules': false } }], 'stage-0' ],
              plugins: [ 'react-hot-loader/babel' ],
            },
          }
        ],
      },
      {
        test: /\.css/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
                localIdentName: '[name]__[local]--[hash:base64:5]',
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true,
                plugins: () => [ autoprefixer, cssnano({ safe: true }) ],
              },
            },
          ],
        }),
      },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
                localIdentName: '[name]__[local]--[hash:base64:5]',
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true,
                plugins: () => [ autoprefixer, cssnano({ safe: true }) ],
              },
            },
            {
              loader: 'less-loader',
              options: {
                sourceMap: true,
              },
            },
          ],
        }),
      },
      {
        test: /\.woff([^2].*)?$/,
        use: [{
          loader: 'file-loader',

          options: {
            name: '/[name].[ext]'
          }
        }],
      }, {
        test: /\.woff2(.*)?$/,
        use: [{
          loader: 'file-loader',

          options: {
            name: '/[name].[ext]'
          }
        }],
      }, {
        test: /\.ttf(.*)?$/,
        use: [{
          loader: 'file-loader',

          options: {
            name: '/[name].[ext]'
          }
        }],
      }, {
        test: /\.eot(.*)?$/,
        use: [{
          loader: 'file-loader',

          options: {
            name: '/[name].[ext]'
          }
        }],
      }, {
        test: /\.otf$/,
        use: [{
          loader: 'file-loader',

          options: {
            name: '/[name].[ext]'
          }
        }],
      }, {
        test: /\.svg(.*)?$/,
        use: [{
          loader: 'url-loader',

          options: {
            limit: 10000,
            mimetype: 'image/svg+xml',
            name: '/[name].[ext]'
          }
        }],
      }, {
        test: /\.jpg$/,
        use: [{
          loader: 'url-loader',

          options: {
            limit: 10000,
            mimetype: 'image/jpg',
            name: '/[name].[ext]'
          }
        }],
      },
      {
        test: /\.png$/,
        use: [{
          loader: 'url-loader',

          options: {
            limit: 10000,
            mimetype: 'image/png',
            name: '/[name].[ext]'
          }
        }],
      }
    ],
  },
};
