import chalk from 'chalk';
import {chalkLog, forEachToken} from './util.js';

function checkDuplicates(path, category) {
	console.log(chalk.blue('Check Duplicates:'));

	const dict = {};

	forEachToken(path, category, (frontendToken) => {
		const {mappings} = frontendToken;

		const mappingValue = mappings[0].value;

		dict[mappingValue] = dict[mappingValue] ? dict[mappingValue]++ : 1;
	});

	let duplicates = 0;

	Object.keys(dict).forEach((key) => {
		if (dict[key] > 1) {
			chalkLog(`${key} is included ${dict[key]} times.`);

			duplicates++;
		}
	});

	if (duplicates === 0) {
		chalkLog('There are no duplicate tokens.', false);
	}

	console.log();
}

export default checkDuplicates;
