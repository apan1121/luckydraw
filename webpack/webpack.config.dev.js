const jsConfig = {
    /**
     *  監視資料夾模式
     *  https://webpack.docschina.org/configuration/watch/
     * */
    watchOptions: {
        /**
         * 忽略 node_modules 資料夾
         */
        ignored: /node_modules/,
        /*
            当第一个文件更改，会在重新构建前增加延迟。
            (ms)
         */
        aggregateTimeout: 500,
    },
    /**
     * https://webpack.docschina.org/configuration/performance/
     */
    performance: {
        /* 当找到提示时，告诉 webpack 抛出一个错误或警告 */
        hints: false,
    },
};

const cssConfig = {
    /**
     *  監視資料夾模式
     *  https://webpack.docschina.org/configuration/watch/
     * */
    watchOptions: {
        /**
         * 忽略 node_modules 資料夾
         */
        ignored: /node_modules/,
        /*
            当第一个文件更改，会在重新构建前增加延迟。
            (ms)
         */
        aggregateTimeout: 500,
    },
    /**
     * https://webpack.docschina.org/configuration/performance/
     */
    performance: {
        /* 当找到提示时，告诉 webpack 抛出一个错误或警告 */
        hints: false,
    },
};

const baseConfig = {
    jsConfig,
    cssConfig,
};

module.exports = baseConfig;