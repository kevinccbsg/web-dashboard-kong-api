const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

const VENDOR_LIBS = [
  'react',
  'react-dom',
  'prop-types',
  'react-router-dom',
  'semantic-ui-react',
];
const configClient = {
  devtool: 'cheap-module-source-map',
  entry: {
    bundle: path.join(__dirname, 'src', 'client', 'app-client.jsx'),
    vendor: VENDOR_LIBS,
  },
  output: {
    path: path.join(__dirname, 'build', 'public', 'dist'),
    filename: '[name].[chunkhash].js',
    publicPath: '/dist',
  },
  module: {
    loaders: [
      {
        test: /\.styl$/,
        loader: ExtractTextPlugin.extract({
          // fallback: 'style-loader',
          use: [
            'css-loader',
            'stylus-loader',
          ],
        }),
      },
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 100000,
          },
        },
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          babelrc: false,
          presets: ['es2015', 'stage-2', 'react'],
          plugins: ['transform-es2015-modules-commonjs', 'transform-decorators-legacy'],
        },
      },
      {
        test: /\.css$/,
        include: /node_modules/,
        use: ExtractTextPlugin.extract({
          // fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
            },
          ],
        }),
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest'],
    }),
    new ExtractTextPlugin('[name].css'),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'client', 'assets', 'index.html'),
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  target: 'web',
};

if (process.env.NODE_ENV === 'production') {
  const productionPluggins = [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: false,
      mangle: false,
      comments: false,
      compress: {
        warnings: false,
        drop_console: true,
      },
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest'],
    }),
    new ExtractTextPlugin('[name].css'),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'client', 'assets', 'index.html'),
    }),
    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8,
    }),
  ];
  configClient.plugins = productionPluggins;
}

module.exports = configClient;
