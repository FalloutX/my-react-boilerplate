var	path	=	require('path');
var	merge	=	require('./merge');
var webpack = require('webpack');
var	ROOT_PATH	=	path.resolve(__dirname,	'..');
var node_modules = path.resolve(ROOT_PATH, 'node_modules');
var pathToReact = path.resolve(node_modules, 'react/dist/react.min.js');

var	common	=	{
	entry:	[path.join(ROOT_PATH,	'app/main.jsx')],
  resolve: {
    alias: {
      'react': pathToReact
    },
		extensions: ['', '.js', '.jsx']
  },
	output:	{
		path:	path.resolve(ROOT_PATH,	'build'),
		filename:	'bundle.js',
	},
	module:	{
  	loaders:	[
  		{
				test:	/\.css$/,
				loaders:	['style',	'css']
  		}],
			noParse: [pathToReact]

    }
	};
var	mergeConfig	=	merge.bind(null,	common);
exports.build	=	mergeConfig({
	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': JSON.stringify('production'),
			}
		}),
		new webpack.optimize.UglifyJsPlugin({

			compress: {
				warnings: false
			},
		}),
	],
	module: {
		loaders: [{
			test: /\.jsx?$/,
			loader: 'babel',
			include: path.join(ROOT_PATH, 'app')
		}]
	}
});
exports.develop	=	mergeConfig({
	entry:	['webpack/hot/dev-server'],
	plugins: [ new webpack.NoErrorsPlugin()],
	module: {
		loaders: [{
			test: /\.jsx?$/,
			loaders: [ 'babel'],
			include: path.join(ROOT_PATH, 'app'),
			exclude: 'node_modules/'
		}]
	}
});
