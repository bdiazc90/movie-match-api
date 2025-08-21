import express from "express"
import cors from "cors"
import { logRequest } from "./middlewares/logger.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { responseOK } from "./middlewares/resHandler.js";

// import swaggerUi from "swagger-ui-express"
// import swaggerJsdoc from 'swagger-jsdoc';

// const swaggerOptions = {
//   definition: {
//     openapi: '3.0.0',
//     info: {
//       title: 'Mi API',
//       version: '1.0.0',
//     },
//   },
//   apis: ['./index.js'], // archivos con documentación
// };

// const specs = swaggerJsdoc(swaggerOptions);

const app = express();

app.use(cors);

app.use(logRequest); // Esto debe estar ANTES de las rutas.

app.use(responseOK);

app.get("/", (req, res) => {
    res.json({message: "Hola, estoy vivo"})
})

/**
 * @swagger
 * /bruno:
 *   get:
 *     summary: Ejemplo de ruta "Brruno"
 *     responses:
 *       200:
 *         description: Mensaje de ejemplo
 */
app.get("/bruno", (req, res) => {
    res.json({message: "Hola BRUNO"})
});

app.get("/error", (req, res) => {
    throw new Error("soy un error");
})

// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Aplicar middleware de errores (AL FINAL)
app.use(errorHandler);



app.listen(3000, () => console.log("🟢 estoy vivo"));