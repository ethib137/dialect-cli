import chalk from 'chalk';
import camelCase from 'lodash.camelcase';
import {forEachTokenSet} from '../util/util.js';
import {log, logNewLine, logTitle} from '../util/chalk-util.js';

const IGNORE_SETS = ['body', 'containerMaxWidths', 'displays'];

async function verifyTokens(path, category) {
	logTitle('Verify Tokens:');

	let isConsistent = true;

	await forEachTokenSet(path, category, (frontendTokenSet) => {
		if (!IGNORE_SETS.includes(frontendTokenSet.name)) {
			frontendTokenSet.frontendTokens.forEach((frontendToken) => {
				const {label, mappings, name} = frontendToken;

				const mappingValue = mappings[0].value;

				const mappingValueNotEqualToName =
					camelCase(mappingValue) !== name;

				const mappingValueNotEqualToLabel = mappingValue !== label;

				if (mappingValueNotEqualToLabel || mappingValueNotEqualToName) {
					isConsistent = false;

					log('label: ' + label, mappingValueNotEqualToLabel);
					log('name: ' + name, mappingValueNotEqualToName);
					log(
						`cssVariable: ${mappingValue} (${camelCase(
							mappingValue
						)})`
					);

					logNewLine();
				}
			});
		}
	});

	if (isConsistent) {
		log(
			'All tokens have a consistent name, label, and cssVariable.',
			false
		);
	}

	logNewLine();
}

export default verifyTokens;
