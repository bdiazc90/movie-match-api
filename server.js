const express = require("express");
const { getAllMovies } = require("./movieUtils");

const app = express();
const port = 3000;

// Ruta que atenderá a la solicitud GET /movies:
app.get("/movies", (req, res) => {
	const movies = getAllMovies();
	res.json(movies);
});

app.listen(port, () => {
	console.log(`Server running on http://localhost:${port}`);
});
