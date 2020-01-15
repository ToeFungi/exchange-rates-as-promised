const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  entry: {
    'index': './src/index.ts',
    'index.min': './src/index.ts'
  },
  mode: "production",
  output: {
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    extensions: [
      '.ts',
      '.js',
      '.tsx'
    ]
  },
  devtool: 'source-map',
  plugins: [
    new UglifyJsPlugin({
      sourceMap: true,
      include: /\.min\.js$/
    })
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader'
      }
    ]
  }
}
