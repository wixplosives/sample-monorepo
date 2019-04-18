const { join } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack')

module.exports = {
    devServer: {
        stats: "minimal",
        hot: true
    },
    stats: "minimal",
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
        extensions: ['.ts', '.tsx', '.mjs', '.js', '.jsx', '.json'],
        alias:{
            "react-dom":"@hot-loader/react-dom"
        }
    },
    plugins: [
        //new webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)}),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new HtmlWebpackPlugin({ title: 'Sample Monorepo App' }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[name].css'
        })
    ]
};

//instead of dev/prod configs, i usually do a base, dev, and prod all in 1 file, and do something like config = env === 'prod' ? prod : dev
//use webpack merge create the 2+ configs from the base, then just 
//module.exports = config
