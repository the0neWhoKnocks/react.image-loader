const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  devServer: {
    port: 3001,
  },
  entry: {
    example: resolve(__dirname, './example/src/index.js'),
  },
  module: {
    rules: [
      {
        use: 'babel-loader',
        exclude: /node_modules/,
        test: /\.js$/,
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin([{
      from: resolve(__dirname, './example/src/imgs'),
      to: resolve(__dirname, './example/dist/imgs'),
      cache: true,
    }]),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: resolve(__dirname, './example/src/index.html'),
    }),
  ],
  output: {
    path: resolve(__dirname, 'example/dist'),
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.js'],
  },
  stats: {
    children: false,
  },
};
