const path = require('path');

module.exports = {
	entry: './scripts/main.js',
	mode: 'development',
	output: {
		path: path.resolve(__dirname, './dist'),
		filename: 'bundle.js'
	},
	devtool: 'eval-source-map',
	module: {
    rules: [
      {
				test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
						options: {
							name : '[name].[ext]',
							outputPath : 'images'
						},
            loader: 'file-loader',
          },
        ],
			},
			{
				test: /\.css$/,
				use: [
					{ loader: 'style-loader'},
					{ loader: 'css-loader'}
				]
			}
    ],
  },
};