// eslint-disable-next-line no-undef
var path = require('path')

module.exports = {
  entry: {
    main: [
      './src/index.js'
    ],
  },
  output: {
    // eslint-disable-next-line no-undef
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    libraryTarget: 'umd2',
    globalObject: 'this',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
      }
    ]
  },
  devtool: 'source-map',
  mode: 'development'
}
