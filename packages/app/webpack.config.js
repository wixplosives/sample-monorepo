const { join, dirname } = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const rootTsconfigPath = require.resolve('../../tsconfig.json');
const monorepoRoot = dirname(rootTsconfigPath);

module.exports = {
    devtool: 'source-map',
    context: monorepoRoot,
    entry: join(__dirname, 'src', 'client-main'),
    output: {
        path: join(__dirname, 'umd'),
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: '@ts-tools/webpack-loader',
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.mjs', '.js', '.json'],
        plugins: [new TsconfigPathsPlugin({ configFile: rootTsconfigPath })],
    },
    plugins: [
        new HtmlWebpackPlugin({ title: 'Sample Monorepo App' }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[name].css',
        }),
    ],
};
