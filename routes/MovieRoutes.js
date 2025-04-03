import express from "express";
import { getAllMovies, getMovieById, getMovieByIdAndSuggestions } from "../controllers/MovieController.js";

const router = express.Router();

router.get("/", (req, res) => {
	const movies = getAllMovies();
	res.json(movies);
});

router.get("/:id", (req, res) => {
	const movieId = req.params.id;
	const movie = getMovieById(movieId);
	if (!movie) {
		return res.status(404).json({ message: "Película no encontrada" });
	}
	res.json(movie);
});

router.get("/:id/suggestions", (req, res) => {
	res.json(getMovieByIdAndSuggestions(req.params.id));
	res.json({message: "Hola"}) // status 200, json {message: "Hola"}
});

export default router;
