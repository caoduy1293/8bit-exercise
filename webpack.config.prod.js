var webpack = require('webpack');
var CompressionPlugin = require('compression-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var combineLoaders = require('webpack-combine-loaders');
var WebpackMd5Hash = require('webpack-md5-hash');

var GLOBALS = {
  'process.env.NODE_ENV': JSON.stringify('production'),
  __DEV__: false
};

module.exports = {
  entry: [
    './public/src/index.js'
  ],
  output: {
    path: __dirname + '/public/',
    publicPath: '/',
    filename: 'bundle.js'
  },
  devtool: "eval",
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel'
    },{
      test: /\.css$/,
      loader: ExtractTextPlugin.extract(
          combineLoaders([{
            loader: 'css-loader',
            query: {
              modules: true,
              localIdentName: '[name]__[local]___[hash:base64:5]'
            }
          }])
      )
    }]
  },
  plugins: [
    new WebpackMd5Hash(),
    new webpack.DefinePlugin(GLOBALS),
    new ExtractTextPlugin('style/style.css'),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new CompressionPlugin({
      asset: "[path].gz[query]",
      algorithm: "gzip",
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8
    })
  ],
  resolve: {
    extensions: ['', '.js', '.jsx'],
    "alias": {
      "react": "preact-compat",
      "react-dom": "preact-compat",
      'create-react-class': 'preact-compat/lib/create-react-class'
    }
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './public'
  }
};