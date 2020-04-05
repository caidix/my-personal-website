const merge = require('webpack-merge');
const path = require('path');
const webpack = require('webpack')
const baseConfig = require('./webpack.common.js');
module.exports = merge(baseConfig, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.s[ac]ss$/,
        use: [
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.styl(us)$/,
        use: ['vue-style-loader', 'css-loader', 'postcss-loader', 'stylus-loader']
      },
    ]
  },
  devServer: {
    contentBase: path.resolve(__dirname, '../dist'),
    port: 8080,
    hot: true,
    // hotOnly: false, hmr失效时是否刷新页面
    open: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
})