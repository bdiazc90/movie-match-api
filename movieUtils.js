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

function findMovieBySimilarTitle(title, csvMovies) {
	const lines = csvMovies.split("\n");
	const headers = parseCSVRow(lines[0]);
	let bestMatch = null;
	let highestSimilarity = 0;

	for (let i = 1; i < lines.length; i++) {
		const values = parseCSVRow(lines[i]);
		const currentTitle = values[1]?.toLocaleLowerCase();
		if (currentTitle) {
			const similarity = calculateSimilarity(title.toLocaleLowerCase(), currentTitle);
			if (similarity > highestSimilarity) {
				highestSimilarity = similarity;
				bestMatch = {};
				headers.forEach((header, index) => {
					bestMatch[header] = values[index];
				});
			}
		}
	}
	return bestMatch;
}

function calculateSimilarity(word1, word2) {
	function getBigrams(word) {
		const bigrams = [];
		for (let i = 0; i < word.length - 1; i++) {
			bigrams.push(word.slice(i, i + 2));
		}
		return bigrams;
	}

	const bigrams1 = getBigrams(word1.toLocaleLowerCase());
	const bigrams2 = getBigrams(word2.toLocaleLowerCase());
	const intersection = bigrams1.filter((bigram) => bigrams2.includes(bigram));
	const union = new Set([...bigrams1, ...bigrams2]);

	return intersection.length / union.size;
}

module.exports = { findMovieBySimilarTitle };
