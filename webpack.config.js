const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './app/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "index_bundle.js",
        publicPath: "/"
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env', 'react']
                    }
                }
            }

        ]
    },
    devServer: {
        historyApiFallback: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'app/index.html'
        })
    ]
}