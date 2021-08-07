const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
//const { transpileModule } = require("typescript");

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
        test: /\.(png|jpg|gif)$/i,
        type: "asset/resource",
      },
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(mp3|wav)$/i,
        type: "asset/resource",
        generator: {
          filename: "sounds/[hash][ext][query]",
        },
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@assets": path.resolve(__dirname, "src/assets"),
      "@components": path.resolve(__dirname, "src/components"),
    },
  },
};
