const webpack = require('webpack')
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  node: {
    fs: 'empty',
    net: 'empty',
    dns: 'empty',
    tls: 'empty'
  },
  devtool: 'inline-source-map',
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:3001/',
    'webpack/hot/only-dev-server',
    './client/index.jsx'
  ],
  resolve: {
    alias: {
      '../../theme.config$': path.join(__dirname, 'semantic-themes/theme.config')
    }
  },
  target: 'web',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        include: [
          path.join(__dirname, 'client'),
          path.join(__dirname, 'client/src')
        ]
      },
      {
        test: /\.jpe?g$|\.gif$|\.png$|\.ttf$|\.eot$|\.svg$/,
        use: 'file-loader?name=[name].[ext]?[hash]'
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&mimetype=application/fontwoff'
      },
      {
        test: /\.less$/,
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'less-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.NamedModulesPlugin(),

    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new ExtractTextPlugin({ filename: 'styles.css' }),
    new webpack.DefinePlugin({
      'process.env': {
        WEBPACK: JSON.stringify(true),
        BUILD_TARGET: JSON.stringify('client')
      }
    })
  ],
  devServer: {
    host: 'localhost',
    port: 3001,
    historyApiFallback: true,
    hot: true,
    headers: { 'Access-Control-Allow-Origin': '*' }
  },
  output: {
    path: path.join(__dirname, '/client/.dist'),
    publicPath: 'http://localhost:3001/',
    filename: 'client.js'
  }
}
