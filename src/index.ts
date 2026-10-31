
import express from "express";
import estudiantesRouter, { cargarEstudiantes } from "./routes/estudiantes";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerOutput from "./swagger_output.json";

const app = express();

const PORT = process.env.PORT ?? 3000;

// Middleware CORS
app.use(cors());

// Middleware para recibir JSON
app.use(express.json());

// Documentación Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerOutput));

// Montar rutas de estudiantes
app.use("/api/estudiantes", estudiantesRouter);

app.get("/", (req, res) => {
    res.send("¡Servidor funcionando correctamente!");
});

// Cargar estudiantes antes de iniciar el servidor
cargarEstudiantes()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Servidor corriendo en http://localhost:${PORT}`);
        });
    })
    .catch(error => {
        console.error("Error al cargar estudiantes:", error);
    });
