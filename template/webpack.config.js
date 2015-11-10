import path from 'path';
import HtmlwebpackPlugin from 'html-webpack-plugin';
import webpack from 'webpack';

const TARGET = process.env.npm_lifecycle_event;
const ROOT_PATH = path.resolve(__dirname);
const APP_PATH = path.resolve(ROOT_PATH, 'app');

process.env.BABEL_ENV = TARGET;

const common = {
  entry: APP_PATH,
  module: {
    loaders: [
      {test: /\.css$/, loaders: ['style', 'css'], include: APP_PATH},
      {
       test: /\.jsx?$/,
       loaders: ['babel'],
       include: APP_PATH
     },
    ]
  },
  plugins: [
    // important! move HotModuleReplacementPlugin below
    //new webpack.HotModuleReplacementPlugin(),
    new HtmlwebpackPlugin({
      title: "{{package.name}}",
    })
  ]
};

if(TARGET === 'start' || !TARGET) {
  module.exports = {...common,
    devtool: 'eval-source-map',
    devServer: {
      historyApiFallback: true,
      hot: true,
      inline: true,
      progress: true
    },
    plugins: [...common.plugins,
      new webpack.HotModuleReplacementPlugin()
    ]
  };
}
