/*
* @Author: ryan
* @Date:   2016-11-21 21:36:03
* @Last Modified by:   Ryan Kophs
* @Last Modified time: 2016-11-21 22:57:50
*/

'use strict';

var path = require('path');

module.exports = {
	entry: './app/index.js',
	output: {
		filename: 'bundle.js',
		path: './dist'
	},
	module: {
		loaders: [
			{ 
				test: /\.(js|jsx)$/, 
				loader: 'babel-loader',
				include: /app/,
				exclude: /node_modules/,
				query: {
					presets: ['es2015', 'react', 'stage-0']
				}
      }
		]
	}
}