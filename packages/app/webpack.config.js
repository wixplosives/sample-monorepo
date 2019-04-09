const { join } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    devtool: 'source-map',
    // root of the monorepo, so that paths in output will be clickable
    context: join(__dirname, '..', '..'),
    entry: join(__dirname, 'src', 'client-bootstrap'),
    output: {
        path: join(__dirname, 'umd')
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: '@ts-tools/webpack-loader'
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.mjs', '.js', '.json']
    },
    plugins: [
        new HtmlWebpackPlugin({ title: 'Sample Monorepo App' }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css'
        })
    ]
};
