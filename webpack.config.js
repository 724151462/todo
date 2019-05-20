// 这里声明的‘path’与下面的‘__dirname’拼接起来，成为绝对路径
const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const devMode = process.env.NODE_ENV !== 'production'

module.exports = {
    mode: 'development',
    // 声明入口文件
    //‘__dirname’ 代表当前文件所在目录地址，在这里也就是根目录
    entry: path.join(__dirname,'src/index.js'),  
    devServer: {
        contentBase: './dist',
        hot: true,
        // 端口号
        port: 9000
    },
    // 声明出口文件
    output:{
        // 输出文件名
        filename: 'bundle.js',
        // 输出文件的路径
        path: path.join(__dirname,'dist')
    },
    module: {
        rules: [
            {test:/\.vue$/,loader: 'vue-loader'},
            {
              test:/\.css$/,
              use: [
                'style-loader',
                'css-loader'
              ]
            },
            {
              test: /\.(gif|jpg|jpeg|png|svg)$/,
              use: [
                {
                  loader: 'url-loader',
                  options: {
                    limit: 1024,
                    name: '[name].[ext]'
                  }
                }
              ]
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),


    ],
    
}