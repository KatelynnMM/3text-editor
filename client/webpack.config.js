const HtmlWebpackPlugin = require('html-webpack-plugin'); // Import HtmlWebpackPlugin for generating HTML files.
const WebpackPwaManifest = require('webpack-pwa-manifest'); // Import WebpackPwaManifest for creating a manifest file.
const path = require('path'); // Import path for handling file paths.
const { InjectManifest } = require('workbox-webpack-plugin'); // Import InjectManifest for injecting a custom service worker.
module.exports = () => {
  return {
    mode: 'development',
    // Define entry points for the application.
    entry: {
      main: './src/js/index.js', // Main entry point.
      install: './src/js/install.js' // Entry point for install script.
    },
    // Specify the output configuration for bundled files.
    output: {
      filename: '[name].bundle.js', // Output file name pattern.
      path: path.resolve(__dirname, 'dist'), // Output directory path.
    },
    // Configure plugins for HTML generation, service worker injection, and manifest file creation.
    plugins: [
      // HtmlWebpackPlugin generates HTML files and injects bundle scripts.
      new HtmlWebpackPlugin({
        // Specify the HTML template file.
        template: './index.html',
        // Set the title of the HTML file.
        title: 'Text Editor'
      }),
      // InjectManifest plugin injects a custom service worker.
      new InjectManifest({
        swSrc: './src-sw.js', // Path to the service worker source file.
        swDest: 'src-sw.js', // Destination path for the injected service worker.
      }),
      // WebpackPwaManifest generates a manifest.json file.
      new WebpackPwaManifest({
        fingerprints: false, // Disable fingerprinting.
        inject: true, // Inject manifest into the generated HTML.
        name: 'Just another text editor', // Application name.
        short_name: 'JATE', // Short name for the application.
        description: 'Just another text editor!', // Application description.
        background_color: '#225CA3', // Background color for the application.
        theme_color: '#225CA3', // Theme color for the application.
        start_url: '/', // Start URL for the application.
        publicPath: '/', // Public path for the application.
        icons: [
          {
            src: path.resolve('src/images/logo.png'), // Path to the application icon.
            sizes: [96, 128, 192, 256, 384, 512], // Icon sizes.
            destination: path.join('assets', 'icons'), // Destination directory for icons.
          },
        ],
      }),
    ],
    module: {
      // Configure CSS loaders for handling CSS files.
      rules: [
        {
          test: /\.css$/i, // Match CSS files.
          use: ["style-loader", "css-loader"] // Use style-loader and css-loader for bundling CSS.
        },
        {
          test: /\.m?js$/, // Match JavaScript files.
          exclude: /node_modules/, // Exclude node_modules directory.
          // Use babel-loader for transpiling ES6 code.
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
              plugins: ["@babel/plugin-proposal-object-rest-spread", "@babel/transform-runtime"]
            }
          }
        }
      ],
    },
  };
};