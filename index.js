import express from "express";
import movieRoutes from "./routes/MovieRoutes.js";

import { helloWorld } from "./controllers/RootController.js";
import { logginRequest } from "./middlewares/loggin.js";

const app = express();
const port = 3000;

app.get("/", logginRequest, helloWorld);

app.use("/api/movies", logginRequest, movieRoutes);

app.listen(port, () => {
	console.log(`Server running on http://localhost:${port}`);
});
