const path = require('path');

module.exports = {
  devtool: 'inline-source-map', // TODO: check debbugging Chrome integration
  mode: 'development', // TODO: check debbugging Chrome integration
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [ '.ts', '.js' ],
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'src'),
  },
};
