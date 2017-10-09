var webpack = require('webpack');

module.exports = {
  entry: [
    './public/src/index.js'
  ],
  output: {
    path: __dirname + '/public/',
    publicPath: '/',
    filename: 'bundle.js'
  },
  // devtool: "eval",
  devtool: "source-map",
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'), // Tells React to build in either dev or prod modes. https://facebook.github.io/react/downloads.html (See bottom)
      __DEV__: true
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel'
    },{
      test: /\.css$/,
      loaders: [
        'style?sourceMap',
        'css?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]'
      ]
    }]
  },
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
    contentBase: './public',
    port: 4000
    // proxy: {
    //   '/api': {
    //     target: 'http://localhost:3000/',
    //     secure: false
    //   }
    // }
  }
};
