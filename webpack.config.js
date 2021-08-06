const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { transpileModule } = require("typescript");

module.exports = {
  mode: "development", // Not for prod obviously
  devtool: "inline-source-map",
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    watchContentBase: true,
    //publicPath: path.join(__dirname, "dist"),
    port: 8888,
    compress: true,
    hot: true,
    watchOptions: {
      aggregateTimeout: 200,
      ignored: "**/node_modules",
      poll: 1000,
    },
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
    assetModuleFilename: "images/[hash][ext][query]",
    filename: "[name].[fullhash].bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /\.png$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "assets/images/",
            },
          },
        ],
      },
      {
        test: /\.json/,
        type: "asset/source",
        generator: {
          filename: "static/[hash][ext][query]",
        },
      },
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".png"],
  },
};
