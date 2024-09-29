const { resolve } = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
// const miniCssEctractPlugin = require("mini-css-extract-plugin")
module.exports = {
    mode: "development",
    devtool: "source-map",
    optimization: {
        minimize: false
    },
    entry: {
        index: resolve(__dirname, "./src/js/index.js"),
        detail: resolve(__dirname, "./src/js/detail.js"),
        collection: resolve(__dirname, "./src/js/collection.js")
    },
    output: {
        path: resolve(__dirname, "./dist"),
        filename: "js/[name].js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: "babel-loader",
                exclude: resolve(__dirname, "node_modules"),
                options: {
                    presets: [
                        "@babel/preset-env"
                    ]
                }
            },
            {
                test: /\.tpl$/,
                loader: "ejs-loader"
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader", {
                    loader: "postcss-loader",
                    options: {
                        postcssOptions: {
                            plugins: [
                                "autoprefixer"
                            ]
                        }
                    }
                }]
            },
            {
                test: /\.less$/,
                use: ["style-loader", "css-loader", "less-loader", {
                    loader: "postcss-loader",
                    options: {
                        postcssOptions: {
                            plugins: [
                                "autoprefixer"
                            ]
                        }
                    }
                }]
            },
            {
                test: /\.(png|jpg|jpeg|gif|ico|woff|eot|svg|ttf)$/i,
                type: "asset",
                parser: {
                    dataUrlCondition: {
                        maxSize: 1024
                    }
                },
                generator: {
                    filename: "img/[name]-[hash:16][ext]"
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: resolve(__dirname, "src/index.html"),
            title: "新闻头条",
            chunks: ['index'],
            chunksSortMode: "manual",
            excludeChunks: ["node_modules"],
            hash: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true
            }
        }),
        new HtmlWebpackPlugin({
            filename: "detail.html",
            template: resolve(__dirname, "src/detail.html"),
            title: "新闻头条",
            chunks: ['detail'],
            chunksSortMode: "manual",
            excludeChunks: ["node_modules"],
            hash: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true
            }
        }),
        new HtmlWebpackPlugin({
            filename: "collection.html",
            template: resolve(__dirname, "src/collection.html"),
            title: "我的新闻",
            chunks: ['collection'],
            chunksSortMode: "manual",
            excludeChunks: ["node_modules"],
            hash: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true
            }
        }),
        // new miniCssEctractPlugin({
        //     filename: 'css/[name].css'
        // })
    ],
    watchOptions: {
        ignored: /node_modules/,
    },
    devServer: {
        open: true,
        host: "localhost",
        port: 3000,
    }
}