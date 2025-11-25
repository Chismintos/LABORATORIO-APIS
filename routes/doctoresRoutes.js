const express = require('express');
const router = express.Router();
const doctores = require('../helpers/doctoresHelper');

// Generar ID Dxxx
const generarId = () => {
    const list = doctores.obtenerTodos();
    return "D" + String(list.length + 1).padStart(3, '0');
};

// POST /doctores
router.post('/', (req, res) => {
    const { nombre, especialidad, horarioInicio, horarioFin, diasDisponibles } = req.body;

    if (!nombre || !especialidad || !horarioInicio || !horarioFin || !diasDisponibles)
        return res.status(400).json({ error: "Datos incompletos" });

    if (horarioInicio >= horarioFin)
        return res.status(400).json({ error: "Horario inválido" });

    if (diasDisponibles.length === 0)
        return res.status(400).json({ error: "Debe tener días disponibles" });

    if (doctores.obtenerTodos().some(d =>
        d.nombre === nombre && d.especialidad === especialidad))
        return res.status(400).json({ error: "Doctor duplicado" });

    const nuevo = {
        id: generarId(),
        nombre,
        especialidad,
        horarioInicio,
        horarioFin,
        diasDisponibles
    };

    doctores.crear(nuevo);
    res.status(201).json(nuevo);
});

// GET /doctores
router.get('/', (req, res) => {
    res.json(doctores.obtenerTodos());
});

// GET /doctores/especialidad/:especialidad
router.get('/especialidad/:especialidad', (req, res) => {
    const encontrados = doctores.obtenerTodos().filter(
        d => d.especialidad.toLowerCase() === req.params.especialidad.toLowerCase()
    );
    res.json(encontrados);
});

// GET /doctores/:id
router.get('/:id', (req, res) => {
    const d = doctores.obtenerPorId(req.params.id);
    if (!d) return res.status(404).json({ error: "Doctor no encontrado" });
    res.json(d);
});

module.exports = router;
    