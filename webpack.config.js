// 这里声明的‘path’与下面的‘__dirname’拼接起来，成为绝对路径
const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ExtractPlugin = require('extract-text-webpack-plugin')
const isDev = process.env.NODE_ENV === 'development'

const config = {
  target: "web",
  mode: 'development',
  // 声明入口文件
  //‘__dirname’ 代表当前文件所在目录地址，在这里也就是根目录
  entry: path.join(__dirname, 'src/index.js'),
  devServer: {
    contentBase: './dist',
    hot: true,
    // 端口号
    port: 9000
  },
  // 声明出口文件
  output: {
    // 输出文件名
    filename: 'bundle.[hash:8].js',
    // 输出文件的路径
    path: path.join(__dirname, 'dist')
  },
  module: {
    rules: [
      { test: /\.vue$/, loader: 'vue-loader' },
      { test: /\.jsx$/, loader: 'babel-loader' },
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
    new HtmlWebpackPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: isDev ? '"development"' : '"production"'
      }
    })
  ],

}

if (isDev) {
  config.module.rules.push({
    test: /\.styl/,
    use: [
      'style-loader',
      'css-loader',
      {
        loader: 'postcss-loader',
        options: {
          sourceMap: true,
        }
      },
      'stylus-loader'
    ]
  })
  config.devtool = '#cheap-module-eval-source-map'
  config.devServer = {
    port: 8080,
    host: '0.0.0.0',
    overlay: {
      errors: true,
    },
    hot: true
  }
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  )
}else{
  config.entry = {
    app: path.join(__dirname, 'src/index.js'),
    vendor: ['vue']
  }
  config.output.filename = '[name].[chunkhash:8].js'
  config.module.rules.push(
    {
      test: /\.styl/,
      use: ExtractPlugin.extract({
        fallback: 'style-loader',
        use: [
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
            }
          },
          'stylus-loader'
        ]
      })
    }
  )
  config.plugins.push(
    new ExtractPlugin('styles.[hash:8].css')
  )
  config.optimization = {
    splitChunks: {
      cacheGroups: {
        commons: {
          chunks: 'initial',
          minChunks: 2, maxInitialRequests: 5,
          minSize: 0
        },
        vendor: {
          test: /node_modules/,
          chunks: 'initial',
          name: 'vendor',
          priority: 10,
          enforce: true
        }
      }
    },
    runtimeChunk: true
  }
}

module.exports = config