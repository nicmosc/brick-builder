const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');


const jsDirs = [
  path.resolve(__dirname, 'src'),
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
    // publicPath: 'bundle',
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
    rules: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      use: [{
        loader: 'babel-loader',
      }]
    }, {
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [ autoprefixer, cssnano({ safe: true }) ],
            }
          }
        ],
      }),
    }, {
      test: /\.less$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [ autoprefixer, cssnano({ safe: true }) ],
            },
          },
          {
            loader: 'less-loader',
          },
        ],
      }),
    }, {
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
    }, {
      test: /\.png$/,
      use: [{
        loader: 'url-loader',

        options: {
          limit: 10000,
          mimetype: 'image/png',
          name: '/[name].[ext]'
        }
      }],
    // }, {
    //   test: /\.html$/,
    //   use: [{
    //     loader: 'file-loader',
    //     options: {
    //       name: '../index.html'
    //     }
    //   }, {
    //     loader: 'extract-loader'
    //   }, {
    //     loader: 'html-loader',
    //     options: {
    //       minimize: false,
    //     }
    //   }],
    }],
  },
};
