var path = require("path");
var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var StatsPlugin = require("stats-webpack-plugin");
var loadersByExtension = require("../config/loadersByExtension");
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function(options) {
  var entry = {
    todos: './client/index.js'
  };

  var loaders = {
    "js": {
      // loaders: options.development ? ["react-hot", "babel-loader"] : ["babel-loader"],
      loaders: options.development ? ["babel-loader"] : ["babel-loader"],
      include: path.join(__dirname, "..", "client")
    },
    "ts|tsx": {
      // loaders: ['react-hot', 'ts-loader']
      // TODO -- test here removing the babel-loader so we can get actual JSX source map, right now we aren't seeing <App> type of thing.
      loaders: ['babel-loader', 'ts-loader']
      // loaders: ['ts-loader']
    }
  };

  var stylesheetLoaders = {
    "css": 'css-loader'
  };

   var publicPath = options.development ? '/' : options.publicPath || '/';

  var plugins = [
    new webpack.PrefetchPlugin("react"),
    new webpack.PrefetchPlugin("react/lib/ReactComponentBrowserEnvironment")
    // new StatsPlugin(path.join(__dirname, "..", "build", options.development ? "stats-dev.json" : "stats.json"), {
    //   chunkModules: true
    // })
  ];

  if (options.development) {
    plugins.push(new HtmlWebpackPlugin({
      template: './client/index_dev.html',
      inject: 'body',
      hash: true
    }))
  }

  Object.keys(stylesheetLoaders).forEach(function(ext) {
    var stylesheetLoader = stylesheetLoaders[ext];
    if(Array.isArray(stylesheetLoader)) stylesheetLoader = stylesheetLoader.join("!");
    if(options.separateStylesheet) {
      stylesheetLoaders[ext] = ExtractTextPlugin.extract("style-loader", stylesheetLoader);
    } else {
      stylesheetLoaders[ext] = "style-loader!" + stylesheetLoader;
    }
  });

  if(options.separateStylesheet) {
    plugins = plugins.concat([
      new ExtractTextPlugin("[name].css", {
        allChunks: true
      })
    ]);
  }

  if(options.minimize) {
    plugins = plugins.concat([
      new webpack.optimize.UglifyJsPlugin({
        compressor: {
          warnings: false
        }
      }),
      new webpack.optimize.DedupePlugin()
    ]);
  }

  if(options.minimize) {
    plugins = plugins.concat([
      new webpack.DefinePlugin({
        "process.env": {
          NODE_ENV: JSON.stringify("production")
        }
      }),
      new webpack.NoErrorsPlugin()
    ]);
  }

  if (options.development) {
    plugins = plugins.concat([
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin(),
      new webpack.DefinePlugin({
        __DEVELOPMENT__: true,
        __DEVPANEL__: options.devPanel
      })
    ]);
  } else {
    plugins = plugins.concat([new webpack.DefinePlugin({
      __DEVELOPMENT__: false,
      __DEVPANEL__: false
    })]);
  }

  return {
    entry: entry,
    output: {
      path: path.join(__dirname, "..", "build", options.development ? "development" : "public"),
      publicPath: publicPath,
      filename: options.development ? "[id].js" : "[name].js",
      chunkFilename: "[id].js",
      sourceMapFilename: "debugging/[file].map",
      pathinfo: options.debug
    },
    target: 'web',
    module: {
      loaders: loadersByExtension(loaders).concat(loadersByExtension(stylesheetLoaders))
    },
    devtool: options.devtool,
    debug: options.debug,
    resolveLoader: {
      root: path.join(__dirname, '..', "node_modules")
    },
    resolve: {
      root: path.join(__dirname, "..", "app"),
      modulesDirectories: ['node_modules'],
      extensions: ["", ".web.js", ".js", ".jsx", ".ts", ".tsx"]
    },
    plugins: plugins,
    devServer: {
      stats: {
        cached: false
      }
    }
  };
};
