var path = require('path');

module.exports = {
  entry:  path.resolve('./public/js/app.js'),
  output: {
    path: './public/js/',
    filename: 'bundle.js',
    publicPath: '/assets/'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015', 'stage-1']
        }
      },
      { test: /\.json$/, loader: 'json' },
      { test: /\.scss$/, loader: "style!css!sass" }
    ],
  },
  devtool: 'source-map',
  resolve: {
    extensions: ["", ".js", ".jsx"]
  }
};