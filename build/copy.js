#!/usr/bin/env node
/* eslint no-console: "off" */
const fs = require('fs'),
	  path = require('path'),
	  pkg = require('../package.json'),
	  ROOT = path.dirname(__dirname);

function withDir(filePath, callback) {
	const dirname = path.dirname(filePath);

	if (!dirname) {
		throw `Could not create destination path for "${filePath}"`;
	}

	if (fs.existsSync(dirname)) {
		return path.normalize(filePath);
	}

	withDir(dirname, callback);
	fs.mkdirSync(dirname);
}

for (const targets of pkg.config.copy) {
	if (!Array.isArray(targets) || targets.length < 2) {
		console.log(`Target source file missing destination: ${targets[0]}`);
		continue;
	}

	const from = path.resolve(ROOT, targets[0]),
		  to = path.resolve(ROOT, targets[1]);

	fs.copyFile(from, withDir(to), err => {
		if (err) {
			console.error(err);
			return;
		}

		console.log(`Copied "${path.normalize(from)}" to "${path.normalize(to)}"`);
	});
}
