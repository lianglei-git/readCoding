const path = require('path');

module.exports = {
  entry: './app.js',
  output: {
    filename: 'cb.js',
    path: path.resolve(__dirname, 'server'),
  },
  target: 'node',
  node: {
    __dirname: false,
    __filename: false,
  },
};
