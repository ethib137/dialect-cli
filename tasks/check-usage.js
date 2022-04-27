import chalk from 'chalk';
import {readdir, readFile, stat} from 'fs/promises';
import path from 'path';

import {forEachToken} from '../util/util.js';
import {log, logError, logTitle} from '../util/chalk-util.js';

async function forEachFile(curPath, callback) {
	try {
		const files = await readdir(curPath);

		for (const file of files) {
			const filePath = path.join(curPath, file);

			const stats = await stat(filePath);

			if (stats.isDirectory()) {
				await forEachFile(filePath, callback);
			} else if (stats.isFile()) {
				const data = await readFile(filePath);

				callback(data);
			}
		}
	} catch (err) {
		console.error(err);
	}
}

function checkUsage(tokenPath, category) {
	logTitle('Check Usage:');

	const tokens = [];

	forEachToken(tokenPath, category, (frontendToken) => {
		const {mappings} = frontendToken;

		const mappingValue = mappings[0].value;

		tokens.push(`--${mappingValue}`);
	});

	const usedTokens = [tokens];

	const cssPath = path.join(path.dirname(tokenPath), '..', 'css');

	forEachFile(cssPath, (data) => {
		tokens.forEach((token) => {
			if (data.includes(token)) {
				usedTokens.push(token);
			}
		});
	}).then(() => {
		const unusedTokens = tokens.filter(
			(token) => !usedTokens.includes(token)
		);

		if (unusedTokens.length === 0) {
			log('There are no unused tokens.', false);
		} else {
			unusedTokens.forEach((token) => {
				logError(token);
			});
		}
	});
}

export default checkUsage;
