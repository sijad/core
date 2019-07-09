"use strict";

const fs = require("fs");
const path = require("path");
const webpack = require("webpack");

const IS_PRODUCTION = process.env.NODE_ENV === "production";

module.exports = function(options = {}, argv = {}) {
  return {
    // Set up entry points for each of the forum + admin apps, but only
    // if they exist.
    entry: (function() {
      const entries = {};

      for (const app of ["forum", "admin"]) {
        for (const ext of ["ts", "js"]) {
          const file = path.resolve(process.cwd(), app + `.${ext}`);
          if (fs.existsSync(file)) {
            entries[app] = file;
          }
        }
      }

      return entries;
    })(),

    module: {
      rules: [
        {
          test: /\.(js|jsx|ts|tsx)$/,
          exclude: /node_modules/,
          loader: require.resolve("babel-loader"),
          options: {
            babelrc: false,
            configFile: false,
            presets: [
              [require.resolve("babel-preset-react-app"), { typescript: true }]
            ],
            cacheDirectory: true,
            cacheCompression: IS_PRODUCTION,
            compact: IS_PRODUCTION
          }
        }
      ]
    },

    output: {
      path: path.resolve(process.cwd(), "dist"),
      library: "module.exports",
      libraryTarget: "assign",
      devtoolNamespace: require(path.resolve(process.cwd(), "package.json"))
        .name
    },

    externals: [
      {
        "@flarum/core/forum": "flarum.core",
        "@flarum/core/admin": "flarum.core",
        react: "React"
      },

      (function() {
        const externals = {};

        if (options.useExtensions) {
          for (const extension of options.useExtensions) {
            externals["@" + extension] = externals[
              "@" + extension + "/forum"
            ] = externals["@" + extension + "/admin"] =
              "flarum.extensions['" + extension + "']";
          }
        }

        return externals;
      })(),

      // Support importing old-style core modules.
      function(context, request, callback) {
        let matches;
        if ((matches = /^flarum\/(.+)$/.exec(request))) {
          return callback(
            null,
            "root flarum.core.compat['" + matches[1] + "']"
          );
        }
        callback();
      }
    ],

    resolve: {
      extensions: [".ts", ".tsx", ".js", ".jsx"]
    },

    devtool: "source-map"
  };
};
