
import express from "express";

const app = express();
const PORT = 3000;

//MIDDLEWARE PARA RECIBIR DATOS json
app.use(express.json());

interface Estudiante {
    id: number;
    nombre: string;
    email: string;
    bootcamp: string
}

const estudiantes: Estudiante[] = [];
let siguienteId = 1;

app.get("/api/estudiantes", (req, res) => {
    res.json(estudiantes);
});

app.post("/api/estudiantes", (req, res) => {
    const { nombre, email, bootcamp } = req.body;
    if (!email) {
        return res.status(400).json({
            error: "EL email es obligatorio"
        });
    }
    const nuevoEstudiante: Estudiante = {
        id: siguienteId,
        nombre: nombre,
        email: email,
        bootcamp: bootcamp
    };
    estudiantes.push(nuevoEstudiante);
    siguienteId++;
    res.status(201).json(nuevoEstudiante);
});

app.put("/api/estudiantes/:id", (req, res) => {
    const id = Number(req.params.id);
    const estudiante = estudiantes.find((e) => e.id === id);
    if (!estudiante) {
        return res.status(404).json({
            error: "Estudiante no encontrado"
        });
    }

    const { nombre, email, bootcamp } = req.body;
    estudiante.nombre = nombre;
    estudiante.email = email;
    estudiante.bootcamp = bootcamp;
    res.status(200).json(estudiante)
});

app.delete("/api/estudiantes/:id", (req, res) => {
    const id = Number(req.params.id);
    const indice = estudiantes.findIndex((e) => e.id === id);
    if (indice === -1) {
        return res.status(404).json({
            error: "Estudiante no encontrado"
        });
    }
    estudiantes.splice(indice, 1);
    res.status(200).json({
        mensaje: "Estudiante eliminado correctamente"
    });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
