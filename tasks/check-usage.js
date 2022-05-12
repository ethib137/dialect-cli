import {readdir, readFile, stat} from 'fs/promises';
import path from 'path';

import {forEachToken} from '../util/util.js';
import {
	logError,
	logNewLine,
	logSubtitle,
	logTitle
} from '../util/chalk-util.js';

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

async function checkUsage(tokenPath, category) {
	logTitle('Check Usage:');

	const defaultValues = [];
	const tokens = [];
	const usedTokens = [];

	await forEachToken(tokenPath, category, (frontendToken) => {
		const {defaultValue, mappings} = frontendToken;

		const cssVariable = defaultValue.match(/var\((.*)\)/);

		if (cssVariable && cssVariable[1]) {
			defaultValues.push(cssVariable[1]);
		}

		const mappingValue = mappings[0].value;

		tokens.push(`--${mappingValue}`);
	});

	const cssPath = path.join(path.dirname(tokenPath), '..', 'css');

	await forEachFile(cssPath, (data) => {
		tokens.forEach((token) => {
			if (data.includes(token)) {
				usedTokens.push(token);
			}
		});
	});

	let unusedTokens = tokens.filter((token) => !usedTokens.includes(token));

	unusedTokens = unusedTokens.filter(
		(unusedToken) => !defaultValues.includes(unusedToken)
	);

	if (unusedTokens.length === 0) {
		logError('There are no unused tokens.', false);
	} else {
		logSubtitle(
			'The following tokens are not used in the theme css or as default values for other tokens.'
		);

		unusedTokens.forEach((token) => {
			logError(token);
		});

		logNewLine();
	}
}

export default checkUsage;
