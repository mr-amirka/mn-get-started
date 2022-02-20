const Path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {
  MnPlugin,
} = require('minimalist-notation/webpack-loader');

module.exports = {
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
    // 'production',
    'development',
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  entry: {
    app: './src/index.js',
  },
  output: {
    filename: '[name].js',
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
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              presets: [
                '@babel/preset-env',
                '@babel/preset-react',
                '@babel/preset-flow',
              ],
              plugins: [
                '@babel/syntax-dynamic-import',
                '@babel/plugin-proposal-class-properties',
                ['@babel/plugin-proposal-decorators', {legacy: true}],
                ['@babel/plugin-transform-react-jsx', {
                  // default pragma is React.createElement
                  'pragma': 'React.createElement',

                  // default is React.Fragment
                  'pragmaFrag': 'React.Fragment',

                  // defaults to true
                  'throwIfNamespace': false,
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
            loader: MiniCssExtractPlugin.loader,
            // loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              minimize: true,
            },
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
      {
        test: /\.(jpg|jpeg|png|svg|gif|woff|woff2|otf|ttf|eot|mp3)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[hash].[ext]',
              outputPath: 'assets/static/',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'app.css',
    }),
    new MnPlugin({
      id: 'app',
      attrs: ['class'],
      output: [
        './dist/mn.css',
      ],
      path: './src/',
      /*
      include: [
        /^.*\.(php|html?)$/,
      ],
      exclude: [
        /\/node_modules\/|(.*\.tmp)/,
      ],
      */
      template: [
        './src/index.html',
      ],
      presets: [
        require('minimalist-notation/presets/styles'),
        require('minimalist-notation/presets/medias'),
        require('minimalist-notation/presets/prefixes'),
        require('minimalist-notation/presets/synonyms'),
        require('minimalist-notation/presets/main'),
      ],
    }),
    new HtmlWebpackPlugin({
      inject: 'body',
      template: './src/index.html',
      filename: 'index.html',
      chunks: [],
    }),
  ],
};
