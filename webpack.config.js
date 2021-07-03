const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    game: './src/game.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
        title: 'Mario Kaboom JS',
    }),
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
};