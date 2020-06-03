const path = require("path");

module.exports = {
  mode: process.env.NODE_ENV,
  entry: path.resolve(__dirname, "./client/components/index.tsx"),
  output: {
    publicPath: "/build/",
    filename: "bundle.js",
    path: path.resolve(__dirname, "build"),
  },
  devServer: {
    publicPath: "/build/",
    proxy: {},
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        use: [
          {
            loader: "ts-loader",
          },
        ],
        exclude: /node_modules/,
      },
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader",
      },
      {
        test: /\.s[ac]ss$/i,
        exclude: /node_modules/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
};
