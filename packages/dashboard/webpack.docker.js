const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require("webpack"); // only add this if you don't have yet
const { ModuleFederationPlugin } = webpack.container;
const path = require('path');
const deps = require('./package.json').dependencies;
const buildDate = new Date().toLocaleString();
const commondomain = 'http://localhost:3002';

module.exports = {
    entry: './src/index.ts',
    mode: 'production',
    output: {
        filename: '[name].[contenthash].js',
        publicPath: 'http://localhost:3003/'
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
            name: 'dashboard',
            filename: 'remoteEntry.js',
            remotes: {
                common: `common@${commondomain}/remoteEntry.js`
            },
            exposes: {
                // expose each component
                './DashboardApp': './src/bootstrap',
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
    ],
};