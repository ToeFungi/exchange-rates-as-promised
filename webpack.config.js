const path = require('path')
const ZipPlugin = require('zip-webpack-plugin')

module.exports = {
  entry: './src/index',
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader'
      }
    ]
  },
  resolve: {
    extensions: [
      '.ts',
      '.js'
    ]
  },
  target: 'node',
  output: {
    filename: 'index.js',
    libraryTarget: 'commonjs',
    path: path.resolve(__dirname, './build')
  },
  plugins: [
    new ZipPlugin({
      filename: 'index'
    })
  ]
}
