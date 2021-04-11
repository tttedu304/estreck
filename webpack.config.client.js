const htmlWebpack = require('html-webpack-plugin');
const WebpackBar = require('webpackbar');

module.exports = {
    stats: 'errors-only',
    entry: './src/client/index.js',
    output: {
        filename: '[contenthash].js',
        path: require('path').join(__dirname, 'dist/public/')
    },
    module: {
        rules: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            use: ['babel-loader']
        }, {
            test: /\.css$/,
            use: [
                'style-loader',
                {
                    loader: 'css-loader',
                    options: {
                        modules: {
                            localIdentName: '[local]-[hash:base64:6]'
                        }
                    }
                }
            ]
        }, {
            test: /\.(png|svg|jpe?g|gif)$/,
            use: [{
                loader: 'file-loader',
                options: {
                    outputPath: 'assets',
                    name: '[hash].[ext]'
                }
            }]
        }]
    },
    plugins: [
        new WebpackBar({
            name: 'Estreck Front'
        }),
        new htmlWebpack({
            template: './src/client/index.html',
            filename: 'index.html',
            base: '/'
        })
    ]
};