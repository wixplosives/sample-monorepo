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
            loader: 'ts-loader',
            options: {
                compilerOptions: {
                    declaration: false,
                    declarationMap: false,
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