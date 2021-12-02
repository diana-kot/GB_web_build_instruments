const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
// const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');
// const CopyPlugin = require("copy-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");





const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const optimization = () => {
    const config = {
      splitChunks: {
        chunks: 'all'
      }
    };
  
    if (isProd) {
      config.minimizer = [
        new OptimizeCssAssetWebpackPlugin(),
        new TerserWebpackPlugin()
      ]
    }
  
    return config
  };

  const plugins = () => {
    const base = [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src', 'index.html'),
            minify: {
                collapseWhitespace: isProd
            }
        }),
        new CleanWebpackPlugin(),
        // new CopyWebpackPlugin({
        //         patterns: [
        //             { 
        //             from: path.resolve(__dirname, 'src/favicon.ico'), 
        //             to: path.resolve(__dirname, 'dist')}
        //         ]
        //     })
        new MiniCssExtractPlugin({ 
            filename: '[name].[contenthash].css' 
        }),
        new CompressionPlugin()
        // new CopyPlugin([
        //     {
        //         from: 'src/audio',
        //         to: 'dist/[name].[ext]',
        //         toType: 'template'
        //     }
        // ])
        
    ]

    if (isProd) {
        base.push(new BundleAnalyzerPlugin())
      }
    return base
  }

module.exports = {
    context: path.resolve(__dirname, 'src'),//где лежат все исходники
    entry: {
        main: ['@babel/polyfill', './js/main.js'] 
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename:'main.[contenthash].js',
        clean: true
    },
    resolve: {
        extensions: ['.js', 'json', '.png'],
        alias: {
            '@models': path.resolve(__dirname, 'src/models'),
            '@': path.resolve(__dirname, 'src'),
        }
    },
    optimization: optimization(),
    devServer: {
        port: 3000,
        hot: isDev
    },
    plugins: plugins(),
    module:{
        rules:[
            {
                test:/\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            // hmr: isDev,//изменять сущ без перезагрузки
                            // reloadAll: true
                        },
                    },
                    'css-loader'
                ]
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [{
                        loader: 'img-optimize-loader',
                        options: {
                            compress: {
                                mode: 'high',
                                webp: true,
                                gifsicle: true,
                                disableOnDevelopment: false,
                            },
                        },
                    },

                ],
            },
            {
                test: /\.(mp[3|4])$/i,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]'
                    }
                }]
            },
            { test:/\.s[ac]ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            // hmr: isDev,//изменять сущ без перезагрузки
                            // reloadAll: true
                        },
                    },
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.js$/,
                exclude:/node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: [
                        '@babel/preset-env'
                    ],
                    plugins: [
                        '@babel/plugin-proposal-class-properties'
                    ]
                }
            }

        ]
    }
}