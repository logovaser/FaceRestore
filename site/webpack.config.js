/**
 * Created by logov on 28-Feb-17.
 */

const webpack = require('webpack'),
    path = require('path');

module.exports = {
    entry: {
        index: './front/base',
    },
    output: {
        path: path.join(__dirname, 'public/static'),
        publicPath: '/static/',
        filename: "[name].js"
    },
    devtool: 'source-map',
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('development')
                // NODE_ENV: JSON.stringify('production')
            }
        }),
        new webpack.ProvidePlugin({
            // BABYLON: 'babylonjs/babylon'
            THREE: 'three/build/three'
        }),
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: {warnings: false},
        //     output: {comments: false},
        //     sourceMap: true
        // })
    ],
    module: {
        rules: [
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader']
            },
            {
                test: /\.html$/,
                use: ['raw-loader']
            },
            {
                test: /\.(json|obj|mtl|eot|svg|ttf|woff|woff2)$/,
                use: [{loader: 'file-loader', query: {name: '[name].[ext]'}}]
            }
        ]
    }
};
