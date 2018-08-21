#!/usr/bin/env node

const pkg = require('./package.json');

module.exports = {
	plugins: [
		require('postcss-for'),
		require('postcss-each'),
		require('postcss-preset-env')({
			stage: 0
		}),
		require('autoprefixer')
	]
};
