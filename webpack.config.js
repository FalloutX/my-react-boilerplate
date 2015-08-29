var path = require('path');
var node_modules = path.resolve(__dirname, 'node_modules');
var pathToReact = path.resolve(node_modules, 'react/dist/react.min.js');


/**
 *  If you load a lot of images in your CSS it is possible to automatically
 *  inline these images as BASE64 strings to lower the number of requests required.
 */

module.exports = {
  entry: ['webpack/hot/dev-server', "./app/main.js"],
  resolve: {
    alias:{
      'react': pathToReact
    }
  },
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "bundle.js"
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loader: 'babel'
    },{
      test: /\.css$/,
      loader: 'style!css'
    },{
      test: /\.(png|jpg)$/,
      loader: 'url?limit=25000' // The limit is an argument passed to the url-loader.
                                // It tells it that images that er 25KB or smaller
                                // in size will be converted to a BASE64 string and
                                // included in the CSS file where it is defined.
    }],
    noParse: [pathToReact]
  }
};
