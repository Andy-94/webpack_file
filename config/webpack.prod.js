const {resolve} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = {
  entry: ['./src/js/index.js','./src/index.html'],

  output: {
    path: resolve(__dirname, '../build'),
    filename: './js/index.js',
    publicPath:'/'
  },

  mode:'production',

  module: {
    rules: [
      {//less
        test: /\.less$/i,
        use: [
            // "style-loader",
              MiniCssExtractPlugin.loader,
              'css-loader',
              // {
              //   loader: 'postcss-loader',
              //   options: {
              //     ident: 'postcss',
              //     plugins: () => [
              //       require('postcss-flexbugs-fixes'),
              //       require('postcss-preset-env')({
              //         autoprefixer: {
              //           flexbox: 'no-2009',
              //         },
              //         stage: 3,
              //       }),
              //       require('postcss-normalize')(),
              //     ],
              //     sourceMap: true,
              //   },
              // },
              'less-loader',] // compiles Less to CSS
      },
      {//js grammer
        test: /\.js$/,
        exclude:/node_modules/,
        enforce: "pre",
        use:{
          loader: "eslint-loader"
        }
      },
      {//translate js
        test: /\.js$/,
        exclude: /node_modules/,
        use:{
          loader:"babel-loader",
          options:{
            presets: ['@babel/preset-env'],
          },
        },
      },
      {// combin the browers
        test: /\.js$/,
        exclude: /node_modules/,
        use:{
          loader:"babel-loader",
          options:{
            presets: [
              ['@babel/preset-env',
              {
                useBuiltIns:'usage',
                corejs: { version: 3 },
                targets: {
                  "chrome":"58",
                  "ie": "9"
                }
              }
            ],
          ],
            cacheDirectory:true,
          },
        },
      },
      {//img
        test: /\.(png|jpg|gif)$/,
        exclude: /node_modules/,
        use:{
          loader:"url-loader",
          options:{
            limit: 8192, 
            outputPath: 'images', 
            publicPath: '/images/', 
            name: '[hash:5].[ext]' 
          },
        },
      },
      {//html-loader
        test:/\.(html)$/,
        use:{
          loader:'html-loader',
        }
      },
      {//icon loader
        test: /\.(eot|svg|woff|woff2|ttf|mp3|mp4|avi)$/, 
        loader: 'file-loader',
        options: {
          outputPath: 'media',
          name: '[hash:8].[ext]'
        }
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      }
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(
      {filename: "css/[hash:5].css"}
    ),
    new OptimizeCssAssetsPlugin({
      cssProcessorPluginOptions:{
        preset: ['default', { discardComments: { removeAll: true } }],
      },
      cssProcessorOptions: {
        map: {
          inline: false,
          annotation: true,
        }
      }
    })
  ]
};