const path = require('path')

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
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader'
      }
    ]
  }
}
