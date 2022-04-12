import camelCase from 'lodash.camelcase';
import {chalkLog, readTokens} from './util.js';

const IGNORE_SETS = ['body', 'containerMaxWidths', 'displays'];

function verifyTokens(path) {
	readTokens(path, (data) => {
		const {frontendTokenCategories} = data;

		frontendTokenCategories.forEach((frontendTokenCategory) => {
			frontendTokenCategory.frontendTokenSets.forEach(
				(frontendTokenSet) => {
					if (!IGNORE_SETS.includes(frontendTokenSet.name)) {
						frontendTokenSet.frontendTokens.forEach(
							(frontendToken) => {
								const {label, mappings, name} = frontendToken;

								const mappingValue = mappings[0].value;

								const mappingValueNotEqualToName =
									camelCase(mappingValue) !== name;

								const mappingValueNotEqualToLabel =
									mappingValue !== label;

								if (
									mappingValueNotEqualToLabel ||
									mappingValueNotEqualToName
								) {
									chalkLog(
										'label: ' + label,
										mappingValueNotEqualToLabel
									);
									chalkLog(
										'name: ' + name,
										mappingValueNotEqualToName
									);
									chalkLog(
										`cssVariable: ${mappingValue} (${camelCase(
											mappingValue
										)})`
									);
									console.log();
								}
							}
						);
					}
				}
			);
		});
	});
}

export default verifyTokens;
