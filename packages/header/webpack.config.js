const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;
const path = require('path');
const deps = require('./package.json').dependencies;
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: './src/index.ts',
  mode: 'development',
  output: {
    publicPath: 'http://localhost:3004/'
  },
  // Enable sourcemaps for debugging webpack's output.
  devtool: "source-map",
  devServer: {
    port: 3004,
    open: true,
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|tsx|ts)$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
        exclude: /\.module\.css$/,
      },
      { 
        test: /\.(png|jpg|gif|jpeg|ico|svg)$/i, type: "asset", parser: {
          dataUrlCondition: { maxSize: 8192 }
        }
      }
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'header',
      filename: 'remoteEntry.js',
      exposes: {
        // expose each component
        './HeaderApp': './src/bootstrap',
      },
      shared: {
        ...deps,
        react: { singleton: true, eager: true, requiredVersion: deps.react },
        'react-dom': {
          singleton: true,
          eager: true,
          requiredVersion: deps['react-dom'],
        },
      },
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new Dotenv({
      path: `./enviornment/.env.development`
    }),
  ],
};