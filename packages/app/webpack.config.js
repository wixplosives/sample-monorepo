const { join } = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const monorepoRoot = join(__dirname, '..', '..');

module.exports = {
    devtool: 'source-map',
    context: monorepoRoot,
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
        extensions: ['.ts', '.tsx', '.mjs', '.js', '.json'],
        plugins: [new TsconfigPathsPlugin({ configFile: join(monorepoRoot, 'tsconfig.json') })]
    },
    plugins: [
        new HtmlWebpackPlugin({ title: 'Sample Monorepo App' }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[name].css'
        })
    ]
};
