const path = require(`path`);
const webpack = require(`webpack`);

module.exports = {
  entry: `./script.js`,

  resolve: {
    extensions: [``, `.js`]
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: `babel`,
        query: {
          presets: [`es2015`],
          cacheDirectory: true
        }
      },
      {
        test: /\.(glsl|vs|fs)$/,
        exclude: /(node_modules)/,
        loader: `shader`
      }
    ],

    postLoaders: [
      {
        include: path.resolve(__dirname, `node_modules/pixi.js`),
        loader: `ify`
      }
    ]
  },
  glsl: {
    chunkPath: path.resolve(__dirname, `/glsl/chunks`)
  },

  devtool: `cheap-module-eval-source-map`,
  output: {
    path: `${process.cwd()}/`,
    filename: `script.bundle.js`
  }
};
