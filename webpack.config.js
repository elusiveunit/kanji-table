const path = require('path');

const CleanPlugin = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ScriptExtHtmlPlugin = require('script-ext-html-webpack-plugin');

const env = process.env.NODE_ENV;
const isProd = env === 'production';
const buildFolder = 'build';

module.exports = {
  mode: env,
  devtool: isProd ? 'source-map' : 'inline-source-map',
  entry: './src/index.js',
  output: {
    path: `${__dirname}/${buildFolder}`,
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
    isProd && new CleanPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
    }),
    new HtmlPlugin({
      template: isProd
        ? '!!prerender-loader?string!./templates/index.html'
        : './templates/index.html',
      inject: 'head',
      minify: false,
    }),
    new ScriptExtHtmlPlugin({
      defaultAttribute: 'defer',
    }),
    isProd &&
      new CopyPlugin([
        {
          from: 'public/*',
          transformPath(targetPath) {
            return targetPath.replace(/public\/?/, '');
          },
        },
      ]),
  ].filter((p) => Boolean(p)),
  devServer: {
    contentBase: path.join(__dirname, `${buildFolder}/`),
    port: 3000,
  },
};
