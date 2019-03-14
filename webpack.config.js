const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    // entry: ["./src/index.tsx", "./src/scss/main.scss"],
    entry: ["./src/index.tsx"],
    mode: "development",
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'bundle.js',
        publicPath: '/'
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",
    devServer: {
        contentBase: path.resolve('public'),
        publicPath: '/',
    },
    plugins: [
      new HtmlWebpackPlugin({template: 'public/index.html'}),
      new ExtractTextPlugin('style.css')
    ],

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json"]
    },

    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            { test: /\.tsx?$/, loader: "awesome-typescript-loader" },

            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
            {
              test: /\.scss$/,
              use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: ['typings-for-css-modules-loader?modules&namedExport&camelCase', 'sass-loader']
                // use: ['css-loader', 'sass-loader'] namedExport&camelCase
              })
            }
        ]
    },
};