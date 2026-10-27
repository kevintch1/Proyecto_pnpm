
import express from "express";
import { version } from "node:os";

const app = express();
const PORT = 3000;

//MIDDLEWARE PARA RECIBIR DATOS json
app.use(express.json());

//EDDPOINT COMPROBAR EL ESTADO DEL SERVIDOR

app.get("/api/status", (req, res) => {
    res.json({
        status: "Servidor en Línea",
        version: "1.0.0"
    });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
