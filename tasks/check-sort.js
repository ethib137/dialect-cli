import chalk from 'chalk';
import Table from 'cli-table';
import {forEachTokenSet, naturalSort} from '../util/util.js';
import {
	logError,
	chalkError,
	logIndent,
	logNewLine,
	logSubtitle,
	logTitle
} from '../util/chalk-util.js';

const IGNORE_SETS = [
	'brandPrimary',
	'brandSecondary',
	'neutral',
	'actionPrimary',
	'actionSecondary',
	'actionNeutral',
	'states',
	'fontWeight',
	'paragraphs',
	'borderRadius',
	'containerMaxWidths'
];

function isSorted(arr1, arr2) {
	let sorted = true;

	arr1.forEach((item, i) => {
		if (item !== arr2[i]) {
			sorted = false;
		}
	});

	return sorted;
}

async function checkSort(path, category) {
	logTitle('Check Sort:');

	let sorted = true;

	await forEachTokenSet(path, category, (frontendTokenSet, categoryName) => {
		const setTokens = [];

		if (!IGNORE_SETS.includes(frontendTokenSet.name)) {
			frontendTokenSet.frontendTokens.forEach((frontendToken) => {
				const {mappings} = frontendToken;

				const mappingValue = mappings[0].value;

				setTokens.push(mappingValue);
			});
		}

		const setTokensSorted = naturalSort([...setTokens]);

		if (!isSorted(setTokens, setTokensSorted)) {
			sorted = false;

			const table = new Table();

			table.push([chalk.grey('Unsorted'), chalk.grey('Sorted')]);

			setTokens.forEach((token, i) => {
				const sortedToken = setTokensSorted[i];

				table.push([
					chalkError(token, token !== sortedToken),
					chalkError(sortedToken, token !== sortedToken)
				]);
			});

			logSubtitle(`${categoryName}: ${frontendTokenSet.name}`);
			console.log(table.toString());
			logNewLine();
		}
	});

	if (sorted) {
		logError('All tokens are sorted.', false);
	}

	logNewLine();
}

export default checkSort;
