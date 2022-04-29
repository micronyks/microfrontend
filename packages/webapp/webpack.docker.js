const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack"); // only add this if you don't have yet
const { ModuleFederationPlugin } = webpack.container;
const deps = require("./package.json").dependencies;
// require("dotenv").config({ path: "./.env" });
const buildDate = new Date().toLocaleString();

const authdomain = 'http//localhost:3001';
const commondomain = 'http//localhost:3002';
const dashboarddomain = 'http//localhost:3003';
const headerdomain = 'http//localhost:3004';

module.exports = (env, argv) => {

  return {
    entry: "./src/index.ts",
    mode: "production",
    output: {
      filename: '[name].[contenthash].js',
      publicPath: 'http://localhost:3000/'
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
          auth: `auth@${authdomain}/remoteEntry.js`,
          common: `common@${commondomain}/remoteEntry.js`,
          dashboard: `dashboard@${dashboarddomain}/remoteEntry.js`,
          header: `header@${headerdomain}/remoteEntry.js`,
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
    ],
  };
};