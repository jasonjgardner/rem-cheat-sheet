#!/usr/bin/env node

const pkg = require('./package.json');

module.exports = {
	plugins: [
		require('postcss-preset-env')({
			stage: 0
		}),
		require('autoprefixer'),
		require('mdcss')({
			destination: './docs/styleguide',
			theme: require('mdcss-theme-github')
		})
	]
};
