const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');
const isWatchMode = process.argv.includes('--watch');
// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.
console.log(isWatchMode);
module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [

      new HtmlWebpackPlugin({
        template: './index.html',
        chunks: ['main'],
      }),
      // new HtmlWebpackPlugin({
      //   template: './src/js/install.js',
      //   filename: 'install.js',
      //   chunks: ['install'],
      // }),
      new WebpackPwaManifest({
        name: 'Your App Name',
        short_name: 'App Name',
        description: 'Your app description',
        background_color: '#ffffff',
        crossorigin: 'use-credentials', //can be null, use-credentials or anonymous
        icons: [
          {
            src: path.resolve('src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('icons'),

          },

        ],


      }),

      !isWatchMode && new InjectManifest({
        swSrc: './src-sw.js',
        swDest: 'sw.js',
      }),
    ].filter(Boolean), // This ensures that false values are removed from the plugins array



    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },

      ],
    },
  };
};
