import { readCSVFile } from "../lib/files.js";

function Movie(id, title, year, genre, director, actors, plot, imdb_rating, runtime_minutes) {
	this.id = id;
	this.title = title;
	this.year = year;
	this.genre = genre;
	this.director = director;
	this.actors = actors;
	this.plot = plot;
	this.imdb_rating = imdb_rating;
	this.runtime_minutes = runtime_minutes;
}

Movie.prototype.getFieldsToParseAsArray = function () {
	return ["genre", "actors", "director"];
};

Movie.prototype.getFieldsWithCommas = function () {
	const fieldsWithCommas = [];
	for (const [key, value] of Object.entries(this)) {
		if (typeof value === "string" && value.includes(",")) {
			fieldsWithCommas.push(key);
		}
	}
	return fieldsWithCommas;
};

function parseStringToArray(str) {
	if (typeof str !== "string") {
		return []; // Devuelve un array vacío si no es una cadena
	}
	return str.split(",").map((item) => item.trim());
}

Movie.prototype.getGenres = function () {
	return parseStringToArray(this.genre);
};
Movie.prototype.getActors = function () {
	return parseStringToArray(this.actors);
};
Movie.prototype.getDirector = function () {
	return parseStringToArray(this.director);
};

Movie.getAll = function () {
	const csvMovies = readCSVFile("data/movies.csv");
	const lines = csvMovies.split("\n");
	const headers = lines[0].split(",").map((item) => item.trim());
	const movies = [];

	for (let i = 1; i < lines.length; i++) {
		if (lines[i].trim() === "") continue; // Skip empty lines

		const values = [];
		let current = "";
		let insideQuotes = false;

		// Handle fields with commas inside quotes
		for (const char of lines[i]) {
			if (char === '"' && (current === "" || current[current.length - 1] !== "\\")) {
				insideQuotes = !insideQuotes;
			} else if (char === "," && !insideQuotes) {
				values.push(current.trim());
				current = "";
			} else {
				current += char;
			}
		}
		if (current) values.push(current.trim());

		const movie = new Movie();
		headers.forEach((header, index) => {
			movie[header] = values[index];
		});

		// Parse fields that need to be arrays
		const fieldsToParse = movie.getFieldsToParseAsArray();
		fieldsToParse.forEach((field) => {
			if (movie[field]) {
				movie[field] = parseStringToArray(movie[field]);
			}
		});

		movies.push(movie);
	}
	return movies;
};

Movie.getById = function (id) {
	const movies = Movie.getAll();
	const movie = movies.find((movie) => movie.id === id);
	if (!movie) {
		return null;
	}
	return movie;
};

Movie.getByGenres = function (genres) {
	if (!Array.isArray(genres)) {
		throw new Error("Genres must be an array");
	}

	const movies = Movie.getAll();
	const moviesByGenre = movies.filter((movie) => {
		const movieGenres = movie.getGenres().map((g) => g.toLowerCase().trim());
		return genres.some((genre) => movieGenres.includes(genre.toLowerCase().trim()));
	});
	return moviesByGenre;
};

export default Movie;
