#! /usr/bin/env node

import {Command} from 'commander';
import verifyTokens from './verify-tokens.js';

const program = new Command();

program
	.name('dialect')
	.description('CLI to work with Dialect Dev')
	.version('1.0.0');

program
	.command('verify-tokens')
	.description('Verify frontend token definitions.')
	.argument('<path>', 'Path to frontend-token-definition.json file.')
	.action((path) => {
		verifyTokens(path);
	});

program.parse();
