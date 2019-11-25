const Path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const { MnPlugin } = require('mn-loader');

module.exports = {
  watch: true,
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000
  },
  devServer: {
    contentBase: Path.join(__dirname, 'dist'),
    compress: true,
    open: true,
    port: 9000,
    openPage: 'index.html',
  },
  mode:
    //'production',
    'development',
  resolve: {
    extensions: [ '.js', '.jsx' ]
  },
  entry: {
    app: './src/app.jsx'
  },
  output: {
    filename: '[name].js',
    path: __dirname + '/dist',
    publicPath: '/'
  },
  module: {
    rules: [
      // hot-reload MN build handlers
      {
        test: /\.mn\.js$/,
        use: [
          {
            loader: 'mn-loader/reload',
          }
        ]
      },
      {
        test: /\.jsx?$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              cacheDirectory: true,
              presets: [ "@babel/preset-env", "@babel/preset-react", "@babel/preset-flow" ],
              plugins: [
                "@babel/syntax-dynamic-import",
                "@babel/plugin-proposal-class-properties",
                [ "@babel/plugin-proposal-decorators", { legacy: true } ],
                [ "@babel/plugin-transform-react-jsx", {
                  "pragma": "React.createElement",
                  "pragmaFrag": "DomFrag",
                  "throwIfNamespace": false
                }]
             ]
            }
          },
          {
            loader: 'mn-loader',
            options: {
              id: 'app',
              attrs: [ 'm' ]
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader"
          }, {
            loader: "css-loader",
            options: {
              minimize: true
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: "style-loader"
          }, {
            loader: "css-loader",
            options: {
              minimize: true
            }
          }, {
            loader: "sass-loader"
          }
        ]
      },
      {
        test: /\.(jpg|jpeg|png|svg|gif|woff|woff2|otf|ttf|eot|mp3)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[hash].[ext]',
              outputPath: 'assets/static/'
            }
          }
        ]
      },
      /*
      {
        test: /\.(jpg|jpeg|png|svg|gif|woff|woff2|otf|ttf|eot|mp3)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 100000
            }
          }
        ]
      },
      */
    ]
  },
  plugins: [
    new MnPlugin({
      id: 'app',
      attrs: [ 'm' ],
      output: './dist/app.css',
      template: './src/index.html',
      presets: [
        require('mn-presets/styles'),
        require('mn-presets/medias'),
        require('mn-presets/prefixes'),
        require('mn-presets/states'),
        require('mn-presets/theme'),
      ]
    }),
    new HtmlWebpackPlugin({
      inject: 'head',
      template: './src/index.html',
      filename: 'index.html',
      chunks: [ ]
    })
  ],
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        extractComments: false,
        sourceMap: false,
        uglifyOptions: {
          warnings: false,
          ie8: false,
          safari10: false,
          compress: {
            unsafe_math: true
          },
          output: {
            comments: false,
            beautify: false
          }
        }
      })
    ]
  }
};
