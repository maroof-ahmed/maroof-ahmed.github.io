const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
var webpack = require('webpack');

module.exports = {
	// Output to the build folder
	output: {
		path: path.resolve(__dirname, 'build'),
		// filename: '[name].bundle.js',
		// clean the build folder before each build,
		clean: true,
		publicPath: './',
		filename: 'bundle-[name].js',
	},

	module: {
		// Define rules for loaders
		// Order of webpack loaders matters!
		// css-loader -  for loading CSS files with import
		// MiniCssExtractPlugin - extracts CSS into separate files and creates a CSS file per JS file which contains CSS
		// style-loader - for loading the stylesheet in the DOM
		rules: [
			{
				test: /\.html$/i,
				loader: 'html-loader',
			},
			{
				test: /\.scss$/i,
				use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
			},
			{
				test: /\.js$/i,
				exclude: /node_modules/,
				use: ['babel-loader'],
			},
			{
				test: /\.(png|svg|jpg|jpeg|gif)$/i,
				type: 'asset/resource',
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/i,
				type: 'asset/resource',
			},
		],
	},

	plugins: [
		// HTML Webpack plugin - Loads an HTML file from the specified path and injects the bundle(s) in the same file
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, 'src', 'index.html'),
		}),
		new MiniCssExtractPlugin(),
	],

	devtool: 'inline-source-map',
	// webpack-dev-server serves bundled files from the directory defined in output.path, i.e., files will be available under http://[devServer.host]:[devServer.port]/[output.publicPath]/[output.filename]

	devServer: {
		// This tells webpack-dev-server to serve the files from the build directory
		contentBase: './build',

		// Tells dev-server to watch the files served
		watchContentBase: true,

		// Tells devServer to write generated assets to the output.path directory while developing
		writeToDisk: true,

		// Host will be accessible through IP and localhost for mobile development and testing
		host: '0.0.0.0',
		port: 80,
	},

	optimization: {
		splitChunks: { chunks: 'all' },
	},

	// externals: {
	// 	jquery: 'jQuery',
	// },
};
