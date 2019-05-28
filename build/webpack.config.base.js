// 这里声明的‘path’与下面的‘__dirname’拼接起来，成为绝对路径
const path = require('path')
const createVueLoaderOptions = require('./vue-loader.config')

const isDev = process.env.NODE_ENV === 'development'

const config = {
  target: "web",
  mode: 'development',
  // 声明入口文件
  //‘__dirname’ 代表当前文件所在目录地址，在这里也就是根目录
  entry: path.join(__dirname, '../client/client-entry.js'),
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
    path: path.join(__dirname, '../public'),
    publicPath: 'http://127.0.0.1:8000/public'
  },
  module: {
    rules: [
      { test: /\.vue$/, loader: 'vue-loader', options: createVueLoaderOptions(isDev) },
      { test: /\.jsx$/, loader: 'babel-loader' },
      { test: /\.js$/, 
        loader: 'babel-loader',
        exclude: /node_modules/,
        include: /src/,
        options: {
          presets: ['@babel/preset-env']
        }
      },
      {
        test: /\.(gif|jpg|jpeg|png|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024,
              name: 'resources/[path][name].[hash:8].[ext]'
            }
          }
        ]
      }
    ]
  }
}

module.exports = config