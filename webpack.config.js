const path = require('path');

const { CleanWebpackPlugin: CleanPlugin } = require('clean-webpack-plugin');
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
    filename: 'app.[contenthash:8].js',
  },
  externals: {
    'react-dom/server': 'ReactDOMServer',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: { loader: 'babel-loader' },
      },
      {
        test: /\.(woff2?|ttf|otf)$/,
        exclude: /node_modules/,
        use: {
          loader: 'file-loader',
          options: {
            outputPath: 'fonts',
            name: '[name].[contenthash:8].[ext]',
          },
        },
      },
      {
        test: /\.scss$/,
        use: [
          isProd ? { loader: MiniCssExtractPlugin.loader } : 'style-loader',
          { loader: 'css-loader', options: { sourceMap: true } },
          { loader: 'postcss-loader', options: { sourceMap: true } },
          'resolve-url-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              sassOptions: { outputStyle: 'compressed' },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    isProd && new CleanPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash:8].css',
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
      new CopyPlugin({
        patterns: [
          {
            from: 'public/*',
            to({ absoluteFilename }) {
              // absoluteFilename is the absolute 'from' path
              return absoluteFilename.replace(/\bpublic\b/, 'build');
            },
            toType: 'file',
          },
        ],
      }),
  ].filter((p) => Boolean(p)),
  devServer: {
    contentBase: path.join(__dirname, `${buildFolder}/`),
    port: 3000,
  },
};
