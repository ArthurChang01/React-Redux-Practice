const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const common = require('./webpack.common.js');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const ChunkManifestPlugin = require('chunk-manifest-webpack-plugin');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

common.HTMLWebpackPluginConfig.minify = {
    removeComments: true,
    collapseWhitespace: true,
    removeRedundantAttributes: true,
    useShortDoctype: true,
    removeEmptyAttributes: true,
    removeStyleLinkTypeAttributes: true,
    keepClosingSlash: true,
    minifyJS: true,
    minifyCSS: true,
    minifyURLs: true,
};

module.exports = merge(common.config, {
    entry: {
        main: [
            path.resolve(__dirname, '../app/index.js'),
        ],
        polyfills: path.resolve(__dirname, '../app/assets/polyfills.js'),
        vendor: [
            'react', 'react-dom', 'jquery-validation'
        ]
    },
    output: {
        filename: 'static/js/[name].[chunkhash:8].js',
        chunkFilename: 'static/js/[name].[chunkhash:8].chunk.js',
        // We inferred the "public path" (such as / or /my-project) from homepage.
        publicPath: '/',
        // Point sourcemap entries to original disk location (format as URL on Windows)
        devtoolModuleFilenameTemplate: info =>
            path
                .relative(paths.appSrc, info.absoluteResourcePath)
                .replace(/\\/g, '/'),
    },
    plugins: [
        new CleanWebpackPlugin(
            ["dist", "dist/static"], {
                root: path.resolve(__dirname, "..")
            }
        ),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"production"',
        }),
        new CopyWebpackPlugin([
            { from: path.resolve(__dirname, "../public/favicon.ico") },
            { from: path.resolve(__dirname, "../public/manifest.json") }
        ]),
        common.HTMLWebpackPluginConfig,
        new ExtractTextPlugin({
            filename: 'static/css/[name].[contenthash:8].css',
        }),
        new webpack.HashedModuleIdsPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: "vendor",
            minChunks: Infinity
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: "jquery",
            "window.jQuery": "jquery",
            "window.$": "jquery",
            Tether: "tether",
            'Popper': 'popper.js/dist/umd/popper'
        }),
        new UglifyJSPlugin(),
        new ManifestPlugin({
            fileName: 'asset-manifest.json',
        }),
        new SWPrecacheWebpackPlugin({
            dontCacheBustUrlsMatching: /\.\w{8}\./,
            filename: 'service-worker.js',
            logger(message) {
                if (message.indexOf('Total precache size is') === 0) {
                    return;
                }
                if (message.indexOf('Skipping static resource') === 0) {
                    return;
                }
                console.log(message);
            },
            minify: true,
            navigateFallback: 'index.html',
            navigateFallbackWhitelist: [/^(?!\/__).*/],
            staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/],
        }),

        new ChunkManifestPlugin({
            filename: "chunk-manifest.json",
            manifestVariable: "webpackManifest"
        }),
    ]
});