

const {resolve} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: ['./src/js/index.js','./src/index.html'],

  output: {
    path: resolve(__dirname, 'dist'),
    filename: './js/index.js',
  },

  mode:'development',

  module: {
    rules: [
      {//less
        test: /\.less$/i,
        use: ["style-loader",
              "css-loader",
              "less-loader",] // compiles Less to CSS
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
            publicPath: 'images/', 
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
    })
  ],
  devServer: {
	  open: true, // 自动打开浏览器
	  compress: true, // 启动gzip压缩
	  port: 3000, // 端口号

    hot: true,
  },
  //devtool  developemnt tool
  devtool: "eval-cheap-module-source-map"
};