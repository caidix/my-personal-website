const path = require('path');
const HappyPack = require('happypack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const vueCSSLoader = require('../utils/vue-css-loader');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const staticPath = process.cwd();
module.exports = {
  entry: {
    index: staticPath + '/src/index.js'
  },
  output: {
    path: path.resolve(staticPath, 'dist'),
    filename: '[name].[hash].js',
    chunkFilename: '[name].[id].js'
  },
  module: {

    noParse: /lodash/,
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loader: {
            js: 'happypack/loader?id=happy-babel-js',
            ...vueCSSLoader.cssLoaders({
              sourceMap: true
            })
          }
        }
      },
      {
        test: '/\.jsx?$/',
        use: [{
          loader: 'happypack/loader?id=happy-eslint-js'
        }, {
          loader: 'babel-loader',
          options: {
            presets: ["@babel/env"],
            cacheDirectory: true
          }
        }],
        enforce: 'pre', // loader前置
        exclude: staticPath + '/node_modules/'
      },
      {
        test: /\.raw$/,
        loader: 'raw-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg|)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          outputPath: 'images/',
          limit: 10240,
          name: 'img/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.ico$/,
        loader: 'file-loader',
        options: {
          outputPath: 'images/',
          name: `img/[name].[ext]`
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          outputPath: 'images/',
          limit: 10240,
          name: `fonts/[name].[hash:7].[ext]`
        }
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.json', '.vue'],  // 引入依赖时可以省略后缀。将频率最高的后缀放在第一位，并且控制列表的长度，以减少尝试次数
    alias: { 'vue$': 'vue/dist/vue.esm.js' }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'template/template.html'
    }),
    new HardSourceWebpackPlugin(),
    new VueLoaderPlugin(),
    new HappyPack({
      id: 'happy-eslint-js',
      loaders: [{
        loader: 'eslint-loader',
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      }]
    }),
  ],
  // externals: {
  //   'lodash': 'lodash'
  // },
  target: 'web',
}