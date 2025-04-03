import { findMovieBySimilarTitle } from "./movieUtils.js";
import { readCSVFile } from "./lib/files.js";

// Recibimos el input del usuario
const inputTitle = process.argv[2];
if (inputTitle === "") {
	console.log("Por favor ingrese el título de una película.");
	process.exit();
}

console.log(inputTitle);

// Modularizando la funcion de lectura de archivos.
const csvMovies = readCSVFile("data/movies.csv");

const movie = findMovieBySimilarTitle(inputTitle, csvMovies);
if (movie === null) {
	console.log("No se encontró la película.");
	process.exit();
}

console.log(movie);
