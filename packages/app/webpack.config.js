const {join} = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

exports.entry = './src/client-bootstrap'

exports.output = {
    path: join(__dirname, 'umd')
}

exports.module = {
    rules: [
        {
            test: /\.tsx?$/,
            loader: '@ts-tools/webpack-loader'
        }
    ]
}

exports.resolve = {
    extensions: ['.ts', '.tsx', '.mjs', '.js', '.json']
}

exports.plugins = [
    new HtmlWebpackPlugin({title: 'Sample Monorepo App'})
]
