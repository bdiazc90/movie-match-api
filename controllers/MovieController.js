import Movie from "../models/Movie.js";

function getAllMovies() {
	return Movie.getAll();
}

function getMovieById(id) {
	return Movie.getById(id);
}

function getMovieByIdAndSuggestions(id) {
	const movie = Movie.getById(id);
	console.log(movie.genre);
	const suggestions = Movie.getByGenres(movie.genre);
	console.log("suggestions", suggestions);
	return { movie, suggestions: suggestions.slice(0, 5) };
}

export { getAllMovies, getMovieById, getMovieByIdAndSuggestions };
