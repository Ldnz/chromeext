const webpack = require('webpack');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
  context: path.join(__dirname, 'src'),
  entry: {
    popup: ['babel-polyfill', './entry/popup'],
    vendors: ['jquery']
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].js'
  },
  resolve: {
    root: path.join(__dirname, 'src'),
    extensions: ['', '.js', '.json']
  },
  module: {
    loaders: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        loader: 'babel?cacheDirectory'
      }
    ]
  },
  devtool: NODE_ENV === 'development' ?'source-map' : null,
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendors',
      minChunks: Infinity
    }),
    new CopyWebpackPlugin([{
      from: './static'
    }])
  ]
};

if (NODE_ENV === 'production') {
  module.exports.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: false,
      mangle: true,
      compress: {
        warnings: false,
        drop_console: true,
        unsafe: true
      }
    })
  );
}