var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var vendors_dir = path.join(__dirname, "/Scripts/vendors");

var config = {
    entry: {
        app: [
            'webpack-dev-server/client?http://localhost:8080',
            'webpack/hot/only-dev-server',
            './Scripts/app/app.js'
        ],
        vendors: ["es5-sham", "es5-shim", "es6-promise", "fetch", "jquery", "jquery-valiation",
            "bootstrap", "react", "react-dom", "react-router", "redux", "redux-redux", "redux-thunk",
            "toastr"]
    },
    output: {
        path: 'build',
        filename: 'bundle.js'
    },
    module: {
        loaders: [{
                test: /\.js$/,
                exclude: /(node_modules|vendors)/,
                loader: 'babel',
                query: {
                    presets: ["es2015", "react", "stage-0"]
                }
            },
            { test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader') },
            { test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/font-woff' },
            { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream' },
            { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file' },
            { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml' }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            'window.jQuery': 'jquery'
        }),
        new webpack.optimize.CommonsChunkPlugin("vendors", "vendors.js"),
        new ExtractTextPlugin("build.css"),
        new webpack.IgnorePlugin(/vertx/),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.NoErrorsPlugin()
    ],
    noParse: [
        /[\/\\]node_modules.*/,
    ],
    resolve: {
        alias: {}
    },
    addVendor: function (name, path) {
        this.resolve.alias[name] = path;
        this.noParse.push(new RegExp(path));
    },
};

config.addVendor("babel-polyfill", vendors_dir + "/babel-polyfill/polyfill.js");
config.addVendor("es5-sham", vendors_dir + "/es5-shim/es5-sham.js");
config.addVendor("es5-shim", vendors_dir + "/es5-shim/es5-shim.js");
config.addVendor("es6-promise", vendors_dir + "/es6-promise/es6-promise.js");
config.addVendor("fetch", vendors_dir + "/whatwg-fetch/fetch.js");
config.addVendor("jquery", vendors_dir + "/jquery/jquery.js");
config.addVendor("jquery-valiation", vendors_dir + "/jquery-validation/jquery.validate.js");
config.addVendor("bootstrap", vendors_dir + "/bootstrap/bootstrap.js");
config.addVendor("react", vendors_dir + "/react/react.js");
config.addVendor("react-dom", vendors_dir + "/react-dom/react-dom.js");
config.addVendor("react-router", vendors_dir + "/react-router/ReactRouter.js");
config.addVendor("redux", vendors_dir + "/redux/redux.js");
config.addVendor("redux-redux", vendors_dir + "/react-redux/react-redux.js");
config.addVendor("redux-thunk", vendors_dir + "/redux-thunk/redux-thunk.js");
config.addVendor("toastr", vendors_dir + "/toastr/toastr.min.js");

module.exports = config;