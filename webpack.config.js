const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const fs = require('fs')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
// const ExtractTextPlugin = require("extract-text-webpack-plugin");


function generateHtmlPlugins(templateDir) {
  const templateFiles = fs.readdirSync(path.resolve(__dirname, templateDir));
  return templateFiles.map(item => {
    const parts = item.split('.');
    const name = parts[0];
    const extension = parts[1];
    return new HtmlWebpackPlugin({
      filename: `${name}.html`,
      template: path.resolve(__dirname, `${templateDir}/${name}.${extension}`),
      inject: false,
    })
  })
}

const htmlPlugins = generateHtmlPlugins('./src/html/views');

module.exports = {
  entry: {
      app: './src/js/app.js',
  },
  output: {
      path: path.resolve(__dirname, './dist'),
      filename: './js/[name].js',
      publicPath: '../'
  },
    // devServer: {
    //     contentBase: path.join(__dirname, './'),
    //     port: 9000,
    //     overlay: true
    // },
  devtool: "source-map",

    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true // set to true if you want JS source maps
            }),
            new OptimizeCSSAssetsPlugin({})
        ]
    },

    plugins: [
        new MiniCssExtractPlugin({
            filename: "./css/[name].css",
            chunkFilename: "[id].css"
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery",
            "global.$": "jquery"
        }),
        new CopyWebpackPlugin([
            {
                from: './src/fonts',
                to: './fonts'
            },
            {
                from: './src/favicon',
                to: './favicon'
            },
            {
                from: './src/img',
                to: './img'
            }
        ]),
    ].concat(htmlPlugins),

  module: {
    rules: [
        {
            test: /\.js$/,
            // include: path.resolve(__dirname, 'src/js'),
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ["env"],
                    //plugins: ['@babel/plugin-proposal-class-properties'],
                }
            }
        },
        {
            test: /\.(sc|c)ss$/,
            use: [
                {
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        sourceMap: true,
                    }
                },
                {
                    loader: "css-loader",
                    options: {
                        sourceMap: true,
                    }
                },
                {
                    loader: 'postcss-loader',
                    // options: {
                    //     ident: 'postcss',
                    //     sourceMap: true,
                    //     plugins: () => [
                    //         require('cssnano')({
                    //             preset: ['default', {
                    //                 discardComments: {
                    //                     removeAll: true,
                    //                 },
                    //             }]
                    //         })
                    //     ]
                    // }
                },
                {
                    loader: "sass-loader",
                    options: {
                        sourceMap: true
                    }
                },
            ]
        },
        {
            test: /\.(woff|woff2|eot|ttf|svg)$/,
            loader: 'url-loader?limit=100&name=fonts/[name].[ext]'
        },
        {
            test: /\.(gif|png|jpg|svg|gif)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            use: [ 'file-loader?name=./image/[name].[ext]' ]
        },
        {
          test: /\.html$/,
          include: path.resolve(__dirname, 'src/html/includes'),
          use: ['raw-loader']
        },

    ]
  },

};