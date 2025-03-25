function parseCSVRow(row) {
	const result = [];
	let current = "";
	let insideQuotes = false;

	for (let i = 0; i < row.length; i++) {
		const char = row[i];
		if (char === '"') {
			if (insideQuotes && row[i + 1] === '"') {
				// Se agrega una comilla escape y se salta la siguiente
				current += '"';
				i++;
			} else {
				insideQuotes = !insideQuotes;
			}
		} else if (char === "," && !insideQuotes) {
			result.push(current);
			current = "";
		} else {
			current += char;
		}
	}
	result.push(current);
	return result;
}

module.exports = { parseCSVRow };
