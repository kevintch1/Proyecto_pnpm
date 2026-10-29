
import express from "express";
import estudiantesRouter from "./routes/estudiantes";

import swaggerUi from "swagger-ui-express";
import swaggerOutput from "./swagger_output.json";

const app = express();
const PORT = 3000;

// Middleware para recibir JSON
app.use(express.json());

// Documentación Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerOutput));

// Montar todas las rutas de estudiantes
app.use("/api/estudiantes", estudiantesRouter);

app.get("/", (req, res) => {
    // #swagger.ignore = true
    res.send("¡Servidor funcionando correctamente!");
});
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
