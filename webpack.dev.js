const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        port: 3000,
        hot: true,
        static: {
            directory: path.join(__dirname, 'dist'),
            publicPath: '/',
        },
        historyApiFallback: true,
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
        chunkFilename: '[name].chunk.js',
        publicPath: '/', // 关键：让所有静态资源用绝对路径
    }
});