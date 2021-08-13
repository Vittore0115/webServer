const path = require('path')
const webpack = require('webpack')


module.exports = {
	devtool: 'source-map',
	entry: './webServer/index.js', //入口文件
	output: {
		path: path.resolve(__dirname, './dist'), //输出路径，dist目录下
		publicPath: '/dist/',
		filename: 'miniWebserver.min.js', // 输出文件，对应package.json中的main字段
		libraryTarget: 'umd',
		umdNamedDefine: true,
	},
	module: {},
	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('production'),
			},
		}),
	],
}
