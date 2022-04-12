import {readTokens} from './util.js';

function listTokens(path, category = '') {
	readTokens(path, (data) => {
		const {frontendTokenCategories} = data;

		frontendTokenCategories.forEach((frontendTokenCategory) => {
			if (
				category.length === 0 ||
				category === frontendTokenCategory.name
			) {
				console.log(frontendTokenCategory.name);

				frontendTokenCategory.frontendTokenSets.forEach(
					(frontendTokenSet) => {
						console.log(`  ${frontendTokenSet.name}`);

						frontendTokenSet.frontendTokens.forEach(
							(frontendToken) => {
								const {label, mappings, name} = frontendToken;

								const mappingValue = mappings[0].value;

								console.log(`    --${mappingValue}`);
							}
						);
					}
				);
			}
		});
	});
}

export default listTokens;
