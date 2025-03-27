const fs = require("fs");
const path = require("path");

function readCSVFile(relative_path_filename) {
	const csvFilePath = path.join(__dirname, "../", relative_path_filename);
	return fs.readFileSync(csvFilePath, "utf8");
}

module.exports = { readCSVFile };
