const fs = require("fs").promises; // Usar la versión de promesas

function parseCsvLineToObject(line) {
    const columns = line.split(',');
    return {
        id: columns[0],
        title: columns[1],
        year: columns[2],
        genre: columns[3],
        director: columns[4]
    };
}

async function getMovieByTitle(title) {
    try {
        const data = await fs.readFile('data/movies.csv', 'utf8');
        const lines = data.split('\n');
        const matchMovie = lines.find(line => line.includes(title));
        if (!matchMovie) {
            console.log(" 🟡 No se encontró la película: " + title);
            return null;
        }
        return parseCsvLineToObject(matchMovie);
    } catch (err) {
        console.error('Error reading the CSV file:', err);
        return null;
    }
}

// exportar según sintaxis: CommonJS
module.exports = {
    getMovieByTitle
}