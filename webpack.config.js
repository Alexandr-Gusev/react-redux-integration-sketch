const path = require("path")

const {CleanWebpackPlugin} = require("clean-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const UglifyJsPlugin = require("uglifyjs-webpack-plugin")

module.exports = (env, argv) => {
	let config = {
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
						"cache-loader",
						"thread-loader",
						{
							loader: "babel-loader",
							options: {
								compact: argv.mode === "production"
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
	}
	if (argv.mode === "development") {
		config.devtool = "source-map"
	}
	if (argv.mode === "production") {
		config.optimization = {
			minimizer: [new UglifyJsPlugin()]
		}
	}
	return config
}
