const path = require(`path`);
const BabiliPlugin = process.env.NODE_ENV === `production` ? require(`babili-webpack-plugin`) : null;

module.exports = {
  entry: `./script.js`,

  resolve: {
    extensions: [``, `.js`]
  },

  plugins: process.env.NODE_ENV === `production` ? [new BabiliPlugin()] : [],

  module: {
    loaders: [
      {
        loader: `babel`,
        test: /\.js$/,
        exclude: /(node_modules)/,
        query: {
          presets: [`es2015`],
          plugins: [`transform-es2015-modules-commonjs`],
          cacheDirectory: true
        }
      },
      {
        loader: `shader`,
        test: /\.(glsl|vs|fs)$/,
        exclude: /(node_modules)/
      }
    ],

    postLoaders: [
      {
        loader: `ify`,
        include: path.resolve(__dirname, `node_modules/pixi.js`)
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
