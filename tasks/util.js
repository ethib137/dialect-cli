import fs from 'fs';
import chalk from 'chalk';
import naturalCompare from 'natural-compare-lite';

export function chalkLog(text, error) {
	console.log(chalkError(text, error));
}

export function chalkError(text, error = true) {
	const color = error ? 'red' : 'green';

	return chalk[color](text);
}

export function readTokens(path, callback) {
	fs.readFile(path, 'utf8', (err, data) => {
		if (err) {
			console.error(err);
			return;
		}

		callback(JSON.parse(data));
	});
}

export function forEachToken(path, category = '', callback) {
	forEachTokenSet(path, category, (frontendTokenSet) => {
		frontendTokenSet.frontendTokens.forEach((frontendToken) => {
			callback(frontendToken);
		});
	});
}

export function forEachTokenSet(path, category = '', callback) {
	readTokens(path, (data) => {
		const {frontendTokenCategories} = data;

		frontendTokenCategories.forEach((frontendTokenCategory) => {
			if (
				category.length === 0 ||
				category === frontendTokenCategory.name
			) {
				frontendTokenCategory.frontendTokenSets.forEach(
					(frontendTokenSet) => {
						callback(frontendTokenSet, frontendTokenCategory.name);
					}
				);
			}
		});
	});
}

export function naturalSort(arr) {
	return arr.sort(naturalCompare);
}
