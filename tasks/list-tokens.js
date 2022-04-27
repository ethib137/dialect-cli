import {logIndent, logSubtitle} from '../util/chalk-util.js';
import {readTokens} from '../util/util.js';

function listTokens(path, category = '') {
	readTokens(path, (data) => {
		const {frontendTokenCategories} = data;

		frontendTokenCategories.forEach((frontendTokenCategory) => {
			if (
				category.length === 0 ||
				category === frontendTokenCategory.name
			) {
				logSubtitle(frontendTokenCategory.name);

				frontendTokenCategory.frontendTokenSets.forEach(
					(frontendTokenSet) => {
						logIndent(`${frontendTokenSet.name}`, 1);

						frontendTokenSet.frontendTokens.forEach(
							(frontendToken) => {
								const {label, mappings, name} = frontendToken;

								const mappingValue = mappings[0].value;

								logIndent(`--${mappingValue}`, 2);
							}
						);
					}
				);
			}
		});
	});
}

export default listTokens;
