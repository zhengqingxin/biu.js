const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  entry: './index.js',
  output: {
    path: __dirname + '/dist',
    filename: 'biu.min.js',
    libraryTarget:'umd',
    library:'Biu'
  },
  module: {
    rules:[
      {
        test:/\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          query: {
            presets: ['es2015']
          }
        }
      },
      {
        test: /.css$/,
        use: ['style-loader', 'css-loader']
      },
    ]
  },
  resolve: {
    extensions: ['.js', '.json']
  },
  plugins: [
    new UglifyJSPlugin(),
    new BundleAnalyzerPlugin(),
  ]  
};