import checkDuplicates from './check-duplicates.js';
import checkSort from './check-sort.js';
import checkUsage from './check-usage.js';
import verifyTokens from './verify-tokens.js';

async function checkAll(path, category) {
	await checkDuplicates(path, category);

	await checkSort(path, category);

	await verifyTokens(path, category);

	await checkUsage(path, category);
}

export default checkAll;
