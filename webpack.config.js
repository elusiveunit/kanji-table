const path = require('path');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');

const env = process.env.NODE_ENV;
const isProd = env === 'production';

module.exports = {
  mode: env,
  devtool: isProd ? 'source-map' : 'inline-source-map',
  entry: './src/index.js',
  output: {
    path: `${__dirname}/public`,
    publicPath: '/',
    filename: 'app.[contenthash].js',
  },
  externals: {
    'react-dom/server': 'ReactDOMServer',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(woff2?|ttf|otf)$/,
        exclude: /node_modules/,
        use: {
          loader: 'file-loader',
          options: {
            outputPath: 'fonts',
            name: '[name].[contenthash].[ext]',
          },
        },
      },
      {
        test: /\.scss$/,
        use: [
          isProd ? { loader: MiniCssExtractPlugin.loader } : 'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          'resolve-url-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              outputStyle: 'compressed',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    isProd && new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
    }),
    new HtmlWebPackPlugin({
      template: isProd
        ? '!!prerender-loader?string!./templates/index.html'
        : './templates/index.html',
      inject: 'head',
      minify: false,
    }),
    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: 'defer',
    }),
  ].filter((p) => Boolean(p)),
  devServer: {
    contentBase: path.join(__dirname, 'public/'),
    port: 3000,
  },
};
