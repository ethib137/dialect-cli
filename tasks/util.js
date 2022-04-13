import {readdir, readFile, stat} from 'fs/promises';
import chalk from 'chalk';
import naturalCompare from 'natural-compare-lite';

export function chalkLog(text, error) {
	console.log(chalkError(text, error));
}

export function chalkError(text, error = true) {
	const color = error ? 'red' : 'green';

	return chalk[color](text);
}

export async function readTokens(path, callback) {
	try {
		const data = await readFile(path, 'utf8');

		callback(JSON.parse(data));
	} catch (err) {
		console.log(err);
	}
}

export async function forEachToken(path, category = '', callback) {
	await forEachTokenSet(path, category, (frontendTokenSet) => {
		frontendTokenSet.frontendTokens.forEach((frontendToken) => {
			callback(frontendToken);
		});
	});
}

export async function forEachTokenSet(path, category = '', callback) {
	await readTokens(path, (data) => {
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
