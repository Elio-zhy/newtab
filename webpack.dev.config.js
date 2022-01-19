const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const OpenBroserPlugin = require("open-browser-plugin");

module.exports = {
    mode: "development",
    entry: [
        "@babel/polyfill",
        path.resolve(__dirname, "src/index.jsx")
    ],
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "bundle.js",
        publicPath: '/',
    },
    devServer: {
        port: 8080,
        historyApiFallback: true
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.m?js[x]?$/i,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-react"]
                    }
                }
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: 'file-loader',
                    },
                ],
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader",
                ],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({ template: path.resolve(__dirname, "src/index.html") }),
        new OpenBroserPlugin({ port: 8080 }),
        new webpack.HotModuleReplacementPlugin()
    ],
    resolve: {
        extensions: [".js", ".jsx", ".wasm"]
    }
};
