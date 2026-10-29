
import express from "express";
import estudiantesRouter from "./routes/estudiantes";

const app = express();
const PORT = 3000;

// Middleware para recibir JSON
app.use(express.json());

// Montar todas las rutas de estudiantes
app.use("/api/estudiantes", estudiantesRouter);

app.get("/", (req, res) => {
    res.send("¡Servidor funcionando correctamente!");
});
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
