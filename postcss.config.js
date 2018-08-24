#!/usr/bin/env node

const pkg = require('./package.json');

module.exports = {
	plugins: [
		require('postcss-inline-svg')({
			path: './src/img'
		}),
		require('postcss-svgo'),
		require('postcss-preset-env')({
			stage: 0
		}),
		require('autoprefixer'),
		require('mdcss')({
			destination: './dist/docs/styleguide',
			theme: require('mdcss-theme-github')
		}),
		require('cssnano')
	]
};
