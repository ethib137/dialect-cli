import chalk from 'chalk';

export function log(text, error) {
	console.log(logError(text, error));
}

export function logError(text, error = true) {
	const color = error ? 'red' : 'green';

	return chalk[color](text);
}

export function logTitle(text) {
	console.log(text);
}

export function logNewLine(line = 1) {
	for (let i = line; i > 0; i--) {
		console.log();
	}
}

export function logSubtitle(text) {
	console.log(chalk.italic(chalk.grey(text)));
}

const TAB = '    ';

export function logIndent(text, indent = 0) {
	console.log(TAB.repeat(indent) + text);
}
