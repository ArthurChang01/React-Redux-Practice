const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = merge(common.config, {
    entry: {
        main: [
            'webpack-dev-server/client?http://localhost:8080',
            'webpack/hot/only-dev-server',
            path.resolve(__dirname, '../app/index.js'),
        ],
        polyfills: path.resolve(__dirname, '../app/assets/polyfills.js'),
        vendor: [
            'react', 'react-dom', 'jquery-validation'
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"development"',
        }),
        new CopyWebpackPlugin([
            {from: path.resolve(__dirname,"../public/favicon.ico")},
            {from: path.resolve(__dirname,"../public/manifest.json")}
        ]),
        common.HTMLWebpackPluginConfig,
        new ExtractTextPlugin({
            filename: 'style.bundle.css',
            disable: false,
            allChunks: true
        }),
        new webpack.HashedModuleIdsPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
          name: "vendor"
        }),
        new webpack.ProvidePlugin({
          $: 'jquery',
          jQuery: "jquery",
          "window.jQuery": "jquery",
          "window.$": "jquery",
          Tether: "tether",
          'Popper': 'popper.js/dist/umd/popper'
        }),
    ],
    devtool: 'inline-source-map',
    devServer: {
        contentBase: path.resolve(__dirname, '../dist'),
        hot: true
    },
});