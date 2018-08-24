/**
 * Strip excess whitespace from a template literal
 * @param {string} strings - Template string
 * @param {array} values - Template variable values
 * @returns {string} Template string in one line
 */
export default function spaceless(strings, ...values) {
	const len = values.length;

	let output = '';

	for (let itr = 0; itr < len; itr++) {
		output += strings[itr] + values[itr];
	}

	output += strings[len];

	let lines = output.split(/(?:\r\n|\n|\r)/);

	// Rip out the leading whitespace.
	return lines.map(line => line.replace(/^\s+/gm, '')).join(' ').trim();
}
