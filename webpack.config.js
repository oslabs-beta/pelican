const path = require('path');

module.exports = {
  devServer: {
    publicPath: '/build/',
    historyApiFallback: true,
    proxy: {
      '/api': 'http://localhost:3000',
    },
    port: 8080,
    hot: true,
  },
  entry: ['babel-polyfill', './client/index.js'],
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
    // publicPath: 'http://localhost:8080/build/',
  },
  mode: process.env.NODE_ENV,
  plugins: [
    // new MiniCssExtractPlugin(),
    // new webpack.HotModuleReplacementPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.s?css$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
};
