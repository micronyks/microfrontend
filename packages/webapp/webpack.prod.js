const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack"); // only add this if you don't have yet
const { ModuleFederationPlugin } = webpack.container;
const deps = require("./package.json").dependencies;
// require("dotenv").config({ path: "./.env" });
const buildDate = new Date().toLocaleString();

const domain = process.env.PRODUCTION_DOMAIN;
const Dotenv = require('dotenv-webpack');


module.exports = (env, argv) => {

  return {
    entry: "./src/index.ts",
    mode: "production",
    output: {
      filename: '[name].[contenthash].js',
      publicPath: '/container/latest/'
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js"],
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx|tsx|ts)$/,
          loader: "ts-loader",
          exclude: /node_modules/,
        },
        {
          test: /\.css$/,
          use: [
            "style-loader",
            {
              loader: "css-loader",
              options: {
                importLoaders: 1,
                modules: true,
              },
            },
          ],
          include: /\.module\.css$/,
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"],
          exclude: /\.module\.css$/,
        },
      ],
    },
    plugins: [
      new webpack.EnvironmentPlugin({ BUILD_DATE: buildDate }),
      new webpack.DefinePlugin({
        "process.env": JSON.stringify(process.env),
      }),
      new ModuleFederationPlugin({
        name: "webapp",
        remotes: {
          auth: `auth@${domain}/auth/latest/remoteEntry.js`,
          dashboard: `dashboard@${domain}/dashboard/latest/remoteEntry.js`,
          header: `header@${domain}/header/latest/remoteEntry.js`,
          common: `common@${domain}/common/latest/remoteEntry.js`
        },
        shared: {
          ...deps,
          react: { singleton: true, eager: true, requiredVersion: deps.react },
          "react-dom": {
            singleton: true,
            eager: true,
            requiredVersion: deps["react-dom"],
          },
        },
      }),
      new HtmlWebpackPlugin({
        template: "./public/index.html",
      }),
      new Dotenv({
        path: `./enviornment/.env.production`
      }),
    ],
  };
};