const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
  template: 'public/index.html',
  filename: 'index.html',
  hash: true,
  excludeChunks: ['polyfills'],
  inject: 'body',
});
const ExtractTextPlugin = require('extract-text-webpack-plugin');

var config = {
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
    filename: 'static/js/[name].js',
    chunkFilename:'static/js/[name].chunk.js',
    devtoolModuleFilenameTemplate: info =>
    path.resolve(info.absoluteResourcePath).replace(/\\/g, '/'),
  },
  externals: {
    jquery: 'jQuery',
    tether: 'Tether'
  },
  module: {
    rules: [
      { test: /\.(js|jsx)$/, include: [path.resolve(__dirname, '../app')], use: ['babel-loader'] },
      {
        test: /\.css$/, include: [path.resolve(__dirname, '../app')],
        use: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: false,
                importLoaders: 0,
                localIdentName: '[name]__[local]___[hash:base64:5]'
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss',
                plugins: () => [
                  require('postcss-flexbugs-fixes'),
                  autoprefixer({
                    browsers: [
                      '>1%',
                      'last 4 versions',
                      'Firefox ESR',
                      'not ie < 9',
                    ],
                    flexbox: 'no-2009'
                  })
                ]
              }
            }]
        }))
      },
      {
        test: /\.scss$/, include: [path.resolve(__dirname, '../app')],
        use: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [{
            loader: 'css-loader',
            options: {
              modules: false,
              importLoaders: 2,
              localIdentName: '[name]__[local]___[hash:base64:5]'
            }
          },
          {
            loader: 'sass-loader',
            options: {
              includePaths: [path.resolve(__dirname, '../app')]
            }
          }]
        }))
      },
      { test: /\.(png|jpg|gif)$/, use: ['file-loader'] },
      { test: /\.(woff|woff2|eot|ttf|otf)$/, use: ['file-loader'] }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
};

module.exports = {config,HTMLWebpackPluginConfig};