import * as path from 'path';

import {baseConfig} from './es5.base.config';

module.exports = {
  ...baseConfig,
  mode: 'production',
  entry: {
    staffrender: './src/lib.ts',
  },
  output:
      {filename: 'staffrender.js', path: path.resolve(__dirname, '../dist')},
  optimization: {minimize: true},
};
