const path = require("path");

const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = (env, argv) => {
	const config = {
		entry: [
			"./src/js/react-handlers.js"
		],
		output: {
			path: path.resolve(__dirname, "dist"),
			filename: "bundle.js"
		},
		performance: {
			hints: false
		},
		module: {
			rules: [
				{
					test: /\.js$/,
					exclude: /node_modules/,
					use: [
						"thread-loader",
						{
							loader: "babel-loader",
							options: {
								compact: argv.mode === "production",
								cacheDirectory: argv.mode !== "production"
							}
						}
					]
				},
				{
					test: /\.(svg|png|jpg|gif|ico|webm|mp4)$/,
					use: [
						"file-loader"
					]
				},
				{
					test: /\.css$/,
					use: [
						MiniCssExtractPlugin.loader,
						"css-loader"
					]
				}
			]
		},
		plugins: [
			new CleanWebpackPlugin(),
			new MiniCssExtractPlugin({filename: "bundle.css"})
		]
	};
	if (argv.mode === "production") {
		config.module.rules.push({
			enforce: "pre",
			test: /\.js$/,
			exclude: /node_modules/,
			use: [
				{
					loader: "eslint-loader",
					options: {
						configFile: path.resolve(__dirname, ".eslintrc.json")
					}
				}
			]
		});
		config.optimization = {
			minimizer: [
				new UglifyJsPlugin({
					parallel: true
				}),
				new OptimizeCSSAssetsPlugin({})
			]
		};
	}
	if (argv.mode !== "production") {
		config.devtool = "source-map";
	}
	return config;
};
