import express from "express";
import movieRoutes from "./routes/MovieRoutes.js";

import { helloWorld } from "./controllers/RootController.js";

const app = express();
const port = 3000;

app.get("/", helloWorld);

app.use("/api/movies", movieRoutes);

app.listen(port, () => {
	console.log(`Server running on http://localhost:${port}`);
});
