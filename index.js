import express from "express";
import movieRoutes from "./routes/MovieRoutes.js";
import cors from "cors"; // Middleware para permitir CORS de un tercero

import { helloWorld } from "./controllers/RootController.js";
import { logginRequest } from "./middlewares/loggin.js";

const app = express();
const port = 3000;

app.use(cors()); // Middeware para permitir CORS

app.get("/", logginRequest, helloWorld);

app.use("/api/movies", logginRequest, movieRoutes);

app.listen(port, () => {
	console.log(`Server running on http://localhost:${port}`);
});
