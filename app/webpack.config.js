const HtmlWebpackPlugin = require('html-webpack-plugin')

exports.entry = './src/client-bootstrap'

exports.module = {
    rules: [
        {
            test: /\.tsx?$/,
            loader: 'ts-loader',
            options: {
                compilerOptions: {
                    declaration: false,
                    module: 'esnext'
                }
            }
        }
    ]
}

exports.resolve = {
    extensions: ['.ts', '.tsx', '.mjs', '.js', '.json']
}

exports.plugins = [
    new HtmlWebpackPlugin()
]