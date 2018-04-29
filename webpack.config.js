const path = require('path');

module.exports = {
	entry: path.resolve(__dirname, './static/js/main.js'),
	mode: 'development',
	output: {
		path: path.resolve(__dirname, './static/dist'),
		filename: 'bundle.js'
	}
};