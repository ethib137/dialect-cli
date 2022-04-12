import chalk from 'chalk';
import Table from 'cli-table';
import {chalkError, forEachTokenSet, naturalSort} from './util.js';

function isSorted(arr1, arr2) {
	let sorted = true;

	arr1.forEach((item, i) => {
		if (item !== arr2[i]) {
			sorted = false;
		}
	});

	return sorted;
}

function checkSort(path, category) {
	forEachTokenSet(path, category, (frontendTokenSet, categoryName) => {
		const setTokens = [];

		frontendTokenSet.frontendTokens.forEach((frontendToken) => {
			const {mappings} = frontendToken;

			const mappingValue = mappings[0].value;

			setTokens.push(mappingValue);
		});

		const setTokensSorted = naturalSort([...setTokens]);

		if (!isSorted(setTokens, setTokensSorted)) {
			var table = new Table();

			table.push([chalk.blue('Unsorted'), chalk.blue('Sorted')]);

			setTokens.forEach((token, i) => {
				const sortedToken = setTokensSorted[i];

				table.push([
					chalkError(token, token !== sortedToken),
					chalkError(sortedToken, token !== sortedToken)
				]);
			});

			console.log(
				chalk.blue(`${categoryName}: ${frontendTokenSet.name}`)
			);
			console.log(table.toString());
			console.log();
		}
	});
}

export default checkSort;
