var path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: ['babel-polyfill', './src/js/index.js'],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
              test: /\.js$/,
              exclude: [/node_modules/],
              enforce: 'pre',
              use: ['eslint-loader']
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: [/node_modules/],
            },
            {
                test: /\.json$/,
                loader: 'json-loader',
                exclude: [/node_modules/]
            }
        ]
    },
    plugins: [
        new CopyWebpackPlugin([
            {from: 'src/index.html', to: './'}
        ]),
      new webpack.LoaderOptionsPlugin({
        test: /\.js$/,
        options: {
          eslint: {
            configFile: './.eslintrc',
            cache: false
          }
        }
      })
    ]
};
