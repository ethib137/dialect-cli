#! /usr/bin/env node

import {Command} from 'commander';
import checkDuplicates from './tasks/check-duplicates.js';
import checkSort from './tasks/check-sort.js';
import listTokens from './tasks/list-tokens.js';
import verifyTokens from './tasks/verify-tokens.js';

const program = new Command();

program
	.name('dialect-cli')
	.description('CLI to work with Dialect Dev')
	.version('1.0.1');

program
	.command('verify-tokens')
	.description('Verify frontend token definitions.')
	.argument('<path>', 'Path to frontend-token-definition.json file.')
	.action((path) => {
		verifyTokens(path);
	});

program
	.command('list-tokens')
	.description('List frontend token css variables.')
	.argument('<path>', 'Path to frontend-token-definition.json file.')
	.option(
		'-c, --category <string>',
		'Only display tokens from a specific frontentTokenCategory'
	)
	.action((path, options) => {
		listTokens(path, options.category);
	});

program
	.command('check-sort')
	.description('Check the sorting of frontend token css variables.')
	.argument('<path>', 'Path to frontend-token-definition.json file.')
	.option(
		'-c, --category <string>',
		'Only display tokens from a specific frontentTokenCategory'
	)
	.action((path, options) => {
		checkSort(path, options.category);
	});

program
	.command('check-duplicates')
	.description('Check if any token css variables are duplicated.')
	.argument('<path>', 'Path to frontend-token-definition.json file.')
	.option(
		'-c, --category <string>',
		'Only display tokens from a specific frontentTokenCategory'
	)
	.action((path, options) => {
		checkDuplicates(path, options.category);
	});

program.parse();
