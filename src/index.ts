import express from "express";
import estudiantesRouter from "./routes/estudiantes";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerOutput from "./swagger_output.json";
const app = express();
// Leer el puerto desde .env
const PORT = process.env.PORT ?? 3000;


//middleware Ccours
app.use(cors());

// Middleware para recibir JSON
app.use(express.json());

//documentación swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerOutput));

//montar todas las rutas de estudiantes
app.use("/api/estudiantes", estudiantesRouter);

app.get("/", (req, res) => {

    res.send("¡Servidor funcionando correctamente!");
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});