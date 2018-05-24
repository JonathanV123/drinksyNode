const path = require('path');
var webpack = require('webpack');

module.exports = {
    devtool: 'source-map',
    entry: {
        app: './public/javascript/food-app.js'
    },
    output: {
        path: path.resolve(__dirname, 'public', 'dist'),
        filename: 'food-app.js'
    },
    module: {
        loaders: [{
            test: /\.js?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                presets: ['env']
            },
        }],
    },
}