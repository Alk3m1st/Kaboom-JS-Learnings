const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development", // Not for prod obviously
  devtool: "eval-source-map",
  devServer: {
    contentBase: ".dist",
  },
  entry: {
    game: "./src/game.ts",
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Mario Kaboom JS",
    }),
  ],
  output: {
    filename: "[name].[fullhash].bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
};
