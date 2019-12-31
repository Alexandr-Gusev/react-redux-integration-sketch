const path = require("path")

const {CleanWebpackPlugin} = require("clean-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

module.exports = {
	entry: [
		"./src/js/agent.js"
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
				test: /\.(js|jsx)$/i,
				use: ["babel-loader"]
			},
			{
				test: /\.(svg|png|jpg|gif|ico|webm|mp4)$/i,
				use: ["file-loader"]
			},
			{
				test: /\.css$/i,
				use: [MiniCssExtractPlugin.loader, "css-loader"]
			}
		]
	},
	plugins: [
		new CleanWebpackPlugin(),
		new MiniCssExtractPlugin({filename: "bundle.css"})
	]
}
