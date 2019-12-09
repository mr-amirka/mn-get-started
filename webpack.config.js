const Path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {MnPlugin} = require('minimalist-notation/webpack-loader');

module.exports = {
  watch: true,
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000,
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
    extensions: [ '.js', '.jsx' ],
  },
  entry: {
    app: './src/app.jsx',
  },
  output: {
    filename: '[name].[contenthash].js',
    path: __dirname + '/dist',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.mn\.js$/,
        use: [
          {
            loader: 'minimalist-notation/webpack-loader/reload',
          },
        ],
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
                  "pragma": "React.createElement", // default pragma is React.createElement
                  "pragmaFrag": "DomFrag", // default is React.Fragment
                  "throwIfNamespace": false, // defaults to true
                }],
             ],
           },
          },
          {
            loader: 'minimalist-notation/webpack-loader',
            options: {
              id: 'app',
              attrs: {className: 'class'},
            },
          },
        ],
      },
      {
        test: /\.s?css$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader",
            options: {
              minimize: true,
            },
          },
          {
            loader: "sass-loader",
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
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MnPlugin({
      id: 'app',
      attrs: {'class': 'class'},
      output: [
        './dist/mn.css',
      ],
      template: [
        './src/index.html',
      ],
      presets: [
        require('mn-presets/styles'),
        require('mn-presets/medias'),
        require('mn-presets/prefixes'),
        require('mn-presets/states'),
        require('mn-presets/theme'),
      ],
    }),
    new HtmlWebpackPlugin({
      inject: 'body',
      template: './src/index.html',
      filename: 'index.html',
      chunks: [ 'app' ],
    }),
  ],
};
