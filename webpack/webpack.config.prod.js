const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const Cssnano = require('cssnano');

const argv = require('yargs-parser')(process.argv.slice(2));

const isAnalyzer = !!argv.analyzer;

const jsConfig = {
    plugins: [
        // new BundleAnalyzerPlugin(),
    ],
    performance: {
        hints: 'warning',
        maxEntrypointSize: 26214400,
        maxAssetSize: 524288,
    },
};

if (isAnalyzer) {
    jsConfig.plugins.push(
        new BundleAnalyzerPlugin(),
    );
}

const cssConfig = {
    plugins: [
        new OptimizeCssAssetsPlugin({
            cssProcessor: Cssnano,
            cssProcessorOptions: {
                discardComments: {
                    removeAll: true,
                },
            },
            canPrint: false,
        }),
    ],
    performance: {
        hints: 'warning',
        maxEntrypointSize: 26214400,
        maxAssetSize: 524288,
    },
};

const baseConfig = {
    jsConfig,
    cssConfig,
};

module.exports = baseConfig;