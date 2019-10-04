const path = require('path');
const WebpackShellPlugin = require('webpack-shell-plugin');
const nodeExternals = require('webpack-node-externals');
const { NODE_ENV } = process.env

module.exports = {
  entry: './src/index.js',
  mode: NODE_ENV,
  watch: NODE_ENV === 'development',
  externals: [ nodeExternals() ],
  target: 'node',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'index.js'
  },
  resolve: {
    extensions: ['.js'],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          'babel-loader',
        ]
      }
    ]
  },
  plugins: [
    new WebpackShellPlugin({
      onBuildEnd: ['yarn start:dev']
    })
  ]
}
