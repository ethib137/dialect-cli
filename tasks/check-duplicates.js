import chalk from 'chalk';
import {forEachToken} from '../util/util.js';
import {log, logTitle, logNewLine} from '../util/chalk-util.js';

function checkDuplicates(path, category) {
	logTitle('Check Duplicates:');

	const dict = {};

	forEachToken(path, category, (frontendToken) => {
		const {mappings} = frontendToken;

		const mappingValue = mappings[0].value;

		dict[mappingValue] = dict[mappingValue] ? dict[mappingValue]++ : 1;
	});

	let duplicates = 0;

	Object.keys(dict).forEach((key) => {
		if (dict[key] > 1) {
			log(`${key} is included ${dict[key]} times.`);

			duplicates++;
		}
	});

	if (duplicates === 0) {
		log('There are no duplicate tokens.', false);
	}

	logNewLine();
}

export default checkDuplicates;
