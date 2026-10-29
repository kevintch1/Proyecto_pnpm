
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

// GET: mostrar todos los estudiantes
router.get("/", (req, res) => {
    // #swagger.tags = ['Estudiantes']
    // #swagger.summary = 'Listas de estudiantes'
    // #swagger.description = 'Obtiene todos los estudiantes registrados. Permite filtrar por bootcamp.'
    // #swagger.parameters['bootcamp'] = {
    //     in: 'query',
    //     description: 'Nombre del bootcamp para filtrar estudiantes',
    //     required: false,
    //     type: 'string'
    // }
    // #swagger.responses[200] = {
    //     description: 'Lista de estudiantes obtenida correctamente'
    // }    
    const bootcamp = req.query.bootcamp;

    if (typeof bootcamp === "string") {
        const resultado = estudiantes.filter(
            (estudiante) => estudiante.bootcamp === bootcamp
        );

        return res.json(resultado);
    }

    res.json(estudiantes);
});

// GET: buscar estudiante por ID
router.get("/:id", (req, res) => {
    // #swagger.tags = ['Estudiantes']
    // #swagger.summary = 'Buscar estudiante por ID'
    // #swagger.description = 'Busca un estudiante específico utilizando su ID.'
    // #swagger.parameters['id'] = {
    //     in: 'path',
    //     description: 'ID del estudiante que se desea buscar',
    //     required: true,
    //     type: 'integer'
    // }
    // #swagger.responses[200] = {
    //     description: 'Estudiante encontrado correctamente'
    // }
    // #swagger.responses[400] = {
    //     description: 'El ID proporcionado no es válido'
    // }
    // #swagger.responses[404] = {
    //     description: 'Estudiante no encontrado'
    // }
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

// POST: registrar estudiante
router.post("/", (req, res) => {
    // #swagger.tags = ['Estudiantes']
    // #swagger.summary = 'Registrar estudiante'
    // #swagger.description = 'Registra un nuevo estudiante en el sistema.'
    // #swagger.parameters['obj'] = {
    //     in: 'body',
    //     description: 'Datos del estudiante que se desea registrar',
    //     required: true,
    //     schema: {
    //         nombre: 'Kevin',
    //         email: 'kevin@example.com',
    //         bootcamp: 'Backend'
    //     }
    // }
    // #swagger.responses[201] = {
    //     description: 'Estudiante registrado correctamente'
    // }
    // #swagger.responses[400] = {
    //     description: 'El email es obligatorio'
    // }
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

// PUT: actualizar estudiante
router.put("/:id", (req, res) => {
    // #swagger.tags = ['Estudiantes']
    // #swagger.summary = 'Actualizar estudiante'
    // #swagger.description = 'Actualiza los datos de un estudiante utilizando su ID.'
    // #swagger.parameters['id'] = {
    //     in: 'path',
    //     description: 'ID del estudiante que se desea actualizar',
    //     required: true,
    //     type: 'integer'
    // }
    // #swagger.parameters['obj'] = {
    //     in: 'body',
    //     description: 'Nuevos datos del estudiante',
    //     required: true,
    //     schema: {
    //         nombre: 'Kevin',
    //         email: 'kevin@example.com',
    //         bootcamp: 'Backend'
    //     }
    // }
    // #swagger.responses[200] = {
    //     description: 'Estudiante actualizado correctamente'
    // }
    // #swagger.responses[404] = {
    //     description: 'Estudiante no encontrado'
    // }
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

// DELETE: eliminar estudiante
router.delete("/:id", (req, res) => {
    // #swagger.tags = ['Estudiantes']
    // #swagger.summary = 'Eliminar estudiante'
    // #swagger.description = 'Elimina un estudiante utilizando su ID.'
    // #swagger.parameters['id'] = {
    //     in: 'path',
    //     description: 'ID del estudiante que se desea eliminar',
    //     required: true,
    //     type: 'integer'
    // }
    // #swagger.responses[200] = {
    //     description: 'Estudiante eliminado correctamente'
    // }
    // #swagger.responses[404] = {
    //     description: 'Estudiante no encontrado'
    // }
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
