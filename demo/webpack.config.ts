const path = require('path');

module.exports = {
  devtool: 'inline-source-map', // TODO: check debbugging Chrome integration
  mode: 'development', // TODO: check debbugging Chrome integration
  entry: {
    index: './src/index.ts',
    features: './src/features.ts'
  },
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
    filename: '[name].js',
    path: path.resolve(__dirname, 'src'),
  },
};
