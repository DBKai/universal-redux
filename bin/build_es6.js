#!/usr/bin/env node
const webpack = require('webpack');
const webpackConfig = require('./merge-configs');
const fs = require('fs');
const buildStats = false;
const outputStatsPath = './webpack-stats.json';

console.log('\nBuilding webpack bundle...');
webpack(webpackConfig, (err, stats) => {
  if (err) {
    console.log('Webpack build had fatal error:', err);
    return;
  }

  const options = {
    hash: true,
    version: true,
    timings: true,
    assets: true,
    chunks: false,
    colors: true
  };

  console.log('Webpack compile was successful.');

  const jsonStats = stats.toJson();
  if (jsonStats.errors.length > 0) {
    console.log('Webpack had errors.');
    options.errors = true;
  }
  if (jsonStats.warnings.length > 0) {
    console.log('Webpack had warnings.');
    options.warnings = true;
  }

  console.log(stats.toString(options));

  if (buildStats) {
    fs.writeFile(outputStatsPath, JSON.stringify(stats.toJson()), (writeError) => {
      if (writeError) {
        return console.log(writeError);
      }

      console.log('Webpack output stats were saved to', outputStatsPath);
    });
  }
});
