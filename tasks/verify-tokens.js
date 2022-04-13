import chalk from 'chalk';
import camelCase from 'lodash.camelcase';
import {chalkLog, forEachTokenSet} from './util.js';

const IGNORE_SETS = ['body', 'containerMaxWidths', 'displays'];

async function verifyTokens(path, category) {
	console.log(chalk.blue('Verify Tokens:'));

	await forEachTokenSet(path, category, (frontendTokenSet) => {
		if (!IGNORE_SETS.includes(frontendTokenSet.name)) {
			frontendTokenSet.frontendTokens.forEach((frontendToken) => {
				const {label, mappings, name} = frontendToken;

				const mappingValue = mappings[0].value;

				const mappingValueNotEqualToName =
					camelCase(mappingValue) !== name;

				const mappingValueNotEqualToLabel = mappingValue !== label;

				if (mappingValueNotEqualToLabel || mappingValueNotEqualToName) {
					chalkLog('label: ' + label, mappingValueNotEqualToLabel);
					chalkLog('name: ' + name, mappingValueNotEqualToName);
					chalkLog(
						`cssVariable: ${mappingValue} (${camelCase(
							mappingValue
						)})`
					);
					console.log();
				}
			});
		}
	});

	console.log();
}

export default verifyTokens;
