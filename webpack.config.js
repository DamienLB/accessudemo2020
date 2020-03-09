const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const GitRevisionPlugin = require('git-revision-webpack-plugin');
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');
const configrules = require('./wconfig-rules.js');

const gitHashCommand = 'rev-parse --short HEAD';
const gitRevisionPlugin = new GitRevisionPlugin({ branch: true, commithashCommand: gitHashCommand, versionCommand: 'describe --abbrev=0 --always' });
const appVersion = JSON.stringify(gitRevisionPlugin.version());
const appGitBranch = JSON.stringify(gitRevisionPlugin.branch());
const appGitCommit = JSON.stringify(gitRevisionPlugin.commithash());

const distConfig = {
  entry: ['@babel/polyfill', './src/index.js'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: `main.js`,
  },
  module: {
    rules: configrules,
  },
  plugins: [
    new webpack.DefinePlugin({ 'process.env': { NODE_ENV: JSON.stringify('production') } }),
    new HtmlWebpackPlugin({ template: './public/index.html' }),
    new webpack.DefinePlugin({
      VERSION: appVersion,
      BRANCH: appGitBranch,
      COMMIT: appGitCommit,
      SAVI_EMBEDDED: false,
    }),
    new webpack.BannerPlugin(`savi-accessudemo2020 version: ${appVersion}\n branch: ${appGitBranch}\n commit: ${appGitCommit}`),
  ],
};

module.exports = [distConfig];
