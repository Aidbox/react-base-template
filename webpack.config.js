const path = require('path');

process.env.NODE_ENV = 'development';

const isDevelopment = process.env.NODE_ENV === 'development';
const isProduction = process.env.NODE_ENV === 'production';

const sourcemap = { sourceMap: isDevelopment };

const HTML_PLUGIN = require('html-webpack-plugin');
const CSS_LOADER = require.resolve('css-loader');
const SASS_LOADER = require.resolve('sass-loader');
const POSTCSS_LOADER = require.resolve('postcss-loader');
const POSTCSS_NORMALIZE = require('postcss-normalize');
const STYLE_LOADER = require.resolve('style-loader');
const FILE_LOADER = require.resolve('file-loader');
const BABEL_LOADER = require.resolve('babel-loader');
// const REACT_REFRESH = require('react-refresh/babel');
const WEBPACK = require('webpack');
const DEFINE_PLUGIN = WEBPACK.DefinePlugin;
const PROVIDE_PLUGIN = WEBPACK.ProvidePlugin;
const HOT_MODULE_REPLACEMENT_PLUGIN = WEBPACK.HotModuleReplacementPlugin;
const TYPESCRIPT_CHECKER_PLUGIN = require('fork-ts-checker-webpack-plugin');
const REACT_REFRESH_PLUGIN = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = () => ({
  mode: 'development',
  devtool: 'inline-source-map',
  entry: [
    "./src/index.ts",
  ],
  output: {
    filename: '[name].[contenthash].js',
    publicPath: '',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.scss', '.sass'],
    alias: {
      '@components': path.resolve(__dirname, 'src/components/'),
      '@design': path.resolve(__dirname, 'src/design/'),
      '@store': path.resolve(__dirname, 'src/store/'),
    }
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg|svg|ttf|eot|woff|woff2)$/,
        loader: FILE_LOADER,
        options: { name: 'static/media/[name].[contenthash:8].[ext]' }
      },
      {
        test: /\.module\.(scss|sass)$/,
        use: [
          { loader: STYLE_LOADER },
          { loader: CSS_LOADER, options: { ...sourcemap } },
          { loader: POSTCSS_LOADER, options: { postcssOptions: { plugins: [POSTCSS_NORMALIZE()] }, ...sourcemap } },
          { loader: SASS_LOADER, options: { ...sourcemap, additionalData: '@import "@design";' } },
        ],
      },
      {
        test: /\.(ts|tsx|js|jsx)$/,
        loader: BABEL_LOADER,
        include: path.resolve(__dirname, 'src/'),
      },
    ],
  },
  plugins: [
    new HOT_MODULE_REPLACEMENT_PLUGIN(),
    new REACT_REFRESH_PLUGIN({ include: /\.(tsx)$/ }),
    new DEFINE_PLUGIN({ 'process.env.NODE_ENV': JSON.stringify('development') }),
    new PROVIDE_PLUGIN({ process: 'process/browser' }),
    new HTML_PLUGIN({ template: require.resolve('./public/index.html') }),
    new TYPESCRIPT_CHECKER_PLUGIN({
      async: isDevelopment,
      eslint: { enabled: true, configFile: path.resolve(__dirname, '.eslintrc.json'), files: [path.resolve(__dirname, 'src')] },
      typescript: { enabled: true, configFile: path.resolve(__dirname, 'tsconfig.json') },
    }),
  ],
  devServer: { hot: true, liveReload: false },
});
