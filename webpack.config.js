const webpack = require('webpack');
const WebpackBar = require('webpackbar');
const merge = require('webpack-merge');
const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const ExtractTextPlugin = require('extract-text-webpack-plugin');

const argv = require('yargs-parser')(process.argv.slice(2));

const { mode } = argv;
const isDev = mode === 'development';

const mergeConfig = isDev ? require('./webpack/webpack.config.dev') : require('./webpack/webpack.config.prod');

const file_entry = require('./webpack/webpack.config.entry');


const APP_DIR = path.resolve(__dirname, 'src/js');
const BUILD_DIR = path.resolve(__dirname, 'dist/js/');
const ASSETS_PATH = path.resolve(__dirname, 'dist/assets/');


const jsConfig = {
    mode,
    devtool: isDev ? 'cheap-eval-source-map' : '',
    context: APP_DIR,
    entry: {
        ...file_entry.js,
    },
    output: {
        filename: '[name].bundle.js',
        path: BUILD_DIR,

        publicPath: 'dist/js/',
        chunkFilename: '[name].bundle.js?v=[chunkhash]',
    },
    resolve: {
        alias: {
            vendor: path.join(__dirname, '/src/js/vendor'),
            lib: path.join(__dirname, '/src/js/lib'),
            vue: 'vue/dist/vue.js',
            router: path.join(__dirname, '/src/js/router'),
            components: path.join(__dirname, '/src/js/components'),
        },
        extensions: ['.vue', '.jsx', '.js', '.json'],
    },
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            include: APP_DIR,
            exclude: /node_modules/,
            loader: 'babel-loader',
        },
        {
            test: /\.vue$/,
            loader: 'vue-loader',
        },
        {
            test: /\.css$/,
            use: [
                'vue-style-loader',
                'css-loader',
            ],
        },
        ],
    },
    plugins: [
    // // make sure to include the plugin!
        new VueLoaderPlugin(),
        new ExtractTextPlugin('../css/[name].css'),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            jquery: 'jquery',
            'window.jQuery': 'jquery',
            moment: 'moment',
        }),
        /*
            https://github.com/nuxt/webpackbar
         */
        new WebpackBar({
            name: ' ------ JS Bundle ------ ',
            color: '#f79420',
        }),
    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
                default: false,
                node_modules: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'chunk/node_modules',
                    chunks: 'all',
                    minSize: 10,
                    // minChunks: 1
                },
                vendor: {
                    test: /[\\/]js[\\/]vendor[\\/]/,
                    name: 'chunk/vendor',
                    chunks: 'initial',
                    minSize: 100,
                    minChunks: 1,
                },

                ...file_entry.js_dynamic_group,
            },
        },
    },

};


let cssConfig = {
    mode,
    devtool: isDev ? 'cheap-eval-source-map' : '',
    entry: {
        ...file_entry.css,
    },
    output: {
        filename: './css_del/[name].bundle.css.js',
        path: BUILD_DIR,
    },
    resolve: {
        alias: {

        },
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            url: false,
                        },
                    },
                    'postcss-loader',
                ],
            },
            {
                test: /\.(sa|sc)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            url: false,
                        },
                    },
                    'postcss-loader',
                    'sass-loader',
                ],
            },
        ],
    },
    plugins: [
        /*
            https://github.com/webpack-contrib/mini-css-extract-plugin
        */
        new MiniCssExtractPlugin({
            filename: '../css/[name].css',
        }),
        /*
            https://github.com/nuxt/webpackbar
         */
        new WebpackBar({
            name: ' ------ CSS Bundle ------ ',
            color: '#009fba',
        }),
    ],
};

if (mode === 'production') {
    cssConfig = {
        ...cssConfig,
        performance: {
            hints: 'warning',
            maxEntrypointSize: 26214400,
            maxAssetSize: 524288,
        },
    };
}




const baseConfig = {
    jsConfig,
    cssConfig,
};

module.exports = merge.multiple(baseConfig, mergeConfig);

