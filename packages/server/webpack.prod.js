
var webpack = require("webpack");
const path = require('path');
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")

console.log('$$$$$$$', path.join(__dirname, 'dist'))

module.exports = {
  entry: [
    './server.js'
  ],
  mode: 'production',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
    ]
  },
  plugins: [
    new NodePolyfillPlugin()
  ]
};