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
			destination: pkg.config.mdcss.destination,
			theme: require('mdcss-theme-github')({
				title: pkg.config.mdcss.title
			})
		}),
		require('cssnano')({
			preset: ['default', {
				svgo: {
					exclude: true
				}
			}]
		})
	]
};
