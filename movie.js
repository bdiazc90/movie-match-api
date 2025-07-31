const { getMovieByTitle } = require("./movieUtils.js");


(async () => {
    console.log("⭐️ Bienvenido a Movie Match ⭐️")
    console.log("=============================")

    const inputMovie = process.argv[2] ?? null;

    if (!inputMovie) {
        console.log(" 🟡 Faltó el nombre de la película");
        return;
    }

    console.log(" 🟢 Película a buscar: " + inputMovie);
    const movie = await getMovieByTitle(inputMovie);
    console.log(movie);
})();


