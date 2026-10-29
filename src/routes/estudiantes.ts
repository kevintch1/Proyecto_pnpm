import { Router } from "express";

const router: Router = Router();
interface Estudiante {
    id: number;
    nombre: string;
    email: string;
    bootcamp: string;
}

const estudiantes: Estudiante[] = [];
let siguienteId = 1;

//get_mostrar_todo
router.get("/", (req, res) => {
    const bootcamp = req.query.bootcamp;


    if (typeof bootcamp === "string") {
        const resultado = estudiantes.filter(
            (estudiante) => estudiante.bootcamp === bootcamp
        );
        return res.json(resultado);
    }

    res.json(estudiantes);

});
//sof get
router.get("/:id", (req, res) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
            error: "El ID debe ser un número válido"
        });
    }

    const estudiante = estudiantes.find((e) => e.id === id);

    if (!estudiante) {
        return res.status(404).json({
            error: "Estudiante no encontrado"
        });
    }

    res.json(estudiante);

});
//pos
router.post("/", (req, res) => {
    const { nombre, email, bootcamp } = req.body;

    if (!email) {
        return res.status(400).json({
            error: "El email es obligatorio"
        });
    }

    const nuevoEstudiante: Estudiante = {
        id: siguienteId,
        nombre,
        email,
        bootcamp
    };

    estudiantes.push(nuevoEstudiante);
    siguienteId++;

    res.status(201).json(nuevoEstudiante);
});

//put
router.put("/:id", (req, res) => {
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

    res.status(200).json(estudiante);
});

//delete soft
router.delete("/:id", (req, res) => {
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

export default router;