const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = env => {
  const { mode = 'development' } = env;

  const isProd = mode === 'production';
  const isDev = mode === 'development';

  const getPlugins = () => {
    let plug = [
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'public/index.html'
      })
    ];

    if(isProd) {
      plug.push(
        new MiniCssExtractPlugin({
          filename: 'index.[hash:8].min.css',
        }),
      );
    }

    return plug;
  };

  return {
    entry: './src/index.js',
    mode: isProd ? 'production' : isDev && 'development',
    output: {
      path: path.join(__dirname, 'dist'),
      filename: isProd ? 'index.[hash:8].bundle.min.js' : 'index.[hash:8].bundle.js'
    },
    module: {
      rules: [
        {
          test: /.jsx?$/i,
          exclude: /node_modules/,
          loader: [
            'babel-loader',
          ],
        },
        {
          test: /\.(css|s[ac]ss)$/i,
          use: [
            isProd ? MiniCssExtractPlugin.loader : 'style-loader',
            'css-loader',
            'sass-loader'
          ],
        },
        {
          test: /\.(png|jpe?g|gif)$/i,
          use: [
            {
              loader: 'file-loader',
              options: {
                outputPath: 'images',
                name: '[name]-[sha1:hash:8].[ext]',
              }
            }
          ]
        },
        {
          test: /\.woff2?$/i,
          use: [
            {
              loader: 'file-loader',
              options: {
                outputPath: 'fonts',
                name: '[name].[ext]',
              }
            }
          ]
        }
      ]
    },
    plugins: getPlugins(),
    devServer: {
      port: 9000,
      open: true,
      hot: true
    }
  };
};
