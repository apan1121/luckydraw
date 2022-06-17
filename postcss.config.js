module.exports = {
    plugins: [
        require('autoprefixer')({
            overrideBrowserslist: 'last 5 versions, not ie <= 8',
        }),
    ],
};