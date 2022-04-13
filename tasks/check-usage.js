import chalk from 'chalk';
import {readdir, readFile, stat} from 'fs/promises';
import path from 'path';

import {chalkLog, forEachToken} from './util.js';

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
	const tokens = [];

	forEachToken(tokenPath, category, (frontendToken) => {
		const {mappings} = frontendToken;

		const mappingValue = mappings[0].value;

		tokens.push(`--${mappingValue}`);
	});

	const usedTokens = [tokens];

	const dialectPath = path.join(
		path.dirname(tokenPath),
		'..',
		'css',
		'dialect'
	);

	forEachFile(dialectPath, (data) => {
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
			chalkLog('There are no unused tokens.', false);
		} else {
			console.log(chalk.blue('Unused Tokens:'));

			unusedTokens.forEach((token) => {
				chalkLog(token);
			});
		}
	});
}

export default checkUsage;
