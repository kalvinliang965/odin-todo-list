
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: "./src/index.js",
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, "dist"),
        clean: true,
    },

    plugins: [
        new HtmlWebpackPlugin({
            title: "TODO list",
            template: "./src/index.html",
            inject: "body",
            scriptLoading: "defer",
        }),
    ],

    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.(png|jpg|svg|jpeg|gif)$/i,
                type: "asset/resource",
            },
            {
                test:/\.(woff|woff2|eot|otf|ttf)$/i,
                type: "asset/resource",
            },
        ],
    },
}